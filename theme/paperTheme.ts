import { COLORS } from "./colors";
import { SPACING } from "./spacing";
import { FONT_FAMILIES, FONT_SIZES } from "./typography";

// Light theme
export const lightTheme = {
  colors: {
    primary: COLORS.primary.main, // #09816c - Green
    primaryContainer: COLORS.primary.light, // #09816c
    secondary: COLORS.secondary.main, // #FF830C - Orange
    secondaryContainer: COLORS.secondary.light, // #FDBB00
    tertiary: COLORS.semantic.info, // #38A9E8 - Blue
    tertiaryContainer: "#EDF4FE",
    error: COLORS.semantic.error, // #E56862 - Red
    errorContainer: "#FADAD4",
    background: COLORS.surface.primary, // #FFFFFF
    surface: COLORS.surface.secondary, // #F9FAFB
    surfaceVariant: COLORS.surface.tertiary, // #F4F6F9
    onPrimary: COLORS.neutral.white,
    onSecondary: COLORS.neutral.white,
    onTertiary: COLORS.neutral.white,
    onError: COLORS.neutral.white,
    onBackground: COLORS.text.primary, // #111111
    onSurface: COLORS.text.primary,
    onSurfaceVariant: COLORS.text.secondary, // #6C7B8A
    outline: COLORS.border.light, // #EAEAEE
    outlineVariant: COLORS.border.medium, // #DFE5EE
    shadow: "rgb(0, 0, 0)",
    scrim: "rgba(0, 0, 0, 0.1)",
    inverseSurface: COLORS.text.primary,
    inverseOnSurface: COLORS.neutral.white,
    inversePrimary: COLORS.primary.light,
    elevation: {
      level0: "transparent",
      level1: COLORS.surface.secondary,
      level2: COLORS.surface.tertiary,
      level3: COLORS.neutral.gray50,
      level4: COLORS.neutral.gray50,
      level5: COLORS.neutral.gray50,
    },
  },
  fonts: {
    displayLarge: {
      fontFamily: FONT_FAMILIES.bold,
      fontSize: FONT_SIZES.xxxxl,
      fontWeight: "700",
      lineHeight: FONT_SIZES.xxxxl * 1.2,
    },
    displayMedium: {
      fontFamily: FONT_FAMILIES.bold,
      fontSize: FONT_SIZES.xxxl,
      fontWeight: "700",
      lineHeight: FONT_SIZES.xxxl * 1.2,
    },
    displaySmall: {
      fontFamily: FONT_FAMILIES.bold,
      fontSize: FONT_SIZES.xxl,
      fontWeight: "700",
      lineHeight: FONT_SIZES.xxl * 1.2,
    },
    headlineLarge: {
      fontFamily: FONT_FAMILIES.bold,
      fontSize: FONT_SIZES.xl,
      fontWeight: "700",
      lineHeight: FONT_SIZES.xl * 1.4,
    },
    headlineMedium: {
      fontFamily: FONT_FAMILIES.semiBold,
      fontSize: FONT_SIZES.lg,
      fontWeight: "600",
      lineHeight: FONT_SIZES.lg * 1.4,
    },
    headlineSmall: {
      fontFamily: FONT_FAMILIES.semiBold,
      fontSize: FONT_SIZES.md,
      fontWeight: "600",
      lineHeight: FONT_SIZES.md * 1.4,
    },
    titleLarge: {
      fontFamily: FONT_FAMILIES.semiBold,
      fontSize: FONT_SIZES.lg,
      fontWeight: "600",
      lineHeight: FONT_SIZES.lg * 1.4,
    },
    titleMedium: {
      fontFamily: FONT_FAMILIES.medium,
      fontSize: FONT_SIZES.md,
      fontWeight: "500",
      lineHeight: FONT_SIZES.md * 1.4,
    },
    titleSmall: {
      fontFamily: FONT_FAMILIES.medium,
      fontSize: FONT_SIZES.sm,
      fontWeight: "500",
      lineHeight: FONT_SIZES.sm * 1.4,
    },
    bodyLarge: {
      fontFamily: FONT_FAMILIES.regular,
      fontSize: FONT_SIZES.base,
      fontWeight: "400",
      lineHeight: FONT_SIZES.base * 1.4,
    },
    bodyMedium: {
      fontFamily: FONT_FAMILIES.regular,
      fontSize: FONT_SIZES.sm,
      fontWeight: "400",
      lineHeight: FONT_SIZES.sm * 1.4,
    },
    bodySmall: {
      fontFamily: FONT_FAMILIES.regular,
      fontSize: FONT_SIZES.xs,
      fontWeight: "400",
      lineHeight: FONT_SIZES.xs * 1.4,
    },
    labelLarge: {
      fontFamily: FONT_FAMILIES.medium,
      fontSize: FONT_SIZES.md,
      fontWeight: "500",
      lineHeight: FONT_SIZES.md * 1.4,
    },
    labelMedium: {
      fontFamily: FONT_FAMILIES.medium,
      fontSize: FONT_SIZES.sm,
      fontWeight: "500",
      lineHeight: FONT_SIZES.sm * 1.4,
    },
    labelSmall: {
      fontFamily: FONT_FAMILIES.medium,
      fontSize: FONT_SIZES.xs,
      fontWeight: "500",
      lineHeight: FONT_SIZES.xs * 1.4,
    },
  },
};

// Dark theme
export const darkTheme = {
  colors: {
    primary: COLORS.primary.light, // Light green for dark theme
    primaryContainer: COLORS.primary.main,
    secondary: COLORS.secondary.light,
    secondaryContainer: COLORS.secondary.main,
    tertiary: COLORS.semantic.info,
    tertiaryContainer: "#1F4A5A",
    error: COLORS.semantic.error,
    errorContainer: "#5C2C2F",
    background: "#121212",
    surface: "#1E1E1E",
    surfaceVariant: "#2C2C2C",
    onPrimary: COLORS.text.primary,
    onSecondary: COLORS.text.primary,
    onTertiary: COLORS.neutral.white,
    onError: COLORS.neutral.white,
    onBackground: COLORS.neutral.white,
    onSurface: COLORS.neutral.white,
    onSurfaceVariant: COLORS.text.secondary,
    outline: COLORS.border.dark,
    outlineVariant: COLORS.border.medium,
    shadow: "rgb(0, 0, 0)",
    scrim: "rgba(0, 0, 0, 0.4)",
    inverseSurface: COLORS.neutral.white,
    inverseOnSurface: COLORS.text.primary,
    inversePrimary: COLORS.primary.main,
    elevation: {
      level0: "transparent",
      level1: "#1F1F1F",
      level2: "#242424",
      level3: "#2B2B2B",
      level4: "#2D2D2D",
      level5: "#333333",
    },
  },
  fonts: lightTheme.fonts,
};

// Spacing configuration for components
export const componentSpacing = {
  button: {
    paddingVertical: SPACING.component.buttonPaddingVertical,
    paddingHorizontal: SPACING.component.buttonPaddingHorizontal,
  },
  input: {
    paddingVertical: SPACING.component.inputPaddingVertical,
    paddingHorizontal: SPACING.component.inputPaddingHorizontal,
  },
  card: {
    padding: SPACING.component.cardPadding,
  },
  screen: {
    padding: SPACING.component.screenPadding,
  },
  section: {
    padding: SPACING.component.sectionPadding,
  },
};

export default lightTheme;
