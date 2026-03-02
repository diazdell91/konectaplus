import * as React from "react";
import Svg, { SvgProps, Path, Rect } from "react-native-svg";

type Props = SvgProps & {
  primaryColor?: string; // verde oscuro (acento)
  secondaryColor?: string; // verde claro (acento)
  paperColor?: string; // blanco
  borderColor?: string; // gris claro
  shadowColor?: string; // gris sombra
};

const DeliveryPackageIcon = ({
  primaryColor = "#09816c",
  secondaryColor = "#4fbe9f",
  paperColor = "#ffffff",
  borderColor = "#dcdfe2",
  shadowColor = "#c7cdd6",
  ...props
}: Props) => (
  <Svg viewBox="0 0 64 64" {...props}>
    {/* Top small detail */}
    <Path
      d="M25.75 12.26h-2.84V11h2.84a.65.65 0 0 1 .66.65.66.66 0 0 1-.66.61Z"
      fill={borderColor}
    />

    {/* Head */}
    <Path
      d="M24.14 14.11V11a2.08 2.08 0 0 0-1.05-1.81l-1.61-.94a2.11 2.11 0 0 0-2.09 0l-1.62.94a2.09 2.09 0 0 0-1 1.81v3.12a3.25 3.25 0 0 0 1.62 2.82l.52.3a3.13 3.13 0 0 0 3.13 0l.52-.3a3.25 3.25 0 0 0 1.58-2.83Z"
      fill={secondaryColor}
    />

    {/* Head top shade */}
    <Path
      d="M20.43 12a22.3 22.3 0 0 1 3.71.3V11a2.08 2.08 0 0 0-1.05-1.81l-1.61-.94a2.11 2.11 0 0 0-2.09 0l-1.62.94a2.09 2.09 0 0 0-1 1.81v1.27a22.17 22.17 0 0 1 3.66-.27Z"
      fill={primaryColor}
    />

    {/* Left arm/shape */}
    <Path
      d="m16.62 20.31-6.22 6.36a2.36 2.36 0 0 0-.69 1.67 2.39 2.39 0 0 0 2.4 2.39H17Z"
      fill={secondaryColor}
    />

    {/* Body (main) */}
    <Path
      d="M20.29 18.79c-3.27 0-6 2.34-7 11.94h3.25a.92.92 0 0 1 .92.92.92.92 0 0 1-.92.92h-1.3a2.19 2.19 0 0 0-2.19 2.09C13 36 13 37.37 13 38.89v15.9a1.25 1.25 0 0 0 2.46.28L18.92 40a1.42 1.42 0 0 1 1.37-1.1 1.42 1.42 0 0 1 1.38 1.1l3.5 15.08a1.25 1.25 0 0 0 2.46-.28V38.89c0-16.51-3.29-20.1-7.34-20.1Z"
      fill={secondaryColor}
    />

    {/* Shirt/center piece */}
    <Path
      d="m20.45 19.73-5.07 8.23 5.72 2.42 3.28-2.42-3.93-8.23z"
      fill={paperColor}
    />

    {/* Middle bar */}
    <Path
      d="m26.88 27.69-10.32 3a.92.92 0 0 1 0 1.84h-1.31a2.63 2.63 0 0 0-.49 0h12.67a48.31 48.31 0 0 0-.55-4.84Z"
      fill={shadowColor}
    />

    {/* Right hand / item */}
    <Path
      d="m35 27.89-2-.63a11.69 11.69 0 0 1-4.58-2.72l-4.67-4.49 2 8.48 1.36.32c0-.27-.07-.54-.11-.8a1 1 0 0 1 1-1.14 1 1 0 0 1 1 .83c0 .24.07.48.11.73a1 1 0 0 0 .85.85 24.29 24.29 0 0 0 2.83.17h2a.82.82 0 0 0 .82-.82.83.83 0 0 0-.61-.78Z"
      fill={secondaryColor}
    />

    {/* Chest card */}
    <Rect
      width={12.58}
      height={11.4}
      x={20.29}
      y={19.33}
      rx={0.9}
      fill={paperColor}
    />
    <Path
      d="M24.78 19.33h3.62V22a.61.61 0 0 1-.61.61h-2.4a.61.61 0 0 1-.61-.61v-2.67Z"
      fill={borderColor}
    />

    {/* Lower shading pieces */}
    <Path
      d="M17.57 31.65a.92.92 0 0 1-.91.92h-1.32a2.2 2.2 0 0 0-2.2 2.09c-.05 1.31-.08 2.71-.08 4.23v15.9a1.25 1.25 0 0 0 2.46.28L19 40a1.42 1.42 0 0 1 1.38-1.1 2.82 2.82 0 0 1-2.82-2.82Z"
      fill={shadowColor}
    />

    <Path
      d="M21.1 30.73h-5.72V28l5.83.57a1.1 1.1 0 0 1 1 1.1 1.11 1.11 0 0 1-1.11 1.06Z"
      fill={secondaryColor}
    />

    <Path
      d="M17.48 31.65a.92.92 0 0 1-.92.92h-1.31a2.19 2.19 0 0 0-2.2 2.09C13 36 13 37.37 13 38.89v15.9a1.25 1.25 0 0 0 2.46.28L18.92 40a1.42 1.42 0 0 1 1.37-1.1 1.42 1.42 0 0 1 1.38 1.1l3.5 15.08a1.25 1.25 0 0 0 2.46-.28V38.89c0-3-.11-5.56-.32-7.77h-10a.92.92 0 0 1 .17.53Z"
      fill={shadowColor}
    />

    {/* Right side boxes (phone-like modules) */}
    <Path
      d="M31.74 44.64h11.68V56H31.74a.9.9 0 0 1-.9-.9v-9.57a.9.9 0 0 1 .9-.89Z"
      fill={paperColor}
    />

    <Path
      d="M35.32 44.64h3.62v2.63a.61.61 0 0 1-.61.61h-2.4a.61.61 0 0 1-.61-.61v-2.63ZM43.42 44.64H55.1a.9.9 0 0 1 .9.9v9.61a.9.9 0 0 1-.9.9H43.42V44.64Z"
      fill={borderColor}
    />

    <Path
      d="M47.9 44.64h3.62v2.63a.61.61 0 0 1-.61.61h-2.4a.61.61 0 0 1-.61-.61v-2.63ZM39.83 33.24h10.79a.9.9 0 0 1 .9.9v10.5H38.94V34.13a.9.9 0 0 1 .89-.89Z"
      fill={paperColor}
    />

    <Path
      d="M43.42 33.24H47v2.63a.61.61 0 0 1-.61.61H44a.61.61 0 0 1-.61-.61v-2.63h.03Z"
      fill={borderColor}
    />
  </Svg>
);

export default DeliveryPackageIcon;
