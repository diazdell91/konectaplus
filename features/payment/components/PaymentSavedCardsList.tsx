import { SavedCard } from "@/graphql/paymentMethods";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SavedCardRow from "./SavedCardRow";

interface PaymentSavedCardsListProps {
  cards: SavedCard[];
  loading: boolean;
  error: unknown;
}

const PaymentSavedCardsList = ({ cards, loading, error }: PaymentSavedCardsListProps) => {
  if (loading && cards.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={32} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar tarjetas</Text>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.emptyCard}>
        <Ionicons name="card-outline" size={36} color={COLORS.neutral.gray300} />
        <Text style={styles.emptyText}>No tienes tarjetas guardadas aún.</Text>
      </View>
    );
  }

  return (
    <>
      {cards.map((card) => (
        <SavedCardRow key={card.id} card={card} />
      ))}
    </>
  );
};

export default PaymentSavedCardsList;

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    gap: 10,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
    textAlign: "center",
  },
  emptyCard: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingVertical: 36,
    alignItems: "center",
    gap: 10,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});
