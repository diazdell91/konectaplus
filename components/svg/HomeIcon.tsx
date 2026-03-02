import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

type Props = SvgProps & {
  primaryColor?: string; // techo/parte principal
  secondaryColor?: string; // base
  paperColor?: string; // interior claro
  paperBorderColor?: string; // interior borde
  accentColor?: string; // detalles pequeños
};

const HomeIcon = ({
  primaryColor = "#4fbe9f",
  secondaryColor = "#09816c",
  paperColor = "#ebeef2",
  paperBorderColor = "#dcdfe2",
  accentColor = "#dcdfe2",
  ...props
}: Props) => (
  <Svg viewBox="0 0 64 64" {...props}>
    <Path
      d="M8 23v33h48V23a2.83 2.83 0 0 0-1.42-2.46L33.42 8.35a2.83 2.83 0 0 0-2.84 0L9.43 20.56A2.83 2.83 0 0 0 8 23Z"
      fill={primaryColor}
    />
    <Path d="M8.01 53.17h47.97V56H8.01z" fill={secondaryColor} />
    <Path
      d="M17.17 28.25h29.66a1.1 1.1 0 0 1 1.1 1.1V56H16.06V29.35a1.1 1.1 0 0 1 1.11-1.1Z"
      fill={paperColor}
    />
    <Path
      d="M46.83 28.25H17.17a1.11 1.11 0 0 0-1.11 1.1V56h31.88V29.35a1.11 1.11 0 0 0-1.11-1.1ZM44.94 53H19.06V31.25h25.88Z"
      fill={paperBorderColor}
    />
    <Path
      d="M32 40.64a.82.82 0 0 0-.82.82v2.16a.82.82 0 1 0 1.64 0v-2.16a.82.82 0 0 0-.82-.82ZM26.89 42.61a.82.82 0 0 0-1.42.82l1.08 1.87a.82.82 0 0 0 1.45-.82ZM38.23 42.31a.82.82 0 0 0-1.12.3L36 44.48a.82.82 0 0 0 1.42.82l1.08-1.87a.83.83 0 0 0-.27-1.12ZM24.2 47.65l-1.87-1.08a.82.82 0 0 0-.81 1.43l1.87 1.08a.82.82 0 0 0 .81-1.42ZM40.61 49.07 42.48 48a.82.82 0 0 0-.81-1.42l-1.87 1.07a.82.82 0 0 0 .81 1.42Z"
      fill={accentColor}
    />
  </Svg>
);

export default HomeIcon;
