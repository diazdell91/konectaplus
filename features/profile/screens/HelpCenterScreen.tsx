import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FaqRow } from "../components/FaqRow";
import { HelpContactRow } from "../components/HelpContactRow";
import { CONTACT_ITEMS, FAQS } from "../constants/help-center.constants";

export default function HelpCenterScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preguntas frecuentes</Text>
          <View style={styles.card}>
            {FAQS.map((faq, idx) => (
              <FaqRow
                key={idx}
                item={faq}
                showDivider={idx < FAQS.length - 1}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contáctanos</Text>
          <View style={styles.card}>
            {CONTACT_ITEMS.map((item, idx) => (
              <View key={item.label} style={idx < CONTACT_ITEMS.length - 1 && styles.divider}>
                <HelpContactRow item={item} />
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.hint}>
          Horario de atención: Lunes a viernes de 9am a 6pm (EST)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  scroll: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.lg,
  },
  section: {
    gap: SPACING.xs,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    overflow: "hidden",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  hint: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
