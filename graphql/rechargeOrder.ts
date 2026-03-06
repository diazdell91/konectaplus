import { gql } from "@apollo/client";

export type PaymentMethod = "CARD" | "WALLET";

export interface CreateRechargeOrderInput {
  productListingId: string;
  accountNumber: string;
  paymentMethod: PaymentMethod;
  cardId?: string;
}

export interface CreateRechargeOrderVars {
  input: CreateRechargeOrderInput;
}

export interface CreateRechargeOrderResult {
  orderId: string;
  requiresAction: boolean;
  clientSecret: string | null;
}

export interface CreateRechargeOrderData {
  createRechargeOrder: CreateRechargeOrderResult;
}

export const CREATE_RECHARGE_ORDER = gql`
  mutation CreateRechargeOrder($input: CreateRechargeOrderInput!) {
    createRechargeOrder(input: $input) {
      orderId
      requiresAction
      clientSecret
    }
  }
`;
