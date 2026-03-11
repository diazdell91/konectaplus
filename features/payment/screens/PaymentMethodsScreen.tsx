import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PaymentAddMethodSection from "../components/PaymentAddMethodSection";
import PaymentSavedCardsList from "../components/PaymentSavedCardsList";
import { usePaymentMethods } from "../hooks/usePaymentMethods";

const PaymentMethodsScreen = () => {
  const { cards, loading, error } = usePaymentMethods();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PaymentAddMethodSection />

        <Text style={styles.sectionLabel}>Tarjetas guardadas</Text>

        <PaymentSavedCardsList cards={cards} loading={loading} error={error} />
      </ScrollView>
    </View>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 12,
    marginTop: 8,
  },
});
