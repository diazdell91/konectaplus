import { MY_CARDS, MyCardsData } from "@/graphql/paymentMethods";
import { useQuery } from "@apollo/client/react";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function usePaymentMethods() {
  const { data, loading, error, refetch } = useQuery<MyCardsData>(MY_CARDS, {
    fetchPolicy: "cache-and-network",
    variables: { page: 1, pageSize: 20 },
  });

  // Refresca la lista cada vez que se vuelve a esta pantalla (ej: tras añadir tarjeta)
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const cards = data?.myCards.items ?? [];

  return { cards, loading, error };
}
