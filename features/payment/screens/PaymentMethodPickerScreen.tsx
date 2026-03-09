import { COLORS } from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import PickerAddCardRow from "../components/picker/PickerAddCardRow";
import PickerCardRow from "../components/picker/PickerCardRow";
import PickerCardsSectionLabel from "../components/picker/PickerCardsSectionLabel";
import PickerEmptyCards from "../components/picker/PickerEmptyCards";
import PickerHeader from "../components/picker/PickerHeader";
import PickerWalletOption from "../components/picker/PickerWalletOption";
import usePaymentMethodPicker from "../hooks/usePaymentMethodPicker";

const PaymentMethodPickerScreen = () => {
  const { hideWallet: hideWalletParam } = useLocalSearchParams<{ hideWallet?: string }>();

  const {
    balance,
    cards,
    loading,
    isWalletSelected,
    selectedCardId,
    handleSelectWallet,
    handleSelectCard,
    handleAddCard,
  } = usePaymentMethodPicker({ hideWallet: hideWalletParam === "1" });

  const hideWallet = hideWalletParam === "1";

  return (
    <View style={styles.root}>
      <PickerHeader />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary.main} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {!hideWallet && balance !== null && (
            <PickerWalletOption
              balance={balance}
              isSelected={isWalletSelected}
              onPress={handleSelectWallet}
            />
          )}

          <PickerCardsSectionLabel hasTopMargin={balance !== null} />

          {cards.length === 0 ? (
            <PickerEmptyCards />
          ) : (
            cards.map((card) => (
              <PickerCardRow
                key={card.id}
                card={card}
                isSelected={selectedCardId === card.id}
                onPress={() => handleSelectCard(card)}
              />
            ))
          )}

          <PickerAddCardRow onPress={handleAddCard} />
        </ScrollView>
      )}
    </View>
  );
};

export default PaymentMethodPickerScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 48,
    gap: 10,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
