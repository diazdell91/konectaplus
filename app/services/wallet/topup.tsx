import { Button, Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const AMOUNTS = [5, 10, 20, 50, 100];

/**
 * Recarga Saldo (Wallet) — inputKind: NONE
 * Pantalla de selección de monto para recargar el saldo del wallet.
 */
export default function WalletTopupScreen() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleContinue = () => {
    // TODO: navegar a pantalla de confirmación / pago
    console.log("wallet topup amount:", selected);
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

          <View style={styles.grid}>
            {AMOUNTS.map((amount) => (
              <AmountChip
                key={amount}
                amount={amount}
                selected={selected === amount}
                onPress={() => setSelected(amount)}
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            variant="primary"
            title={selected ? `Recargar $${selected}` : "Selecciona un monto"}
            onPress={handleContinue}
            disabled={selected === null}
          />
        </View>
      </View>
    </View>
  );
}

interface AmountChipProps {
  amount: number;
  selected: boolean;
  onPress: () => void;
}

function AmountChip({ amount, selected, onPress }: AmountChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        chipStyles.chip,
        selected && chipStyles.chipSelected,
        pressed && chipStyles.chipPressed,
      ]}
    >
      <Text style={[chipStyles.label, selected && chipStyles.labelSelected]}>
        ${amount}
      </Text>
    </Pressable>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
    borderRadius: 16,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: 80,
  },
  chipSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: `${COLORS.primary.main}15`,
  },
  chipPressed: {
    opacity: 0.7,
  },
  label: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: COLORS.text.primary,
  },
  labelSelected: {
    color: COLORS.primary.main,
  },
});

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
  footer: {
    paddingTop: SPACING.lg,
  },
});
