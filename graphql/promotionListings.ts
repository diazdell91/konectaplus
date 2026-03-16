import { gql } from "@apollo/client";

export interface PromotionListing {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  actionType: string | null;
  actionValue: string | null;
  badge: string | null;
  isFeatured: boolean;
  startsAt: string | null;
  endsAt: string | null;
  providerCode: string | null;
  countryIso: string | null;
  topupProductId: string | null;
  logoUrl: string | null;
  name: string | null;
  validationRegex: string | null;
}

export interface PromotionListingsPayload {
  items: PromotionListing[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface PromotionListingsData {
  promotionListings: PromotionListingsPayload;
}

export interface PromotionListingsVariables {
  countryIso?: string;
  page?: number;
  pageSize?: number;
}

export const PROMOTION_LISTINGS = gql`
  query PromotionListings($countryIso: String, $page: Int, $pageSize: Int) {
    promotionListings(
      countryIso: $countryIso
      page: $page
      pageSize: $pageSize
    ) {
      items {
        id
        title
        subtitle
        imageUrl
        actionType
        actionValue
        badge
        isFeatured
        startsAt
        endsAt
        providerCode
        countryIso
        topupProductId
        logoUrl
        name
        validationRegex
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;
