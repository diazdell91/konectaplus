import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Setup Intent — step 1
// ---------------------------------------------------------------------------

export interface CreateSetupIntentData {
  createSetupIntent: {
    clientSecret: string;
  };
}

export const CREATE_SETUP_INTENT = gql`
  mutation CreateSetupIntent {
    createSetupIntent {
      clientSecret
    }
  }
`;

// ---------------------------------------------------------------------------
// Saved card type
// ---------------------------------------------------------------------------

export interface SavedCard {
  id: string;
  stripePaymentMethodId: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Save Card — step 4
// ---------------------------------------------------------------------------

export interface SaveCardData {
  saveCard: SavedCard;
}

export interface SaveCardVars {
  stripePaymentMethodId: string;
}

// ---------------------------------------------------------------------------
// My Cards — list
// ---------------------------------------------------------------------------

export interface MyCardsData {
  myCards: {
    items: SavedCard[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface MyCardsVars {
  page?: number;
  pageSize?: number;
}

export const MY_CARDS = gql`
  query MyCards($page: Int, $pageSize: Int) {
    myCards(page: $page, pageSize: $pageSize) {
      items {
        id
        stripePaymentMethodId
        brand
        last4
        expMonth
        expYear
        isDefault
        createdAt
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;

export const SAVE_CARD = gql`
  mutation SaveCard($stripePaymentMethodId: String!) {
    saveCard(stripePaymentMethodId: $stripePaymentMethodId) {
      id
      stripePaymentMethodId
      brand
      last4
      expMonth
      expYear
      isDefault
      createdAt
    }
  }
`;

// ---------------------------------------------------------------------------
// Delete Card
// ---------------------------------------------------------------------------

export interface DeleteCardVars {
  cardId: string;
}

export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId)
  }
`;
