import { SavedCard } from "@/graphql/paymentMethods";
import { create } from "zustand";

export type SelectedPaymentMethod =
  | { type: "CARD"; card: SavedCard }
  | { type: "WALLET" };

interface PaymentStore {
  selectedMethod: SelectedPaymentMethod | null;
  setSelectedMethod: (method: SelectedPaymentMethod) => void;
  clearSelectedMethod: () => void;
  // Alias de compatibilidad para leer la tarjeta directamente
  selectedCard: SavedCard | null;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  selectedMethod: null,
  selectedCard: null,
  setSelectedMethod: (method) =>
    set({
      selectedMethod: method,
      selectedCard: method.type === "CARD" ? method.card : null,
    }),
  clearSelectedMethod: () => set({ selectedMethod: null, selectedCard: null }),
}));
