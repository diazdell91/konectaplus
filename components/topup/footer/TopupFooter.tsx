import { TopupProduct } from "@/graphql/adminTopupProducts";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TopupFooterProps {
  selectedListing: TopupProduct | null;
  canProceed: boolean;
  onAddToCart: () => void;
  onPayNow: () => void;
}

const TopupFooter = ({
  selectedListing,
  canProceed,
  onAddToCart,
  onPayNow,
}: TopupFooterProps) => (
  <View style={styles.footer}>
    {/* Selection summary */}
    {selectedListing && (
      <View style={styles.summary}>
        <Text style={styles.summaryName} numberOfLines={1}>
          {selectedListing.displayName}
        </Text>
        <Text style={styles.summaryPrice}>
          {formatUsd(selectedListing.sellPriceUsdCents)}
        </Text>
      </View>
    )}

    {/* Validation hint */}
    {!canProceed && (
      <Text style={styles.hint}>
        {!selectedListing ? "Selecciona una oferta" : ""}
      </Text>
    )}

    <View style={styles.buttons}>
      <Pressable
        style={[
          styles.btn,
          styles.btnOutline,
          !canProceed && styles.btnDisabled,
        ]}
        onPress={onAddToCart}
        disabled={!canProceed}
        accessibilityLabel="Agregar al carrito"
      >
        <Ionicons
          name="cart-outline"
          size={18}
          color={canProceed ? COLORS.primary.main : COLORS.neutral.gray400}
        />
        <Text
          style={[
            styles.btnText,
            styles.btnTextOutline,
            !canProceed && styles.btnTextDisabled,
          ]}
        >
          Al carrito
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.btn,
          styles.btnPrimary,
          !canProceed && styles.btnDisabled,
        ]}
        onPress={onPayNow}
        disabled={!canProceed}
        accessibilityLabel="Pagar ahora"
      >
        <Ionicons
          name="flash"
          size={18}
          color={canProceed ? COLORS.neutral.white : COLORS.neutral.gray400}
        />
        <Text
          style={[
            styles.btnText,
            styles.btnTextPrimary,
            !canProceed && styles.btnTextDisabled,
          ]}
        >
          Pagar ahora
        </Text>
      </Pressable>
    </View>
  </View>
);

export default TopupFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.surface.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    gap: 8,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EAF7F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary.main,
    marginBottom: 4,
  },
  summaryName: {
    flex: 1,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.primary.main,
    marginRight: 8,
  },
  summaryPrice: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary.main,
  },
  hint: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    marginBottom: 2,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary.main,
  },
  btnOutline: {
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1.5,
    borderColor: COLORS.primary.main,
  },
  btnDisabled: {
    opacity: 0.45,
  },
  btnText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
  },
  btnTextPrimary: {
    color: COLORS.neutral.white,
  },
  btnTextOutline: {
    color: COLORS.primary.main,
  },
  btnTextDisabled: {
    color: COLORS.neutral.gray400,
  },
});
