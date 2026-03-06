import { gql } from "@apollo/client";

export interface MyWalletUSD {
  id: string;
  currency: string;
  balanceCachedCents: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyWalletUSDData {
  myWalletUSD: MyWalletUSD;
}

export const MY_WALLET_USD = gql`
  query MyWalletUSD {
    myWalletUSD {
      id
      currency
      balanceCachedCents
      createdAt
      updatedAt
    }
  }
`;
