import { getFlagSource } from "@/constants/phoneCountries";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  phone: string;
  countryIso: string;
  callingCode: string;
  onEditPhone: () => void;
}

const PhoneProviderSummary = ({
  phone,
  countryIso,
  callingCode,
  onEditPhone,
}: Props) => {
  const flagSource = useMemo(() => getFlagSource(countryIso), [countryIso]);

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={onEditPhone}
        accessibilityRole="button"
        accessibilityLabel="Editar número de teléfono"
      >
        <View style={styles.rowLeft}>
          {flagSource ? (
            <Image source={flagSource} style={styles.flag} contentFit="cover" />
          ) : (
            <Ionicons
              name="globe-outline"
              size={22}
              color={COLORS.text.tertiary}
            />
          )}
          <Text style={styles.phoneText}>{phone || callingCode}</Text>
        </View>
        <View style={styles.editBtn}>
          <Ionicons
            name="person-outline"
            size={14}
            color={COLORS.primary.main}
          />
          <Ionicons name="pencil" size={12} color={COLORS.primary.main} />
        </View>
      </Pressable>
    </View>
  );
};

export default PhoneProviderSummary;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowPressed: {
    backgroundColor: COLORS.neutral.gray100,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  flag: {
    width: 28,
    height: 20,
    borderRadius: 3,
  },
  phoneText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: 4,
  },
});
