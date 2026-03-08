/**
 * TopupCartContext — simple in-memory mock cart for the topup flow.
 *
 * Holds the items the user wants to purchase.  In a real app this would be
 * persisted (SQLite / remote) and tied to the backend checkout flow.
 *
 * TODO: persist to expo-sqlite/kv-store or connect to real cart API.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TopupCartItem {
  /** Listing ID from the catalogue */
  listingId: string;
  catalogProductId: string;
  variantKey: string;
  providerCode: string;
  skuCodeProviderProduct: string;
  countryIso: string;
  /** E.164 destination phone */
  phoneE164: string;
  sellPriceUsdCents: number;
  displayName: string;
}

interface TopupCartContextValue {
  items: TopupCartItem[];
  addItem: (item: TopupCartItem) => void;
  removeItem: (listingId: string) => void;
  clearCart: () => void;
  totalCents: number;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const TopupCartContext = createContext<TopupCartContextValue | null>(
  null
);

export function TopupCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<TopupCartItem[]>([]);

  const addItem = useCallback((item: TopupCartItem) => {
    setItems((prev) => {
      // Replace if same listing+phone combination already in cart
      const exists = prev.findIndex(
        (i) => i.listingId === item.listingId && i.phoneE164 === item.phoneE164
      );
      if (exists >= 0) {
        const next = [...prev];
        next[exists] = item;
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((listingId: string) => {
    setItems((prev) => prev.filter((i) => i.listingId !== listingId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCents = items.reduce((acc, i) => acc + i.sellPriceUsdCents, 0);

  return (
    <TopupCartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalCents }}
    >
      {children}
    </TopupCartContext.Provider>
  );
}

export function useTopupCart(): TopupCartContextValue {
  const ctx = useContext(TopupCartContext);
  if (!ctx) {
    throw new Error(
      "useTopupCart must be used inside <TopupCartProvider>"
    );
  }
  return ctx;
}
