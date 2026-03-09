import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PickerHeader = () => (
  <>
    <View style={styles.handle} />
    <SafeAreaView edges={[]} style={styles.headerWrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Método de pago</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={22} color={COLORS.text.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  </>
);

export default PickerHeader;

const styles = StyleSheet.create({
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border.light,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
});
