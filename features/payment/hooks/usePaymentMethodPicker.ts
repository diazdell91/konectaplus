import { MY_CARDS, MyCardsData, SavedCard } from "@/graphql/paymentMethods";
import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { usePaymentStore } from "@/store/usePaymentStore";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";

interface UsePaymentMethodPickerOptions {
  hideWallet?: boolean;
}

const usePaymentMethodPicker = ({ hideWallet }: UsePaymentMethodPickerOptions = {}) => {
  const { selectedMethod, setSelectedMethod } = usePaymentStore();

  const { data: walletData, loading: walletLoading } =
    useQuery<MyWalletUSDData>(MY_WALLET_USD, { fetchPolicy: "cache-and-network" });

  const { data: cardsData, loading: cardsLoading } =
    useQuery<MyCardsData>(MY_CARDS, {
      fetchPolicy: "cache-and-network",
      variables: { page: 1, pageSize: 20 },
    });

  const balance = walletData?.myWalletUSD?.balanceCachedCents ?? null;
  const cards = cardsData?.myCards.items ?? [];

  const isWalletSelected = selectedMethod?.type === "WALLET";
  const selectedCardId =
    selectedMethod?.type === "CARD" ? selectedMethod.card.id : null;

  const loading =
    walletLoading && cardsLoading && cards.length === 0 && balance === null;

  const handleSelectWallet = () => {
    setSelectedMethod({ type: "WALLET" });
    router.back();
  };

  const handleSelectCard = (card: SavedCard) => {
    setSelectedMethod({ type: "CARD", card });
    router.back();
  };

  const handleAddCard = () => {
    router.back();
    setTimeout(() => router.push("/services/payment/add-card"), 300);
  };

  return {
    balance,
    cards,
    loading,
    hideWallet,
    isWalletSelected,
    selectedCardId,
    handleSelectWallet,
    handleSelectCard,
    handleAddCard,
  };
};

export default usePaymentMethodPicker;
