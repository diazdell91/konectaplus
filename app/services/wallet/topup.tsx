import WalletTopupChip from "@/components/wallet/WalletTopupChip";
import { Button, Text } from "@/components/ui";
import {
  WALLET_TOPUP_PRODUCTS,
  WalletTopupProduct,
  WalletTopupProductsData,
} from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function WalletTopupScreen() {
  const [selected, setSelected] = useState<WalletTopupProduct | null>(null);

  const { data, loading, error } = useQuery<WalletTopupProductsData>(
    WALLET_TOPUP_PRODUCTS,
    { fetchPolicy: "cache-and-network" },
  );

  const products = (data?.walletTopupProducts ?? []).filter((p) => p.isActive);

  const handleContinue = () => {
    if (!selected) return;
    router.push({
      pathname: "/services/wallet/topup-confirm",
      params: {
        productId: selected.productId,
        amountCents: String(selected.amountCents),
        priceCents: String(selected.priceCents),
        feeCents: String(selected.feeCents),
      },
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text h3 style={styles.heading}>
            Recarga de saldo
          </Text>
          <Text body color={COLORS.text.secondary} style={styles.sub}>
            Selecciona el monto que deseas agregar a tu saldo.
          </Text>

          {loading && products.length === 0 ? (
            <View style={styles.centered}>
              <ActivityIndicator color={COLORS.primary.main} />
            </View>
          ) : error ? (
            <View style={styles.centered}>
              <Text body color={COLORS.semantic.error}>
                Error al cargar los montos disponibles.
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {products.map((product) => (
                <WalletTopupChip
                  key={product.id}
                  product={product}
                  selected={selected?.id === product.id}
                  onPress={() => setSelected(product)}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Button
            variant="primary"
            title={
              selected
                ? `Recargar $${(selected.amountCents / 100).toFixed(0)}`
                : "Selecciona un monto"
            }
            onPress={handleContinue}
            disabled={selected === null}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  content: {
    flex: 1,
    gap: SPACING.md,
  },
  heading: {
    marginBottom: SPACING.xs,
  },
  sub: {
    marginBottom: SPACING.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingTop: SPACING.lg,
  },
});
