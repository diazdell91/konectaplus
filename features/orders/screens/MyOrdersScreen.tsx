import { COLORS } from "@/theme/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import OrderListView from "../components/OrderListView";
import { useMyOrders } from "../hooks/useMyOrders";

const MyOrdersScreen = () => {
  const { items, loading, error, refetch } = useMyOrders();

  return (
    <View style={styles.root}>
      <OrderListView
        items={items}
        loading={loading}
        error={error}
        onRefresh={refetch}
      />
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
});
