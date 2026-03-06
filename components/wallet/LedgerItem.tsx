import { LedgerItem as LedgerItemType } from "@/graphql/myLedger";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TYPE_LABELS: Record<string, string> = {
  TOPUP: "Recarga de saldo",
  RECHARGE: "Recarga celular",
  REFUND: "Reembolso",
  FEE: "Cargo",
  ADJUSTMENT: "Ajuste",
};

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: COLORS.semantic.success,
  PENDING: COLORS.semantic.warning,
  FAILED: COLORS.semantic.error,
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completado",
  PENDING: "Pendiente",
  FAILED: "Fallido",
};

interface Props {
  item: LedgerItemType;
}

const LedgerItem = ({ item }: Props) => {
  const isCredit = item.direction === "CREDIT";
  const amountSign = isCredit ? "+" : "-";
  const amountColor = isCredit ? COLORS.semantic.success : COLORS.semantic.error;

  const date = new Date(item.createdAt).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={styles.row}>
      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: isCredit ? "#EAF7F5" : "#FEF0F0" }]}>
        <Ionicons
          name={isCredit ? "arrow-down-outline" : "arrow-up-outline"}
          size={18}
          color={isCredit ? COLORS.primary.main : COLORS.semantic.error}
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.type} numberOfLines={1}>
          {TYPE_LABELS[item.type] ?? item.type}
        </Text>
        {item.note ? (
          <Text style={styles.note} numberOfLines={1}>{item.note}</Text>
        ) : (
          <Text style={styles.note}>{date}</Text>
        )}
      </View>

      {/* Amount + status */}
      <View style={styles.right}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountSign}{formatUsd(item.amountCents)}
        </Text>
        <Text style={[styles.status, { color: STATUS_COLORS[item.status] ?? COLORS.text.secondary }]}>
          {STATUS_LABELS[item.status] ?? item.status}
        </Text>
      </View>
    </View>
  );
};

export default LedgerItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  type: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  note: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  right: {
    alignItems: "flex-end",
    gap: 2,
  },
  amount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 15,
    fontWeight: "700",
  },
  status: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
  },
});
