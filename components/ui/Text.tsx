import { FontType } from "@/constants/Fonts";
import { COLORS, TYPOGRAPHY } from "@/theme";
import {
  Text as DefaultText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

type Props = RNTextProps & {
  children?: React.ReactNode;
  color?: TextStyle["color"];
  colorClass?: string;
  bold?: boolean;
  size?: TextStyle["fontSize"];
  align?: TextStyle["textAlign"];
  weigth?: TextStyle["fontWeight"];
  padding?: TextStyle["padding"];
  paddingHorizontal?: TextStyle["paddingHorizontal"];
  paddingVertical?: TextStyle["paddingVertical"];
  margin?: TextStyle["margin"];
  marginHorizontal?: TextStyle["marginHorizontal"];
  marginVertical?: TextStyle["marginVertical"];
  fontFamily?: FontType;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  caption?: boolean;
  body?: boolean;
  button?: boolean;
  label?: boolean;
  input?: boolean;
  title?: boolean;
  subTitle?: boolean;
  small?: boolean;
  upercase?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
};

const Text = (props: Props) => {
  const {
    h1,
    h2,
    h3,
    h4,
    caption,
    body,
    button,
    label,
    input,
    title,
    subTitle,
    small,
    bold,
    color,
    colorClass,
    size,
    weigth,
    padding,
    paddingHorizontal,
    paddingVertical,
    margin,
    marginHorizontal,
    marginVertical,
    fontFamily,
    align,
    children,
    upercase,
    style,
    ...otherProps
  } = props;

  // Determine typography variant from props
  let typographyStyle: TextStyle = {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
  };

  if (h1) {
    typographyStyle = { ...TYPOGRAPHY.h1, color: COLORS.text.primary };
    if (upercase) typographyStyle.textTransform = "uppercase";
  } else if (h2) {
    typographyStyle = { ...TYPOGRAPHY.h2, color: COLORS.text.primary };
  } else if (h3) {
    typographyStyle = { ...TYPOGRAPHY.h3, color: COLORS.text.primary };
  } else if (h4) {
    typographyStyle = { ...TYPOGRAPHY.h4, color: COLORS.text.primary };
  } else if (input) {
    typographyStyle = { ...TYPOGRAPHY.input, color: COLORS.text.primary };
  } else if (body) {
    typographyStyle = { ...TYPOGRAPHY.body, color: COLORS.text.primary };
  } else if (button) {
    typographyStyle = { ...TYPOGRAPHY.button, color: COLORS.text.primary };
  } else if (label) {
    typographyStyle = {
      ...TYPOGRAPHY.label,
      color: COLORS.text.secondary,
      paddingBottom: 6,
    };
  } else if (title) {
    typographyStyle = { ...TYPOGRAPHY.body, color: COLORS.text.primary };
  } else if (subTitle) {
    typographyStyle = {
      ...TYPOGRAPHY.body,
      color: COLORS.text.primary,
      paddingTop: 4,
    };
  } else if (caption) {
    typographyStyle = { ...TYPOGRAPHY.caption, color: COLORS.text.secondary };
  } else if (small) {
    typographyStyle = { ...TYPOGRAPHY.small, color: COLORS.text.secondary };
  }

  // Apply overrides
  const finalStyle: TextStyle = {
    ...typographyStyle,
    ...(color && { color }),
    ...(size !== undefined && { fontSize: size }),
    ...(weigth !== undefined && { fontWeight: weigth }),
    ...(bold && { fontWeight: "700" }),
    ...(upercase && { textTransform: "uppercase" }),
    ...(align && { textAlign: align }),
    ...(padding !== undefined && { padding }),
    ...(paddingHorizontal !== undefined && { paddingHorizontal }),
    ...(paddingVertical !== undefined && { paddingVertical }),
    ...(margin !== undefined && { margin }),
    ...(marginHorizontal !== undefined && { marginHorizontal }),
    ...(marginVertical !== undefined && { marginVertical }),
    ...(fontFamily && { fontFamily }),
    ...(style as TextStyle),
  };

  return (
    <DefaultText style={finalStyle} {...otherProps}>
      {children}
    </DefaultText>
  );
};

export default Text;
