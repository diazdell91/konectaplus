import React from "react";
import { DetailRow, OrderDetailSection } from "./OrderDetailSection";

interface OrderDetailFailureProps {
  failureCode: string | null;
  failureReason: string | null;
}

const OrderDetailFailure = ({ failureCode, failureReason }: OrderDetailFailureProps) => {
  if (!failureCode && !failureReason) return null;

  return (
    <OrderDetailSection title="Detalle del error">
      {failureCode && <DetailRow label="Código" value={failureCode} />}
      {failureReason && <DetailRow label="Motivo" value={failureReason} />}
    </OrderDetailSection>
  );
};

export default OrderDetailFailure;
