/**
 * Main Theme - Updated Design System Based on "Revisar y confirmar" Reference Screen
 * Flat design with consistent spacing, typography, and colors
 */

import { Dimensions } from "react-native";

// Import design system components
import { COLORS } from "./colors";

// App dimensions
const { width, height } = Dimensions.get("screen");

// Legacy exports for backward compatibility
export const APP_DIMENSIONS = {
  width,
  height,
} as const;

// Export all design system components
export { COLORS } from "./colors";
export { BORDER_RADIUS, COMPONENT_STYLES, SIZES } from "./components";
export { SPACING } from "./spacing";
export { FONTS, TYPOGRAPHY } from "./typography";

// Re-export colors for backward compatibility
export { COLORS as default };

// Theme object is exported from index.ts to avoid circular imports
