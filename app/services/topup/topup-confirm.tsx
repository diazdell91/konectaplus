import PaymentMethodPicker from "@/components/payment/PaymentMethodPicker";
import SummaryRow from "@/components/payment/SummaryRow";
import { Button, Text } from "@/components/ui";
import {
  CREATE_TOPUP_ORDER,
  CreateTopupOrderData,
  CreateTopupOrderVars,
} from "@/graphql/topupOrder";
import { SelectedPaymentMethod } from "@/store/usePaymentStore";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { useMutation } from "@apollo/client/react";
import { PaymentIntent, useStripe } from "@stripe/stripe-react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text as RNText, View } from "react-native";
import { showToast } from "@/utils/toast";

export default function TopupConfirmScreen() {
  const {
    displayName,
    sellPriceUsdCents,
    providerName,
    providerCode,
    listingId,
    phoneE164,
    countryIso,
  } = useLocalSearchParams<{
    displayName: string;
    sellPriceUsdCents: string;
    providerName: string;
    providerCode: string;
    listingId: string;
    phoneE164: string;
    countryIso: string;
  }>();

  const price = Number(sellPriceUsdCents);

  const { confirmPayment } = useStripe();

  const [selectedMethod, setSelectedMethod] = useState<SelectedPaymentMethod | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [createTopupOrder] = useMutation<
    CreateTopupOrderData,
    CreateTopupOrderVars
  >(CREATE_TOPUP_ORDER);

  const canConfirm = !!selectedMethod && !submitting;

  const handleConfirm = async () => {
    if (!selectedMethod || submitting) return;

    const isWallet = selectedMethod.type === "WALLET";
    const cardId = selectedMethod.type === "CARD" ? selectedMethod.card.id : undefined;
    const stripePaymentMethodId =
      selectedMethod.type === "CARD" ? selectedMethod.card.stripePaymentMethodId : undefined;

    const input = {
      productListingId: listingId!,
      accountNumber: phoneE164!.replace(/^\+/, ""),
      paymentMethod: isWallet ? ("WALLET" as const) : ("CARD" as const),
      ...(cardId ? { cardId } : {}),
    };

    console.log("[TopupConfirm] input:", JSON.stringify({
      ...input,
      _debug: {
        displayName,
        providerCode,
        providerName,
        sellPriceUsdCents: price,
        countryIso,
        selectedMethodType: selectedMethod.type,
        ...(selectedMethod.type === "CARD" ? {
          cardBrand: selectedMethod.card.brand,
          cardLast4: selectedMethod.card.last4,
          stripePaymentMethodId,
        } : {}),
      },
    }, null, 2));

    setSubmitting(true);
    try {
      const { data } = await createTopupOrder({ variables: { input } });
      const result = data?.createTopupOrder;

      console.log("[TopupConfirm] result:", JSON.stringify(result, null, 2));

      if (!result) throw new Error("Sin respuesta del servidor");

      // Caso 1: off-session OK o wallet — recarga procesada
      if (!result.requiresAction) {
        console.log("[TopupConfirm] completado | orderId:", result.orderId);
        showToast.success("Recarga enviada correctamente");
        router.back();
        return;
      }

      // Caso 2: 3DS requerido (solo CARD)
      if (!result.clientSecret || !stripePaymentMethodId) {
        throw new Error("Se requiere acción pero faltan datos de Stripe");
      }

      console.log("[TopupConfirm] 3DS requerido | orderId:", result.orderId);

      const { error, paymentIntent } = await confirmPayment(result.clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: { paymentMethodId: stripePaymentMethodId },
      });

      if (error) {
        console.warn("[TopupConfirm] 3DS error:", error);
        throw new Error(error.message);
      }

      const status = paymentIntent?.status;
      console.log("[TopupConfirm] paymentIntent status:", status);

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

      console.warn("[TopupConfirm] estado inesperado:", status);
      showToast.info(`Estado del pago: ${status ?? "Unknown"}`);
    } catch (err: any) {
      console.error("[TopupConfirm] error:", err);
      showToast.error(err?.message ?? "Error al procesar la recarga");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons name="phone-portrait-outline" size={48} color={COLORS.primary.main} />
          </View>

          <Text h3 style={styles.heading}>Confirmar recarga</Text>
          <Text body color={COLORS.text.secondary} style={styles.sub}>
            Revisa el resumen antes de continuar.
          </Text>

          <View style={styles.summary}>
            <SummaryRow label="Destino" value={phoneE164 ?? ""} />
            <SummaryRow label="Proveedor" value={providerName ?? providerCode ?? ""} />
            <SummaryRow label="Oferta" value={displayName ?? ""} highlight />
            <View style={styles.divider} />
            <SummaryRow label="Total a pagar" value={formatUsd(price)} bold />
          </View>

          <RNText style={styles.sectionLabel}>Método de pago</RNText>
          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
          />
        </View>

        <View style={styles.footer}>
          <Button
            variant="primary"
            title={submitting ? "Procesando..." : `Pagar ${formatUsd(price)}`}
            onPress={handleConfirm}
            disabled={!canConfirm}
          />
          <Button
            variant="ghost"
            title="Cancelar"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  heading: {
    marginBottom: 4,
  },
  sub: {
    marginBottom: 8,
  },
  summary: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginTop: 4,
    marginBottom: 4,
  },
  footer: {
    gap: 10,
    paddingTop: 16,
  },
});
