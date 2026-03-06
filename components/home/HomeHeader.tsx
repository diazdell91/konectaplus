import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { formatUsd } from "@/utils/currency";
import { useQuery } from "@apollo/client/react";
import { Feather } from "@expo/vector-icons";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const HomeHeader = () => {
  const hasLiquidGlass = isLiquidGlassAvailable();

  const { data } = useQuery<MyWalletUSDData>(MY_WALLET_USD, {
    fetchPolicy: "cache-and-network",
  });

  const balanceCents = data?.myWalletUSD?.balanceCachedCents ?? null;

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

        <View style={styles.actions}>
          {/* Wallet balance */}
          {balanceCents !== null && (
            <GlassView
              isInteractive
              glassEffectStyle={hasLiquidGlass ? "clear" : "none"}
              style={[styles.pill, !hasLiquidGlass && styles.pillFallback]}
            >
              <Pressable
                style={styles.walletBtn}
                onPress={() => router.push("/services/wallet/ledger")}
              >
                <Feather name="credit-card" size={15} color="#0B1220" />
                <Text style={styles.walletText}>{formatUsd(balanceCents)}</Text>
              </Pressable>
            </GlassView>
          )}

          {/* Cart */}
          <GlassView
            isInteractive
            glassEffectStyle={hasLiquidGlass ? "clear" : "none"}
            style={[styles.pill, !hasLiquidGlass && styles.pillFallback]}
          >
            <Pressable
              style={styles.cartIcon}
              onPress={() => console.log("Cart pressed")}
            >
              <Feather name="shopping-cart" size={22} color="#0B1220" />
            </Pressable>
          </GlassView>
        </View>
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pill: {
    borderRadius: 999,
    overflow: "hidden",
  },
  pillFallback: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15,23,42,0.08)",
  },
  walletBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 44,
    paddingHorizontal: 14,
  },
  walletText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: "#0B1220",
  },
  cartIcon: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
});
