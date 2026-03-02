// apolloClient.ts (Apollo Client v4)
import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import Storage from "expo-sqlite/kv-store";

// RxJS
import { from as rxFrom } from "rxjs";
import { mergeMap } from "rxjs/operators";

type RefreshTokensData = {
  refreshTokens: { accessToken: string; refreshToken: string };
};

const GRAPHQL_URL =
  (process.env.EXPO_PUBLIC_GRAPHQL_URL as string) ||
  "http://localhost:4000/graphql";

const AUTH_STORAGE_KEY = "@auth_state";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user?: any;
  sessionId?: string | null;
};

function getAuthSync(): AuthState {
  try {
    const raw = Storage.getItemSync(AUTH_STORAGE_KEY);
    if (!raw) return { accessToken: null, refreshToken: null };
    return JSON.parse(raw);
  } catch {
    return { accessToken: null, refreshToken: null };
  }
}

function setAuthSync(next: Partial<AuthState>) {
  const prev = getAuthSync();
  const merged = { ...prev, ...next };
  Storage.setItemSync(AUTH_STORAGE_KEY, JSON.stringify(merged));
}

function clearAuthSync() {
  Storage.removeItemSync(AUTH_STORAGE_KEY);
}

// ⚠️ Ajusta a tu schema real
const REFRESH_TOKENS = gql`
  mutation RefreshTokens($refreshToken: String!) {
    refreshTokens(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

let isRefreshing = false;
let pendingResolvers: ((token: string | null) => void)[] = [];

function resolvePending(token: string | null) {
  pendingResolvers.forEach((r) => r(token));
  pendingResolvers = [];
}

async function refreshAccessToken(client: ApolloClient) {
  const { refreshToken } = getAuthSync();
  if (!refreshToken) return null;

  const res = await client.mutate<RefreshTokensData>({
    mutation: REFRESH_TOKENS,
    variables: { refreshToken },
    fetchPolicy: "no-cache",
  });

  const newAccess = res.data?.refreshTokens?.accessToken ?? null;
  const newRefresh = res.data?.refreshTokens?.refreshToken ?? null;

  if (!newAccess || !newRefresh) return null;

  setAuthSync({ accessToken: newAccess, refreshToken: newRefresh });
  return newAccess;
}

// ---- HTTP ----
const httpLink = new HttpLink({ uri: GRAPHQL_URL });

// ---- Auth header (AC4 docs: SetContextLink) ----
const authLink = new SetContextLink(({ headers }) => {
  const { accessToken } = getAuthSync();
  return {
    headers: {
      ...headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

function isTokenExpiredFromErrorLike(error: unknown) {
  // GraphQL errors (spec) => CombinedGraphQLErrors con .errors[]
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some((e) => {
      const code = (e as any)?.extensions?.code;
      return code === "TOKEN_EXPIRED" || code === "UNAUTHENTICATED";
    });
  }

  // Protocol errors (GraphQL over HTTP) — por si tu server retorna este tipo
  if (CombinedProtocolErrors.is(error)) {
    return error.errors.some((e) => {
      const code = (e as any)?.extensions?.code;
      return code === "TOKEN_EXPIRED" || code === "UNAUTHENTICATED";
    });
  }

  return false;
}

// Ref para usar el client dentro de ErrorLink
const apolloClientRef: { current: ApolloClient | null } = {
  current: null,
};

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  // Solo manejamos expiración auth
  if (!isTokenExpiredFromErrorLike(error)) return;

  // Evitar loop: si el refresh falla, limpiamos y no reintentamos
  if (operation.operationName === "RefreshTokens") {
    clearAuthSync();
    return;
  }

  if (!isRefreshing) {
    isRefreshing = true;

    const client = apolloClientRef.current;
    if (!client) {
      isRefreshing = false;
      clearAuthSync();
      resolvePending(null);
      return;
    }

    rxFrom(refreshAccessToken(client).catch(() => null)).subscribe({
      next: (newToken) => {
        isRefreshing = false;
        if (!newToken) {
          clearAuthSync();
          resolvePending(null);
          return;
        }
        resolvePending(newToken);
      },
      error: () => {
        isRefreshing = false;
        clearAuthSync();
        resolvePending(null);
      },
    });
  }

  // Espera a que refresh termine y reintenta
  return rxFrom(
    new Promise<string | null>((resolve) => pendingResolvers.push(resolve)),
  ).pipe(
    mergeMap((newToken) => {
      if (newToken) {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
        }));
      }
      return forward(operation);
    }),
  );
});

export function createApolloClient() {
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: "cache-and-network" },
      query: { fetchPolicy: "cache-first" },
      mutate: { fetchPolicy: "no-cache" },
    },
  });

  apolloClientRef.current = client;
  return client;
}
