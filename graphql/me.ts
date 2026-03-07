import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      phone
      email
      emailVerified
      profile {
        id
        userId
        firstName
        lastName
        fullName
        createdAt
        updatedAt
      }
      roles {
        id
        name
        description
      }
      status
      createdAt
      updatedAt
      lastLoginAt
    }
  }
`;

export interface MeProfile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MeRole {
  id: string;
  name: string;
  description: string | null;
}

export interface MeUser {
  id: string;
  phone: string;
  email: string | null;
  emailVerified: boolean;
  profile: MeProfile | null;
  roles: MeRole[];
  status: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface MeData {
  me: MeUser;
}
