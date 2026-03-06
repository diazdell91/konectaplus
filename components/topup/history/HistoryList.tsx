import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RowItem from "../rows/RowItem";

export interface HistoryItem {
  id: string;
  name: string | null;
  phone: string;
  label: string;
  countryCode: string;
  flag: string | null;
}

interface Props {
  items: HistoryItem[];
  onSelect: (phone: string) => void;
}

const HistoryList = ({ items, onSelect }: Props) => {
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No se encontraron resultados</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RowItem
          displayName={item.name ?? ""}
          phone={item.phone}
          label={item.label}
          countryIso={item.countryCode}
          onPress={() => onSelect(item.phone)}
        />
      )}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: "#6C7B8A",
    textAlign: "center",
  },
});
