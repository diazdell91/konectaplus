import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import PaymentMethodButton from "./PaymentMethodButton";

const PaymentAddMethodSection = () => (
  <>
    <Text style={styles.sectionLabel}>Agregar método</Text>

    <PaymentMethodButton
      title="Añadir tarjeta"
      icon={<Ionicons name="card-outline" size={22} color={COLORS.primary.main} />}
      rightIcon={<Ionicons name="add-circle-outline" size={20} color={COLORS.primary.main} />}
      onPress={() => router.push("/services/payment/add-card")}
    />

    {Platform.OS === "ios" && (
      <PaymentMethodButton
        title="Apple Pay"
        icon={<Ionicons name="logo-apple" size={24} color={COLORS.text.primary} />}
        onPress={() => {
          // TODO: integrar Apple Pay
        }}
      />
    )}

    {Platform.OS === "android" && (
      <PaymentMethodButton
        title="Google Pay"
        icon={<Ionicons name="logo-google" size={22} color="#4285F4" />}
        onPress={() => {
          // TODO: integrar Google Pay
        }}
      />
    )}
  </>
);

export default PaymentAddMethodSection;

const styles = StyleSheet.create({
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 12,
  },
});
