import {
  MY_NOTIFICATION_PREFERENCES,
  MyNotificationPreferencesData,
  UPDATE_MY_NOTIFICATION_PREFERENCES,
  UpdateMyNotificationPreferencesData,
  UpdateMyNotificationPreferencesVars,
} from "@/graphql/notificationPreferences";
import { PushPermissionStatus } from "@/graphql/myUserDevicePushToken";
import {
  getCurrentPushPermissionStatus,
  requestPushPermissionStatus,
} from "@/features/auth/hooks/useDeviceInfo";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { AppState, Linking } from "react-native";
import { toast } from "sonner-native";
import { syncPushDevice } from "@/utils/push/syncPushDevice";
import {
  DEFAULT_NOTIFICATION_STATE,
  NOTIFICATION_BACKEND_FIELD_BY_KEY,
  NotificationToggleKey,
} from "../constants/notifications.constants";

export function useNotificationsScreen() {
  const client = useApolloClient();
  const [enabled, setEnabled] = useState<Record<NotificationToggleKey, boolean>>(
    () => ({ ...DEFAULT_NOTIFICATION_STATE })
  );
  const [savingKey, setSavingKey] = useState<NotificationToggleKey | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PushPermissionStatus>("UNKNOWN");
  const [requestingPermission, setRequestingPermission] = useState(false);
  const [didDismissPrompt, setDidDismissPrompt] = useState(false);

  const [updatePreferences] = useMutation<
    UpdateMyNotificationPreferencesData,
    UpdateMyNotificationPreferencesVars
  >(UPDATE_MY_NOTIFICATION_PREFERENCES);

  const { data: preferencesData, error: preferencesError } =
    useQuery<MyNotificationPreferencesData>(MY_NOTIFICATION_PREFERENCES, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  useEffect(() => {
    const prefs = preferencesData?.myNotificationPreferences;
    if (!prefs) return;

    setEnabled({
      recharge_success: prefs.orderUpdatesEnabled,
      payment_confirmed: prefs.transactionalEnabled,
      wallet_topup: prefs.walletUpdatesEnabled,
      login_alert: prefs.supportUpdatesEnabled,
      promotions: prefs.promotionsEnabled,
    });
  }, [preferencesData]);

  useEffect(() => {
    if (!preferencesError) return;
    if (__DEV__) {
      console.warn("[Notifications] preferences query failed:", preferencesError.message);
    }
  }, [preferencesError]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const currentStatus = await getCurrentPushPermissionStatus();
        setPermissionStatus(currentStatus);
        await syncPushDevice(client);
      } catch (error) {
        if (__DEV__) {
          console.warn("[Notifications] bootstrap failed:", error);
        }
      }
    };

    const subscription = AppState.addEventListener("change", async (state) => {
      if (state !== "active") return;

      try {
        const nextStatus = await getCurrentPushPermissionStatus();
        setPermissionStatus(nextStatus);
        await syncPushDevice(client);
      } catch (error) {
        if (__DEV__) {
          console.warn("[Notifications] foreground sync failed:", error);
        }
      }
    });

    void bootstrap();

    return () => subscription.remove();
  }, [client]);

  const isPermissionGranted =
    permissionStatus === "GRANTED" || permissionStatus === "PROVISIONAL";
  const isPermissionDenied = permissionStatus === "DENIED";

  const requestPushPermission = async () => {
    setRequestingPermission(true);
    try {
      const nextStatus = await requestPushPermissionStatus();
      setPermissionStatus(nextStatus);

      if (nextStatus === "GRANTED" || nextStatus === "PROVISIONAL") {
        await syncPushDevice(client);
        toast.success("Notificaciones push activadas");
        return;
      }

      if (nextStatus === "DENIED") {
        toast.info("Puedes activarlas más tarde desde Ajustes");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo solicitar el permiso");
    } finally {
      setRequestingPermission(false);
    }
  };

  const openSystemSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      toast.error("No se pudo abrir ajustes del sistema");
    }
  };

  const handlePermissionPromptAccept = async () => {
    await requestPushPermission();
  };

  const handlePermissionPromptDismiss = () => {
    setDidDismissPrompt(true);
  };

  const toggle = async (key: NotificationToggleKey) => {
    if (savingKey) return;

    const currentValue = enabled[key];
    const nextValue = !currentValue;
    const field = NOTIFICATION_BACKEND_FIELD_BY_KEY[key];

    if (nextValue && !isPermissionGranted) {
      if (isPermissionDenied) {
        toast.info("Debes habilitar permisos push en Ajustes");
      } else {
        setDidDismissPrompt(false);
      }
      return;
    }

    setEnabled((prev) => ({ ...prev, [key]: nextValue }));
    setSavingKey(key);

    try {
      await updatePreferences({
        variables: {
          input: { [field]: nextValue },
        },
      });
    } catch (error) {
      setEnabled((prev) => ({ ...prev, [key]: currentValue }));
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la preferencia",
      );
    } finally {
      setSavingKey(null);
    }
  };

  const shouldShowPermissionPrompt = !isPermissionGranted && !isPermissionDenied && !didDismissPrompt;

  return {
    enabled,
    toggle,
    savingKey,
    requestingPermission,
    permissionStatus,
    isPermissionDenied,
    shouldShowPermissionPrompt,
    handlePermissionPromptAccept,
    handlePermissionPromptDismiss,
    openSystemSettings,
  };
}
