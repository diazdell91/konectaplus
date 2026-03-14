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
import { useAuthStore } from "@/store/useAuthStore";
import { collectDeviceInfo } from "@/features/auth/hooks/useDeviceInfo";

// RxJS
import { from as rxFrom } from "rxjs";
import { mergeMap } from "rxjs/operators";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type RefreshSessionData = {
  refreshSession: {
    accessToken: string;
    refreshToken: string;
  };
};

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const GRAPHQL_URL =
  (process.env.EXPO_PUBLIC_GRAPHQL_URL as string) ||
  "http://localhost:4000/graphql";

// ─────────────────────────────────────────────
// Refresh mutation — matches real schema
// ─────────────────────────────────────────────

const REFRESH_SESSION = gql`
  mutation RefreshSession($refreshToken: String!, $device: DeviceInput!) {
    refreshSession(refreshToken: $refreshToken, device: $device) {
      accessToken
      refreshToken
      user {
        id
        phone
        email
        emailVerified
      }
      session {
        id
        deviceId
        deviceName
        ip
        userAgent
        createdAt
        expiresAt
        revokedAt
      }
    }
  }
`;

// ─────────────────────────────────────────────
// Refresh queue
// ─────────────────────────────────────────────

let isRefreshing = false;
let pendingResolvers: ((token: string | null) => void)[] = [];

function resolvePending(token: string | null) {
  pendingResolvers.forEach((r) => r(token));
  pendingResolvers = [];
}

async function refreshAccessToken(client: ApolloClient) {
  const refreshToken = useAuthStore.getState().getRefreshToken();
  if (!refreshToken) return null;

  try {
    const device = await collectDeviceInfo();
    const res = await client.mutate<RefreshSessionData>({
      mutation: REFRESH_SESSION,
      variables: { refreshToken, device },
      fetchPolicy: "no-cache",
    });

    const newAccess = res.data?.refreshSession?.accessToken ?? null;
    const newRefresh = res.data?.refreshSession?.refreshToken ?? null;

    if (!newAccess || !newRefresh) return null;

    useAuthStore.getState().setAuth({
      accessToken: newAccess,
      refreshToken: newRefresh,
    });

    return newAccess;
  } catch (e) {
    console.error("[Apollo] refreshAccessToken failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────
// Links
// ─────────────────────────────────────────────

const httpLink = new HttpLink({ uri: GRAPHQL_URL });

const authLink = new SetContextLink(({ headers }) => {
  const accessToken = useAuthStore.getState().getAccessToken();
  return {
    headers: {
      ...headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

function isTokenExpiredError(error: unknown) {
  const hasAuthMessage = (message?: string) =>
    !!message && /unauthorized|token expired|jwt expired|unauthenticated/i.test(message);

  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some((e) => {
      const code = (e as any)?.extensions?.code;
      return (
        code === "TOKEN_EXPIRED" ||
        code === "UNAUTHENTICATED" ||
        hasAuthMessage((e as any)?.message)
      );
    });
  }
  if (CombinedProtocolErrors.is(error)) {
    return error.errors.some((e) => {
      const code = (e as any)?.extensions?.code;
      return (
        code === "TOKEN_EXPIRED" ||
        code === "UNAUTHENTICATED" ||
        hasAuthMessage((e as any)?.message)
      );
    });
  }
  return false;
}

const apolloClientRef: { current: ApolloClient | null } = {
  current: null,
};

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!isTokenExpiredError(error)) return;

  // Evitar loop infinito si el refresh mismo falla
  if (operation.operationName === "RefreshSession") {
    useAuthStore.getState().clearAuth();
    return;
  }

  if (!isRefreshing) {
    isRefreshing = true;

    const client = apolloClientRef.current;
    if (!client) {
      isRefreshing = false;
      useAuthStore.getState().clearAuth();
      resolvePending(null);
      return;
    }

    rxFrom(refreshAccessToken(client)).subscribe({
      next: (newToken) => {
        isRefreshing = false;
        if (!newToken) {
          useAuthStore.getState().clearAuth();
          resolvePending(null);
          return;
        }
        resolvePending(newToken);
      },
      error: () => {
        isRefreshing = false;
        useAuthStore.getState().clearAuth();
        resolvePending(null);
      },
    });
  }

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

// ─────────────────────────────────────────────
// Factory
// ─────────────────────────────────────────────

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
