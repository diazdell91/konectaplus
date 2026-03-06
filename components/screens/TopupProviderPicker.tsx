import {
  ADMIN_TOPUP_PRODUCT_LISTINGS,
  AdminTopupProductListingsData,
  AdminTopupProductListingsVars,
  TopupProductListing,
} from "@/graphql/adminTopupProductListings";
import { useServiceSelectionStore } from "@/store/useServiceSelectionStore";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProviderMeta {
  providerCode: string;
  name: string;
  logoUrl: string | null;
  count: number;
}

function buildProviders(listings: TopupProductListing[]): ProviderMeta[] {
  const map = new Map<string, ProviderMeta>();
  for (const item of listings) {
    const existing = map.get(item.providerCode);
    if (existing) {
      existing.count += 1;
      if (!existing.logoUrl && item.logoUrl) existing.logoUrl = item.logoUrl;
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

export default function TopupProviderPicker() {
  const { country, setProviderId } = useServiceSelectionStore();
  const countryIso2 = country.iso2;

  const { data, loading, error, refetch } = useQuery<
    AdminTopupProductListingsData,
    AdminTopupProductListingsVars
  >(ADMIN_TOPUP_PRODUCT_LISTINGS, {
    variables: { status: "ACTIVE", countryIso: countryIso2, pageSize: 500 },
    skip: !countryIso2,
    fetchPolicy: "cache-first",
  });

  const listings: TopupProductListing[] =
    data?.adminRechargeProductListings.items ?? [];

  const providers = useMemo(() => buildProviders(listings), [listings]);

  const handleSelect = (providerCode: string) => {
    setProviderId(providerCode, "provider");
    router.back();
  };

  return (
    <View style={styles.root}>
      <View style={styles.handleBar} />

      <SafeAreaView edges={[]} style={styles.headerWrap}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Seleccionar proveedor</Text>
            <Text style={styles.subtitle}>
              Elige el operador para esta recarga
            </Text>
          </View>
          <Pressable
            style={styles.closeBtn}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Ionicons name="close" size={20} color={COLORS.text.primary} />
          </Pressable>
        </View>
      </SafeAreaView>

      {loading && providers.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary.main} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons
            name="alert-circle-outline"
            size={32}
            color={COLORS.semantic.error}
          />
          <Text style={styles.errorText}>Error al cargar proveedores</Text>
          <Pressable onPress={() => refetch()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : providers.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons
            name="wifi-outline"
            size={40}
            color={COLORS.neutral.gray300}
          />
          <Text style={styles.emptyText}>
            No hay proveedores disponibles para este país
          </Text>
        </View>
      ) : (
        <FlatList
          data={providers}
          keyExtractor={(item) => item.providerCode}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.row,
                pressed && styles.rowPressed,
              ]}
              onPress={() => handleSelect(item.providerCode)}
            >
              {item.logoUrl ? (
                <Image
                  source={{ uri: item.logoUrl }}
                  style={styles.logo}
                  contentFit="contain"
                />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Text style={styles.logoInitial}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.rowText}>
                <Text style={styles.providerName}>{item.name}</Text>
                <Text style={styles.providerCount}>
                  {item.count} producto{item.count !== 1 ? "s" : ""}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.primary.main}
              />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border.light,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.neutral.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  rowPressed: {
    backgroundColor: COLORS.background.secondary,
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
  logoInitial: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary.main,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  providerName: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  providerCount: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary.main,
  },
  retryText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
