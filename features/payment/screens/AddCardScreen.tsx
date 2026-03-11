import CardInputSection from "../components/CardInputSection";
import CardPreview from "../components/CardPreview";
import AddCardFooter from "../components/AddCardFooter";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useAddCard } from "../hooks/useAddCard";

const AddCardScreen = () => {
  const {
    name,
    setName,
    cardDetails,
    setCardDetails,
    focusedField,
    setFocusedField,
    saving,
    isComplete,
    network,
    expiry,
    handleCardScanned,
    handleSave,
  } = useAddCard();

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CardPreview
          name={name}
          last4={cardDetails?.last4 ?? ""}
          expiry={expiry}
          showBack={focusedField === "Cvc"}
          network={network}
        />

        <CardInputSection
          name={name}
          onNameChange={setName}
          onCardChange={setCardDetails}
          focusedField={focusedField}
          onFieldFocus={setFocusedField}
          onSubmit={handleSave}
          network={network}
          onCardScanned={handleCardScanned}
        />
      </ScrollView>

      <AddCardFooter saving={saving} isComplete={isComplete} onSave={handleSave} />
    </KeyboardAvoidingView>
  );
};

export default AddCardScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  content: {
    padding: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
  },
});
