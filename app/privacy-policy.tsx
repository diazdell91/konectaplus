import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Section {
  title: string;
  body: string;
  bullets?: string[];
}

const SECTIONS: Section[] = [
  {
    title: "1. Información que recopilamos",
    body: "Cuando usas KonectaPlus, podemos recopilar la siguiente información:",
    bullets: [
      "Nombre, número de teléfono y correo electrónico",
      "Información de pago (tarjetas de crédito/débito procesadas de forma segura)",
      "Historial de recargas y transacciones",
      "Datos del dispositivo e información de uso de la aplicación",
      "Preferencias y configuración de la cuenta",
    ],
  },
  {
    title: "2. Cómo usamos tu información",
    body: "Utilizamos tu información para:",
    bullets: [
      "Procesar recargas celulares y transferencias de saldo",
      "Gestionar tu cuenta y autenticar tu identidad",
      "Enviar confirmaciones de transacciones y alertas de seguridad",
      "Mejorar la funcionalidad de la aplicación y tu experiencia",
      "Cumplir con obligaciones legales y prevenir fraudes",
    ],
  },
  {
    title: "3. Compartir información con terceros",
    body: "No vendemos ni transferimos tu información personal a terceros, excepto:",
    bullets: [
      "Proveedores de servicios de recarga (como Ding) para procesar las transacciones",
      "Procesadores de pago (Stripe) bajo estrictos acuerdos de confidencialidad",
      "Cuando lo requiera la ley o un proceso legal",
      "Para proteger nuestros derechos, propiedad o seguridad",
    ],
  },
  {
    title: "4. Seguridad de los datos",
    body: "Implementamos medidas de seguridad apropiadas para proteger tu información:",
    bullets: [
      "Cifrado de extremo a extremo para datos de pago",
      "Servidores seguros con actualizaciones periódicas de seguridad",
      "Controles de acceso y medidas de autenticación (OTP)",
      "Auditorías de seguridad regulares",
    ],
  },
  {
    title: "5. Retención de datos",
    body: "Conservamos tu información personal mientras tu cuenta esté activa o sea necesaria para prestarte servicios. Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento contactándonos.",
  },
  {
    title: "6. Tus derechos",
    body: "Tienes derecho a:",
    bullets: [
      "Acceder a tu información personal",
      "Corregir o actualizar tus datos",
      "Eliminar tu cuenta y los datos asociados",
      "Cancelar la suscripción a comunicaciones de marketing",
      "Solicitar la portabilidad de tus datos",
    ],
  },
  {
    title: "7. Privacidad de menores",
    body: "Nuestro servicio no está dirigido a menores de 18 años. No recopilamos conscientemente información personal de menores. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información, contáctanos de inmediato.",
  },
  {
    title: "8. Cambios en esta política",
    body: "Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos cualquier cambio publicando la nueva política en esta página y actualizando la fecha de última actualización.",
  },
  {
    title: "9. Contáctanos",
    body: "Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, contáctanos en: soporte@konectaplus.com",
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
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

        {/* Sections */}
        {SECTIONS.map((section) => (
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
}

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
