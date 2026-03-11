import { WALLET_TOPUP_PRODUCTS, WalletTopupProduct, WalletTopupProductsData } from "@/graphql/walletTopupProducts";
import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import { useState } from "react";

export function useWalletTopup() {
  const [selected, setSelected] = useState<WalletTopupProduct | null>(null);

  const { data: productsData, loading, error } = useQuery<WalletTopupProductsData>(
    WALLET_TOPUP_PRODUCTS,
    { fetchPolicy: "cache-and-network" },
  );

  const { data: walletData } = useQuery<MyWalletUSDData>(MY_WALLET_USD, {
    fetchPolicy: "cache-and-network",
  });

  const products = (productsData?.walletTopupProducts ?? []).filter((p) => p.isActive);
  const balance = walletData?.myWalletUSD?.balanceCachedCents ?? null;

  const handleContinue = () => {
    if (!selected) return;
    router.push({
      pathname: "/services/wallet/topup-confirm",
      params: {
        productId: selected.productId,
        amountCents: String(selected.amountCents),
        priceCents: String(selected.priceCents),
        feeCents: String(selected.feeCents),
      },
    });
  };

  return {
    selected,
    setSelected,
    products,
    balance,
    loading,
    error,
    handleContinue,
  };
}
