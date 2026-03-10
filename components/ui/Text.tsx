import { COLORS, FONT_FAMILIES, TYPOGRAPHY, TypographyVariant } from "@/theme";
import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle["textAlign"];
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;

  // Shorthand variant props — convenientes para uso inline
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  body?: boolean;
  bodyMedium?: boolean;
  bodySemiBold?: boolean;
  button?: boolean;
  label?: boolean;
  input?: boolean;
  caption?: boolean;
  small?: boolean;
  overline?: boolean;
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const DEFAULT_COLORS: Partial<Record<TypographyVariant, string>> = {
  label:    COLORS.text.secondary,
  caption:  COLORS.text.secondary,
  small:    COLORS.text.secondary,
  overline: COLORS.text.secondary,
};

function resolveVariant(props: TextProps): TypographyVariant {
  if (props.variant)     return props.variant;
  if (props.h1)          return "h1";
  if (props.h2)          return "h2";
  if (props.h3)          return "h3";
  if (props.h4)          return "h4";
  if (props.bodySemiBold) return "bodySemiBold";
  if (props.bodyMedium)  return "bodyMedium";
  if (props.button)      return "button";
  if (props.label)       return "label";
  if (props.input)       return "input";
  if (props.caption)     return "caption";
  if (props.small)       return "small";
  if (props.overline)    return "overline";
  return "body";
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const Text = ({
  variant,
  color,
  align,
  uppercase,
  style,
  children,
  // shorthand booleans — consumed by resolveVariant, not forwarded to RNText
  h1, h2, h3, h4,
  body, bodyMedium, bodySemiBold,
  button, label, input, caption, small, overline,
  ...rest
}: TextProps) => {
  const resolvedVariant = resolveVariant({
    variant, h1, h2, h3, h4,
    body, bodyMedium, bodySemiBold,
    button, label, input, caption, small, overline,
  });

  const base = TYPOGRAPHY[resolvedVariant];
  const defaultColor = DEFAULT_COLORS[resolvedVariant] ?? COLORS.text.primary;

  const finalStyle: TextStyle = {
    ...base,
    color: color ?? defaultColor,
    ...(align    && { textAlign: align }),
    ...(uppercase && { textTransform: "uppercase" as const }),
  };

  return (
    <RNText style={[finalStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
