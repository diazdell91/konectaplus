import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import OrderDetailBeneficiary from "../components/OrderDetailBeneficiary";
import OrderDetailDates from "../components/OrderDetailDates";
import OrderDetailFailure from "../components/OrderDetailFailure";
import OrderDetailHero from "../components/OrderDetailHero";
import OrderDetailPricing from "../components/OrderDetailPricing";
import { DetailRow, OrderDetailSection } from "../components/OrderDetailSection";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { FONT_FAMILIES } from "@/theme/typography";

interface OrderDetailScreenProps {
  orderId: string;
}

const OrderDetailScreen = ({ orderId }: OrderDetailScreenProps) => {
  const { order, resolved, loading, error } = useOrderDetail(orderId);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error || !order || !resolved) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar el pedido</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <OrderDetailHero
        statusLabel={resolved.status.label}
        statusColor={resolved.status.color}
        statusIcon={resolved.status.icon}
        totalAmountCents={order.pricing.totalAmountCents}
        serviceLabel={resolved.serviceLabel}
      />

      <OrderDetailSection title="Información del pedido">
        <DetailRow label="ID del pedido" value={order.id} />
        <DetailRow label="Servicio" value={resolved.serviceLabel} />
        <DetailRow label="Método de pago" value={resolved.paymentLabel} />
        <DetailRow label="Moneda" value={order.currency} />
      </OrderDetailSection>

      <OrderDetailPricing
        baseAmountCents={order.pricing.baseAmountCents}
        feeAmountCents={order.pricing.feeAmountCents}
        totalAmountCents={order.pricing.totalAmountCents}
      />

      <OrderDetailBeneficiary
        beneficiaryName={resolved.beneficiaryName}
        phoneUsed={resolved.phoneUsed}
      />

      <OrderDetailDates
        createdAt={order.createdAt}
        paidAt={order.paidAt}
        completedAt={order.completedAt}
        failedAt={order.failedAt}
      />

      <OrderDetailFailure
        failureCode={order.failureCode}
        failureReason={order.failureReason}
      />
    </ScrollView>
  );
};

export default OrderDetailScreen;

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
});
