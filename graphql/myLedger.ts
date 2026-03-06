import { gql } from "@apollo/client";

export type LedgerDirection = "CREDIT" | "DEBIT";
export type LedgerStatus = "COMPLETED" | "PENDING" | "FAILED";
export type LedgerType =
  | "TOPUP"
  | "RECHARGE"
  | "REFUND"
  | "FEE"
  | "ADJUSTMENT";

export interface LedgerItem {
  id: string;
  type: LedgerType;
  direction: LedgerDirection;
  amountCents: number;
  feeCents: number | null;
  currency: string;
  status: LedgerStatus;
  note: string | null;
  orderId: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface MyLedgerUSDData {
  myLedgerUSD: {
    items: LedgerItem[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface MyLedgerUSDVars {
  page?: number;
  pageSize?: number;
}

export const MY_LEDGER_USD = gql`
  query MyLedgerUSD($page: Int, $pageSize: Int) {
    myLedgerUSD(page: $page, pageSize: $pageSize) {
      items {
        id
        type
        direction
        amountCents
        feeCents
        currency
        status
        note
        orderId
        createdAt
        completedAt
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;
