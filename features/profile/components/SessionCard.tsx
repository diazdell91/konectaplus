import { Text } from "@/components/ui";
import { SessionItem } from "@/graphql/mySessions";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { deviceIcon, formatDate, isExpired } from "../utils/sessions.utils";

type Props = {
  session: SessionItem;
};

export function SessionCard({ session }: Props) {
  const revoked = !!session.revokedAt;
  const expired = isExpired(session.expiresAt);
  const inactive = revoked || expired;

  const statusLabel = revoked ? "Revocada" : expired ? "Expirada" : "Activa";
  const statusColor = inactive ? COLORS.text.secondary : COLORS.primary.main;
  const statusBg = inactive ? COLORS.background.tertiary : COLORS.primary.tint;

  return (
    <View style={[styles.card, inactive && styles.cardInactive]}>
      <View style={[styles.iconWrap, { backgroundColor: statusBg }]}>
        <Ionicons name={deviceIcon(session.userAgent)} size={22} color={statusColor} />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.deviceName} numberOfLines={1}>
            {session.deviceName ?? "Dispositivo desconocido"}
          </Text>
          <View style={[styles.badge, { backgroundColor: statusBg }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
        </View>

        {session.ip && <Text style={styles.meta}>IP: {session.ip}</Text>}
        <Text style={styles.meta}>Inicio: {formatDate(session.createdAt)}</Text>
        {session.expiresAt && (
          <Text style={styles.meta}>
            {expired ? "Expiró" : "Expira"}: {formatDate(session.expiresAt)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    padding: 14,
    gap: 12,
  },
  cardInactive: {
    opacity: 0.65,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 2,
  },
  deviceName: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
  },
  meta: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
});
