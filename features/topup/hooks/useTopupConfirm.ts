import {
  CREATE_TOPUP_ORDER,
  CreateTopupOrderData,
  CreateTopupOrderVars,
} from "@/graphql/topupOrder";
import { SelectedPaymentMethod } from "@/store/usePaymentStore";
import { showToast } from "@/utils/toast";
import { useMutation } from "@apollo/client/react";
import { PaymentIntent, useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export function useTopupConfirm() {
  const {
    displayName,
    sellPriceUsdCents,
    providerName,
    providerCode,
    listingId,
    phoneE164,
    phoneNational,
    countryIso,
  } = useLocalSearchParams<{
    displayName: string;
    sellPriceUsdCents: string;
    providerName: string;
    providerCode: string;
    listingId: string;
    phoneE164: string;
    phoneNational: string;
    countryIso: string;
  }>();

  const price = Number(sellPriceUsdCents);
  const { confirmPayment } = useStripe();

  const [selectedMethod, setSelectedMethod] = useState<SelectedPaymentMethod | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [createTopupOrder] = useMutation<CreateTopupOrderData, CreateTopupOrderVars>(
    CREATE_TOPUP_ORDER,
  );

  const canConfirm = !!selectedMethod && !submitting;

  const handleConfirm = async () => {
    if (!selectedMethod || submitting) return;

    const isWallet = selectedMethod.type === "WALLET";
    const cardId = selectedMethod.type === "CARD" ? selectedMethod.card.id : undefined;
    const stripePaymentMethodId =
      selectedMethod.type === "CARD" ? selectedMethod.card.stripePaymentMethodId : undefined;

    const input = {
      productListingId: listingId!,
      accountNumber: phoneNational!,
      paymentMethod: isWallet ? ("WALLET" as const) : ("CARD" as const),
      ...(cardId ? { cardId } : {}),
    };

    setSubmitting(true);
    try {
      const { data } = await createTopupOrder({ variables: { input } });
      const result = data?.createTopupOrder;

      if (!result) throw new Error("Sin respuesta del servidor");

      // Caso 1: off-session OK o wallet
      if (!result.requiresAction) {
        showToast.success("Recarga enviada correctamente");
        router.back();
        return;
      }

      // Caso 2: 3DS requerido
      if (!result.clientSecret || !stripePaymentMethodId) {
        throw new Error("Se requiere acción pero faltan datos de Stripe");
      }

      const { error, paymentIntent } = await confirmPayment(result.clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: { paymentMethodId: stripePaymentMethodId },
      });

      if (error) throw new Error(error.message);

      const status = paymentIntent?.status;

      if (status === PaymentIntent.Status.Succeeded) {
        showToast.success("Recarga procesada correctamente");
        router.back();
        return;
      }

      if (status === PaymentIntent.Status.Processing) {
        showToast.info("Pago en procesamiento. Puede tardar unos segundos.");
        router.back();
        return;
      }

      if (status === PaymentIntent.Status.RequiresAction) {
        showToast.info("Se requiere acción adicional para completar el pago.");
        return;
      }

      showToast.info(`Estado del pago: ${status ?? "Unknown"}`);
    } catch (err: any) {
      showToast.error(err?.message ?? "Error al procesar la recarga");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    displayName,
    providerName,
    providerCode,
    phoneE164,
    price,
    selectedMethod,
    setSelectedMethod,
    submitting,
    canConfirm,
    handleConfirm,
  };
}
