import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import * as Notifications from "expo-notifications";
import { useCallback } from "react";
import { Platform } from "react-native";

export type DeviceInput = {
  appVersion: string | null;
  deviceId: string | null;
  deviceName: string | null;
  expoPushToken: string | null;
  locale: string | null;
  metadata: string | null;
  nativePushToken: string | null;
  osVersion: string | null;
  platform: string | null;
  pushPermissionStatus: string | null;
  timezone: string | null;
};

async function getDeviceId(): Promise<string | null> {
  if (Platform.OS === "ios") {
    return await Application.getIosIdForVendorAsync();
  }
  return Application.getAndroidId();
}

async function getExpoPushToken(): Promise<string | null> {
  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch {
    return null;
  }
}

async function getPushPermissionStatus(): Promise<string> {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") return "GRANTED";
    if (status === "denied") return "DENIED";
    return "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
}

export async function collectDeviceInfo(): Promise<DeviceInput> {
  const [deviceId, expoPushToken, pushPermissionStatus] = await Promise.all([
    getDeviceId(),
    getExpoPushToken(),
    getPushPermissionStatus(),
  ]);

  const locales = Localization.getLocales();
  const locale = locales[0]?.languageTag ?? null;
  const timezone = Localization.getCalendars()[0]?.timeZone ?? null;

  return {
    appVersion: Constants.expoConfig?.version ?? null,
    deviceId,
    deviceName: Device.modelName ?? (Platform.OS === "ios" ? "iPhone" : "Android"),
    expoPushToken,
    locale,
    metadata: null,
    nativePushToken: null,
    osVersion: Device.osVersion ?? null,
    platform: Platform.OS.toUpperCase(),
    pushPermissionStatus,
    timezone,
  };
}

export function useDeviceInfo() {
  const collect = useCallback(collectDeviceInfo, []);
  return { collect };
}
