// ── Color system (3 layers) ────────────────────────────────────────────────
export { COLORS, PRIMITIVE, SEMANTIC, TOKENS } from "./colors";

// ── Other tokens ───────────────────────────────────────────────────────────
export { BORDER_RADIUS, COMPONENT_SIZES, COMPONENT_STYLES } from "./components";
export { SPACING } from "./spacing";
export { FONT_FAMILIES, FONT_SIZES, LINE_HEIGHTS, TYPOGRAPHY } from "./typography";

// ── THEME — punto de entrada único ────────────────────────────────────────
import { COLORS, PRIMITIVE, SEMANTIC, TOKENS } from "./colors";
import { BORDER_RADIUS, COMPONENT_SIZES, COMPONENT_STYLES } from "./components";
import { SPACING } from "./spacing";
import { FONT_FAMILIES, FONT_SIZES, LINE_HEIGHTS, TYPOGRAPHY } from "./typography";

export const THEME = {
  colors:     COLORS,
  primitive:  PRIMITIVE,
  semantic:   SEMANTIC,
  tokens:     TOKENS,
  spacing:    SPACING,
  typography: TYPOGRAPHY,
  fonts:      FONT_FAMILIES,
  fontSizes:  FONT_SIZES,
  lineHeights: LINE_HEIGHTS,
  components: COMPONENT_STYLES,
  sizes:      COMPONENT_SIZES,
  radius:     BORDER_RADIUS,
} as const;

// ── TypeScript helpers ─────────────────────────────────────────────────────
export type TypographyVariant  = keyof typeof TYPOGRAPHY;
export type ColorKey           = keyof typeof COLORS;
export type SpacingKey         = keyof typeof SPACING;
export type BorderRadiusKey    = keyof typeof BORDER_RADIUS;
export type ComponentStyleKey  = keyof typeof COMPONENT_STYLES;
