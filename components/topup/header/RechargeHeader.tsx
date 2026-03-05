import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RechargeHeader() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.row}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text.primary} />
        </Pressable>
        <Text style={styles.title}>Nueva Recarga</Text>
        <View style={{ width: 34 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.surface.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.neutral.gray100,
  },
  title: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
});
