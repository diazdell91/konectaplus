import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
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
import { SessionCard } from "../components/SessionCard";
import { useSessionsScreen } from "../hooks/useSessionsScreen";

export default function SessionsScreen() {
  const { loading, refetch, items, activeSessions, inactiveSessions } = useSessionsScreen();

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
            {activeSessions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  Sesiones activas · {activeSessions.length}
                </Text>
                {activeSessions.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </View>
            )}

            {inactiveSessions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>
                  Historial · {inactiveSessions.length}
                </Text>
                {inactiveSessions.map((s) => (
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
});
