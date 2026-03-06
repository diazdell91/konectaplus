import { gql } from "@apollo/client";

export interface WalletTopupProduct {
  id: string;
  productId: string;
  amountCents: number;
  priceCents: number;
  feeCents: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTopupProductsData {
  walletTopupProducts: WalletTopupProduct[];
}

export interface WalletTopupIntent {
  paymentAttemptId: string;
  clientSecret: string;
  amountCents: number;
  currency: string;
}

export interface WalletCreateTopupIntentData {
  walletCreateTopupIntentUSD: WalletTopupIntent;
}

export interface WalletCreateTopupIntentVars {
  productId: string;
  note?: string;
}

export const WALLET_CREATE_TOPUP_INTENT = gql`
  mutation WalletCreateTopupIntentUSD($productId: String!, $note: String) {
    walletCreateTopupIntentUSD(productId: $productId, note: $note) {
      paymentAttemptId
      clientSecret
      amountCents
      currency
    }
  }
`;

export const WALLET_TOPUP_PRODUCTS = gql`
  query WalletTopupProducts {
    walletTopupProducts {
      id
      productId
      amountCents
      priceCents
      feeCents
      currency
      isActive
      createdAt
      updatedAt
    }
  }
`;
