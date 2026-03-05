import { gql } from "@apollo/client";

export type ServiceItemInputKind = "NONE" | "PHONE" | "EMAIL";
export type ServiceItemBadge = "NONE" | string;

export interface ServiceItemCountryRule {
  regex: string;
  example: string;
  error: string;
}

export interface ServiceItemInputConfig {
  label?: string;
  placeholder?: string;
  normalize?: string;
  regex?: string;
  mustEndWith?: string;
  error?: string;
  countryRules?: Record<string, ServiceItemCountryRule>;
}

export interface ServiceItem {
  id: string;
  key: string;
  title: string;
  subtitle: string | null;
  priority: number;
  badge: ServiceItemBadge;
  inputKind: ServiceItemInputKind;
  iconName: string;
  route: string;
}

export interface ServiceCategory {
  id: string;
  key: string;
  title: string;
  priority: number;
  badge: ServiceItemBadge;
  items: ServiceItem[];
}

export interface ServiceCategoriesData {
  serviceCategories: ServiceCategory[];
}

export const SERVICE_CATEGORIES = gql`
  query ServiceCategories {
    serviceCategories {
      id
      key
      title
      priority
      badge
      items {
        id
        key
        title
        subtitle
        priority
        badge
        inputKind
        iconName
        route
      }
    }
  }
`;
