import COLORS from "@/theme/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={styles.line} />
    <View style={[styles.line, { width: "60%", marginTop: 6 }]} />
  </View>
);

const LoadingSkeleton = () => (
  <View style={styles.wrapper}>
    {Array.from({ length: 5 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </View>
);

export default LoadingSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    gap: 10,
    paddingTop: 8,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  line: {
    height: 14,
    width: "80%",
    backgroundColor: COLORS.neutral.gray200,
    borderRadius: 7,
  },
});
