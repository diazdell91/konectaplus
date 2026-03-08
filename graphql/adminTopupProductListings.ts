import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Enums (mirror the backend schema)
// ---------------------------------------------------------------------------

export type TopupListingType = "BUNDLE" | "VOUCHER" | "DATA";

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface TopupListingProduct {
  id: string;
  displayName: string;
  topupType: TopupListingType;
  countryIso: string;
  sendValue: number | null;
  minSendValue: number | null;
  maxSendValue: number | null;
  sendCurrency: string | null;
  validityPeriod: string | null;
  validationRegex: string | null;
  logoUrl: string | null;
  description: string | null;
}

export interface TopupProduct {
  id: string;
  product: TopupListingProduct;
  sellPriceUsdCents: number;
  compareAtPriceUsdCents: number | null;
  badge: string | null;
  isFeatured: boolean;
  tags: string[] | null;
  // Convenience accessors (derived from product) — used in UI components
  displayName: string;
  topupType: TopupListingType;
  validityPeriod: string | null;
  description: string | null;
}

export interface TopupProductsData {
  topupListings: {
    items: TopupProduct[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface TopupProductsVars {
  countryIso: string;
  topupType?: TopupListingType | null;
  page?: number | null;
  pageSize?: number | null;
}

// ---------------------------------------------------------------------------
// Query document
// ---------------------------------------------------------------------------

export const TOPUP_PRODUCTS = gql`
  query TopupListings($countryIso: String!, $topupType: TopupListingType, $page: Int, $pageSize: Int) {
    topupListings(countryIso: $countryIso, topupType: $topupType, page: $page, pageSize: $pageSize) {
      items {
        id
        product {
          id
          displayName
          topupType
          countryIso
          sendValue
          minSendValue
          maxSendValue
          sendCurrency
          validityPeriod
          validationRegex
          logoUrl
          description
        }
        sellPriceUsdCents
        compareAtPriceUsdCents
        badge
        isFeatured
        tags
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;
