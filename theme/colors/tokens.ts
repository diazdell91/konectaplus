import { SEMANTIC } from "./semantic";

/**
 * Component Tokens — Capa 3
 *
 * Tokens específicos por componente.
 * Los componentes UI importan desde aquí — no desde SEMANTIC directamente.
 * Permite customizar un componente sin afectar la semántica global.
 */

export const TOKENS = {
  // ── Button ─────────────────────────────────────────────────────
  button: {
    primary: {
      bg:         SEMANTIC.primary,
      bgPressed:  SEMANTIC.primaryDark,
      text:       SEMANTIC.textInverse,
    },
    secondary: {
      bg:         SEMANTIC.surface,
      bgPressed:  SEMANTIC.surfaceBackground,
      text:       SEMANTIC.primary,
      border:     SEMANTIC.borderLight,
    },
    outline: {
      bg:         "transparent",
      bgPressed:  SEMANTIC.surfaceBackground,
      text:       SEMANTIC.primary,
      border:     SEMANTIC.borderMedium,
    },
    ghost: {
      bg:         "transparent",
      bgPressed:  SEMANTIC.blueSoft,
      text:       SEMANTIC.primary,
    },
    success: {
      bg:         SEMANTIC.primaryDark,
      bgPressed:  SEMANTIC.primaryDark,
      text:       SEMANTIC.textInverse,
    },
    disabled: {
      bg:         SEMANTIC.borderLight,
      text:       SEMANTIC.textDisabled,
    },
  },

  // ── Input ──────────────────────────────────────────────────────
  input: {
    bg:              SEMANTIC.surfaceBackground,
    bgFocused:       SEMANTIC.surface,
    bgDisabled:      SEMANTIC.borderLight,
    border:          SEMANTIC.borderLight,
    borderFocused:   SEMANTIC.borderFocus,
    borderError:     SEMANTIC.borderError,
    text:            SEMANTIC.textPrimary,
    placeholder:     SEMANTIC.textDisabled,
    label:           SEMANTIC.textSecondary,
    icon:            SEMANTIC.textSecondary,
    helper:          SEMANTIC.textSecondary,
    error:           SEMANTIC.error,
  },

  // ── Card ───────────────────────────────────────────────────────
  card: {
    bg:              SEMANTIC.surface,
    border:          SEMANTIC.borderLight,
    bgSuccess:       SEMANTIC.successSoft,
    borderSuccess:   SEMANTIC.success,
    bgWarning:       SEMANTIC.warningSoft,
    borderWarning:   SEMANTIC.warning,
    bgError:         SEMANTIC.errorSoft,
    borderError:     SEMANTIC.error,
    bgPrimary:       SEMANTIC.primarySoft,
    borderPrimary:   SEMANTIC.primary,
  },

  // ── List row ───────────────────────────────────────────────────
  row: {
    bg:           SEMANTIC.surface,
    bgSelected:   SEMANTIC.primarySoft,
    bgPressed:    SEMANTIC.surfaceBackground,
    border:       SEMANTIC.borderLight,
    borderSelected: SEMANTIC.primary,
    icon:         SEMANTIC.textSecondary,
    iconSelected: SEMANTIC.primary,
    title:        SEMANTIC.textPrimary,
    subtitle:     SEMANTIC.textSecondary,
  },

  // ── Icon container (Regla del Icon Container) ──────────────────
  iconContainer: {
    primary:  { bg: SEMANTIC.primarySoft,  icon: SEMANTIC.primary  },
    accent:   { bg: SEMANTIC.accentSoft,   icon: SEMANTIC.accent   },
    premium:  { bg: SEMANTIC.premiumSoft,  icon: SEMANTIC.premium  },
    tech:     { bg: SEMANTIC.techSoft,     icon: SEMANTIC.tech     },
    success:  { bg: SEMANTIC.successSoft,  icon: SEMANTIC.success  },
    warning:  { bg: SEMANTIC.warningSoft,  icon: SEMANTIC.warning  },
    error:    { bg: SEMANTIC.errorSoft,    icon: SEMANTIC.error    },
    neutral:  { bg: SEMANTIC.surfaceBackground, icon: SEMANTIC.textSecondary },
  },

  // ── Badge / chip ───────────────────────────────────────────────
  badge: {
    default:  { bg: SEMANTIC.surfaceBackground, text: SEMANTIC.textSecondary },
    primary:  { bg: SEMANTIC.primarySoft,       text: SEMANTIC.primary       },
    success:  { bg: SEMANTIC.successSoft,       text: SEMANTIC.success       },
    warning:  { bg: SEMANTIC.warningSoft,       text: SEMANTIC.warning       },
    error:    { bg: SEMANTIC.errorSoft,         text: SEMANTIC.error         },
    premium:  { bg: SEMANTIC.premiumSoft,       text: SEMANTIC.premium       },
  },

  // ── Tab bar ────────────────────────────────────────────────────
  tab: {
    active:         SEMANTIC.primary,
    inactive:       SEMANTIC.textSecondary,
    background:     SEMANTIC.surface,
    border:         SEMANTIC.borderLight,
    indicatorColor: SEMANTIC.primary,
  },

  // ── Navigation / Header ────────────────────────────────────────
  header: {
    bg:        SEMANTIC.surface,
    border:    SEMANTIC.borderLight,
    title:     SEMANTIC.textPrimary,
    icon:      SEMANTIC.textPrimary,
    backIcon:  SEMANTIC.primary,
  },

  // ── Screen ─────────────────────────────────────────────────────
  screen: {
    bg:         SEMANTIC.surfaceBackground,
    bgFlat:     SEMANTIC.surface,
  },

  // ── Modal / Sheet ──────────────────────────────────────────────
  modal: {
    bg:      SEMANTIC.surface,
    handle:  SEMANTIC.borderLight,
    overlay: SEMANTIC.overlay,
  },

  // ── Skeleton loading ───────────────────────────────────────────
  skeleton: {
    base:      SEMANTIC.borderLight,
    highlight: SEMANTIC.surfaceBackground,
  },

  // ── Divider ────────────────────────────────────────────────────
  divider: SEMANTIC.borderLight,

  // ── Wallet card (gradient) ─────────────────────────────────────
  walletCard: {
    gradient:    SEMANTIC.gradient.wallet,
    text:        SEMANTIC.textInverse,
    textSoft:    "rgba(255,255,255,0.7)",
    iconBg:      "rgba(255,255,255,0.15)",
  },
} as const;
