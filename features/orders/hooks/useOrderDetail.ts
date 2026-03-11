import { ORDER, OrderData, OrderVars } from "@/graphql/myOrders";
import { COLORS } from "@/theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client/react";

type StatusConfig = {
  label: string;
  color: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const STATUS_CONFIG: Record<string, StatusConfig> = {
  COMPLETED: { label: "Completado", color: COLORS.semantic.success, icon: "check-circle" },
  PENDING:   { label: "Pendiente",  color: COLORS.semantic.warning,  icon: "clock" },
  FAILED:    { label: "Fallido",    color: COLORS.semantic.error,    icon: "close-circle" },
  CANCELLED: { label: "Cancelado",  color: COLORS.neutral.gray400,   icon: "cancel" },
};

const SERVICE_LABELS: Record<string, string> = {
  RECHARGE:   "Recarga celular",
  TOPUP:      "Recarga celular",
  NAUTA:      "Recarga Nauta",
  REMITTANCE: "Remesa",
};

const PAYMENT_LABELS: Record<string, string> = {
  CARD:   "Tarjeta de crédito/débito",
  WALLET: "Wallet",
};

export function useOrderDetail(orderId: string) {
  const { data, loading, error } = useQuery<OrderData, OrderVars>(ORDER, {
    fetchPolicy: "cache-and-network",
    variables: { orderId },
  });

  const order = data?.order ?? null;

  if (!order) return { order: null, resolved: null, loading, error };

  const status: StatusConfig = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    color: COLORS.neutral.gray400,
    icon: "help-circle" as const,
  };

  const snap = order.beneficiarySnapshot as Record<string, string | null> | null;
  const phoneUsed = snap?.phoneUsed ?? null;
  const firstName = snap?.firstName ?? null;
  const lastName = snap?.lastName ?? null;
  const beneficiaryName =
    firstName || lastName ? `${firstName ?? ""} ${lastName ?? ""}`.trim() : null;

  return {
    order,
    resolved: {
      status,
      serviceLabel: SERVICE_LABELS[order.serviceType] ?? order.serviceType,
      paymentLabel: PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod,
      phoneUsed,
      beneficiaryName,
    },
    loading,
    error,
  };
}
