import { COLORS } from "./colors";
import { SPACING } from "./spacing";
import { FONT_SIZES } from "./typography";

// ─────────────────────────────────────────────
// Border radius
// ─────────────────────────────────────────────

export const BORDER_RADIUS = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 24,
  full: 999,
} as const;

// ─────────────────────────────────────────────
// Component sizing tokens
// ─────────────────────────────────────────────

export const COMPONENT_SIZES = {
  button: {
    height: 52,
    heightSm: 44,
    radius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },
  input: {
    height: 56,
    heightSm: 44,
    radius: BORDER_RADIUS.md,
    borderWidth: 1,
    fontSize: FONT_SIZES.md,
  },
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },
  avatar: {
    sm: 32,
    md: 40,
    lg: 56,
  },
  touchTarget: SPACING.touch.comfortable,
} as const;

// ─────────────────────────────────────────────
// Component style definitions
// ─────────────────────────────────────────────

export const COMPONENT_STYLES = {
  button: {
    primary: {
      backgroundColor: COLORS.primary.main,
      borderRadius: BORDER_RADIUS.lg,
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: COMPONENT_SIZES.button.height,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
    secondary: {
      backgroundColor: COLORS.neutral.white,
      borderRadius: BORDER_RADIUS.lg,
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: COMPONENT_SIZES.button.height,
      borderWidth: 1,
      borderColor: COLORS.border.light,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
    outline: {
      backgroundColor: "transparent",
      borderRadius: BORDER_RADIUS.lg,
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: COMPONENT_SIZES.button.height,
      borderWidth: 1,
      borderColor: COLORS.border.medium,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
    ghost: {
      backgroundColor: "transparent",
      borderRadius: BORDER_RADIUS.lg,
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: COMPONENT_SIZES.button.height,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
  },

  input: {
    container: {
      backgroundColor: COLORS.surface.primary,
      borderRadius: BORDER_RADIUS.md,
      borderWidth: 1,
      borderColor: COLORS.border.light,
      paddingHorizontal: SPACING.component.inputPaddingHorizontal,
      paddingVertical: SPACING.component.inputPaddingVertical,
      minHeight: COMPONENT_SIZES.input.height,
    },
    focused: {
      borderColor: COLORS.border.focus,
    },
    error: {
      borderColor: COLORS.border.error,
    },
    disabled: {
      backgroundColor: COLORS.neutral.gray50,
      borderColor: COLORS.border.light,
    },
  },

  card: {
    default: {
      backgroundColor: COLORS.surface.primary,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.border.light,
    },
    section: {
      backgroundColor: COLORS.surface.primary,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.border.light,
    },
    warning: {
      backgroundColor: COLORS.semantic.warningTint,
      borderRadius: BORDER_RADIUS.md,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.semantic.warning,
    },
    success: {
      backgroundColor: COLORS.semantic.successTint,
      borderRadius: BORDER_RADIUS.md,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.primary.main,
    },
    error: {
      backgroundColor: COLORS.semantic.errorTint,
      borderRadius: BORDER_RADIUS.md,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.semantic.error,
    },
  },

  chip: {
    default: {
      backgroundColor: COLORS.neutral.gray100,
      borderRadius: BORDER_RADIUS.full,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
    },
    selected: {
      backgroundColor: COLORS.primary.tint,
      borderRadius: BORDER_RADIUS.full,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderWidth: 1,
      borderColor: COLORS.primary.main,
    },
  },

  divider: {
    horizontal: {
      height: 1,
      backgroundColor: COLORS.border.light,
    },
    vertical: {
      width: 1,
      backgroundColor: COLORS.border.light,
    },
  },

  modal: {
    container: {
      backgroundColor: COLORS.surface.primary,
      borderTopLeftRadius: BORDER_RADIUS.xxl,
      borderTopRightRadius: BORDER_RADIUS.xxl,
      paddingHorizontal: SPACING.component.screenPadding,
      paddingTop: SPACING.lg,
    },
    backdrop: {
      backgroundColor: COLORS.background.overlay,
    },
  },

  screen: {
    container: {
      flex: 1,
      backgroundColor: COLORS.background.secondary,
    },
    content: {
      paddingHorizontal: SPACING.component.screenPadding,
    },
  },
} as const;

export default COMPONENT_STYLES;
