import PaymentMethodPicker from "@/components/payment/PaymentMethodPicker";
import SummaryRow from "@/components/payment/SummaryRow";
import { Button, Text } from "@/components/ui";
import {
  WALLET_TOPUP_WITH_SAVED_CARD,
  WalletTopupWithSavedCardData,
  WalletTopupWithSavedCardVars,
} from "@/graphql/walletTopupProducts";
import {
  SelectedPaymentMethod,
  usePaymentStore,
} from "@/store/usePaymentStore";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { showToast } from "@/utils/toast";
import { useMutation } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { PaymentIntent, useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Text as RNText, StyleSheet, View } from "react-native";

export default function WalletTopupConfirmScreen() {
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

  const [selectedMethod, setSelectedMethod] =
    useState<SelectedPaymentMethod | null>(null);
  const clearStoredMethod = usePaymentStore((s) => s.clearSelectedMethod);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    clearStoredMethod();
  }, []);

  const [walletTopup, { loading: mutationLoading }] = useMutation<
    WalletTopupWithSavedCardData,
    WalletTopupWithSavedCardVars
  >(WALLET_TOPUP_WITH_SAVED_CARD, {
    fetchPolicy: "no-cache",
  });

  const loading = mutationLoading || isConfirming;
  const selectedCard =
    selectedMethod?.type === "CARD" ? selectedMethod.card : null;
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

      console.log(
        "[WalletTopup] ◀ raw response — data:",
        JSON.stringify(data, null, 2),
      );
      if (error) {
        console.error(
          "[WalletTopup] ◀ graphql error:",
          JSON.stringify(error, null, 2),
        );
      }

      const r = data?.walletTopupWithSavedCardUSD;

      if (!r) throw new Error("Sin respuesta del servidor.");

      console.log("[WalletTopup] resultado:", {
        paymentAttemptId: r.paymentAttemptId,
        succeeded: r.succeeded,
        requiresAction: r.requiresAction,
        hasClientSecret: !!r.clientSecret,
        amountCents: r.amountCents,
        currency: r.currency,
      });

      // Caso 1: off-session exitoso sin acción adicional
      if (r.succeeded && !r.requiresAction) {
        console.log("[WalletTopup] ✅ Caso 1 — off-session succeeded");
        showToast.success("Recarga completada");
        router.replace("/(tabs)/(home)");
        return;
      }

      // Caso 2: 3DS requerido
      if (r.requiresAction) {
        if (!r.clientSecret) {
          throw new Error("Se requiere acción pero falta clientSecret.");
        }

        console.log(
          "[WalletTopup] ⚠️ Caso 2 — 3DS requerido | confirmPayment con paymentMethodId:",
          selectedCard.stripePaymentMethodId,
        );
        const { error, paymentIntent } = await confirmPayment(r.clientSecret, {
          paymentMethodType: "Card",
          paymentMethodData: {
            paymentMethodId: selectedCard.stripePaymentMethodId,
          },
        });

        console.log(
          "[WalletTopup] confirmPayment result — error:",
          JSON.stringify(error),
          "| paymentIntent:",
          JSON.stringify(paymentIntent, null, 2),
        );

        if (error) {
          console.warn(
            "[WalletTopup] ❌ Stripe error:",
            error.code,
            error.message,
          );
          showToast.error(error.message ?? "No se pudo confirmar el pago.");
          return;
        }

        const status = paymentIntent?.status;
        console.log("[WalletTopup] paymentIntent.status:", status);

        if (status === PaymentIntent.Status.Succeeded) {
          console.log("[WalletTopup] ✅ Stripe Succeeded");
          showToast.success("Recarga completada");
          router.replace("/(tabs)/(home)");
          return;
        }

        if (status === PaymentIntent.Status.Processing) {
          console.log("[WalletTopup] ⏳ Stripe Processing");
          showToast.info("Pago en procesamiento. Puede tardar unos segundos.");
          router.replace("/(tabs)/(home)");
          return;
        }

        if (status === PaymentIntent.Status.RequiresAction) {
          console.log("[WalletTopup] 🔐 Stripe RequiresAction");
          showToast.info(
            "Se requiere acción adicional para completar el pago.",
          );
          return;
        }

        console.warn("[WalletTopup] ❓ estado inesperado:", status);
        showToast.info(`Estado del pago: ${status ?? "Unknown"}`);
        return;
      }

      // Caso 3: no succeeded y no requiresAction — estado inesperado
      console.warn("[WalletTopup] ❓ Caso 3 — ni succeeded ni requiresAction");
      throw new Error("Respuesta inesperada del servidor.");
    } catch (e: any) {
      console.error("[WalletTopup] 💥 catch error:", e?.message ?? e);
      showToast.error(e?.message ?? "Ocurrió un error procesando el pago.");
    } finally {
      setIsConfirming(false);
      console.log("[WalletTopup] — finally");
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons
              name="wallet-outline"
              size={48}
              color={COLORS.primary.main}
            />
          </View>

          <Text h3 style={styles.heading}>
            Confirmar recarga
          </Text>
          <Text body color={COLORS.text.secondary} style={styles.sub}>
            Revisa el resumen antes de continuar con el pago.
          </Text>

          <View style={styles.summary}>
            <SummaryRow
              label="Monto a acreditar"
              value={formatUsd(amount)}
              highlight
            />
            {fee > 0 && (
              <SummaryRow label="Cargo por servicio" value={formatUsd(fee)} />
            )}
            <View style={styles.divider} />
            <SummaryRow label="Total a pagar" value={formatUsd(price)} bold />
          </View>

          <RNText style={styles.sectionLabel}>Método de pago</RNText>
          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            hideWallet
          />
        </View>

        <View style={styles.footer}>
          <Button
            variant="primary"
            title={loading ? "Procesando..." : `Pagar ${formatUsd(price)}`}
            onPress={handleConfirm}
            disabled={!canConfirm}
          />
          <Button
            variant="ghost"
            title="Cancelar"
            onPress={() => router.back()}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.surface.primary },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
  },
  content: { flex: 1, gap: 12 },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  heading: { marginBottom: 4 },
  sub: { marginBottom: 8 },
  summary: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  divider: { height: 1, backgroundColor: COLORS.border.light },
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
  footer: { gap: 10, paddingTop: 16 },
});
