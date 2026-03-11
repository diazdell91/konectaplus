import OrderListItem from "@/features/orders/components/OrderListItem";
import { Order } from "@/graphql/myOrders";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface OrderListViewProps {
  items: Order[];
  loading: boolean;
  error: unknown;
  onRefresh: () => void;
}

const OrderListView = ({ items, loading, error, onRefresh }: OrderListViewProps) => {
  if (loading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar los pedidos</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="receipt-outline" size={48} color={COLORS.neutral.gray300} />
        <Text style={styles.emptyText}>Aún no tienes pedidos</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={loading}
      renderItem={({ item }) => <OrderListItem order={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.root}
    />
  );
};

export default OrderListView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  separator: {
    height: 10,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background.secondary,
    gap: 12,
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
  },
});
