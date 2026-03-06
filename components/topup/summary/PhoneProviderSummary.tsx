import { getFlagSource } from "@/constants/phoneCountries";
import { TopupProductListing } from "@/graphql/adminTopupProductListings";
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
  listings: TopupProductListing[];
  selectedProviderCode: string | null;
  onEditPhone: () => void;
  onEditProvider: () => void;
}

const PhoneProviderSummary = ({
  phone,
  countryIso,
  callingCode,
  listings,
  selectedProviderCode,
  onEditPhone,
  onEditProvider,
}: Props) => {
  const flagSource = useMemo(() => getFlagSource(countryIso), [countryIso]);

  const provider = useMemo(() => {
    const code = selectedProviderCode ?? listings[0]?.providerCode ?? null;
    if (!code) return null;
    const match = listings.find((l) => l.providerCode === code);
    if (!match) return null;
    return {
      name: match.serviceProvider ?? code,
      logoUrl: match.logoUrl ?? null,
    };
  }, [listings, selectedProviderCode]);

  return (
    <View style={styles.card}>
      {/* ── Phone row ── */}
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

      <View style={styles.divider} />

      {/* ── Provider row ── */}
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={onEditProvider}
        accessibilityRole="button"
        accessibilityLabel="Editar proveedor"
      >
        <View style={styles.rowLeft}>
          {provider?.logoUrl ? (
            <Image
              source={{ uri: provider.logoUrl }}
              style={styles.providerLogo}
              contentFit="contain"
            />
          ) : (
            <View style={styles.providerLogoPlaceholder}>
              {provider ? (
                <Text style={styles.providerLogoInitial}>
                  {provider.name.charAt(0).toUpperCase()}
                </Text>
              ) : (
                <Ionicons
                  name="business-outline"
                  size={16}
                  color={COLORS.text.tertiary}
                />
              )}
            </View>
          )}
          <Text
            style={[styles.providerText, !provider && styles.providerTextEmpty]}
            numberOfLines={1}
          >
            {provider ? provider.name : "Seleccionar proveedor"}
          </Text>
        </View>
        <View style={styles.editBtn}>
          <Ionicons name="pencil" size={14} color={COLORS.primary.main} />
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
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
    marginHorizontal: 16,
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
  providerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  providerLogoPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.neutral.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  providerLogoInitial: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary.main,
  },
  providerText: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text.primary,
    flex: 1,
  },
  providerTextEmpty: {
    color: COLORS.text.tertiary,
    fontFamily: FONT_FAMILIES.regular,
  },
});
