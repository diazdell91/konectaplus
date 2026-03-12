import { gql } from "@apollo/client";

export interface Country {
  id: string;
  iso: string;
  name: string;
  imageUrl: string;
  deeplink: string;
  priority: number;
}

export interface CountriesData {
  countries: Country[];
}

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      id
      iso
      name
      imageUrl
      deeplink
      priority
    }
  }
`;
