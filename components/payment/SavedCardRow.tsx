import {
  DELETE_CARD,
  DeleteCardVars,
  MY_CARDS,
  SavedCard,
} from "@/graphql/paymentMethods";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { useMutation } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

interface Props {
  card: SavedCard;
}

const BRAND_ICONS: Record<string, { label: string; color: string; bg: string }> = {
  visa: { label: "VISA", color: "#1A1F71", bg: "#EEF0FB" },
  mastercard: { label: "MC", color: "#EB001B", bg: "#FEF0F0" },
  amex: { label: "AMEX", color: "#007BC1", bg: "#EDF6FD" },
};

const SavedCardRow = ({ card }: Props) => {
  const [deleting, setDeleting] = useState(false);

  const [deleteCard] = useMutation<unknown, DeleteCardVars>(DELETE_CARD, {
    refetchQueries: [{ query: MY_CARDS, variables: { page: 1, pageSize: 20 } }],
    awaitRefetchQueries: true,
  });

  const handleDelete = () => {
    Alert.alert(
      "Eliminar tarjeta",
      `¿Deseas eliminar la tarjeta •••• ${card.last4}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteCard({ variables: { cardId: card.id } });
              toast.success("Tarjeta eliminada");
            } catch (err: any) {
              toast.error(err?.message ?? "Error al eliminar la tarjeta");
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  const brand = BRAND_ICONS[card.brand.toLowerCase()] ?? {
    label: card.brand.toUpperCase().slice(0, 4),
    color: COLORS.text.secondary,
    bg: COLORS.background.tertiary,
  };

  const expiry = `${String(card.expMonth).padStart(2, "0")}/${String(card.expYear).slice(-2)}`;

  return (
    <View style={styles.row}>
      {/* Brand badge */}
      <View style={[styles.brandBadge, { backgroundColor: brand.bg }]}>
        <Text style={[styles.brandLabel, { color: brand.color }]}>
          {brand.label}
        </Text>
      </View>

      {/* Card info */}
      <View style={styles.info}>
        <View style={styles.numberRow}>
          <Text style={styles.dots}>•••• •••• ••••</Text>
          <Text style={styles.last4}> {card.last4}</Text>
        </View>
        <Text style={styles.expiry}>Vence {expiry}</Text>
      </View>

      {/* Default badge */}
      {card.isDefault && (
        <View style={styles.defaultBadge}>
          <Ionicons name="checkmark-circle" size={13} color={COLORS.primary.main} />
          <Text style={styles.defaultText}>Principal</Text>
        </View>
      )}

      {/* Delete button */}
      <Pressable
        style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
        onPress={handleDelete}
        disabled={deleting}
        hitSlop={8}
      >
        {deleting ? (
          <ActivityIndicator size="small" color={COLORS.semantic.error} />
        ) : (
          <Ionicons name="trash-outline" size={18} color={COLORS.semantic.error} />
        )}
      </Pressable>
    </View>
  );
};

export default SavedCardRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  brandBadge: {
    width: 52,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLabel: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontStyle: "italic",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dots: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    letterSpacing: 1,
  },
  last4: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
    letterSpacing: 1,
  },
  expiry: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#EAF7F5",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  defaultText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#FEF0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnPressed: {
    opacity: 0.65,
  },
});
