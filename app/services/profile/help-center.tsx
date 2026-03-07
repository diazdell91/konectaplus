import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "¿Cómo hago una recarga celular?",
    answer:
      'Ve a la pestaña "Recargas", selecciona el contacto o escribe el número, elige el monto y confirma el pago con tu tarjeta o saldo de wallet.',
  },
  {
    question: "¿En cuánto tiempo llega la recarga?",
    answer:
      "Las recargas son instantáneas. En casos excepcionales puede demorar hasta 5 minutos. Si pasado ese tiempo no llegó, contáctanos.",
  },
  {
    question: "¿Cómo agrego saldo a mi wallet?",
    answer:
      'En la pantalla de inicio toca tu saldo o ve a Wallet → Recargar saldo. Selecciona el monto y paga con tu tarjeta.',
  },
  {
    question: "¿Puedo solicitar un reembolso?",
    answer:
      "Los reembolsos se evalúan caso a caso. Si tu recarga no llegó al destinatario, contáctanos dentro de las 24h y lo revisamos.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas Visa, Mastercard y American Express, así como saldo de tu wallet KonectaPlus.",
  },
];

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <Pressable
      style={({ pressed }) => [styles.faqRow, pressed && styles.faqRowPressed]}
      onPress={() => setOpen((v) => !v)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={COLORS.primary.main}
        />
      </View>
      {open && <Text style={styles.faqAnswer}>{item.answer}</Text>}
    </Pressable>
  );
}

function ContactRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.contactRow, pressed && styles.faqRowPressed]}
      onPress={onPress}
    >
      <View style={styles.contactIcon}>
        <Ionicons name={icon} size={20} color={COLORS.primary.main} />
      </View>
      <View style={styles.contactText}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.primary.main} />
    </Pressable>
  );
}

export default function HelpCenterScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preguntas frecuentes</Text>
          <View style={styles.card}>
            {FAQS.map((faq, idx) => (
              <View
                key={idx}
                style={idx < FAQS.length - 1 && styles.faqDivider}
              >
                <FaqRow item={faq} />
              </View>
            ))}
          </View>
        </View>

        {/* Contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contáctanos</Text>
          <View style={styles.card}>
            <ContactRow
              icon="logo-whatsapp"
              label="WhatsApp"
              value="+1 (555) 000-0000"
              onPress={() => Linking.openURL("https://wa.me/15550000000")}
            />
            <View style={styles.faqDivider} />
            <ContactRow
              icon="mail-outline"
              label="Correo"
              value="soporte@konectaplus.com"
              onPress={() => Linking.openURL("mailto:soporte@konectaplus.com")}
            />
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
  faqRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  faqRowPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    lineHeight: 20,
  },
  faqAnswer: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  faqDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    flex: 1,
    gap: 2,
  },
  contactLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  contactValue: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  hint: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
