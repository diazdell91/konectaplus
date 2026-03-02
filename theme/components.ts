/**
 * Design System Components - Based on "Revisar y confirmar" reference screen
 * Consistent component styles with flat design principles
 */

import { COLORS } from "./colors";
import { SPACING } from "./spacing";
import { TYPOGRAPHY } from "./typography";

// Border radius system - Based on reference screen
export const BORDER_RADIUS = {
  none: 0,
  sm: 6, // Small elements
  md: 12, // Input fields (from reference)
  lg: 16, // Cards and containers
  xl: 24, // Large containers
  full: 999, // Pills/badges
} as const;

// Component style definitions
export const COMPONENT_STYLES = {
  // Button styles - Based on reference screen buttons
  button: {
    primary: {
      backgroundColor: COLORS.primary.main,
      borderRadius: BORDER_RADIUS.lg, // Reduced from 32px to match reference
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: 48,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      // NO SHADOWS - flat design
    },

    secondary: {
      backgroundColor: COLORS.neutral.white,
      borderRadius: BORDER_RADIUS.lg,
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: 48,
      borderWidth: 1,
      borderColor: COLORS.border.light,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      // NO SHADOWS
    },

    outline: {
      backgroundColor: "transparent",
      borderRadius: BORDER_RADIUS.lg,
      paddingVertical: SPACING.component.buttonPaddingVertical,
      paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
      minHeight: 48,
      borderWidth: 1,
      borderColor: COLORS.border.medium,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
  },

  // Input styles - Based on reference screen
  input: {
    container: {
      backgroundColor: COLORS.surface.primary,
      borderRadius: BORDER_RADIUS.md, // 12px from reference
      borderWidth: 1,
      borderColor: COLORS.border.light, // Light border from reference
      paddingHorizontal: SPACING.component.inputPaddingHorizontal,
      paddingVertical: SPACING.component.inputPaddingVertical,
      minHeight: 48,
      // NO SHADOWS - flat design
    },

    focused: {
      borderColor: COLORS.primary.main,
    },

    error: {
      borderColor: COLORS.semantic.error,
    },

    disabled: {
      backgroundColor: COLORS.neutral.gray50,
      borderColor: COLORS.border.light,
    },
  },

  // Card styles - Based on reference screen cards
  card: {
    default: {
      backgroundColor: COLORS.surface.primary,
      borderRadius: BORDER_RADIUS.lg, // 16px for cards
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.border.light,
      // NO SHADOWS - completely flat design like reference
    },

    elevated: {
      backgroundColor: COLORS.surface.primary,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: COLORS.border.light,
      // Still NO SHADOWS - reference screen is completely flat
    },

    warning: {
      backgroundColor: "#FEF3C7", // Warning card from reference
      borderRadius: BORDER_RADIUS.md,
      padding: SPACING.component.cardPadding,
      borderWidth: 1,
      borderColor: "#F59E0B",
    },
  },

  // Header styles
  header: {
    container: {
      backgroundColor: COLORS.surface.primary,
      paddingHorizontal: SPACING.component.screenPadding,
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border.light,
      // NO SHADOWS
    },
  },

  // Modal/Sheet styles - Based on reference modal
  modal: {
    container: {
      backgroundColor: COLORS.surface.primary,
      borderTopLeftRadius: BORDER_RADIUS.xl,
      borderTopRightRadius: BORDER_RADIUS.xl,
      paddingHorizontal: SPACING.component.screenPadding,
      paddingTop: SPACING.lg,
      // NO SHADOWS - flat design
    },

    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },

  // List item styles
  listItem: {
    container: {
      backgroundColor: COLORS.surface.primary,
      paddingHorizontal: SPACING.component.listItemPadding,
      paddingVertical: SPACING.component.listItemPadding,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border.light,
      minHeight: 56,
      // NO SHADOWS
    },
  },

  // Chip/Badge styles - Based on reference chips
  chip: {
    default: {
      backgroundColor: COLORS.neutral.gray100,
      borderRadius: BORDER_RADIUS.full,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      // NO SHADOWS
    },

    selected: {
      backgroundColor: COLORS.primary.main,
      borderRadius: BORDER_RADIUS.full,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
    },
  },

  // Divider styles
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
} as const;

// Size system
export const SIZES = {
  // Legacy sizes (keep for backward compatibility)
  base: SPACING.sm,
  font: SPACING.sm,
  radius: BORDER_RADIUS.lg,
  padding: SPACING.sm,

  // Font sizes
  h1: TYPOGRAPHY.h1.fontSize,
  h2: TYPOGRAPHY.h2.fontSize,
  h3: TYPOGRAPHY.h3.fontSize,
  h4: TYPOGRAPHY.h4.fontSize,
  h5: TYPOGRAPHY.body.fontSize,
  text: TYPOGRAPHY.body.fontSize,
  caption: TYPOGRAPHY.caption.fontSize,
  button: TYPOGRAPHY.button.fontSize,
  label: TYPOGRAPHY.label.fontSize,
  title: TYPOGRAPHY.body.fontSize,

  // Component sizes
  buttonHeight: 48, // Reduced from 56px to match reference
  buttonRadius: BORDER_RADIUS.md, // Reduced from 32px to match reference
  buttonBorder: 1,

  inputHeight: 56, // Reduced from 48 to match CardField design
  inputRadius: BORDER_RADIUS.md,
  inputBorder: 1,

  // Touch targets
  touchableWidth: SPACING.touch.comfortableTarget,
  touchableHeight: SPACING.touch.comfortableTarget,
} as const;

export default COMPONENT_STYLES;
