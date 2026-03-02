/**
 * Design System Typography - Based on "Revisar y confirmar" reference screen
 * Consistent typography scale with clear hierarchy
 */

// Font families
export const FONT_FAMILIES = {
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  semiBold: "Montserrat-SemiBold",
  bold: "Montserrat-Bold",
} as const;

// Font sizes - Based on reference screen hierarchy
export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14, // Body text from reference
  md: 16, // Standard text size
  lg: 18, // Subtitle
  xl: 20, // Section headers from reference
  xxl: 24, // Page titles
  xxxl: 28, // Large headings
  xxxxl: 32, // Hero text
} as const;

// Line heights
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Typography variants matching reference screen
export const TYPOGRAPHY = {
  // Headers - Based on reference screen
  h1: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.xxxxl, // 32px
    lineHeight: FONT_SIZES.xxxxl * LINE_HEIGHTS.normal, // 44.8px - Fixed: was tight (38.4px), now normal to prevent clipping
    fontWeight: "700" as const,
  },

  h2: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.xxxl, // 28px
    lineHeight: FONT_SIZES.xxxl * LINE_HEIGHTS.normal, // 39.2px - Fixed: was tight (33.6px), now normal to prevent clipping
    fontWeight: "700" as const,
  },

  h3: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.xxl, // 24px
    lineHeight: FONT_SIZES.xxl * LINE_HEIGHTS.normal, // 33.6px - Fixed: was tight (28.8px), now normal to prevent clipping
    fontWeight: "700" as const,
  },

  h4: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.xl, // 20px - Section headers from reference
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
  },

  // Body text variants
  body: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.base, // 14px - Main body text from reference
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },

  bodyMedium: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.base, // 14px
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "500" as const,
  },

  bodySemiBold: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.base, // 14px
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
  },

  // UI element text
  button: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.md, // 16px - Button text from reference
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
  },

  input: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.md, // 16px - Input text
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },

  label: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.sm, // 12px - Form labels
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    fontWeight: "500" as const,
  },

  // Small text variants
  caption: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.xs, // 10px - Small helper text
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },

  small: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.sm, // 12px - Small text
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },

  // Specialized variants from reference screen
  address: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.base, // Address text from reference
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.relaxed, // Slightly more line height for readability
    fontWeight: "400" as const,
  },

  pin: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.lg, // PIN display
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.tight,
    fontWeight: "700" as const,
  },

  time: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.base, // Time text from reference
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },
} as const;

// Legacy font styles (to be phased out)
export const FONTS = {
  h1: TYPOGRAPHY.h1,
  h2: TYPOGRAPHY.h2,
  h3: TYPOGRAPHY.h3,
  body: TYPOGRAPHY.body,
  inputLabel: TYPOGRAPHY.label,
  body2: TYPOGRAPHY.bodyMedium,
  caption: TYPOGRAPHY.caption,
} as const;

export default TYPOGRAPHY;
