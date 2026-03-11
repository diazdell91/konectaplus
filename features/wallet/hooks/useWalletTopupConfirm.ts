import {
  WALLET_TOPUP_WITH_SAVED_CARD,
  WalletTopupWithSavedCardData,
  WalletTopupWithSavedCardVars,
} from "@/graphql/walletTopupProducts";
import {
  SelectedPaymentMethod,
  usePaymentStore,
} from "@/store/usePaymentStore";
import { showToast } from "@/utils/toast";
import { useMutation } from "@apollo/client/react";
import { PaymentIntent, useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export function useWalletTopupConfirm() {
  const { productId, amountCents, priceCents, feeCents } =
    useLocalSearchParams<{
      productId: string;
      amountCents: string;
      priceCents: string;
      feeCents: string;
    }>();

  const { confirmPayment } = useStripe();

  const amount = useMemo(() => Number(amountCents), [amountCents]);
  const price = useMemo(() => Number(priceCents), [priceCents]);
  const fee = useMemo(() => Number(feeCents), [feeCents]);

  const [selectedMethod, setSelectedMethod] = useState<SelectedPaymentMethod | null>(null);
  const clearStoredMethod = usePaymentStore((s) => s.clearSelectedMethod);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    clearStoredMethod();
  }, []);

  const [walletTopup, { loading: mutationLoading }] = useMutation<
    WalletTopupWithSavedCardData,
    WalletTopupWithSavedCardVars
  >(WALLET_TOPUP_WITH_SAVED_CARD, { fetchPolicy: "no-cache" });

  const loading = mutationLoading || isConfirming;
  const selectedCard = selectedMethod?.type === "CARD" ? selectedMethod.card : null;
  const canConfirm = !!selectedCard && !loading;

  const handleConfirm = async () => {
    if (!selectedCard) {
      showToast.error("Selecciona una tarjeta para continuar.");
      return;
    }
    if (loading) return;

    try {
      setIsConfirming(true);

      const { data, error } = await walletTopup({
        variables: { productId: productId!, cardId: selectedCard.id },
      });

      if (error) {
        console.error("[WalletTopup] graphql error:", JSON.stringify(error, null, 2));
      }

      const r = data?.walletTopupWithSavedCardUSD;
      if (!r) throw new Error("Sin respuesta del servidor.");

      // Caso 1: off-session exitoso sin acción adicional
      if (r.succeeded && !r.requiresAction) {
        showToast.success("Recarga completada");
        router.replace("/(tabs)/(home)");
        return;
      }

      // Caso 2: 3DS requerido
      if (r.requiresAction) {
        if (!r.clientSecret) throw new Error("Se requiere acción pero falta clientSecret.");

        const { error: stripeError, paymentIntent } = await confirmPayment(r.clientSecret, {
          paymentMethodType: "Card",
          paymentMethodData: { paymentMethodId: selectedCard.stripePaymentMethodId },
        });

        if (stripeError) {
          showToast.error(stripeError.message ?? "No se pudo confirmar el pago.");
          return;
        }

        const status = paymentIntent?.status;

        if (status === PaymentIntent.Status.Succeeded) {
          showToast.success("Recarga completada");
          router.replace("/(tabs)/(home)");
          return;
        }

        if (status === PaymentIntent.Status.Processing) {
          showToast.info("Pago en procesamiento. Puede tardar unos segundos.");
          router.replace("/(tabs)/(home)");
          return;
        }

        if (status === PaymentIntent.Status.RequiresAction) {
          showToast.info("Se requiere acción adicional para completar el pago.");
          return;
        }

        showToast.info(`Estado del pago: ${status ?? "Unknown"}`);
        return;
      }

      // Caso 3: estado inesperado
      throw new Error("Respuesta inesperada del servidor.");
    } catch (e: any) {
      showToast.error(e?.message ?? "Ocurrió un error procesando el pago.");
    } finally {
      setIsConfirming(false);
    }
  };

  return {
    amount,
    price,
    fee,
    selectedMethod,
    setSelectedMethod,
    loading,
    canConfirm,
    handleConfirm,
  };
}
