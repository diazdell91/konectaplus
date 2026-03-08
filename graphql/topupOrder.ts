import { gql } from "@apollo/client";

export type PaymentMethod = "CARD" | "WALLET";

export interface CreateTopupOrderInput {
  productListingId: string;
  accountNumber: string;
  paymentMethod: PaymentMethod;
  cardId?: string;
}

export interface CreateTopupOrderVars {
  input: CreateTopupOrderInput;
}

export interface CreateTopupOrderResult {
  orderId: string;
  requiresAction: boolean;
  clientSecret: string | null;
}

export interface CreateTopupOrderData {
  createTopupOrder: CreateTopupOrderResult;
}

export const CREATE_TOPUP_ORDER = gql`
  mutation CreateTopupOrder($input: CreateTopupOrderInput!) {
    createTopupOrder(input: $input) {
      orderId
      requiresAction
      clientSecret
    }
  }
`;
