import { View, Pressable, StyleSheet, ImageSourcePropType } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SPACING } from "@/theme";
import { Text } from "../ui";
import { Image } from "expo-image";

// Icon mapping - centralized icon management
const ICON_MAP: Record<string, ImageSourcePropType> = {
  profile: require("@/assets/icons/profile.png"),
  location: require("@/assets/icons/location.png"),
  family: require("@/assets/icons/family.png"),
  card: require("@/assets/icons/card.png"),
  notification: require("@/assets/icons/notification.png"),
  security: require("@/assets/icons/security.png"),
  safety: require("@/assets/icons/safety.png"),
  agent: require("@/assets/icons/agent.png"),
  plane: require("@/assets/icons/plane.png"),
  ship: require("@/assets/icons/ship.png"),
  truck: require("@/assets/icons/truck.png"),
};

type IconType =
  | keyof typeof ICON_MAP
  | React.ComponentProps<typeof MaterialCommunityIcons>["name"];

interface Props {
  icon?: IconType;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  opacity?: number;
  iconColor?: string;
  iconBackgroundColor?: string;
}

function ProfileListItem(props: Props) {
  const {
    icon,
    title,
    subtitle,
    opacity = 1,
    onPress,
    iconColor,
    iconBackgroundColor,
  } = props;

  // Use custom colors if provided, otherwise use primary green color
  const colors = {
    icon: iconColor || COLORS.primary.main,
    background: iconBackgroundColor || `${COLORS.primary.main}05`,
  };

  // Determine icon type and render accordingly
  const renderIcon = () => {
    if (!icon) return null;

    // Check if it's a custom PNG icon from our map
    if (icon in ICON_MAP) {
      return (
        <Image
          source={ICON_MAP[icon as keyof typeof ICON_MAP]}
          style={styles.iconImage}
          contentFit="contain"
        />
      );
    }

    // Otherwise, treat it as a MaterialCommunityIcon name
    return (
      <MaterialCommunityIcons
        name={
          icon as React.ComponentProps<typeof MaterialCommunityIcons>["name"]
        }
        size={24}
        color={colors.icon}
      />
    );
  };

  return (
    <Pressable
      onPress={onPress ? onPress : undefined}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : opacity },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: colors.background }]}
      >
        {renderIcon()}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {onPress && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={COLORS.neutral.gray500}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 12,
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.xs,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    width: 64,
    height: 64,
    borderRadius: 20,
  },
  iconImage: {
    width: 48,
    height: 48,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  textContainer: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 15,
    color: COLORS.text.primary,
    lineHeight: 20,
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
});

export default ProfileListItem;
