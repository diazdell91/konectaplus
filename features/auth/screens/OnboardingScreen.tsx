import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import OnboardingFooter from "../components/onboarding/OnboardingFooter";
import OnboardingIcon from "../components/onboarding/OnboardingIcon";
import { ONBOARDING_STEPS, useOnboarding } from "../hooks/useOnboarding";

const OnboardingScreen = () => {
  const {
    screenIndex,
    scale,
    breathingScale,
    rotate,
    translateY,
    opacity,
    isLastScreen,
    onContinue,
  } = useOnboarding();

  const step = ONBOARDING_STEPS[screenIndex];

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View style={styles.content}>
        <OnboardingIcon
          Icon={step.icon}
          screenIndex={screenIndex}
          scale={scale}
          breathingScale={breathingScale}
          rotate={rotate}
          translateY={translateY}
          opacity={opacity}
        />

        <OnboardingFooter
          title={step.title}
          description={step.description}
          screenIndex={screenIndex}
          total={ONBOARDING_STEPS.length}
          isLastScreen={isLastScreen}
          onContinue={onContinue}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
