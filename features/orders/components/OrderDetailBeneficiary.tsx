import React from "react";
import { DetailRow, OrderDetailSection } from "./OrderDetailSection";

interface OrderDetailBeneficiaryProps {
  beneficiaryName: string | null;
  phoneUsed: string | null;
}

const OrderDetailBeneficiary = ({ beneficiaryName, phoneUsed }: OrderDetailBeneficiaryProps) => {
  if (!beneficiaryName && !phoneUsed) return null;

  return (
    <OrderDetailSection title="Beneficiario">
      {beneficiaryName && <DetailRow label="Nombre" value={beneficiaryName} />}
      {phoneUsed && <DetailRow label="Teléfono" value={phoneUsed} />}
    </OrderDetailSection>
  );
};

export default OrderDetailBeneficiary;
