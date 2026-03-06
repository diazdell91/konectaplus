import { MY_CARDS, MyCardsData, SavedCard } from "@/graphql/paymentMethods";
import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { usePaymentStore } from "@/store/usePaymentStore";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function PaymentMethodPickerScreen() {
  const { selectedMethod, setSelectedMethod } = usePaymentStore();

  const { data: walletData, loading: walletLoading } =
    useQuery<MyWalletUSDData>(MY_WALLET_USD, { fetchPolicy: "cache-and-network" });

  const { data: cardsData, loading: cardsLoading } =
    useQuery<MyCardsData>(MY_CARDS, {
      fetchPolicy: "cache-and-network",
      variables: { page: 1, pageSize: 20 },
    });

  const balance = walletData?.myWalletUSD?.balanceCachedCents ?? null;
  const cards = cardsData?.myCards.items ?? [];

  const isWalletSelected = selectedMethod?.type === "WALLET";
  const selectedCardId =
    selectedMethod?.type === "CARD" ? selectedMethod.card.id : null;

  const handleSelectWallet = () => {
    setSelectedMethod({ type: "WALLET" });
    router.back();
  };

  const handleSelectCard = (card: SavedCard) => {
    setSelectedMethod({ type: "CARD", card });
    router.back();
  };

  const loading = walletLoading && cardsLoading && cards.length === 0 && balance === null;

  return (
    <View style={styles.root}>
      <View style={styles.handle} />

      <SafeAreaView edges={[]} style={styles.headerWrap}>
        <View style={styles.header}>
          <Text style={styles.title}>Método de pago</Text>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={22} color={COLORS.text.primary} />
          </Pressable>
        </View>
      </SafeAreaView>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary.main} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>

          {/* ── Wallet ── */}
          {balance !== null && (
            <>
              <Text style={styles.sectionLabel}>Saldo digital</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.row,
                  isWalletSelected && styles.rowSelected,
                  pressed && styles.rowPressed,
                ]}
                onPress={handleSelectWallet}
              >
                <View style={[styles.iconWrap, { backgroundColor: "#EAF7F5" }]}>
                  <Ionicons name="wallet-outline" size={20} color={COLORS.primary.main} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>Wallet KonectaPlus</Text>
                  <Text style={styles.rowSub}>Saldo: {formatUsd(balance)}</Text>
                </View>
                {isWalletSelected && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.primary.main} />
                )}
              </Pressable>
            </>
          )}

          {/* ── Tarjetas ── */}
          <Text style={[styles.sectionLabel, balance !== null && styles.sectionLabelTop]}>
            Tarjetas guardadas
          </Text>

          {cards.length === 0 ? (
            <View style={styles.emptyCards}>
              <Ionicons name="card-outline" size={32} color={COLORS.neutral.gray300} />
              <Text style={styles.emptyText}>Sin tarjetas guardadas.</Text>
              <Text style={styles.emptySubtext}>
                Agrega una desde Perfil → Métodos de pago.
              </Text>
            </View>
          ) : (
            cards.map((card) => {
              const cfg = brandConfig(card.brand);
              const exp = `${String(card.expMonth).padStart(2, "0")}/${String(card.expYear).slice(-2)}`;
              const isSelected = selectedCardId === card.id;

              return (
                <Pressable
                  key={card.id}
                  style={({ pressed }) => [
                    styles.row,
                    isSelected && styles.rowSelected,
                    pressed && styles.rowPressed,
                  ]}
                  onPress={() => handleSelectCard(card)}
                >
                  <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                    <Text style={[styles.badgeLabel, { color: cfg.color }]}>
                      {cfg.label}
                    </Text>
                  </View>
                  <View style={styles.rowText}>
                    <Text style={styles.rowTitle}>•••• {card.last4}</Text>
                    <Text style={styles.rowSub}>Vence {exp}</Text>
                  </View>
                  {card.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Principal</Text>
                    </View>
                  )}
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.primary.main} />
                  )}
                </Pressable>
              );
            })
          )}

          {/* ── Agregar tarjeta ── */}
          <Pressable
            style={({ pressed }) => [styles.addRow, pressed && styles.rowPressed]}
            onPress={() => {
              router.back();
              setTimeout(() => router.push("/services/payment/add-card"), 300);
            }}
          >
            <View style={[styles.iconWrap, { backgroundColor: COLORS.background.secondary }]}>
              <Ionicons name="add" size={20} color={COLORS.primary.main} />
            </View>
            <Text style={styles.addText}>Añadir tarjeta</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.primary.main} />
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border.light,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 48,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  sectionLabelTop: {
    marginTop: 8,
  },
  row: {
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
  rowSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: "#EAF7F5",
  },
  rowPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    letterSpacing: 0.3,
  },
  rowSub: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  badge: {
    width: 48,
    height: 30,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontStyle: "italic",
  },
  defaultBadge: {
    backgroundColor: "#EAF7F5",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  defaultText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderStyle: "dashed",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    marginTop: 4,
  },
  addText: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
  emptyCards: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 8,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  emptySubtext: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
