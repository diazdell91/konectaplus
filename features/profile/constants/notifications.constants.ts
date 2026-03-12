export interface NotificationItem {
  key: string;
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

export const DEFAULT_NOTIFICATION_STATE: Record<string, boolean> = {
  recharge_success: true,
  payment_confirmed: true,
  wallet_topup: true,
  login_alert: true,
  promotions: false,
};
