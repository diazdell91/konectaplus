import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneFooter from "../components/phone/PhoneFooter";
import PhoneHeader from "../components/phone/PhoneHeader";
import PhoneHero from "../components/phone/PhoneHero";
import { PhoneInputCard } from "@/components/ui";
import { usePhoneEntry } from "../hooks/usePhoneEntry";

const PhoneScreen = () => {
  const {
    selectedCountry,
    phoneDigits,
    loading,
    error,
    inputRef,
    borderAnim,
    isValid,
    handleChangePhone,
    handleContinue,
    onFocus,
    onBlur,
  } = usePhoneEntry();

  const borderStyle = useAnimatedStyle(() => ({
    borderColor:
      borderAnim.value === 1 ? COLORS.primary.main : COLORS.border.light,
    borderWidth: borderAnim.value === 1 ? 2 : 1.5,
  }));

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <PhoneHeader />
          <PhoneHero />
          <PhoneInputCard
            selectedCountry={selectedCountry}
            phoneDigits={phoneDigits}
            inputRef={inputRef}
            borderStyle={borderStyle}
            error={error}
            isValid={isValid}
            onChangePhone={handleChangePhone}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmit={handleContinue}
            onPressCountry={() => {
              router.push("/(modals)/country-picker");
            }}
          />

          <PhoneFooter
            isValid={isValid}
            loading={loading}
            onContinue={handleContinue}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.xl,
  },
});
