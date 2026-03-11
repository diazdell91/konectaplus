import {
  CREATE_SETUP_INTENT,
  CreateSetupIntentData,
  SAVE_CARD,
  SaveCardData,
  SaveCardVars,
} from "@/graphql/paymentMethods";
import { showToast } from "@/utils/toast";
import { useMutation } from "@apollo/client/react";
import { CardFieldInput, useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { useMemo, useState } from "react";

type CardNetwork = "visa" | "mastercard" | "amex" | "unknown";

function detectNetwork(brand: string | undefined): CardNetwork {
  switch (brand?.toLowerCase()) {
    case "visa":           return "visa";
    case "mastercard":     return "mastercard";
    case "amex":
    case "american_express": return "amex";
    default:               return "unknown";
  }
}

export function useAddCard() {
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

  const network = useMemo(() => detectNetwork(cardDetails?.brand), [cardDetails?.brand]);

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
      const intentResult = await createSetupIntent();
      const clientSecret = intentResult.data?.createSetupIntent.clientSecret;
      if (!clientSecret) throw new Error("No se recibió el clientSecret");

      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: { billingDetails: { name: name.trim() } },
      });

      if (error) throw new Error(error.message);
      if (!setupIntent?.paymentMethodId) throw new Error("Sin paymentMethodId de Stripe");

      await saveCard({ variables: { stripePaymentMethodId: setupIntent.paymentMethodId } });

      showToast.success("Tarjeta guardada correctamente");
      router.back();
    } catch (err: any) {
      showToast.error(err?.message ?? "Error al guardar la tarjeta");
    } finally {
      setSaving(false);
    }
  };

  return {
    name,
    setName,
    cardDetails,
    setCardDetails,
    focusedField,
    setFocusedField,
    saving,
    isComplete,
    network,
    expiry,
    handleCardScanned,
    handleSave,
  };
}
