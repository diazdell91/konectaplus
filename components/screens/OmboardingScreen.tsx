import DeliveryPackageIcon from "@/components/svg/DeliveryPackageIcon";
import PackagesLocationIcon from "@/components/svg/PackagesLocationIcon";
import PhonePackageIcon from "@/components/svg/PhonePackageIcon";
import { Button } from "@/components/ui";
import { AppSettingsContext } from "@/context/AppSettings";
import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { use, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: PackagesLocationIcon,
    title: "Envía sin complicaciones",
    description:
      "Conecta con tus seres queridos y envía lo que necesiten, rápido y seguro.",
  },
  {
    icon: PhonePackageIcon,
    title: "Todo desde tu teléfono",
    description: "Registra envíos, haz pagos y da seguimiento en tiempo real.",
  },
  {
    icon: DeliveryPackageIcon,
    title: "Seguro y confiable",
    description:
      "Tus envíos viajan protegidos con seguimiento para tu tranquilidad.",
  },
];

export default function OnboardingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);
  const { updateSettings } = use(AppSettingsContext);

  const data = onboardingSteps[screenIndex];

  // Animated values for icon animations
  const scale = useSharedValue(0.3);
  const breathingScale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  const endOnboarding = useCallback(() => {
    updateSettings({ isOnboarded: true });
  }, [updateSettings]);

  const onContinue = useCallback(() => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex((i) => i + 1);
    }
  }, [screenIndex, endOnboarding]);

  // Reset and trigger animations when screen changes
  useEffect(() => {
    // Reset values
    scale.value = 0.3;
    rotate.value = 0;
    translateY.value = 50;
    opacity.value = 0;

    // Animate in with spring
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });

    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.ease),
    });

    translateY.value = withSpring(0, {
      damping: 12,
      stiffness: 90,
    });

    // Breathing animation (subtle pulse)
    breathingScale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Different rotation animations based on screen
    if (screenIndex === 0) {
      // Packages: subtle bounce rotation with continuous gentle sway
      rotate.value = withSequence(
        withTiming(8, { duration: 400, easing: Easing.out(Easing.back(1.5)) }),
        withSpring(0, { damping: 8 }),
        withTiming(0, { duration: 500 }),
        withRepeat(
          withSequence(
            withTiming(-2, {
              duration: 2500,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(2, {
              duration: 2500,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          true,
        ),
      );
    } else if (screenIndex === 1) {
      // Phone: phone tilt animation (like checking notifications)
      rotate.value = withSequence(
        withTiming(-8, { duration: 400, easing: Easing.out(Easing.back(1.5)) }),
        withSpring(0, { damping: 10 }),
        withTiming(0, { duration: 500 }),
        withRepeat(
          withSequence(
            withTiming(-3, {
              duration: 1800,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(3, {
              duration: 1800,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          true,
        ),
      );
    } else if (screenIndex === 2) {
      // Delivery: delivery person walking animation (subtle bounce)
      rotate.value = withSequence(
        withTiming(5, { duration: 400, easing: Easing.out(Easing.back(1.2)) }),
        withSpring(0, { damping: 8 }),
        withTiming(0, { duration: 500 }),
        withRepeat(
          withSequence(
            withTiming(-1.5, {
              duration: 2200,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1.5, {
              duration: 2200,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          true,
        ),
      );
    }
  }, [screenIndex, scale, breathingScale, rotate, translateY, opacity]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value * breathingScale.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const isLastScreen = screenIndex === onboardingSteps.length - 1;

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View style={styles.pageContent}>
        {/* Icon with animation */}
        <Animated.View
          key={screenIndex}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={styles.iconContainer}
        >
          <Animated.View style={animatedIconStyle}>
            <data.icon
              width={128}
              height={128}
              primaryColor={COLORS.primary.main}
              secondaryColor={COLORS.primary.light}
            />
          </Animated.View>
        </Animated.View>

        {/* Content */}
        <View style={styles.footer}>
          {/* Step Indicators */}
          <View style={styles.stepIndicatorContainer}>
            {onboardingSteps.map((_, index) => (
              <Animated.View
                key={index}
                entering={FadeIn.delay(index * 100)}
                style={[
                  styles.stepIndicator,
                  {
                    backgroundColor:
                      index === screenIndex
                        ? COLORS.primary.main
                        : COLORS.neutral.gray200,
                    width: index === screenIndex ? 70 : 60,
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.textContainer}>
            <Animated.Text
              key={`title-${screenIndex}`}
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
          </View>

          <View style={styles.textContainer}>
            <Animated.Text
              key={`desc-${screenIndex}`}
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>
          </View>

          {/* Button */}
          <Button
            title={isLastScreen ? "Comenzar" : "Siguiente"}
            variant="primary"
            onPress={onContinue}
            size="lg"
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  pageContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  iconContainer: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  footer: {
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xxxl,
    paddingTop: SPACING.xl,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: SPACING.xs,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    height: 20,
  },
  stepIndicator: {
    width: 60,
    height: 4,
    borderRadius: 10,
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
  continueButton: {
    marginHorizontal: 0,
    borderRadius: 50,
  },
});
