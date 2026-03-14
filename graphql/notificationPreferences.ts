import { gql } from "@apollo/client";

export const MY_NOTIFICATION_PREFERENCES = gql`
  query MyNotificationPreferences {
    myNotificationPreferences {
      id
      userId
      pushEnabled
      emailEnabled
      smsEnabled
      whatsappEnabled
      marketingEnabled
      transactionalEnabled
      orderUpdatesEnabled
      walletUpdatesEnabled
      supportUpdatesEnabled
      promotionsEnabled
      preferredLanguage
      preferredTimezone
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_MY_NOTIFICATION_PREFERENCES = gql`
  mutation UpdateMyNotificationPreferences(
    $input: UpdateNotificationPreferencesInput!
  ) {
    updateMyNotificationPreferences(input: $input) {
      id
      userId
      pushEnabled
      emailEnabled
      smsEnabled
      whatsappEnabled
      marketingEnabled
      transactionalEnabled
      orderUpdatesEnabled
      walletUpdatesEnabled
      supportUpdatesEnabled
      promotionsEnabled
      preferredLanguage
      preferredTimezone
      createdAt
      updatedAt
    }
  }
`;

export interface NotificationPreferences {
  id: string;
  userId: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  marketingEnabled: boolean;
  transactionalEnabled: boolean;
  orderUpdatesEnabled: boolean;
  walletUpdatesEnabled: boolean;
  supportUpdatesEnabled: boolean;
  promotionsEnabled: boolean;
  preferredLanguage: string | null;
  preferredTimezone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMyNotificationPreferencesData {
  updateMyNotificationPreferences: NotificationPreferences;
}

export interface MyNotificationPreferencesData {
  myNotificationPreferences: NotificationPreferences;
}

export type UpdateNotificationPreferencesInput = Partial<{
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  marketingEnabled: boolean;
  transactionalEnabled: boolean;
  orderUpdatesEnabled: boolean;
  walletUpdatesEnabled: boolean;
  supportUpdatesEnabled: boolean;
  promotionsEnabled: boolean;
  preferredLanguage: string;
  preferredTimezone: string;
}>;

export interface UpdateMyNotificationPreferencesVars {
  input: UpdateNotificationPreferencesInput;
}
