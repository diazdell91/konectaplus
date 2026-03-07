import { Text } from "@/components/ui";
import { MY_SESSIONS, MySessionsData, SessionItem } from "@/graphql/mySessions";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function deviceIcon(
  userAgent: string | null
): React.ComponentProps<typeof Ionicons>["name"] {
  if (!userAgent) return "phone-portrait-outline";
  const ua = userAgent.toLowerCase();
  if (ua.includes("ipad") || ua.includes("tablet")) return "tablet-portrait-outline";
  if (ua.includes("android") || ua.includes("iphone") || ua.includes("mobile"))
    return "phone-portrait-outline";
  if (ua.includes("mac") || ua.includes("windows") || ua.includes("linux"))
    return "laptop-outline";
  return "phone-portrait-outline";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

// ---------------------------------------------------------------------------
// Session card
// ---------------------------------------------------------------------------

function SessionCard({ session }: { session: SessionItem }) {
  const revoked = !!session.revokedAt;
  const expired = isExpired(session.expiresAt);
  const inactive = revoked || expired;

  const statusLabel = revoked ? "Revocada" : expired ? "Expirada" : "Activa";
  const statusColor = inactive ? COLORS.text.secondary : COLORS.primary.main;
  const statusBg = inactive ? COLORS.background.tertiary : "#EAF7F5";

  return (
    <View style={[styles.card, inactive && styles.cardInactive]}>
      <View style={[styles.iconWrap, { backgroundColor: statusBg }]}>
        <Ionicons
          name={deviceIcon(session.userAgent)}
          size={22}
          color={statusColor}
        />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.deviceName} numberOfLines={1}>
            {session.deviceName ?? "Dispositivo desconocido"}
          </Text>
          <View style={[styles.badge, { backgroundColor: statusBg }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        {session.ip && (
          <Text style={styles.meta}>IP: {session.ip}</Text>
        )}
        <Text style={styles.meta}>
          Inicio: {formatDate(session.createdAt)}
        </Text>
        {session.expiresAt && (
          <Text style={styles.meta}>
            {expired ? "Expiró" : "Expira"}: {formatDate(session.expiresAt)}
          </Text>
        )}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function SessionsScreen() {
  const { data, loading, refetch } = useQuery<MySessionsData>(MY_SESSIONS, {
    fetchPolicy: "cache-and-network",
  });

  const items = data?.mySessions?.items ?? [];
  const active = items.filter((s) => !s.revokedAt && !isExpired(s.expiresAt));
  const inactive = items.filter((s) => !!s.revokedAt || isExpired(s.expiresAt));

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={COLORS.primary.main}
          />
        }
      >
        {loading && items.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator color={COLORS.primary.main} />
          </View>
        ) : items.length === 0 ? (
          <View style={styles.centered}>
            <Ionicons name="shield-checkmark-outline" size={48} color={COLORS.neutral.gray300} />
            <Text style={styles.emptyText}>Sin sesiones registradas</Text>
          </View>
        ) : (
          <>
            {active.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  Sesiones activas · {active.length}
                </Text>
                {active.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </View>
            )}

            {inactive.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  Historial · {inactive.length}
                </Text>
                {inactive.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

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
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    paddingTop: SPACING.xxxl,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    color: COLORS.text.secondary,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
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
