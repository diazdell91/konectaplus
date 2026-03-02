import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

type Props = SvgProps & {
  primaryColor?: string; // verde oscuro (pin)
  secondaryColor?: string; // verde claro (caras)
  gray1?: string; // grises base
  gray2?: string; // grises sombra
  white?: string; // blancos
};

const PackagesLocationIcon = ({
  primaryColor = "#09816c",
  secondaryColor = "#4fbe9f",
  gray1 = "#dcdfe2",
  gray2 = "#c7cdd6",
  white = "#ffffff",
  ...props
}: Props) => (
  <Svg viewBox="0 0 64 64" {...props}>
    {/* Centro (paquete) */}
    <Path
      d="M21.61 32.13v12l10.39 6 10.39-6v-12l-10.39-6-10.39 6z"
      fill={secondaryColor}
    />
    <Path d="M32 26.13v24l10.39-6v-12l-10.39-6z" fill={primaryColor} />

    {/* Caja izquierda abajo */}
    <Path
      d="M11.22 38.54v11.15a.74.74 0 0 0 .37.64l9.65 5.57a.75.75 0 0 0 .74 0l9.65-5.57a.74.74 0 0 0 .37-.64V38.54a.74.74 0 0 0-.37-.64L22 32.33a.75.75 0 0 0-.74 0l-9.67 5.57a.74.74 0 0 0-.37.64Z"
      fill={gray1}
    />
    <Path
      d="m21.61 44.11 10.29-5.94a.78.78 0 0 0-.27-.27l-4.83-2.79-4.8-2.78a.75.75 0 0 0-.74 0l-4.83 2.78-4.84 2.79a.81.81 0 0 0-.28.27Z"
      fill={secondaryColor}
    />
    <Path
      d="m21.44 36.25-6.73 3.89v4.42l3.17 1.83v-4.42l6.73-3.89-3.17-1.83z"
      fill={secondaryColor}
    />
    <Path
      d="m21.44 36.25-6.73 3.89 3.17 1.83 6.73-3.89-3.17-1.83z"
      fill={white}
    />
    <Path
      d="M21.61 44.11V56a.71.71 0 0 0 .37-.1l4.82-2.79 4.83-2.78a.74.74 0 0 0 .37-.64V38.54a.79.79 0 0 0-.1-.37Z"
      fill={primaryColor}
    />

    {/* Caja derecha abajo */}
    <Path
      d="M32 38.54v11.15a.74.74 0 0 0 .37.64L42 55.9a.75.75 0 0 0 .74 0l9.65-5.57a.74.74 0 0 0 .37-.64V38.54a.74.74 0 0 0-.37-.64l-9.65-5.57a.75.75 0 0 0-.74 0l-9.63 5.57a.74.74 0 0 0-.37.64Z"
      fill={gray1}
    />
    <Path
      d="m42.39 44.11 10.3-5.94a.81.81 0 0 0-.28-.27l-4.82-2.79-4.83-2.78a.75.75 0 0 0-.74 0l-4.82 2.78-4.83 2.79a.78.78 0 0 0-.27.27Z"
      fill={secondaryColor}
    />
    <Path
      d="m42.22 36.25-6.73 3.89v4.42l3.17 1.83v-4.42l6.74-3.89-3.18-1.83z"
      fill={secondaryColor}
    />
    <Path
      d="m42.22 36.25-6.73 3.89 3.17 1.83 6.74-3.89-3.18-1.83z"
      fill={white}
    />
    <Path
      d="M42.39 44.11V56a.69.69 0 0 0 .37-.1l4.83-2.79 4.82-2.78a.74.74 0 0 0 .37-.64V38.54a.78.78 0 0 0-.09-.37Z"
      fill={primaryColor}
    />

    {/* Pin superior */}
    <Path
      d="M41.48 17.71a9.48 9.48 0 0 0-9.95-9.47 9.92 9.92 0 0 0-9 8.82 9.47 9.47 0 0 0 3.52 8 20.48 20.48 0 0 1 5.47 6.49l.27.53a.23.23 0 0 0 .4 0l.16-.31a20.85 20.85 0 0 1 5.55-6.69 9.41 9.41 0 0 0 3.58-7.37Z"
      fill={primaryColor}
    />
    <Circle cx={32} cy={17.71} r={2.25} fill={white} />
  </Svg>
);

export default PackagesLocationIcon;
