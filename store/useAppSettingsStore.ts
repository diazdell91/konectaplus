import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AppSettings = {
  isOnboarded: boolean;
  improvePrompt: boolean;
  hasSeenPaywall: boolean;
  hasRequestedReview: boolean;
  onboardingAnswers: Record<string, string | string[]>;
  onboardingAnswersVersion: number;
};

export const DEFAULT_SETTINGS: AppSettings = {
  isOnboarded: false,
  improvePrompt: true,
  hasSeenPaywall: false,
  hasRequestedReview: false,
  onboardingAnswers: {},
  onboardingAnswersVersion: 1,
};

type AppSettingsStore = AppSettings & {
  isHydrated: boolean;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  updateSettingsSync: (updates: Partial<AppSettings>) => void;
  resetSettings: () => Promise<void>;
  setIsOnboarded: (value: boolean) => Promise<void>;
  setIsOnboardedSync: (value: boolean) => void;
  setIsOnboardedWithDelay: (value: boolean, delay?: number) => void;
  _setHydrated: () => void;
};

const kvStorage = createJSONStorage<AppSettingsStore>(() => ({
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
      console.error("[useAppSettingsStore] setItem failed:", e);
    }
  },
  removeItem: (key) => {
    try {
      Storage.removeItemSync(key);
    } catch (e) {
      console.error("[useAppSettingsStore] removeItem failed:", e);
    }
  },
}));

export const useAppSettingsStore = create<AppSettingsStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,
      isHydrated: false,

      updateSettings: async (updates) => {
        set((state) => ({ ...state, ...updates }));
      },

      updateSettingsSync: (updates) => {
        set((state) => ({ ...state, ...updates }));
      },

      resetSettings: async () => {
        set(() => ({ ...DEFAULT_SETTINGS }));
      },

      setIsOnboarded: async (value) => {
        get().updateSettingsSync({ isOnboarded: value });
      },

      setIsOnboardedSync: (value) => {
        get().updateSettingsSync({ isOnboarded: value });
      },

      setIsOnboardedWithDelay: (value, delay = 2000) => {
        setTimeout(() => {
          get().setIsOnboardedSync(value);
        }, delay);
      },

      _setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "@app_settings",
      storage: kvStorage,
      partialize: (state) => ({
        isOnboarded: state.isOnboarded,
        improvePrompt: state.improvePrompt,
        hasSeenPaywall: state.hasSeenPaywall,
        hasRequestedReview: state.hasRequestedReview,
        onboardingAnswers: state.onboardingAnswers,
        onboardingAnswersVersion: state.onboardingAnswersVersion,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated();
      },
    }
  )
);

export const selectIsOnboarded = (s: AppSettingsStore) => s.isOnboarded;
