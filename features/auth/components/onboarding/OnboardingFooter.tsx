import { Button } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { TYPOGRAPHY } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import OnboardingDots from "./OnboardingDots";

interface OnboardingFooterProps {
  title: string;
  description: string;
  screenIndex: number;
  total: number;
  isLastScreen: boolean;
  onContinue: () => void;
}

const OnboardingFooter = ({
  title,
  description,
  screenIndex,
  total,
  isLastScreen,
  onContinue,
}: OnboardingFooterProps) => (
  <View style={styles.container}>
    <OnboardingDots total={total} activeIndex={screenIndex} />

    <View style={styles.textContainer}>
      <Animated.Text
        key={`title-${screenIndex}`}
        entering={SlideInRight}
        exiting={SlideOutLeft}
        style={styles.title}
      >
        {title}
      </Animated.Text>
    </View>

    <View style={styles.textContainer}>
      <Animated.Text
        key={`desc-${screenIndex}`}
        entering={SlideInRight.delay(50)}
        exiting={SlideOutLeft}
        style={styles.description}
      >
        {description}
      </Animated.Text>
    </View>

    <Button
      title={isLastScreen ? "Comenzar" : "Siguiente"}
      variant="primary"
      onPress={onContinue}
      size="lg"
      style={styles.button}
    />
  </View>
);

export default OnboardingFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xxxl,
    paddingTop: SPACING.xl,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  textContainer: {
    minHeight: 70,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 32,
    color: COLORS.text.primary,
    textAlign: "center",
    paddingHorizontal: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text.secondary,
    textAlign: "center",
    paddingHorizontal: SPACING.sm,
  },
  button: {
    marginHorizontal: 0,
    borderRadius: 50,
  },
});
