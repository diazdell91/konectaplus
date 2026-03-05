import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { RechargeProductListing } from "@/graphql/adminRechargeProductListings";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import ProviderPicker from "./ProviderPicker";

interface Props {
  listings: RechargeProductListing[];
  loading: boolean;
  error: Error | undefined;
  selectedProviderCode: string | null;
  onSelectProvider: (code: string) => void;
  onRetry: () => void;
}

export default function ProviderSection({
  listings,
  loading,
  error,
  selectedProviderCode,
  onSelectProvider,
  onRetry,
}: Props) {
  if (loading && listings.length === 0) {
    return (
      <View style={styles.row}>
        <ActivityIndicator size="small" color={COLORS.primary.main} />
        <Text style={styles.loadingText}>Cargando proveedores…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.row}>
        <Ionicons name="alert-circle-outline" size={18} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar ofertas. </Text>
        <Pressable onPress={onRetry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ProviderPicker
      listings={listings}
      selectedProviderCode={selectedProviderCode}
      onSelectProvider={onSelectProvider}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  loadingText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.semantic.error,
  },
  retryText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary.main,
    textDecorationLine: "underline",
  },
});
