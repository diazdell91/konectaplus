/**
 * Design System Index - Central Export for Theme Components
 * Based on "Revisar y confirmar" reference screen
 */

// Create THEME object here to avoid circular imports
import { COLORS } from "./colors";
import { BORDER_RADIUS, COMPONENT_STYLES } from "./components";
import { SPACING } from "./spacing";
import { APP_DIMENSIONS } from "./theme";
import { TYPOGRAPHY } from "./typography";
// Core theme exports
export { COLORS, colorTokens } from "./colors";
export { BORDER_RADIUS, COMPONENT_STYLES, SIZES } from "./components";
export { componentSpacing, darkTheme, lightTheme } from "./paperTheme";
export { SPACING, spacingTokens } from "./spacing";
export {
  FONT_FAMILIES,
  FONT_SIZES,
  FONTS,
  LINE_HEIGHTS,
  TYPOGRAPHY,
} from "./typography";

// Legacy exports for backward compatibility
export { COLORS as default } from "./colors";

// App dim

// Create THEME object here to avoid circular imports

export const THEME = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  components: COMPONENT_STYLES,
  borderRadius: BORDER_RADIUS,
  dimensions: APP_DIMENSIONS,
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof COLORS.neutral;
export type SpacingToken = keyof typeof SPACING;
export type TypographyVariant = keyof typeof TYPOGRAPHY;
export type ComponentVariant = keyof typeof COMPONENT_STYLES;
