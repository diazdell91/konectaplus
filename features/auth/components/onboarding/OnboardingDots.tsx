import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface OnboardingDotsProps {
  total: number;
  activeIndex: number;
}

const OnboardingDots = ({ total, activeIndex }: OnboardingDotsProps) => (
  <View style={styles.container}>
    {Array.from({ length: total }).map((_, index) => (
      <Animated.View
        key={index}
        entering={FadeIn.delay(index * 100)}
        style={[
          styles.dot,
          {
            backgroundColor:
              index === activeIndex ? COLORS.primary.main : COLORS.neutral.gray200,
            width: index === activeIndex ? 70 : 60,
          },
        ]}
      />
    ))}
  </View>
);

export default OnboardingDots;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: SPACING.xs,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    height: 20,
  },
  dot: {
    height: 4,
    borderRadius: 10,
  },
});
