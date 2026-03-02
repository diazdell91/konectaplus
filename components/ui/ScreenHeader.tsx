import { View, StyleSheet, ImageSourcePropType } from "react-native";
import Text from "./Text";
import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import { Image } from "expo-image";

// Icon mapping - centralized icon management
const ICON_MAP: Record<string, ImageSourcePropType> = {
  packages: require("@/assets/icons/packages.png"),
  man: require("@/assets/icons/man.png"),
  woman: require("@/assets/icons/woman.png"),
};

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  iconName?: keyof typeof ICON_MAP;
}

export default function ScreenHeader({
  title,
  subtitle,
  iconName = "packages",
}: ScreenHeaderProps) {
  return (
    <View style={styles.headerSection}>
      <View style={styles.headerContent}>
        <View style={styles.headerIconContainer}>
          <Image
            source={ICON_MAP[iconName]}
            style={{ width: 52, height: 52 }}
            contentFit="contain"
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: COLORS.surface.primary,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${COLORS.primary.main}10`,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});
