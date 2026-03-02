/**
 * Design System Spacing - Based on "Revisar y confirmar" reference screen
 * Consistent spacing scale for margins, padding, and layout
 */

// Base spacing unit (8px grid system)
const BASE_UNIT = 8;

export const SPACING = {
  // Core spacing scale (8px base unit)
  xs: BASE_UNIT * 0.5, // 4px
  sm: BASE_UNIT, // 8px
  md: BASE_UNIT * 2, // 16px - Main content padding from reference
  lg: BASE_UNIT * 3, // 24px
  xl: BASE_UNIT * 4, // 32px
  xxl: BASE_UNIT * 6, // 48px
  xxxl: BASE_UNIT * 8, // 64px

  // Component-specific spacing
  component: {
    // Padding values from reference screen
    cardPadding: 16, // Standard card content padding
    screenPadding: 16, // Screen edge padding
    sectionPadding: 24, // Between sections

    // Button spacing
    buttonPaddingVertical: 14, // From reference screen buttons
    buttonPaddingHorizontal: 16,

    // Input spacing
    inputPaddingVertical: 12,
    inputPaddingHorizontal: 12,

    // List item spacing
    listItemPadding: 16,
    listItemGap: 12,
  },

  // Layout spacing
  layout: {
    headerHeight: 56,
    tabBarHeight: 64,
    bottomSafeArea: 34,
  },

  // Interactive element sizing
  touch: {
    minTarget: 44, // Minimum touch target size
    comfortableTarget: 48, // Comfortable touch target
  },
} as const;

// Semantic spacing tokens
export const spacingTokens = {
  // Container spacing
  container: {
    xs: SPACING.xs,
    sm: SPACING.sm,
    md: SPACING.md,
    lg: SPACING.lg,
    xl: SPACING.xl,
  },

  // Component spacing
  input: {
    vertical: SPACING.component.inputPaddingVertical,
    horizontal: SPACING.component.inputPaddingHorizontal,
  },

  button: {
    vertical: SPACING.component.buttonPaddingVertical,
    horizontal: SPACING.component.buttonPaddingHorizontal,
  },

  card: {
    padding: SPACING.component.cardPadding,
    margin: SPACING.sm,
  },
} as const;

export default SPACING;
