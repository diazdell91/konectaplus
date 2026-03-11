import { Order } from "@/graphql/myOrders";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View, Text } from "react-native";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"] }
> = {
  COMPLETED: { label: "Completado", color: COLORS.semantic.success, icon: "check-circle-outline" },
  PENDING: { label: "Pendiente", color: COLORS.semantic.warning, icon: "clock-outline" },
  FAILED: { label: "Fallido", color: COLORS.semantic.error, icon: "close-circle-outline" },
  CANCELLED: { label: "Cancelado", color: COLORS.neutral.gray400, icon: "cancel" },
};

const SERVICE_LABELS: Record<string, string> = {
  RECHARGE: "Recarga",
  TOPUP: "Recarga",
  NAUTA: "Nauta",
  REMITTANCE: "Remesa",
};

interface Props {
  order: Order;
}

export default function OrderListItem({ order }: Props) {
  const status = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    color: COLORS.neutral.gray400,
    icon: "help-circle-outline" as const,
  };
  const serviceLabel = SERVICE_LABELS[order.serviceType] ?? order.serviceType;
  const totalUsd = formatUsd(order.pricing.totalAmountCents);
  const date = new Date(order.createdAt).toLocaleDateString("es-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.container, { opacity: pressed ? 0.7 : 1 }]}
      onPress={() => router.push(`/services/orders/${order.id}`)}
    >
      <View style={[styles.iconBox, { backgroundColor: `${status.color}15` }]}>
        <MaterialCommunityIcons name={status.icon} size={20} color={status.color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.service}>{serviceLabel}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{totalUsd}</Text>
        <View style={[styles.badge, { backgroundColor: `${status.color}18` }]}>
          <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={18} color={COLORS.neutral.gray400} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 3,
  },
  service: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  date: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
  },
  amount: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 10,
  },
});
