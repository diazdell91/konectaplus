import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icon-logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Pressable
        style={styles.cartIcon}
        onPress={() => console.log("Cart pressed")}
      >
        <Feather name="shopping-cart" size={22} color="#000" />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 60,
    marginStart: -16,
  },
  cartIcon: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    backgroundColor: "#fff",
  },
});
