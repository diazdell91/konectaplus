import PaymentMethodPicker from "@/components/payment/PaymentMethodPicker";
import SummaryRow from "@/components/payment/SummaryRow";
import { Button, Text } from "@/components/ui";
import { SavedCard } from "@/graphql/paymentMethods";
import {
  WALLET_CREATE_TOPUP_INTENT, // esta debe apuntar a walletCreateTopupIntentUSD
} from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { useMutation } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { PaymentIntent, useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Text as RNText, StyleSheet, View } from "react-native";
import { toast } from "sonner-native";

type WalletTopupIntentResult = {
  paymentAttemptId: string;
  clientSecret: string;
  amountCents: number;
  currency: string;
};

type WalletCreateTopupIntentData = {
  walletCreateTopupIntentUSD: WalletTopupIntentResult;
};

type WalletCreateTopupIntentVars = {
  productId: string;
  note?: string | null;
};

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

  const [selectedCard, setSelectedCard] = useState<SavedCard | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const [attempt, setAttempt] = useState<{
    paymentAttemptId: string;
    clientSecret: string;
  } | null>(null);

  const [createIntent, { loading: creatingIntent }] = useMutation<
    WalletCreateTopupIntentData,
    WalletCreateTopupIntentVars
  >(WALLET_CREATE_TOPUP_INTENT, {
    fetchPolicy: "no-cache",
  });

  const loading = creatingIntent || isConfirming;
  const canConfirm = !!selectedCard && !loading;

  const handleConfirm = async () => {
    console.log("[WalletTopup] handleConfirm — selectedCard:", selectedCard?.id, "| loading:", loading);

    if (!selectedCard) {
      toast.error("Selecciona una tarjeta para continuar.");
      return;
    }
    if (loading) return;

    try {
      setIsConfirming(true);

      // 1) Crear intent en backend
      console.log("[WalletTopup] step 1 — createIntent | productId:", productId);
      const { data } = await createIntent({
        variables: { productId },
      });

      const r = data?.walletCreateTopupIntentUSD;
      console.log("[WalletTopup] step 1 response:", JSON.stringify(r, null, 2));

      if (!r?.clientSecret || !r?.paymentAttemptId) {
        throw new Error("No se recibió clientSecret/paymentAttemptId.");
      }

      setAttempt({
        paymentAttemptId: r.paymentAttemptId,
        clientSecret: r.clientSecret,
      });

      // 2) Confirmar en Stripe con PaymentMethod guardado
      console.log("[WalletTopup] step 2 — confirmPayment | paymentMethodId:", selectedCard.stripePaymentMethodId);
      const res = await confirmPayment(r.clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          paymentMethodId: selectedCard.stripePaymentMethodId,
        },
      });

      console.log("[WalletTopup] step 2 response — error:", res.error, "| status:", res.paymentIntent?.status);

      if (res.error) {
        console.warn("[WalletTopup] Stripe error:", res.error);
        toast.error(res.error.message ?? "No se pudo confirmar el pago.");
        return;
      }

      const status = res.paymentIntent?.status;
      console.log("[WalletTopup] paymentIntent status:", status);

      if (status === PaymentIntent.Status.Succeeded) {
        console.log("[WalletTopup] ✅ Succeeded");
        toast.success("Recarga completada ✅");
        router.replace("/(tabs)/(home)");
        return;
      }

      if (status === PaymentIntent.Status.Processing) {
        console.log("[WalletTopup] ⏳ Processing");
        toast.message("Pago en procesamiento. Puede tardar unos segundos.");
        return;
      }

      if (status === PaymentIntent.Status.RequiresAction) {
        console.log("[WalletTopup] ⚠️ RequiresAction");
        toast.message("Se requiere acción adicional para completar el pago.");
        return;
      }

      console.warn("[WalletTopup] Estado inesperado:", status);
      toast.message(`Estado del pago: ${status ?? "Unknown"}`);
    } catch (e: any) {
      console.error("[WalletTopup] catch error:", e);
      toast.error(e?.message ?? "Ocurrió un error procesando el pago.");
    } finally {
      setIsConfirming(false);
      console.log("[WalletTopup] handleConfirm — finally");
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
            selectedCard={selectedCard}
            onSelect={setSelectedCard}
          />

          {/* UI opcional */}
          {attempt?.paymentAttemptId ? (
            <View style={styles.infoRow}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={COLORS.primary.main}
              />
              <Text body color={COLORS.text.secondary}>
                Intent creado: {attempt.paymentAttemptId}
              </Text>
            </View>
          ) : null}
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
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  footer: { gap: 10, paddingTop: 16 },
});
