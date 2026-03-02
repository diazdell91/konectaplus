import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

type Props = SvgProps & {
  paperColor?: string; // fondo claro del teléfono
  borderColor?: string; // borde / líneas
  shadowColor?: string; // sombras suaves
  primaryColor?: string; // verde (detalle de arriba)
  checkColor?: string; // check
};

const PhonePackageIcon = ({
  paperColor = "#ebeef2",
  borderColor = "#dcdfe2",
  shadowColor = "#dcdfe2",
  primaryColor = "#09816c",
  checkColor = "#98A2B3",
  ...props
}: Props) => (
  <Svg viewBox="0 0 64 64" {...props}>
    {/* Phone body */}
    <Rect
      width={27.91}
      height={45.6}
      x={18.11}
      y={9.2}
      rx={5.01}
      fill={paperColor}
    />

    {/* Side fold/shadow */}
    <Path d="M46.02 48.6V38.53l-7.31 2.76 7.31 7.31z" fill={shadowColor} />

    {/* Side/inner shading (was cls-3) */}
    <Path
      d="M21.78 54.6h.16l.23.05a.87.87 0 0 0-.39-.05ZM18.54 14.44V51.8a4.48 4.48 0 0 0 .35.65l.18.27a4.6 4.6 0 0 0 .45.54 1.8 1.8 0 0 0 .2.19 4.22 4.22 0 0 0 .46.38l.23.17.13.06V13.72a2.56 2.56 0 0 1 2.55-2.56H45a5.51 5.51 0 0 0-.71-.74l-.17-.14a4.8 4.8 0 0 0-.52-.36c-.14-.08-.29-.17-.44-.24l-.29-.13a6.34 6.34 0 0 0-.74-.23h-.19A5.27 5.27 0 0 0 41 9.2H23.44a5.25 5.25 0 0 0-4.9 5.24ZM20.71 54.16a5.11 5.11 0 0 0 1 .4l-.33-.1-.27-.11c-.11-.05-.28-.13-.4-.19ZM45.91 14.44V50.8a4.74 4.74 0 0 0 .11-1V13.89a2.51 2.51 0 0 0-.11.55Z"
      fill={borderColor}
    />

    {/* Phone outline (was cls-4) */}
    <Path
      d="M41.48 10a3.28 3.28 0 0 1 3.27 3.27v37.46A3.28 3.28 0 0 1 41.48 54H22.65a3.27 3.27 0 0 1-3.27-3.27V13.27A3.27 3.27 0 0 1 22.65 10h18.83m0-2H22.65a5.27 5.27 0 0 0-5.27 5.27v37.46A5.27 5.27 0 0 0 22.65 56h18.83a5.27 5.27 0 0 0 5.27-5.27V13.27A5.27 5.27 0 0 0 41.48 8Z"
      fill={borderColor}
    />

    {/* Speaker line */}
    <Path
      d="M41.27 12.12h-2.42a1 1 0 0 0 0 2.09h2.42a1 1 0 0 0 0-2.09Z"
      fill={borderColor}
    />

    {/* Small card / module block (was Rect cls-4) */}
    <Rect
      width={17.8}
      height={16.13}
      x={38.41}
      y={25.61}
      rx={1.27}
      fill={borderColor}
    />

    {/* Green top on module */}
    <Path
      d="M49 30.21h-3.38a.87.87 0 0 1-.87-.87v-3.73h5.12v3.73a.87.87 0 0 1-.87.87Z"
      fill={primaryColor}
    />

    {/* Check mark (was cls-3) */}
    <Path
      d="m27.26 37.66-2.48-2.48a1.81 1.81 0 0 1-.26-2.32 1.75 1.75 0 0 1 2.67-.22l.84.84 3.53-3.54a1.83 1.83 0 0 1 2.32-.25 1.75 1.75 0 0 1 .23 2.67l-5.31 5.3a1.08 1.08 0 0 1-1.54 0Z"
      fill={checkColor}
    />
  </Svg>
);

export default PhonePackageIcon;
