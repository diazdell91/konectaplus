import CardInputSection from "@/components/payment/CardInputSection";
import CardPreview from "@/components/payment/CardPreview";
import SecureBadgeRow from "@/components/payment/SecureBadgeRow";
import { Button } from "@/components/ui";
import {
  CREATE_SETUP_INTENT,
  CreateSetupIntentData,
  SAVE_CARD,
  SaveCardData,
  SaveCardVars,
} from "@/graphql/paymentMethods";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { useMutation } from "@apollo/client/react";
import {
  CardFieldInput,
  useStripe,
} from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { toast } from "sonner-native";

type CardNetwork = "visa" | "mastercard" | "amex" | "unknown";

function detectNetwork(brand: string | undefined): CardNetwork {
  switch (brand?.toLowerCase()) {
    case "visa":
      return "visa";
    case "mastercard":
      return "mastercard";
    case "amex":
    case "american_express":
      return "amex";
    default:
      return "unknown";
  }
}

export default function AddCardScreen() {
  const { confirmSetupIntent } = useStripe();

  const [name, setName] = useState("");
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [focusedField, setFocusedField] = useState<
    "CardNumber" | "Cvc" | "ExpiryDate" | "PostalCode"
  >("CardNumber");
  const [saving, setSaving] = useState(false);

  const [createSetupIntent] = useMutation<CreateSetupIntentData>(CREATE_SETUP_INTENT);
  const [saveCard] = useMutation<SaveCardData, SaveCardVars>(SAVE_CARD);

  const isComplete = !!cardDetails?.complete && name.trim().length > 0;

  const network = useMemo(
    () => detectNetwork(cardDetails?.brand),
    [cardDetails?.brand],
  );

  const expiry =
    cardDetails?.expiryMonth && cardDetails?.expiryYear
      ? `${String(cardDetails.expiryMonth).padStart(2, "0")}/${String(cardDetails.expiryYear).slice(-2)}`
      : "";

  const handleCardScanned = (card: { number: string; name?: string }) => {
    if (card.name) setName(card.name);
  };

  const handleSave = async () => {
    if (!isComplete || saving) return;
    setSaving(true);

    try {
      // Step 1 — Obtener clientSecret del backend
      const intentResult = await createSetupIntent();
      const clientSecret = intentResult.data?.createSetupIntent.clientSecret;
      if (!clientSecret) throw new Error("No se recibió el clientSecret");

      // Step 2 — Confirmar con Stripe SDK
      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            name: name.trim(),
          },
        },
      });

      if (error) throw new Error(error.message);
      if (!setupIntent?.paymentMethodId) throw new Error("Sin paymentMethodId de Stripe");

      // Step 3 — Guardar la tarjeta en el backend
      await saveCard({
        variables: { stripePaymentMethodId: setupIntent.paymentMethodId },
      });

      toast.success("Tarjeta guardada correctamente");
      router.back();
    } catch (err: any) {
      toast.error(err?.message ?? "Error al guardar la tarjeta");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CardPreview
          name={name}
          last4={cardDetails?.last4 ?? ""}
          expiry={expiry}
          showBack={focusedField === "Cvc"}
          network={network}
        />

        <CardInputSection
          name={name}
          onNameChange={setName}
          onCardChange={setCardDetails}
          focusedField={focusedField}
          onFieldFocus={setFocusedField}
          onSubmit={handleSave}
          network={network}
          onCardScanned={handleCardScanned}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          variant="primary"
          title={saving ? "Guardando..." : "Guardar tarjeta"}
          onPress={handleSave}
          disabled={!isComplete || saving}
        />
        <SecureBadgeRow />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  content: {
    padding: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
  },
  footer: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    backgroundColor: COLORS.surface.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
});
