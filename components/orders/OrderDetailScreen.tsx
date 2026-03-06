import { ORDER, OrderData, OrderVars } from "@/graphql/myOrders";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { useQuery } from "@apollo/client/react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  }
> = {
  COMPLETED: {
    label: "Completado",
    color: COLORS.semantic.success,
    icon: "check-circle",
  },
  PENDING: {
    label: "Pendiente",
    color: COLORS.semantic.warning,
    icon: "clock",
  },
  FAILED: {
    label: "Fallido",
    color: COLORS.semantic.error,
    icon: "close-circle",
  },
  CANCELLED: {
    label: "Cancelado",
    color: COLORS.neutral.gray400,
    icon: "cancel",
  },
};

const SERVICE_LABELS: Record<string, string> = {
  RECHARGE: "Recarga celular",
  TOPUP: "Recarga celular",
  NAUTA: "Recarga Nauta",
  REMITTANCE: "Remesa",
};

const PAYMENT_LABELS: Record<string, string> = {
  CARD: "Tarjeta de crédito/débito",
  WALLET: "Wallet",
};

function formatDateFull(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

interface Props {
  orderId: string;
}

export default function OrderDetailScreen({ orderId }: Props) {
  const { data, loading, error } = useQuery<OrderData, OrderVars>(ORDER, {
    fetchPolicy: "cache-and-network",
    variables: { orderId },
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error || !data?.order) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar el pedido</Text>
      </View>
    );
  }

  const order = data.order;
  const status = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    color: COLORS.neutral.gray400,
    icon: "help-circle" as const,
  };
  const serviceLabel = SERVICE_LABELS[order.serviceType] ?? order.serviceType;
  const paymentLabel = PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod;

  const snap = order.beneficiarySnapshot as Record<string, string | null> | null;
  const phoneUsed = snap?.phoneUsed ?? null;
  const firstName = snap?.firstName ?? null;
  const lastName = snap?.lastName ?? null;
  const beneficiaryName =
    firstName || lastName ? `${firstName ?? ""} ${lastName ?? ""}`.trim() : null;

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Status hero */}
      <View style={[styles.hero, { backgroundColor: `${status.color}12` }]}>
        <MaterialCommunityIcons name={status.icon} size={48} color={status.color} />
        <Text style={[styles.statusLabel, { color: status.color }]}>{status.label}</Text>
        <Text style={styles.heroAmount}>
          {formatUsd(order.pricing.totalAmountCents)}
        </Text>
        <Text style={styles.heroService}>{serviceLabel}</Text>
      </View>

      {/* Order info */}
      <Section title="Información del pedido">
        <DetailRow label="ID del pedido" value={order.id} />
        <DetailRow label="Servicio" value={serviceLabel} />
        <DetailRow label="Método de pago" value={paymentLabel} />
        <DetailRow label="Moneda" value={order.currency} />
      </Section>

      {/* Pricing */}
      <Section title="Desglose de precio">
        <DetailRow
          label="Monto base"
          value={formatUsd(order.pricing.baseAmountCents)}
        />
        <DetailRow
          label="Comisión"
          value={formatUsd(order.pricing.feeAmountCents)}
        />
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {formatUsd(order.pricing.totalAmountCents)}
          </Text>
        </View>
      </Section>

      {/* Beneficiary */}
      {(phoneUsed || beneficiaryName) && (
        <Section title="Beneficiario">
          {beneficiaryName && (
            <DetailRow label="Nombre" value={beneficiaryName} />
          )}
          {phoneUsed && <DetailRow label="Teléfono" value={phoneUsed} />}
        </Section>
      )}

      {/* Dates */}
      <Section title="Fechas">
        <DetailRow label="Creado" value={formatDateFull(order.createdAt)} />
        <DetailRow label="Pagado" value={formatDateFull(order.paidAt)} />
        <DetailRow label="Completado" value={formatDateFull(order.completedAt)} />
        {order.failedAt && (
          <DetailRow label="Fallido" value={formatDateFull(order.failedAt)} />
        )}
      </Section>

      {/* Failure info */}
      {(order.failureCode || order.failureReason) && (
        <Section title="Detalle del error">
          {order.failureCode && (
            <DetailRow label="Código" value={order.failureCode} />
          )}
          {order.failureReason && (
            <DetailRow label="Motivo" value={order.failureReason} />
          )}
        </Section>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  content: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background.secondary,
    gap: 12,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 24,
    gap: 6,
    marginBottom: 8,
  },
  statusLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroAmount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 36,
    color: COLORS.text.primary,
    marginTop: 4,
  },
  heroService: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  section: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    flex: 1,
  },
  rowValue: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    color: COLORS.text.primary,
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
    marginVertical: 2,
  },
  totalLabel: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 15,
    color: COLORS.text.primary,
    flex: 1,
  },
  totalValue: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 15,
    color: COLORS.primary.main,
  },
});
