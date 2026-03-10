import CardScanButton, {
  ScannedCard,
} from "@/features/payment/components/CardScanButton";
import CardTypeIndicator, {
  CardNetwork,
} from "@/features/payment/components/CardTypeIndicator";
import { Input, Text } from "@/components/ui";
import { BORDER_RADIUS, COLORS, COMPONENT_SIZES, FONT_FAMILIES, SPACING } from "@/theme";
import { CardField } from "@stripe/stripe-react-native";
import React from "react";
import { StyleSheet, Text as RNText, View } from "react-native";

type FieldName = "CardNumber" | "Cvc" | "ExpiryDate" | "PostalCode";

const FIELD_LABELS: Record<FieldName, string> = {
  CardNumber: "Número de tarjeta",
  ExpiryDate: "Fecha de expiración",
  Cvc: "Código de seguridad",
  PostalCode: "Código postal",
};

interface CardInputSectionProps {
  name: string;
  onNameChange: (name: string) => void;
  onCardChange: (details: any) => void;
  focusedField: FieldName;
  onFieldFocus: (field: FieldName) => void;
  onSubmit: () => void;
  network?: CardNetwork;
  onCardScanned?: (card: ScannedCard) => void;
}

const CardInputSection = ({
  name,
  onNameChange,
  onCardChange,
  focusedField,
  onFieldFocus,
  onSubmit,
  network = "unknown",
  onCardScanned,
}: CardInputSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Información de la tarjeta</Text>

      {/* ── Scan CTA ── */}
      {onCardScanned && (
        <CardScanButton onCardScanned={onCardScanned} />
      )}

      {/* ── Divider ── */}
      {onCardScanned && (
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <RNText style={styles.dividerText}>o ingresa manualmente</RNText>
          <View style={styles.dividerLine} />
        </View>
      )}

      <Input
        iconLeft="account"
        label="Nombre en la tarjeta"
        placeholder="Nombre y apellido"
        value={name}
        onChangeText={onNameChange}
        autoFocus
        size="lg"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <View style={styles.cardFieldContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.cardFieldLabel}>{FIELD_LABELS[focusedField]}</Text>
          <CardTypeIndicator network={network} />
        </View>
        <CardField
          style={styles.cardField}
          onCardChange={onCardChange}
          cardStyle={{
            fontFamily: "Arial-BoldMT",
            fontSize: COMPONENT_SIZES.input.fontSize,
          }}
          onFocus={(field) => onFieldFocus(field as FieldName)}
        />
      </View>
    </View>
  );
};

export default CardInputSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  cardFieldContainer: {
    marginTop: SPACING.xs,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
    marginLeft: 4,
    marginRight: 4,
  },
  cardFieldLabel: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: COLORS.text.primary,
  },
  cardField: {
    width: "100%",
    borderRadius: BORDER_RADIUS.md,
    height: 52,
    borderWidth: COMPONENT_SIZES.input.borderWidth,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.surface.tertiary,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border.light,
  },
  dividerText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
});
