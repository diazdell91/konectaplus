export { PRIMITIVE } from "./primitive";
export { SEMANTIC } from "./semantic";
export { TOKENS } from "./tokens";

// ─────────────────────────────────────────────────────────────────────────────
// COLORS — objeto backward-compatible
//
// Todos los archivos existentes hacen: import { COLORS } from "@/theme"
// Este objeto mantiene la misma forma que tenían antes para no romper nada,
// pero ahora los valores vienen de las capas correctas.
// ─────────────────────────────────────────────────────────────────────────────

import { PRIMITIVE } from "./primitive";
import { SEMANTIC } from "./semantic";
import { TOKENS } from "./tokens";

export const COLORS = {
  // ── Acceso directo a capas ────────────────────────────────────
  primitive: PRIMITIVE,
  semantic:  SEMANTIC,
  tokens:    TOKENS,

  // ── Backward-compat: forma plana que ya usaba el codebase ─────
  primary: {
    main:  SEMANTIC.primary,
    light: SEMANTIC.primaryLight,
    dark:  SEMANTIC.primaryDark,
    tint:  SEMANTIC.primarySoft,
  },

  accent: {
    main:        SEMANTIC.accent,
    soft:        SEMANTIC.accentSoft,
    premium:     SEMANTIC.premium,
    premiumSoft: SEMANTIC.premiumSoft,
    tech:        SEMANTIC.tech,
    techSoft:    SEMANTIC.techSoft,
  },

  // Alias backward-compat — secondary era el naranja en el theme anterior
  secondary: {
    main:  SEMANTIC.accent,
    light: SEMANTIC.accentSoft,
    dark:  SEMANTIC.accent,
  },

  semantic: {
    success:     SEMANTIC.success,
    warning:     SEMANTIC.warning,
    error:       SEMANTIC.error,
    info:        SEMANTIC.info,
    successTint: SEMANTIC.successSoft,
    errorTint:   SEMANTIC.errorSoft,
    warningTint: SEMANTIC.warningSoft,
    infoTint:    SEMANTIC.infoSoft,
  },

  neutral: {
    white:   PRIMITIVE.white,
    black:   PRIMITIVE.black,
    gray50:  PRIMITIVE.gray[50],
    gray100: PRIMITIVE.gray[100],
    gray200: PRIMITIVE.gray[200],
    gray300: PRIMITIVE.gray[300],
    gray400: PRIMITIVE.gray[400],
    gray500: PRIMITIVE.gray[500],
    gray600: PRIMITIVE.gray[600],
    gray900: PRIMITIVE.gray[900],
  },

  surface: {
    primary:   SEMANTIC.surface,
    secondary: SEMANTIC.surfaceBackground,
    tertiary:  SEMANTIC.surfaceTint,
  },

  text: {
    primary:   SEMANTIC.textPrimary,
    secondary: SEMANTIC.textSecondary,
    tertiary:  SEMANTIC.textTertiary,
    inverse:   SEMANTIC.textInverse,
    link:      SEMANTIC.textLink,
    disabled:  SEMANTIC.textDisabled,
  },

  border: {
    light:  SEMANTIC.borderLight,
    medium: SEMANTIC.borderMedium,
    dark:   SEMANTIC.textSecondary,
    focus:  SEMANTIC.borderFocus,
    error:  SEMANTIC.borderError,
  },

  background: {
    primary:   SEMANTIC.surface,
    secondary: SEMANTIC.surfaceBackground,
    tertiary:  SEMANTIC.surfaceTint,
    overlay:   SEMANTIC.overlay,
  },

  gradient:    SEMANTIC.gradient,
  transparent: {
    blueSoft:    SEMANTIC.blueSoft,
    orangeSoft:  SEMANTIC.orangeSoft,
    purpleSoft:  SEMANTIC.purpleSoft,
    cyanSoft:    SEMANTIC.cyanSoft,
    blackSoft:   SEMANTIC.scrim,
    overlay:     SEMANTIC.overlayLight,
  },

  card:   SEMANTIC.card,
  social: SEMANTIC.social,
} as const;

export default COLORS;
