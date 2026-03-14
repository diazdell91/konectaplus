import { gql } from "@apollo/client";

export const UPDATE_MY_USER_DEVICE_PUSH_TOKEN = gql`
  mutation UpdateMyUserDevicePushToken(
    $deviceId: String!
    $input: UpdateMyUserDevicePushTokenInput!
  ) {
    updateMyUserDevicePushToken(deviceId: $deviceId, input: $input) {
      id
      userId
      deviceId
      deviceName
      platform
      appVersion
      osVersion
      expoPushToken
      nativePushToken
      pushPermissionStatus
      locale
      timezone
      metadata
      isActive
      lastPushTokenAt
      lastSeenAt
      createdAt
      updatedAt
    }
  }
`;

export type PushPermissionStatus =
  | "UNKNOWN"
  | "GRANTED"
  | "DENIED"
  | "PROVISIONAL";

export interface MyUserDevicePushToken {
  id: string;
  userId: string;
  deviceId: string;
  deviceName: string | null;
  platform: string | null;
  appVersion: string | null;
  osVersion: string | null;
  expoPushToken: string | null;
  nativePushToken: string | null;
  pushPermissionStatus: PushPermissionStatus;
  locale: string | null;
  timezone: string | null;
  metadata: string | null;
  isActive: boolean;
  lastPushTokenAt: string | null;
  lastSeenAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UpdateMyUserDevicePushTokenInput = Partial<{
  expoPushToken: string;
  nativePushToken: string;
  pushPermissionStatus: PushPermissionStatus;
}>;

export interface UpdateMyUserDevicePushTokenData {
  updateMyUserDevicePushToken: MyUserDevicePushToken;
}

export interface UpdateMyUserDevicePushTokenVars {
  deviceId: string;
  input: UpdateMyUserDevicePushTokenInput;
}
