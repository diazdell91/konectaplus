import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  name: React.ComponentProps<typeof Icon>["name"];
  focused: boolean;
}

export default function TabBarIcon({ name, focused }: Props) {
  const p = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    p.value = withTiming(focused ? 1 : 0, { duration: 220 });
  }, [focused, p]);

  const containerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(p.value, [0, 1], [0, -4]);
    const scale = withSpring(focused ? 1.08 : 1, {
      damping: 16,
      stiffness: 220,
      mass: 0.4,
    });

    return { transform: [{ translateY }, { scale }] };
  });

  const topBarStyle = useAnimatedStyle(() => ({
    opacity: interpolate(p.value, [0, 1], [0, 1]),
    transform: [{ scaleX: interpolate(p.value, [0, 1], [0.35, 1]) }],
  }));

  const activePrimary = "#4fbe9f";
  const inactivePrimary = "#98A2B3";

  const color = focused ? activePrimary : inactivePrimary;

  return (
    <Animated.View style={[styles.hitbox, containerStyle]}>
      {/* ✅ top indicator (ahora sí se renderiza) */}
      <Animated.View
        style={[styles.topBar, topBarStyle, { backgroundColor: activePrimary }]}
      />

      {/* ✅ Icon correcto */}
      <Icon name={name} size={28} color={color} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hitbox: {
    width: 68,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    position: "absolute",
    top: 0,
    height: 3,
    width: 32,
    borderRadius: 999,
  },
});
