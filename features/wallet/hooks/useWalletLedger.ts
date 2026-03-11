import { MY_LEDGER_USD, MyLedgerUSDData, MyLedgerUSDVars } from "@/graphql/myLedger";
import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { useQuery } from "@apollo/client/react";

export function useWalletLedger() {
  const { data: walletData } = useQuery<MyWalletUSDData>(MY_WALLET_USD, {
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, error, refetch } = useQuery<MyLedgerUSDData, MyLedgerUSDVars>(
    MY_LEDGER_USD,
    { fetchPolicy: "cache-and-network", variables: { page: 1, pageSize: 20 } },
  );

  const items = data?.myLedgerUSD.items ?? [];
  const balance = walletData?.myWalletUSD?.balanceCachedCents ?? null;

  return { items, balance, loading, error, refetch };
}
