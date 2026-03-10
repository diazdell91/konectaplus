import { PRIMITIVE } from "./primitive";

/**
 * Semantic Colors — Capa 2
 *
 * Los colores adquieren propósito de UI.
 * Para dark mode: solo cambia este archivo.
 */

export const SEMANTIC = {
  // ── Brand ──────────────────────────────────────────────────────
  primary:      PRIMITIVE.blue[600],    // #2563EB — acción principal
  primaryLight: PRIMITIVE.blue[500],    // #3B82F6 — hover / pressed
  primaryDark:  PRIMITIVE.blue[700],    // #1D4ED8 — dark variant
  primarySoft:  PRIMITIVE.blue[50],     // #EFF6FF — icon containers, tints

  accent:       PRIMITIVE.orange[500],  // #F97316 — promos, alertas
  accentSoft:   PRIMITIVE.orange[50],   // #FFF7ED

  premium:      PRIMITIVE.purple[600],  // #7C3AED — features premium
  premiumSoft:  PRIMITIVE.purple[50],   // #F5F3FF

  tech:         PRIMITIVE.cyan[500],    // #06B6D4 — tecnología / telecom
  techSoft:     PRIMITIVE.cyan[50],     // #ECFEFF

  // ── Status ─────────────────────────────────────────────────────
  success:      PRIMITIVE.emerald[500], // #10B981
  successLight: PRIMITIVE.emerald[400], // #34D399
  successSoft:  PRIMITIVE.emerald[50],  // #ECFDF5

  warning:      PRIMITIVE.yellow[500],  // #F59E0B
  warningLight: PRIMITIVE.yellow[400],  // #FBBF24
  warningSoft:  PRIMITIVE.yellow[50],   // #FFFBEB

  error:        PRIMITIVE.red[500],     // #EF4444
  errorLight:   PRIMITIVE.red[400],     // #F87171
  errorSoft:    PRIMITIVE.red[50],      // #FEF2F2

  info:         PRIMITIVE.blue[500],    // #3B82F6
  infoSoft:     PRIMITIVE.blue[50],     // #EFF6FF

  // ── Surface system ─────────────────────────────────────────────
  surfaceBackground: PRIMITIVE.gray[50],   // #F8FAFC — fondo de pantalla
  surface:           PRIMITIVE.white,      // #FFFFFF — cards / contenedores
  surfaceElevated:   PRIMITIVE.white,      // modals, sheets
  surfaceTint:       PRIMITIVE.blue[50],   // superficies con énfasis de marca

  // ── Text ───────────────────────────────────────────────────────
  textPrimary:   PRIMITIVE.gray[900],   // #0F172A
  textSecondary: PRIMITIVE.gray[500],   // #64748B
  textTertiary:  PRIMITIVE.gray[600],   // #475569
  textInverse:   PRIMITIVE.white,
  textLink:      PRIMITIVE.blue[600],   // #2563EB
  textDisabled:  PRIMITIVE.gray[400],   // #94A3B8

  // ── Border ─────────────────────────────────────────────────────
  borderLight:   PRIMITIVE.gray[200],   // #E2E8F0 — divisores
  borderMedium:  PRIMITIVE.gray[300],   // #CBD5E1
  borderFocus:   PRIMITIVE.blue[600],   // #2563EB — input focused
  borderError:   PRIMITIVE.red[500],    // #EF4444

  // ── Overlay / transparency ─────────────────────────────────────
  overlay:      "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.15)",
  scrim:        "rgba(15, 23, 42, 0.06)",

  // ── Transparent soft tones (icon containers, banners) ──────────
  blueSoft:   "rgba(37, 99, 235, 0.08)",
  orangeSoft: "rgba(249, 115, 22, 0.08)",
  purpleSoft: "rgba(124, 58, 237, 0.08)",
  cyanSoft:   "rgba(6, 182, 212, 0.08)",

  // ── Social (hardcoded OK — external brand) ─────────────────────
  social: {
    facebook:  "#1877F2",
    instagram: "#E4405F",
    whatsapp:  "#25D366",
    google:    "#4285F4",
    apple:     "#000000",
  },

  // ── Payment networks (hardcoded OK — external brand) ───────────
  card: {
    visa:       { label: "#1A1F71", bg: "#EEF0FB" },
    mastercard: { label: "#EB001B", bg: "#FEF0F0" },
    amex:       { label: "#007BC1", bg: "#EDF6FD" },
  },

  // ── Gradients ──────────────────────────────────────────────────
  gradient: {
    brand:   [PRIMITIVE.blue[600],   PRIMITIVE.blue[400]]   as const,
    premium: [PRIMITIVE.purple[600], PRIMITIVE.purple[400]] as const,
    promo:   [PRIMITIVE.orange[500], PRIMITIVE.orange[300]] as const,
    tech:    [PRIMITIVE.cyan[500],   PRIMITIVE.cyan[300]]   as const,
    wallet:  [PRIMITIVE.blue[700],   PRIMITIVE.blue[500]]   as const,
  },
} as const;
