import { Text } from "@/components/ui";
import { COLORS } from "@/theme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const PhoneHeader = () => (
  <Animated.View
    entering={FadeInDown.delay(60).springify()}
    style={styles.container}
  >
    <Image
      source={require("@/assets/images/icon-logo.png")}
      style={{ width: 156, height: 68 }}
      contentFit="contain"
    />
    <Text bodyMedium color={COLORS.text.tertiary} align="center">
      Porque la familia siempre debe estar conectada.
    </Text>
  </Animated.View>
);

export default PhoneHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
