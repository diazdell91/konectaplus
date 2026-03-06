import { gql } from "@apollo/client";

export interface OrderPricing {
  baseAmountCents: number;
  feeAmountCents: number;
  totalAmountCents: number;
  pricingRuleId: string | null;
  pricingVersion: number | null;
}

export interface Order {
  id: string;
  userId: string;
  serviceType: string;
  paymentMethod: string;
  currency: string;
  status: string;
  pricing: OrderPricing;
  beneficiarySnapshot: Record<string, unknown> | null;
  createdAt: string;
  paidAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
  failureCode: string | null;
  failureReason: string | null;
}

export interface MyOrdersData {
  myOrders: {
    items: Order[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface MyOrdersVars {
  page?: number;
  pageSize?: number;
}

export interface OrderData {
  order: Order;
}

export interface OrderVars {
  orderId: string;
}

export const ORDER = gql`
  query Order($orderId: ID!) {
    order(id: $orderId) {
      id
      userId
      serviceType
      paymentMethod
      currency
      status
      pricing {
        baseAmountCents
        feeAmountCents
        totalAmountCents
        pricingRuleId
        pricingVersion
      }
      beneficiarySnapshot
      createdAt
      paidAt
      completedAt
      failedAt
      failureCode
      failureReason
    }
  }
`;

export const MY_ORDERS = gql`
  query MyOrders($page: Int, $pageSize: Int) {
    myOrders(page: $page, pageSize: $pageSize) {
      items {
        id
        userId
        serviceType
        paymentMethod
        currency
        status
        pricing {
          baseAmountCents
          feeAmountCents
          totalAmountCents
          pricingRuleId
          pricingVersion
        }
        beneficiarySnapshot
        createdAt
        paidAt
        completedAt
        failedAt
        failureCode
        failureReason
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;
