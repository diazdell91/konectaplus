import { gql } from "@apollo/client";

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  actionType: string | null;
  actionValue: string | null;
  priority: number;
  startAt: string | null;
  endAt: string | null;
}

export interface HeroBannersData {
  heroBanners: HeroBanner[];
}

export const HERO_BANNERS = gql`
  query HeroBanners {
    heroBanners {
      id
      title
      subtitle
      imageUrl
      actionType
      actionValue
      priority
      startAt
      endAt
    }
  }
`;
