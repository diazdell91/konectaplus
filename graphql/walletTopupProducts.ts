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

export interface WalletTopupWithSavedCardResult {
  paymentAttemptId: string;
  succeeded: boolean;
  requiresAction: boolean;
  clientSecret: string | null;
  amountCents: number;
  currency: string;
}

export interface WalletTopupWithSavedCardData {
  walletTopupWithSavedCardUSD: WalletTopupWithSavedCardResult;
}

export interface WalletTopupWithSavedCardVars {
  productId: string;
  cardId: string;
  note?: string | null;
}

export const WALLET_TOPUP_WITH_SAVED_CARD = gql`
  mutation WalletTopupWithSavedCardUSD($productId: String!, $cardId: ID!, $note: String) {
    walletTopupWithSavedCardUSD(productId: $productId, cardId: $cardId, note: $note) {
      paymentAttemptId
      succeeded
      requiresAction
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
