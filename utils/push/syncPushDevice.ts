import { collectDeviceInfo } from "@/features/auth/hooks/useDeviceInfo";
import {
  UPDATE_MY_USER_DEVICE_PUSH_TOKEN,
  PushPermissionStatus,
  UpdateMyUserDevicePushTokenInput,
  UpdateMyUserDevicePushTokenVars,
} from "@/graphql/myUserDevicePushToken";
import { ApolloClient } from "@apollo/client";

export type SyncPushDeviceResult = {
  synced: boolean;
  permissionStatus: PushPermissionStatus | null;
};

export async function syncPushDevice(
  client: ApolloClient,
): Promise<SyncPushDeviceResult> {
  const device = await collectDeviceInfo();

  if (!device.deviceId) {
    return { synced: false, permissionStatus: device.pushPermissionStatus };
  }

  const input: UpdateMyUserDevicePushTokenInput = {};
  if (device.expoPushToken) input.expoPushToken = device.expoPushToken;
  if (device.nativePushToken) input.nativePushToken = device.nativePushToken;
  if (device.pushPermissionStatus) {
    input.pushPermissionStatus = device.pushPermissionStatus;
  }

  if (Object.keys(input).length === 0) {
    return { synced: false, permissionStatus: device.pushPermissionStatus };
  }

  await client.mutate<unknown, UpdateMyUserDevicePushTokenVars>({
    mutation: UPDATE_MY_USER_DEVICE_PUSH_TOKEN,
    variables: {
      deviceId: device.deviceId,
      input,
    },
    fetchPolicy: "no-cache",
  });

  return { synced: true, permissionStatus: device.pushPermissionStatus };
}
