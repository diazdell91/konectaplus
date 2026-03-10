export const FONT_FAMILIES = {
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  semiBold: "Montserrat-SemiBold",
  bold: "Montserrat-Bold",
} as const;

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  xxxxl: 32,
} as const;

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const TYPOGRAPHY = {
  h1: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.xxxxl,
    lineHeight: FONT_SIZES.xxxxl * LINE_HEIGHTS.normal,
    fontWeight: "700" as const,
  },
  h2: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.xxxl,
    lineHeight: FONT_SIZES.xxxl * LINE_HEIGHTS.normal,
    fontWeight: "700" as const,
  },
  h3: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.xxl,
    lineHeight: FONT_SIZES.xxl * LINE_HEIGHTS.normal,
    fontWeight: "700" as const,
  },
  h4: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.xl,
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
  },
  body: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "500" as const,
  },
  bodySemiBold: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
  },
  button: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
  },
  input: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },
  label: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    fontWeight: "500" as const,
  },
  caption: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.xs,
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },
  small: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    fontWeight: "400" as const,
  },
  overline: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.xs,
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
    fontWeight: "600" as const,
    textTransform: "uppercase" as const,
    letterSpacing: 0.6,
  },
} as const;

export default TYPOGRAPHY;
