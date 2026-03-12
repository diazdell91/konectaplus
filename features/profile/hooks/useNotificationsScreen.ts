import { useState } from "react";
import { DEFAULT_NOTIFICATION_STATE } from "../constants/notifications.constants";

export function useNotificationsScreen() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    DEFAULT_NOTIFICATION_STATE
  );

  const toggle = (key: string) =>
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));

  return { enabled, toggle };
}
