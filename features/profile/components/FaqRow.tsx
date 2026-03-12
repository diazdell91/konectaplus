import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FaqItem } from "../constants/help-center.constants";

type Props = {
  item: FaqItem;
  showDivider: boolean;
};

export function FaqRow({ item, showDivider }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={showDivider && styles.divider}>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={() => setOpen((v) => !v)}
      >
        <View style={styles.header}>
          <Text style={styles.question}>{item.question}</Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color={COLORS.primary.main}
          />
        </View>
        {open && <Text style={styles.answer}>{item.answer}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  rowPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  question: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    lineHeight: 20,
  },
  answer: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});
