import { getFlagSource } from "@/constants/phoneCountries";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onCountryPress: () => void;
  onOptionsPress: () => void;
  countryIso?: string | null;
  countryDialCode?: string | null;
}

const SearchBar = ({
  value,
  onChangeText,
  onCountryPress,
  onOptionsPress,
  countryIso,
  countryDialCode,
}: Props) => {
  const flagSource = countryIso ? getFlagSource(countryIso) : null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.left} onPress={onCountryPress}>
        {flagSource ? (
          <Image source={flagSource} style={styles.flag} />
        ) : (
          <Ionicons name="globe-outline" size={18} color="#6C7B8A" />
        )}
        {countryDialCode ? (
          <Text style={styles.dialCode}>{countryDialCode}</Text>
        ) : null}
        <Ionicons name="chevron-down" size={14} color="#6C7B8A" />
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Buscar"
        placeholderTextColor="#9AA5B4"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
      />

      <Pressable style={styles.right} onPress={onOptionsPress}>
        <Ionicons name="ellipsis-vertical" size={18} color="#6C7B8A" />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEE",
    paddingHorizontal: 12,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: "#EAEAEE",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 15,
    color: "#111111",
  },
  right: {
    paddingLeft: 8,
  },
  flag: {
    width: 22,
    height: 16,
    borderRadius: 2,
  },
  dialCode: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 13,
    color: "#111111",
  },
});
