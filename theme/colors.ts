/**
 * Design System Colors - Based on "Revisar y confirmar" reference screen
 * Flat design with no shadows, clean and minimal aesthetic
 */

export const COLORS = {
  // Primary brand colors
  primary: {
    main: "#09816c", // Main green (tint)
    light: "#09816c", // Success green
    dark: "#179474", // Dark green variant
  },

  // Secondary colors
  secondary: {
    main: "#FF830C", // Orange accent
    light: "#FDBB00", // Yellow variant
    dark: "#FB4B97", // Pink/red variant
  },

  // Semantic colors
  semantic: {
    success: "#00D600",
    warning: "#FDBB00",
    error: "#E56862",
    info: "#38A9E8",
  },

  // Neutral colors - Based on reference screen
  neutral: {
    // Pure colors
    white: "#FFFFFF",
    black: "#000000",

    // Gray scale - matching reference screen tones
    gray50: "#F9FAFB", // Lightest background
    gray100: "#F4F6F9", // Light surface
    gray200: "#EAEAEE", // Light border (from reference)
    gray300: "#DFE5EE", // Border color
    gray400: "#6C7B8A", // Medium gray text
    gray500: "#414042", // Dark gray text
    gray900: "#111111", // Near black (from reference)
  },

  // Surface colors
  surface: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F4F6F9",
  },

  // Text colors - Based on reference screen
  text: {
    primary: "#111111", // From reference screen
    secondary: "#6C7B8A", // Medium gray
    tertiary: "#414042", // Dark gray
    inverse: "#FFFFFF",
  },

  // Border colors
  border: {
    light: "#EAEAEE", // From reference screen
    medium: "#DFE5EE",
    dark: "#6C7B8A",
  },

  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F4F6F9",
  },

  // Legacy colors (to be phased out)
  light: {
    text: "#111111",
    background: "#F9FAFB",
    background2: "#E9EFF1",
    background3: "#F6F6F6",
    tint: "#4fbe9f",
    primary: "#4fbe9f",
    secondary: "#FF830C",
    success: "#40EC94",
    error: "#E56862",
    surface: "#F7F7F7",
    tabIconDefault: "#ccc",
    tabIconSelected: "#05AC65",
    white: "#FFFFFF",
    lightBlue: "#EDF4FE",
    blue: "#38A9E8",
    black: "#000000",
    black2: "#414042",
    border: "#EAEAEE",
    red: "#FB4B97",
    green: "#00D600",
    green2: "#D2F5AE",
    yellow: "#FDBB00",
    blue800: "#0063FE",
    purple: "#5300CB",
    backDrop: "rgba(0, 0, 0, 0.1)",
    // Grey colors
    grey00: "#6C7B8A",
    grey01: "#DFE5EE",
    grey02: "#6C7B8A",
    grey03: "#F4F6F9",
    grey04: "#F8FAFE",
    grey05: "#F9FBFE",
    grey06: "#F9FAFC",
    grey07: "#F9FAFB",
    grey08: "#F9FAFB",
    grey09: "#F9FAFB",
    grey10: "#F9FAFB",
    // Blue colors
    blue00: "#0F67FD",
    blue01: "#2E398F",
    blue02: "#3E4CBF",
    blue03: "#4C5FEF",
    blue04: "#828FF4",
    blue05: "#CACFFB",
    blue06: "#39798C",
    blue07: "#4CA1BA",
    blue08: "#5FC9E9",
    blue09: "#9FDFF2",
    blue10: "#CFEFF9",
    // Green colors
    green01: "#179474",
    green02: "#19AC85",
    green03: "#1ED7A6",
    green04: "#79E7CA",
    green05: "#A6F0DB80",
    green06: "#1E4C51",
    green07: "#2B6D74",
    green08: "#417C83",
    green09: "#6B999F",
    green10: "#95B6BA",
  },

  dark: {
    text: "#FFFFFF",
    background: "#000000",
    tint: "#FFFFFF",
  },
};

// Color tokens for consistent usage
export const colorTokens = {
  // Interactive states
  interactive: {
    primary: COLORS.primary.main,
    primaryHover: COLORS.primary.dark,
    primaryDisabled: COLORS.neutral.gray200,

    secondary: COLORS.neutral.white,
    secondaryHover: COLORS.neutral.gray50,

    danger: COLORS.semantic.error,
    dangerHover: "#D14343",
  },

  // Status colors
  status: {
    success: COLORS.semantic.success,
    warning: COLORS.semantic.warning,
    error: COLORS.semantic.error,
    info: COLORS.semantic.info,
  },
} as const;

export default COLORS;
