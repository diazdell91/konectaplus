import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onPress: () => void;
}

const PickerAddCardRow = ({ onPress }: Props) => (
  <Pressable
    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    onPress={onPress}
  >
    <View style={[styles.iconWrap, { backgroundColor: COLORS.background.secondary }]}>
      <Ionicons name="add" size={20} color={COLORS.primary.main} />
    </View>
    <Text style={styles.label}>Añadir tarjeta</Text>
    <Ionicons name="chevron-forward" size={16} color={COLORS.primary.main} />
  </Pressable>
);

export default PickerAddCardRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderStyle: "dashed",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    marginTop: 4,
  },
  rowPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
});
