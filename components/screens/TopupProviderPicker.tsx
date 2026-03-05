import {
  ServiceCategoriesData,
  ServiceCategory,
  ServiceItem,
  SERVICE_CATEGORIES,
} from "@/graphql/serviceCategories";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Map iconName from API to a local image or fallback initials
function ProviderLogo({ iconName, title }: { iconName: string; title: string }) {
  // Derive initials as fallback
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  // If the iconName is a URL, render it as image
  const isUrl = iconName?.startsWith("http");
  if (isUrl) {
    return <Image source={{ uri: iconName }} style={styles.providerLogo} resizeMode="contain" />;
  }

  return (
    <View style={styles.providerLogoFallback}>
      <Text style={styles.providerLogoInitials}>{initials}</Text>
    </View>
  );
}

function CategorySection({ category, onSelect }: { category: ServiceCategory; onSelect: (item: ServiceItem) => void }) {
  return (
    <View style={styles.categoryBlock}>
      {/* Section label */}
      <View style={styles.categoryHeader}>
        <View style={styles.categoryDot} />
        <Text style={styles.categoryLabel}>{category.title}</Text>
        <View style={styles.categoryLine} />
      </View>

      {/* Items */}
      {category.items.map((item) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [styles.itemRow, pressed && styles.itemRowPressed]}
          onPress={() => onSelect(item)}
        >
          <ProviderLogo iconName={item.iconName} title={item.title} />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.subtitle ? (
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            ) : null}
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary.main} />
        </Pressable>
      ))}
    </View>
  );
}

export default function TopupProviderPicker() {
  const router = useRouter();

  const { data, loading, error, refetch } = useQuery<ServiceCategoriesData>(SERVICE_CATEGORIES, {
    fetchPolicy: "cache-and-network",
  });

  const categories = data?.serviceCategories ?? [];

  return (
    <View style={styles.root}>
      {/* Handle bar */}
      <View style={styles.handleBar} />

      {/* Header */}
      <SafeAreaView edges={[]} style={styles.headerWrap}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Seleccione un servicio</Text>
            <Text style={styles.subtitle}>
              Por favor, seleccione el proveedor o tipo de servicio para esta transacción
            </Text>
          </View>
          <Pressable style={styles.closeBtn} onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={20} color={COLORS.text.primary} />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Content */}
      {loading && categories.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary.main} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={32} color={COLORS.semantic.error} />
          <Text style={styles.errorText}>Error al cargar servicios</Text>
          <Pressable onPress={() => refetch()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategorySection
              category={item}
              onSelect={(serviceItem) => {
                router.push(serviceItem.route as any);
              }}
            />
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

  // ── Header
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

  // ── List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 8,
  },

  // ── Category
  categoryBlock: {
    gap: 8,
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary.main,
  },
  categoryLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border.light,
  },

  // ── Item row
  itemRow: {
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
  itemRowPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  providerLogo: {
    width: 44,
    height: 28,
  },
  providerLogoFallback: {
    width: 44,
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.background.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  providerLogoInitials: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.text.secondary,
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  itemSubtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },

  // ── States
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
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
