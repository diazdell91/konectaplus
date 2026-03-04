import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Enums (mirror the backend schema)
// ---------------------------------------------------------------------------

export type RechargeListingStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export type RechargeListingType = "BUNDLE" | "VOUCHER" | "DATA";

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface RechargeProductListing {
  id: string;
  catalogProductId: string;
  variantKey: string;
  skuCodeProviderProduct: string;
  displayName: string;
  serviceType: string | null;
  serviceProvider: string | null;
  providerCode: string;
  rechargeType: RechargeListingType;
  countryIso: string;
  status: RechargeListingStatus;
  pricingMode: string | null;
  receiveValue: number | null;
  receiveCurrency: string | null;
  validityPeriod: string | null;
  description: string | null;
  sellPriceUsdCents: number;
  compareAtPriceUsdCents: number | null;
  badge: string | null;
  isFeatured: boolean;
  priority: number;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
  logoUrl: string | null;
}

export interface AdminRechargeProductListingsData {
  adminRechargeProductListings: {
    items: RechargeProductListing[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface AdminRechargeProductListingsVars {
  status?: RechargeListingStatus;
  countryIso?: string;
  providerCode?: string;
  rechargeType?: RechargeListingType;
  q?: string;
  page?: number;
  pageSize?: number;
}

// ---------------------------------------------------------------------------
// Query document
// ---------------------------------------------------------------------------

export const ADMIN_RECHARGE_PRODUCT_LISTINGS = gql`
  query AdminRechargeProductListings(
    $status: RechargeListingStatus
    $countryIso: String
    $providerCode: String
    $rechargeType: RechargeListingType
    $q: String
    $page: Int
    $pageSize: Int
  ) {
    adminRechargeProductListings(
      status: $status
      countryIso: $countryIso
      providerCode: $providerCode
      rechargeType: $rechargeType
      q: $q
      page: $page
      pageSize: $pageSize
    ) {
      items {
        id
        catalogProductId
        variantKey
        skuCodeProviderProduct
        displayName
        serviceType
        serviceProvider
        providerCode
        rechargeType
        countryIso
        status
        pricingMode
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
        createdAt
        updatedAt
        logoUrl
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;

// ---------------------------------------------------------------------------
// Ding recharge request builder
// ---------------------------------------------------------------------------

export interface DingRechargeRequest {
  providerCode: string;
  skuCodeProviderProduct: string;
  destinationPhone: string; // E.164
  countryIso: string;
  listingId: string;
}

/**
 * Builds the payload needed to execute a Ding recharge.
 * Does NOT call any API — only assembles the object.
 *
 * TODO: call the actual recharge mutation when the backend endpoint is ready.
 */
export function buildDingRechargeRequest(params: {
  listing: RechargeProductListing;
  destinationPhone: string;
  countryIso: string;
}): DingRechargeRequest {
  return {
    providerCode: params.listing.providerCode,
    skuCodeProviderProduct: params.listing.skuCodeProviderProduct,
    destinationPhone: params.destinationPhone,
    countryIso: params.countryIso,
    listingId: params.listing.id,
  };
}
