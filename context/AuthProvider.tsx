import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { useAuthStore } from "@/store/useAuthStore";
import { collectDeviceInfo, type DeviceInput } from "@/features/auth/hooks/useDeviceInfo";
import React, { createContext, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────
// GraphQL documents
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type { AuthUser } from "@/store/useAuthStore";

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

type RequestOtpResult = {
  success: boolean;
  message: string;
  retryAfterSeconds: number;
};

type VerifyOtpResult = {
  accessToken: string;
  refreshToken: string;
  user: import("@/store/useAuthStore").AuthUser;
  session: AuthSession;
};

type AuthContextType = {
  requestOtp: (args: {
    phone: string;
    purpose: "LOGIN" | "REGISTER" | string;
  }) => Promise<RequestOtpResult>;
  verifyOtp: (args: {
    phone: string;
    code: string;
    device?: DeviceInput;
  }) => Promise<VerifyOtpResult>;
  logout: () => Promise<boolean>;
};

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType>({
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

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();

  const requestOtp = useCallback(
    async (args: { phone: string; purpose: "LOGIN" | "REGISTER" | string }) => {
      const { data } = await client.mutate<{ requestOtp: RequestOtpResult }>({
        mutation: REQUEST_OTP,
        variables: { phone: args.phone, purpose: args.purpose },
        fetchPolicy: "no-cache",
      });
      return data!.requestOtp;
    },
    [client],
  );

  const verifyOtp = useCallback(
    async (args: {
      phone: string;
      code: string;
      device?: DeviceInput;
    }) => {
      const device = args.device ?? (await collectDeviceInfo());

      const { data } = await client.mutate<{ verifyOtp: VerifyOtpResult }>({
        mutation: VERIFY_OTP,
        variables: { phone: args.phone, code: args.code, device },
        fetchPolicy: "no-cache",
      });

      const payload = data!.verifyOtp;

      useAuthStore.getState().setAuth({
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        user: payload.user,
        sessionId: payload.session?.id ?? null,
      });

      return payload;
    },
    [client],
  );

  const logout = useCallback(async () => {
    const sessionId = useAuthStore.getState().sessionId;

    if (!sessionId) {
      useAuthStore.getState().clearAuth();
      return true;
    }

    try {
      const { data } = await client.mutate<{ logout: boolean }>({
        mutation: LOGOUT,
        variables: { sessionId },
        fetchPolicy: "no-cache",
      });
      useAuthStore.getState().clearAuth();
      return !!data?.logout;
    } catch (e) {
      console.warn("[AuthProvider] Logout failed, clearing local auth:", e);
      useAuthStore.getState().clearAuth();
      return false;
    }
  }, [client]);

  const value = useMemo(
    () => ({ requestOtp, verifyOtp, logout }),
    [requestOtp, verifyOtp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─────────────────────────────────────────────
// Hook — compone store + mutations
// ─────────────────────────────────────────────

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");

  const store = useAuthStore();

  return {
    // Estado del store (reactivo)
    auth: {
      accessToken: store.accessToken,
      refreshToken: store.refreshToken,
      user: store.user,
      sessionId: store.sessionId,
    },
    isAuthenticated: store.isAuthenticated(),
    isHydrated: store.isHydrated,
    // Getters estables
    getAccessToken: store.getAccessToken,
    getRefreshToken: store.getRefreshToken,
    // Mutations del context
    requestOtp: ctx.requestOtp,
    verifyOtp: ctx.verifyOtp,
    logout: ctx.logout,
  };
}
