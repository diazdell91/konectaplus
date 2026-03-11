import React from "react";
import { DetailRow, OrderDetailSection } from "./OrderDetailSection";

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

interface OrderDetailDatesProps {
  createdAt: string;
  paidAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
}

const OrderDetailDates = ({ createdAt, paidAt, completedAt, failedAt }: OrderDetailDatesProps) => (
  <OrderDetailSection title="Fechas">
    <DetailRow label="Creado" value={formatDateFull(createdAt)} />
    <DetailRow label="Pagado" value={formatDateFull(paidAt)} />
    <DetailRow label="Completado" value={formatDateFull(completedAt)} />
    {failedAt && <DetailRow label="Fallido" value={formatDateFull(failedAt)} />}
  </OrderDetailSection>
);

export default OrderDetailDates;
