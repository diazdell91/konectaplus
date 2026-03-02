import { View, Pressable, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS, TYPOGRAPHY, SPACING } from "@/theme";
import { Text } from "../ui";

interface Props {
  icon?: React.ComponentProps<typeof Icon>["name"];
  iconComponent?: React.ReactElement;
  label: string;
  value: string;
  onPress?: () => void;
  opacity?: number;
  showDivider?: boolean;
}

function ProfileInfoListItem(props: Props) {
  const { icon, iconComponent, label, value, opacity = 1, onPress, showDivider = true } = props;

  return (
    <Pressable
      onPress={onPress ? onPress : undefined}
      style={[styles.container, { opacity }]}
      android_ripple={{ color: COLORS.neutral.gray100 }}
    >
      {/* Icon Container */}
      {(icon || iconComponent) && (
        <View style={styles.iconContainer}>
          {iconComponent && iconComponent}
          {icon && (
            <View style={styles.iconCircle}>
              <Icon name={icon} size={24} color={COLORS.primary.main} />
            </View>
          )}
        </View>
      )}

      {/* Content */}
      <View style={[styles.contentContainer, showDivider && styles.withDivider]}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        </View>

        {/* Chevron */}
        {onPress && (
          <View style={styles.chevronContainer}>
            <Icon name="chevron-right" size={24} color={COLORS.text.secondary} />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background.primary,
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.neutral.gray50,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
  withDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  textContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
  },
  value: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text.primary,
    fontSize: 16,
  },
  chevronContainer: {
    marginLeft: SPACING.sm,
  },
});

export default ProfileInfoListItem;
