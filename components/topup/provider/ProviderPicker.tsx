/**
 * ProviderPicker
 *
 * Displays a horizontal scrollable grid of provider cards.
 * Each card shows the provider logo (if available) and name.
 * The selected provider gets a green border + check badge.
 */

// ProviderPicker — not used in active flow (topupProducts query has no providerCode field)
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProviderMeta {
  providerCode: string;
  name: string;
  logoUrl: string | null;
  count: number;
}

interface ProviderPickerItem {
  id: string;
  providerCode: string;
  serviceProvider: string | null;
  logoUrl: string | null;
}

interface Props {
  listings: ProviderPickerItem[];
  selectedProviderCode: string | null;
  onSelectProvider: (providerCode: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildProviders(listings: ProviderPickerItem[]): ProviderMeta[] {
  const map = new Map<string, ProviderMeta>();

  for (const item of listings) {
    const existing = map.get(item.providerCode);
    if (existing) {
      existing.count += 1;
      // Prefer first non-null logo
      if (!existing.logoUrl && item.logoUrl) {
        existing.logoUrl = item.logoUrl;
      }
    } else {
      map.set(item.providerCode, {
        providerCode: item.providerCode,
        name: item.serviceProvider ?? item.providerCode,
        logoUrl: item.logoUrl ?? null,
        count: 1,
      });
    }
  }

  return Array.from(map.values());
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ProviderPicker = ({
  listings,
  selectedProviderCode,
  onSelectProvider,
}: Props) => {
  const providers = useMemo(() => buildProviders(listings), [listings]);

  if (providers.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Proveedor</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {providers.map((provider) => {
          const isSelected = provider.providerCode === selectedProviderCode;
          return (
            <Pressable
              key={provider.providerCode}
              style={({ pressed }) => [
                styles.card,
                isSelected && styles.cardSelected,
                pressed && styles.cardPressed,
              ]}
              onPress={() => onSelectProvider(provider.providerCode)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {/* Logo or initials */}
              {provider.logoUrl ? (
                <Image
                  source={{ uri: provider.logoUrl }}
                  style={styles.logo}
                  contentFit="contain"
                />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Text style={styles.logoPlaceholderText}>
                    {provider.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}

              {/* Selected check badge */}
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={COLORS.primary.main}
                  />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProviderPicker;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text.secondary,
    marginHorizontal: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 4,
  },
  card: {
    width: 90,
    minHeight: 96,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.surface.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 6,
  },
  cardSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: COLORS.primary.tint,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  logoPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.neutral.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  logoPlaceholderText: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary.main,
  },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
  },
});
