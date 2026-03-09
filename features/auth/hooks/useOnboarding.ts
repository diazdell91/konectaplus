import DeliveryPackageIcon from "@/components/svg/DeliveryPackageIcon";
import PackagesLocationIcon from "@/components/svg/PackagesLocationIcon";
import PhonePackageIcon from "@/components/svg/PhonePackageIcon";
import { AppSettingsContext } from "@/context/AppSettings";
import { useCallback, use, useEffect, useState } from "react";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const ONBOARDING_STEPS = [
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

export function useOnboarding() {
  const [screenIndex, setScreenIndex] = useState(0);
  const { updateSettings } = use(AppSettingsContext);

  const scale = useSharedValue(0.3);
  const breathingScale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  const endOnboarding = useCallback(() => {
    updateSettings({ isOnboarded: true });
  }, [updateSettings]);

  const onContinue = useCallback(() => {
    const isLast = screenIndex === ONBOARDING_STEPS.length - 1;
    if (isLast) {
      endOnboarding();
    } else {
      setScreenIndex((i) => i + 1);
    }
  }, [screenIndex, endOnboarding]);

  useEffect(() => {
    scale.value = 0.3;
    rotate.value = 0;
    translateY.value = 50;
    opacity.value = 0;

    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    translateY.value = withSpring(0, { damping: 12, stiffness: 90 });

    breathingScale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    const rotationsByScreen = [
      // Step 0: gentle sway
      withSequence(
        withTiming(8, { duration: 400, easing: Easing.out(Easing.back(1.5)) }),
        withSpring(0, { damping: 8 }),
        withTiming(0, { duration: 500 }),
        withRepeat(
          withSequence(
            withTiming(-2, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
            withTiming(2, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          true,
        ),
      ),
      // Step 1: phone tilt
      withSequence(
        withTiming(-8, { duration: 400, easing: Easing.out(Easing.back(1.5)) }),
        withSpring(0, { damping: 10 }),
        withTiming(0, { duration: 500 }),
        withRepeat(
          withSequence(
            withTiming(-3, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
            withTiming(3, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          true,
        ),
      ),
      // Step 2: delivery bounce
      withSequence(
        withTiming(5, { duration: 400, easing: Easing.out(Easing.back(1.2)) }),
        withSpring(0, { damping: 8 }),
        withTiming(0, { duration: 500 }),
        withRepeat(
          withSequence(
            withTiming(-1.5, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
            withTiming(1.5, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          true,
        ),
      ),
    ];

    rotate.value = rotationsByScreen[screenIndex] ?? rotationsByScreen[0];
  }, [screenIndex]);

  return {
    screenIndex,
    scale,
    breathingScale,
    rotate,
    translateY,
    opacity,
    isLastScreen: screenIndex === ONBOARDING_STEPS.length - 1,
    onContinue,
  };
}
