import { useQuery } from "@apollo/client/react";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { Text } from "@/components/ui";
import { COUNTRIES_QUERY, CountriesData, Country } from "@/graphql/countries";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const HORIZONTAL_PADDING = 16;
const NUM_COLUMNS = 4;

// ─────────────────────────────────────────────
// PopularCountriesSection
// ─────────────────────────────────────────────

export default function PopularCountriesSection() {
  const { width } = useWindowDimensions();
  const { data, loading } = useQuery<CountriesData>(COUNTRIES_QUERY);

  const itemWidth = (width - HORIZONTAL_PADDING * 2) / NUM_COLUMNS;
  const imageSize = Math.min(itemWidth * 0.72, 76);

  const countries = React.useMemo(
    () => [...(data?.countries ?? [])].sort((a, b) => a.priority - b.priority),
    [data]
  );

  if (loading || countries.length === 0) return null;

  const renderItem = ({ item }: { item: Country }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        { width: itemWidth },
        pressed && styles.itemPressed,
      ]}
      onPress={() => router.push(item.deeplink as any)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]}
        contentFit="cover"
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.sectionTitle}>Países populares</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      />
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  item: {
    alignItems: "center",
    paddingVertical: 4,
  },
  itemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  image: {
    backgroundColor: "#F0F2F5",
  },
  name: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 13,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: 8,
  },
  rowSeparator: {
    height: 12,
  },
});
