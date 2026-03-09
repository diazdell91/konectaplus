import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type AuthUser = {
  id: string;
  phone: string;
  email: string | null;
  emailVerified: boolean;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  sessionId: string | null;
};

type AuthStore = AuthState & {
  isHydrated: boolean;

  // Setters
  setAuth: (next: Partial<AuthState>) => void;
  clearAuth: () => void;

  // Stable getters — always read current state, safe for Apollo links
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;

  // Derived
  isAuthenticated: () => boolean;

  // Internal — called by persist onRehydrateStorage
  _setHydrated: () => void;
};

// ─────────────────────────────────────────────
// Custom storage adapter for expo-sqlite/kv-store
// ─────────────────────────────────────────────

const kvStorage = createJSONStorage<AuthStore>(() => ({
  getItem: (key) => {
    try {
      return Storage.getItemSync(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      Storage.setItemSync(key, value);
    } catch (e) {
      console.error("[useAuthStore] setItem failed:", e);
    }
  },
  removeItem: (key) => {
    try {
      Storage.removeItemSync(key);
    } catch (e) {
      console.error("[useAuthStore] removeItem failed:", e);
    }
  },
}));

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      sessionId: null,
      isHydrated: false,

      setAuth: (next) => set((state) => ({ ...state, ...next })),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          sessionId: null,
        }),

      getAccessToken: () => get().accessToken,
      getRefreshToken: () => get().refreshToken,

      isAuthenticated: () => {
        const { accessToken, refreshToken, user } = get();
        return !!accessToken && !!refreshToken && !!user;
      },

      _setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "@auth_state",
      storage: kvStorage,
      // Solo persistimos los campos de sesión, no los derivados
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        sessionId: state.sessionId,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated();
      },
    },
  ),
);

// ─────────────────────────────────────────────
// Convenience selectors (stable references)
// ─────────────────────────────────────────────

export const selectIsAuthenticated = (s: AuthStore) => s.isAuthenticated();
export const selectIsHydrated = (s: AuthStore) => s.isHydrated;
export const selectUser = (s: AuthStore) => s.user;
export const selectSessionId = (s: AuthStore) => s.sessionId;
