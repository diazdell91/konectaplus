import { gql } from "@apollo/client";

export const MY_SESSIONS = gql`
  query MySessions {
    mySessions {
      items {
        id
        deviceId
        deviceName
        ip
        userAgent
        createdAt
        expiresAt
        revokedAt
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;

export interface SessionItem {
  id: string;
  deviceId: string | null;
  deviceName: string | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  expiresAt: string | null;
  revokedAt: string | null;
}

export interface MySessionsData {
  mySessions: {
    items: SessionItem[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}
