import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { COUNTRIES, CountryInfo } from "@/utils/phoneCountry";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CountryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: CountryInfo) => void;
}

const CountryModal = ({ visible, onClose, onSelect }: CountryModalProps) => (
  <Modal
    visible={visible}
    animationType="slide"
    presentationStyle="pageSheet"
    onRequestClose={onClose}
  >
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seleccionar país</Text>
        <Pressable onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={22} color={COLORS.text.primary} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {COUNTRIES.map((country) => (
          <Pressable
            key={country.iso}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
            onPress={() => {
              onSelect(country);
              onClose();
            }}
          >
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={styles.name}>{country.name}</Text>
            <Text style={styles.callingCode}>{country.callingCode}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  </Modal>
);

export default CountryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  title: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  list: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  itemPressed: {
    backgroundColor: COLORS.neutral.gray50,
  },
  flag: {
    fontSize: 22,
  },
  name: {
    flex: 1,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text.primary,
  },
  callingCode: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});
