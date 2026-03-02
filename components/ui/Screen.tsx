import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme";

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  flex?: ViewStyle["flex"];
  safeArea?: boolean;
  edges?: React.ComponentProps<typeof SafeAreaView>["edges"];
  className?: string;
};

const Screen = ({
  safeArea,
  edges,
  flex,
  align,
  justify,
  children,
  style,
}: Props) => {
  const inlineStyles: ViewStyle = {
    flex: flex !== undefined ? flex : 1,
    backgroundColor: COLORS.neutral.white,
    alignItems: align || "stretch",
    justifyContent: justify || "flex-start",
    ...(style as ViewStyle),
  };

  if (safeArea) {
    return (
      <SafeAreaView
        edges={edges || ["bottom"]}
        style={inlineStyles}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={inlineStyles}>
      {children}
    </View>
  );
};

export default Screen;
