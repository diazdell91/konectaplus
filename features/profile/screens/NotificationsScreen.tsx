import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationGroup } from "../components/NotificationGroup";
import { PushPermissionDeniedCard } from "../components/PushPermissionDeniedCard";
import { PushPermissionPromptCard } from "../components/PushPermissionPromptCard";
import { NOTIFICATION_GROUPS } from "../constants/notifications.constants";
import { useNotificationsScreen } from "../hooks/useNotificationsScreen";

export default function NotificationsScreen() {
  const {
    enabled,
    toggle,
    savingKey,
    requestingPermission,
    shouldShowPermissionPrompt,
    isPermissionDenied,
    handlePermissionPromptAccept,
    handlePermissionPromptDismiss,
    openSystemSettings,
  } = useNotificationsScreen();

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {shouldShowPermissionPrompt && (
          <PushPermissionPromptCard
            loading={requestingPermission}
            onAccept={handlePermissionPromptAccept}
            onDismiss={handlePermissionPromptDismiss}
          />
        )}

        {isPermissionDenied && (
          <PushPermissionDeniedCard onOpenSettings={openSystemSettings} />
        )}

        {NOTIFICATION_GROUPS.map((group) => (
          <NotificationGroup
            key={group.label}
            group={group}
            enabled={enabled}
            onToggle={toggle}
            savingKey={savingKey}
          />
        ))}

        <Text style={styles.hint}>
          Puedes cambiar este permiso en cualquier momento desde la configuración de tu dispositivo.
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
  hint: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
  },
});
