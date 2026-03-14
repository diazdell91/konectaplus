export interface NotificationItem {
  key: NotificationToggleKey;
  title: string;
  subtitle: string;
}

export interface NotificationGroup {
  label: string;
  items: NotificationItem[];
}

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    label: "Transacciones",
    items: [
      {
        key: "recharge_success",
        title: "Recargas completadas",
        subtitle: "Cuando una recarga se procesa exitosamente",
      },
      {
        key: "payment_confirmed",
        title: "Pagos confirmados",
        subtitle: "Confirmación de tus pagos y cobros",
      },
      {
        key: "wallet_topup",
        title: "Saldo acreditado",
        subtitle: "Cuando se añade saldo a tu wallet",
      },
    ],
  },
  {
    label: "Cuenta",
    items: [
      {
        key: "login_alert",
        title: "Nuevos accesos",
        subtitle: "Cuando se inicia sesión desde un nuevo dispositivo",
      },
      {
        key: "promotions",
        title: "Promociones y ofertas",
        subtitle: "Descuentos y novedades de KonectaPlus",
      },
    ],
  },
];

export const DEFAULT_NOTIFICATION_STATE = {
  recharge_success: true,
  payment_confirmed: true,
  wallet_topup: true,
  login_alert: true,
  promotions: false,
} as const;

export type NotificationToggleKey = keyof typeof DEFAULT_NOTIFICATION_STATE;

export type NotificationPreferenceInputField =
  | "orderUpdatesEnabled"
  | "transactionalEnabled"
  | "walletUpdatesEnabled"
  | "supportUpdatesEnabled"
  | "promotionsEnabled";

export const NOTIFICATION_BACKEND_FIELD_BY_KEY: Record<
  NotificationToggleKey,
  NotificationPreferenceInputField
> = {
  recharge_success: "orderUpdatesEnabled",
  payment_confirmed: "transactionalEnabled",
  wallet_topup: "walletUpdatesEnabled",
  login_alert: "supportUpdatesEnabled",
  promotions: "promotionsEnabled",
};

export const NOTIFICATION_KEY_BY_BACKEND_FIELD: Record<
  NotificationPreferenceInputField,
  NotificationToggleKey
> = {
  orderUpdatesEnabled: "recharge_success",
  transactionalEnabled: "payment_confirmed",
  walletUpdatesEnabled: "wallet_topup",
  supportUpdatesEnabled: "login_alert",
  promotionsEnabled: "promotions",
};
