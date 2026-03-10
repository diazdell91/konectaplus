import { MY_CARDS, MyCardsData, SavedCard } from "@/graphql/paymentMethods";
import { SelectedPaymentMethod, usePaymentStore } from "@/store/usePaymentStore";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

const BRAND_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  visa: { label: "VISA", color: "#1A1F71", bg: "#EEF0FB" },
  mastercard: { label: "MC", color: "#EB001B", bg: "#FEF0F0" },
  amex: { label: "AMEX", color: "#007BC1", bg: "#EDF6FD" },
};

function brandConfig(brand: string) {
  return (
    BRAND_CONFIG[brand.toLowerCase()] ?? {
      label: brand.toUpperCase().slice(0, 4),
      color: COLORS.text.secondary,
      bg: COLORS.background.tertiary,
    }
  );
}

interface Props {
  selectedMethod: SelectedPaymentMethod | null;
  onSelect: (method: SelectedPaymentMethod) => void;
  hideWallet?: boolean;
}

const PaymentMethodPicker = ({ selectedMethod, onSelect, hideWallet }: Props) => {
  const storeMethod = usePaymentStore((s) => s.selectedMethod);

  const { data, loading } = useQuery<MyCardsData>(MY_CARDS, {
    fetchPolicy: "cache-and-network",
    variables: { page: 1, pageSize: 20 },
  });

  const cards = data?.myCards.items ?? [];

  // Auto-selecciona la tarjeta principal cuando no hay método seleccionado
  useEffect(() => {
    if (cards.length === 0 || selectedMethod) return;
    const defaultCard = cards.find((c) => c.isDefault) ?? cards[0];
    onSelect({ type: "CARD", card: defaultCard });
  }, [cards]);

  // Sincroniza la selección hecha en el modal de vuelta al padre
  useEffect(() => {
    if (!storeMethod) return;
    const isDifferent =
      storeMethod.type !== selectedMethod?.type ||
      (storeMethod.type === "CARD" &&
        selectedMethod?.type === "CARD" &&
        storeMethod.card.id !== selectedMethod.card.id);
    if (isDifferent) {
      onSelect(storeMethod);
    }
  }, [storeMethod]);

  const renderSelected = () => {
    if (loading && !selectedMethod) {
      return <ActivityIndicator size="small" color={COLORS.primary.main} />;
    }

    if (selectedMethod?.type === "WALLET") {
      return (
        <>
          <View style={[styles.iconWrap, { backgroundColor: COLORS.primary.tint }]}>
            <Ionicons name="wallet-outline" size={18} color={COLORS.primary.main} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardNumber}>Wallet KonectaPlus</Text>
            <Text style={styles.cardExpiry}>Saldo disponible</Text>
          </View>
        </>
      );
    }

    if (selectedMethod?.type === "CARD") {
      const cfg = brandConfig(selectedMethod.card.brand);
      const expiry = `${String(selectedMethod.card.expMonth).padStart(2, "0")}/${String(selectedMethod.card.expYear).slice(-2)}`;
      return (
        <>
          <View style={[styles.brandBadge, { backgroundColor: cfg.bg }]}>
            <Text style={[styles.brandLabel, { color: cfg.color }]}>{cfg.label}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardNumber}>•••• {selectedMethod.card.last4}</Text>
            <Text style={styles.cardExpiry}>Vence {expiry}</Text>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="card-outline" size={20} color={COLORS.text.secondary} />
        </View>
        <Text style={styles.emptyLabel}>Seleccionar método de pago</Text>
      </>
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
      onPress={() =>
        router.push({
          pathname: "/(modals)/payment-method-picker",
          params: hideWallet ? { hideWallet: "1" } : {},
        })
      }
    >
      {renderSelected()}
      <Ionicons name="chevron-forward" size={18} color={COLORS.primary.main} />
    </Pressable>
  );
};

export default PaymentMethodPicker;

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  triggerPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  brandBadge: {
    width: 48,
    height: 30,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLabel: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontStyle: "italic",
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  cardNumber: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    letterSpacing: 0.3,
  },
  cardExpiry: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  emptyIconWrap: {
    width: 48,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabel: {
    flex: 1,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});
