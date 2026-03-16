import { create } from "zustand";

export interface TopupCartItem {
  listingId: string;
  catalogProductId: string;
  variantKey: string;
  providerCode: string;
  skuCodeProviderProduct: string;
  countryIso: string;
  phoneE164: string;
  sellPriceUsdCents: number;
  displayName: string;
}

type TopupCartStore = {
  items: TopupCartItem[];
  addItem: (item: TopupCartItem) => void;
  removeItem: (listingId: string) => void;
  clearCart: () => void;
  totalCents: number;
};

export const useTopupCartStore = create<TopupCartStore>()((set) => ({
  items: [],
  totalCents: 0,

  addItem: (item) => {
    set((state) => {
      const exists = state.items.findIndex(
        (i) => i.listingId === item.listingId && i.phoneE164 === item.phoneE164
      );

      const items =
        exists >= 0
          ? state.items.map((it, idx) => (idx === exists ? item : it))
          : [...state.items, item];

      return {
        items,
        totalCents: items.reduce((acc, i) => acc + i.sellPriceUsdCents, 0),
      };
    });
  },

  removeItem: (listingId) => {
    set((state) => {
      const items = state.items.filter((i) => i.listingId !== listingId);
      return {
        items,
        totalCents: items.reduce((acc, i) => acc + i.sellPriceUsdCents, 0),
      };
    });
  },

  clearCart: () => {
    set({
      items: [],
      totalCents: 0,
    });
  },
}));

