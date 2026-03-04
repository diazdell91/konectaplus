import { Feather } from "@expo/vector-icons";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const HomeHeader = () => {
  const hasLiquidGlass = isLiquidGlassAvailable();

  return (
    <View style={styles.wrapper}>
      <GlassView
        glassEffectStyle={hasLiquidGlass ? "regular" : "none"}
        style={[styles.container, !hasLiquidGlass && styles.containerFallback]}
      >
        <Image
          source={require("@/assets/images/icon-logo.png")}
          style={styles.logo}
          contentFit="contain"
        />

        <GlassView
          isInteractive
          glassEffectStyle={hasLiquidGlass ? "clear" : "none"}
          style={[styles.cartGlass, !hasLiquidGlass && styles.cartGlassFallback]}
        >
          <Pressable
            style={styles.cartIcon}
            onPress={() => console.log("Cart pressed")}
          >
            <Feather name="shopping-cart" size={22} color="#0B1220" />
          </Pressable>
        </GlassView>
      </GlassView>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: "hidden",
  },
  containerFallback: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15,23,42,0.1)",
  },
  logo: {
    width: 120,
    height: 60,
  },
  cartGlass: {
    borderRadius: 999,
    overflow: "hidden",
  },
  cartGlassFallback: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15,23,42,0.08)",
  },
  cartIcon: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
});
