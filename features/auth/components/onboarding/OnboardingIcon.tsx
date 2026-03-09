import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface OnboardingIconProps {
  Icon: React.ComponentType<{ width: number; height: number; primaryColor: string; secondaryColor: string }>;
  screenIndex: number;
  scale: SharedValue<number>;
  breathingScale: SharedValue<number>;
  rotate: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
}

const OnboardingIcon = ({
  Icon,
  screenIndex,
  scale,
  breathingScale,
  rotate,
  translateY,
  opacity,
}: OnboardingIconProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * breathingScale.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      key={screenIndex}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      <Animated.View style={animatedStyle}>
        <Icon
          width={128}
          height={128}
          primaryColor={COLORS.primary.main}
          secondaryColor={COLORS.primary.light}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default OnboardingIcon;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
});
