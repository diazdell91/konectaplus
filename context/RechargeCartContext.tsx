/**
 * RechargeCartContext — simple in-memory mock cart for the recharge flow.
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

export interface RechargeCartItem {
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

interface RechargeCartContextValue {
  items: RechargeCartItem[];
  addItem: (item: RechargeCartItem) => void;
  removeItem: (listingId: string) => void;
  clearCart: () => void;
  totalCents: number;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const RechargeCartContext = createContext<RechargeCartContextValue | null>(
  null
);

export function RechargeCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<RechargeCartItem[]>([]);

  const addItem = useCallback((item: RechargeCartItem) => {
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
    <RechargeCartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalCents }}
    >
      {children}
    </RechargeCartContext.Provider>
  );
}

export function useRechargeCart(): RechargeCartContextValue {
  const ctx = useContext(RechargeCartContext);
  if (!ctx) {
    throw new Error(
      "useRechargeCart must be used inside <RechargeCartProvider>"
    );
  }
  return ctx;
}
