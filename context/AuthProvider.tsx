// AuthProvider.tsx
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import Storage from "expo-sqlite/kv-store";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "@auth_state";

// --------------------
// GraphQL documents
// --------------------
const REQUEST_OTP = gql`
  mutation RequestOtp($phone: String!, $purpose: OtpPurpose!) {
    requestOtp(phone: $phone, purpose: $purpose) {
      success
      message
      retryAfterSeconds
    }
  }
`;

const VERIFY_OTP = gql`
  mutation VerifyOtp($phone: String!, $code: String!, $device: DeviceInput!) {
    verifyOtp(phone: $phone, code: $code, device: $device) {
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

const LOGOUT = gql`
  mutation Logout($sessionId: ID!) {
    logout(sessionId: $sessionId)
  }
`;

// --------------------
// Types (mínimos)
// --------------------
export type AuthUser = {
  id: string;
  phone: string;
  email: string | null;
  emailVerified: boolean;
};

export type AuthSession = {
  id: string;
  deviceId?: string | null;
  deviceName?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  createdAt?: string | null;
  expiresAt?: string | null;
  revokedAt?: string | null;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  sessionId: string | null; // session.id
};

const DEFAULT_AUTH: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  sessionId: null,
};

type RequestOtpResult = {
  success: boolean;
  message: string;
  retryAfterSeconds: number;
};

type VerifyOtpResult = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  session: AuthSession;
};

type AuthContextType = {
  // state
  auth: AuthState;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // getters útiles (por si quieres usarlos en links)
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;

  // actions
  setAuth: (next: Partial<AuthState>) => Promise<void>;
  setAuthSync: (next: Partial<AuthState>) => void;
  clearAuth: () => Promise<void>;
  clearAuthSync: () => void;

  requestOtp: (args: {
    phone: string;
    purpose: "LOGIN" | "REGISTER" | string;
  }) => Promise<RequestOtpResult>;
  verifyOtp: (args: {
    phone: string;
    code: string;
    device: { deviceId: string; deviceName: string };
  }) => Promise<VerifyOtpResult>;

  logout: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({
  auth: DEFAULT_AUTH,
  isAuthenticated: false,
  isHydrated: false,
  getAccessToken: () => null,
  getRefreshToken: () => null,
  setAuth: async () => {},
  setAuthSync: () => {},
  clearAuth: async () => {},
  clearAuthSync: () => {},
  requestOtp: async () => ({
    success: false,
    message: "Not initialized",
    retryAfterSeconds: 0,
  }),
  verifyOtp: async () => {
    throw new Error("Not initialized");
  },
  logout: async () => false,
});

// --------------------
// Storage helpers
// --------------------
function loadAuthSync(): AuthState {
  try {
    const raw = Storage.getItemSync(STORAGE_KEY);
    if (!raw) return DEFAULT_AUTH;
    const parsed = JSON.parse(raw);
    // merge defensivo por si agregas campos luego
    return { ...DEFAULT_AUTH, ...parsed };
  } catch (e) {
    console.error("Failed to load auth:", e);
    return DEFAULT_AUTH;
  }
}

async function persistAuth(next: AuthState) {
  await Storage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function persistAuthSync(next: AuthState) {
  Storage.setItemSync(STORAGE_KEY, JSON.stringify(next));
}

// --------------------
// Provider
// --------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();

  // Carga síncrona desde storage
  const [auth, setAuthState] = useState<AuthState>(loadAuthSync);
  // isHydrated se pone true tras el primer render, garantizando que
  // el token ya está en memoria antes de que Apollo lance queries.
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAuthenticated =
    !!auth.accessToken && !!auth.refreshToken && !!auth.user;

  const getAccessToken = useCallback(
    () => auth.accessToken,
    [auth.accessToken],
  );
  const getRefreshToken = useCallback(
    () => auth.refreshToken,
    [auth.refreshToken],
  );

  const setAuth = useCallback(
    async (next: Partial<AuthState>) => {
      const merged: AuthState = { ...auth, ...next };
      setAuthState(merged);
      try {
        await persistAuth(merged);
      } catch (e) {
        console.error("Failed to persist auth:", e);
        throw e;
      }
    },
    [auth],
  );

  const setAuthSync = useCallback(
    (next: Partial<AuthState>) => {
      const merged: AuthState = { ...auth, ...next };
      setAuthState(merged);
      try {
        persistAuthSync(merged);
      } catch (e) {
        console.error("Failed to persist auth (sync):", e);
        throw e;
      }
    },
    [auth],
  );

  const clearAuth = useCallback(async () => {
    setAuthState(DEFAULT_AUTH);
    try {
      await Storage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear auth:", e);
      throw e;
    }
  }, []);

  const clearAuthSync = useCallback(() => {
    setAuthState(DEFAULT_AUTH);
    try {
      Storage.removeItemSync(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear auth (sync):", e);
      throw e;
    }
  }, []);

  // --------------------
  // Mutations
  // --------------------
  const requestOtp = useCallback(
    async (args: { phone: string; purpose: "LOGIN" | "REGISTER" | string }) => {
      const { data } = await client.mutate({
        mutation: REQUEST_OTP,
        variables: { phone: args.phone, purpose: args.purpose },
        fetchPolicy: "no-cache",
      });

      console.log(data);
      return data?.requestOtp as RequestOtpResult;
    },
    [client],
  );

  const verifyOtp = useCallback(
    async (args: {
      phone: string;
      code: string;
      device: { deviceId: string; deviceName: string };
    }) => {
      const { data } = await client.mutate({
        mutation: VERIFY_OTP,
        variables: { phone: args.phone, code: args.code, device: args.device },
        fetchPolicy: "no-cache",
      });

      const payload = data?.verifyOtp as VerifyOtpResult;

      // Persistimos todo lo importante
      await setAuth({
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        user: payload.user,
        sessionId: payload.session?.id ?? null,
      });

      return payload;
    },
    [client, setAuth],
  );

  const logout = useCallback(async () => {
    // Si no hay sesión, limpiamos local y ya
    if (!auth.sessionId) {
      await clearAuth();
      // (Opcional) limpiar cache apollo también:
      // await client.clearStore();
      return true;
    }

    try {
      const { data } = await client.mutate({
        mutation: LOGOUT,
        variables: { sessionId: auth.sessionId },
        fetchPolicy: "no-cache",
      });

      // Limpieza local aunque el backend diga false (por seguridad)
      await clearAuth();
      // (Opcional) limpiar cache apollo:
      // await client.clearStore();

      return !!data?.logout;
    } catch (e) {
      // Aún así: por seguridad, borra local
      console.warn("Logout failed, clearing local auth anyway:", e);
      await clearAuth();
      return false;
    }
  }, [auth.sessionId, clearAuth, client]);

  const value = useMemo<AuthContextType>(
    () => ({
      auth,
      isAuthenticated,
      isHydrated,
      getAccessToken,
      getRefreshToken,
      setAuth,
      setAuthSync,
      clearAuth,
      clearAuthSync,
      requestOtp,
      verifyOtp,
      logout,
    }),
    [
      auth,
      isAuthenticated,
      isHydrated,
      getAccessToken,
      getRefreshToken,
      setAuth,
      setAuthSync,
      clearAuth,
      clearAuthSync,
      requestOtp,
      verifyOtp,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --------------------
// Hook helper
// --------------------
export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
