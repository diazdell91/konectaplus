import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  key: string;
  title: string;
  subtitle: string;
}

const NOTIFICATION_GROUPS: { label: string; items: NotificationItem[] }[] = [
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

export default function NotificationsScreen() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    recharge_success: true,
    payment_confirmed: true,
    wallet_topup: true,
    login_alert: true,
    promotions: false,
  });

  const toggle = (key: string) =>
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATION_GROUPS.map((group) => (
          <View key={group.label} style={styles.group}>
            <Text style={styles.groupLabel}>{group.label}</Text>
            <View style={styles.card}>
              {group.items.map((item, idx) => (
                <View
                  key={item.key}
                  style={[
                    styles.row,
                    idx < group.items.length - 1 && styles.rowBorder,
                  ]}
                >
                  <View style={styles.rowText}>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Switch
                    value={enabled[item.key] ?? false}
                    onValueChange={() => toggle(item.key)}
                    trackColor={{
                      false: COLORS.border.light,
                      true: COLORS.primary.main,
                    }}
                    thumbColor="#fff"
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.hint}>
          Las notificaciones push requieren que los permisos estén activados en
          la configuración de tu dispositivo.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  scroll: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.lg,
  },
  group: {
    gap: SPACING.xs,
  },
  groupLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  rowSubtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  hint: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
  },
});
