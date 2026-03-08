import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Enums (mirror the backend schema)
// ---------------------------------------------------------------------------

export type TopupListingType = "BUNDLE" | "VOUCHER" | "DATA";

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface TopupProduct {
  id: string;
  variantKey: string;
  countryIso: string;
  denominationValue: number | null;
  denominationCurrency: string | null;
  sendValue: number | null;
  receiveValue: string | number | null;
  receiveCurrency: string | null;
  validityPeriod: string | null;
  description: string | null;
  sellPriceUsdCents: number;
  compareAtPriceUsdCents: number | null;
  badge: string | null;
  isFeatured: boolean;
  priority: number;
  tags: string[] | null;
  topupType: TopupListingType;
  displayName: string;
}

export interface TopupProductsData {
  topupProducts: {
    items: TopupProduct[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface TopupProductsVars {
  serviceItemKey: string;
  countryIso: string;
}

// ---------------------------------------------------------------------------
// Query document
// ---------------------------------------------------------------------------

export const TOPUP_PRODUCTS = gql`
  query TopupProducts($serviceItemKey: String!, $countryIso: String!) {
    topupProducts(serviceItemKey: $serviceItemKey, countryIso: $countryIso) {
      items {
        id
        variantKey
        countryIso
        denominationValue
        denominationCurrency
        sendValue
        receiveValue
        receiveCurrency
        validityPeriod
        description
        sellPriceUsdCents
        compareAtPriceUsdCents
        badge
        isFeatured
        priority
        tags
        topupType
        displayName
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;
