import PaymentMethodButton from "@/components/payment/PaymentMethodButton";
import SavedCardRow from "@/components/payment/SavedCardRow";
import { MY_CARDS, MyCardsData } from "@/graphql/paymentMethods";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PaymentMethodsScreen() {
  const { data, loading, error, refetch } = useQuery<MyCardsData>(MY_CARDS, {
    fetchPolicy: "cache-and-network",
    variables: { page: 1, pageSize: 20 },
  });

  // Refresca la lista cada vez que se vuelve a esta pantalla (ej: tras añadir tarjeta)
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const cards = data?.myCards.items ?? [];

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Agregar método ── */}
        <Text style={styles.sectionLabel}>Agregar método</Text>

        <PaymentMethodButton
          title="Añadir tarjeta"
          icon={
            <Ionicons name="card-outline" size={22} color={COLORS.primary.main} />
          }
          rightIcon={
            <Ionicons name="add-circle-outline" size={20} color={COLORS.primary.main} />
          }
          onPress={() => router.push("/services/payment/add-card")}
        />

        {Platform.OS === "ios" && (
          <PaymentMethodButton
            title="Apple Pay"
            icon={
              <Ionicons name="logo-apple" size={24} color={COLORS.text.primary} />
            }
            onPress={() => {
              // TODO: integrar Apple Pay
            }}
          />
        )}

        {Platform.OS === "android" && (
          <PaymentMethodButton
            title="Google Pay"
            icon={
              <Ionicons name="logo-google" size={22} color="#4285F4" />
            }
            onPress={() => {
              // TODO: integrar Google Pay
            }}
          />
        )}

        {/* ── Tarjetas guardadas ── */}
        <Text style={[styles.sectionLabel, styles.sectionLabelTop]}>
          Tarjetas guardadas
        </Text>

        {loading && cards.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator color={COLORS.primary.main} />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Ionicons name="alert-circle-outline" size={32} color={COLORS.semantic.error} />
            <Text style={styles.errorText}>Error al cargar tarjetas</Text>
          </View>
        ) : cards.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="card-outline" size={36} color={COLORS.neutral.gray300} />
            <Text style={styles.emptyText}>No tienes tarjetas guardadas aún.</Text>
          </View>
        ) : (
          cards.map((card) => <SavedCardRow key={card.id} card={card} />)
        )}
      </ScrollView>
    </View>
  );
}

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
  },
  sectionLabelTop: {
    marginTop: 8,
  },
  emptyCard: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingVertical: 36,
    alignItems: "center",
    gap: 10,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    gap: 10,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
    textAlign: "center",
  },
});
