import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRIVACY_SECTIONS } from "../constants/privacySections";

const PrivacyPolicyScreen = () => (
  <SafeAreaView style={styles.root} edges={["bottom"]}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.updated}>
          Última actualización:{" "}
          {new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      <Text style={styles.intro}>
        En KonectaPlus nos comprometemos a proteger tu privacidad. Esta
        política explica cómo recopilamos, usamos y protegemos tu información
        personal cuando utilizas nuestra aplicación.
      </Text>

      {PRIVACY_SECTIONS.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.paragraph}>{section.body}</Text>
          {section.bullets?.map((bullet, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.lg,
  },
  header: {
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  updated: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    fontStyle: "italic",
  },
  intro: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 22,
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    padding: 16,
  },
  section: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    padding: 16,
    gap: SPACING.xs,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  paragraph: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 4,
  },
  bulletDot: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    color: COLORS.primary.main,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 22,
  },
});
