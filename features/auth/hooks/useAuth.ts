import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { useAuthStore } from "@/store/useAuthStore";
import { collectDeviceInfo, type DeviceInput } from "@/features/auth/hooks/useDeviceInfo";
import { useCallback, useEffect } from "react";
import { AppState } from "react-native";
import { syncPushDevice } from "@/utils/push/syncPushDevice";

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

const LOGOUT_ALL_DEVICES = gql`
  mutation LogoutAllDevices {
    logoutAllDevices
  }
`;

type RequestOtpResult = {
  success: boolean;
  message: string;
  retryAfterSeconds: number;
};

type VerifyOtpResult = {
  accessToken: string;
  refreshToken: string;
  user: import("@/store/useAuthStore").AuthUser;
  session: {
    id: string;
  };
};

export function useAuth() {
  const client = useApolloClient();
  const store = useAuthStore();

  const requestOtp = useCallback(
    async (args: { phone: string; purpose: "LOGIN" | "REGISTER" | string }) => {
      const { data } = await client.mutate<{ requestOtp: RequestOtpResult }>({
        mutation: REQUEST_OTP,
        variables: { phone: args.phone, purpose: args.purpose },
        fetchPolicy: "no-cache",
      });
      return data!.requestOtp;
    },
    [client]
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

      try {
        await syncPushDevice(client);
      } catch (e) {
        if (__DEV__) {
          console.warn("[useAuth] syncPushDevice after login failed:", e);
        }
      }

      return payload;
    },
    [client]
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
      console.warn("[useAuth] Logout failed, clearing local auth:", e);
      useAuthStore.getState().clearAuth();
      return false;
    }
  }, [client]);

  const logoutAllDevices = useCallback(async () => {
    try {
      const { data } = await client.mutate<{ logoutAllDevices: boolean }>({
        mutation: LOGOUT_ALL_DEVICES,
        fetchPolicy: "no-cache",
      });

      const ok = !!data?.logoutAllDevices;
      if (ok) {
        useAuthStore.getState().clearAuth();
      }
      return ok;
    } catch (e) {
      console.warn("[useAuth] logoutAllDevices failed:", e);
      return false;
    }
  }, [client]);

  return {
    auth: {
      accessToken: store.accessToken,
      refreshToken: store.refreshToken,
      user: store.user,
      sessionId: store.sessionId,
    },
    isAuthenticated: store.isAuthenticated(),
    isHydrated: store.isHydrated,
    getAccessToken: store.getAccessToken,
    getRefreshToken: store.getRefreshToken,
    requestOtp,
    verifyOtp,
    logout,
    logoutAllDevices,
  };
}

export function useAuthPushSyncEffect() {
  const client = useApolloClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated) return;

    const subscription = AppState.addEventListener("change", async (state) => {
      if (state !== "active") return;

      try {
        await syncPushDevice(client);
      } catch (e) {
        if (__DEV__) {
          console.warn("[useAuthPushSyncEffect] syncPushDevice failed:", e);
        }
      }
    });

    return () => subscription.remove();
  }, [client, isAuthenticated]);
}

