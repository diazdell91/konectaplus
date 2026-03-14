import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import * as Notifications from "expo-notifications";
import { useCallback } from "react";
import { Platform } from "react-native";
import { PushPermissionStatus } from "@/graphql/myUserDevicePushToken";

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
  pushPermissionStatus: PushPermissionStatus | null;
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

async function getNativePushToken(): Promise<string | null> {
  try {
    const token = await Notifications.getDevicePushTokenAsync();
    const raw = token?.data;
    return typeof raw === "string" ? raw : raw ? JSON.stringify(raw) : null;
  } catch {
    return null;
  }
}

function mapPermissionStatus(
  settings: Notifications.NotificationPermissionsStatus,
): PushPermissionStatus {
  const { status } = settings;
  const iosStatus = (settings as unknown as { ios?: { status?: number } })?.ios?.status;

  if (iosStatus === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return "PROVISIONAL";
  }
  if (status === "granted") return "GRANTED";
  if (status === "denied") return "DENIED";
  return "UNKNOWN";
}

export async function getCurrentPushPermissionStatus(): Promise<PushPermissionStatus> {
  try {
    const settings = await Notifications.getPermissionsAsync();
    return mapPermissionStatus(settings);
  } catch {
    return "UNKNOWN";
  }
}

export async function requestPushPermissionStatus(): Promise<PushPermissionStatus> {
  try {
    const settings = await Notifications.requestPermissionsAsync();
    return mapPermissionStatus(settings);
  } catch {
    return "UNKNOWN";
  }
}

export async function collectDeviceInfo(): Promise<DeviceInput> {
  const [deviceId, expoPushToken, nativePushToken, pushPermissionStatus] = await Promise.all([
    getDeviceId(),
    getExpoPushToken(),
    getNativePushToken(),
    getCurrentPushPermissionStatus(),
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
    nativePushToken,
    osVersion: Device.osVersion ?? null,
    platform: Platform.OS.toUpperCase(),
    pushPermissionStatus,
    timezone,
  };
}

export function useDeviceInfo() {
  const collect = useCallback(collectDeviceInfo, []);
  const getPermissionStatus = useCallback(getCurrentPushPermissionStatus, []);
  const requestPermission = useCallback(requestPushPermissionStatus, []);

  return { collect, getPermissionStatus, requestPermission };
}
