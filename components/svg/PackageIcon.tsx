import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

type Props = SvgProps & {
  primaryColor?: string; // verde principal (lado derecho)
  secondaryColor?: string; // tono secundario (sombras/partes)
  paperColor?: string; // blanco
  paperBorderColor?: string; // gris claro
  accentColor?: string; // detalles (icons pequeños)
};

const PackageIcon = ({
  primaryColor = "#4fbe9f",
  secondaryColor = "#98A2B3",
  paperColor = "#ffffff",
  paperBorderColor = "#dcdfe2",
  accentColor = "#dcdfe2",
  ...props
}: Props) => (
  <Svg viewBox="0 0 64 64" {...props}>
    {/* Caja base (gris) */}
    <Path
      d="M11.22 20.86v22.28a1.49 1.49 0 0 0 .78 1.29l19.3 11.14a1.45 1.45 0 0 0 1.48 0L52 44.43a1.49 1.49 0 0 0 .74-1.29V20.86a1.49 1.49 0 0 0-.74-1.29L32.74 8.43a1.45 1.45 0 0 0-1.48 0L12 19.57a1.49 1.49 0 0 0-.78 1.29Z"
      fill={paperBorderColor}
    />

    {/* Tapa superior (antes cls-2) */}
    <Path
      d="m32 32 20.59-11.89a1.5 1.5 0 0 0-.55-.54L42.39 14l-9.65-5.57a1.45 1.45 0 0 0-1.48 0L21.61 14 12 19.57a1.5 1.5 0 0 0-.55.54Z"
      fill={paperBorderColor}
    />

    {/* Etiqueta/parte superior izquierda (antes cls-2) */}
    <Path
      d="M31.66 16.27 18.2 24.04v8.86l6.34 3.66v-8.85l13.47-7.78-6.35-3.66z"
      fill={secondaryColor}
    />

    {/* Frontal blanco */}
    <Path
      d="M31.66 16.27 18.2 24.04l6.34 3.67 13.47-7.78-6.35-3.66z"
      fill={paperColor}
    />

    {/* Lado derecho (verde principal) */}
    <Path
      d="M32 32v23.77a1.49 1.49 0 0 0 .74-.2L42.39 50 52 44.43a1.49 1.49 0 0 0 .74-1.29V20.86a1.61 1.61 0 0 0-.19-.75Z"
      fill={primaryColor}
    />

    {/* Detalles pequeños (antes cls-5) */}
    <Path
      d="M38.32 41.46a.12.12 0 0 1 .14 0l1.8 1.48c.1.08 0 .33-.14.42l-.42.24a.4.4 0 0 0-.18.31v1.46a.86.86 0 0 1-.39.68l-1.59.95c-.22.12-.4 0-.4-.23v-1.48c0-.12-.08-.16-.18-.11l-.43.25c-.15.09-.23-.07-.14-.26l1.79-3.55a.45.45 0 0 1 .14-.16ZM43.82 38.34a.12.12 0 0 1 .14 0l1.8 1.48c.1.08 0 .33-.14.42l-.42.25a.37.37 0 0 0-.18.31v1.45a.85.85 0 0 1-.39.68l-1.63.91c-.22.13-.4 0-.4-.22v-1.46c0-.11-.08-.16-.18-.1l-.42.24c-.15.09-.23-.06-.14-.26l1.79-3.54a.38.38 0 0 1 .17-.16Z"
      fill={accentColor}
    />
  </Svg>
);

export default PackageIcon;
