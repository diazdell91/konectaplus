import { Button, Input, Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToast } from "@/utils/toast";

export default function ChangePasswordScreen() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    current.length >= 6 && next.length >= 6 && next === confirm;

  const handleSubmit = async () => {
    if (!isValid) return;
    if (next !== confirm) {
      showToast.error("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      // TODO: llamar mutation changePassword cuando esté disponible en el backend
      showToast.info("Función disponible próximamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.iconWrap}>
          <Ionicons name="lock-closed-outline" size={40} color={COLORS.primary.main} />
        </View>

        <Text style={styles.description}>
          Elige una contraseña segura de al menos 6 caracteres. No la compartas
          con nadie.
        </Text>

        <View style={styles.form}>
          <Input
            label="Contraseña actual"
            value={current}
            onChangeText={setCurrent}
            secureTextEntry
            showPasswordToggle
            placeholder="••••••••"
            autoCapitalize="none"
          />
          <Input
            label="Nueva contraseña"
            value={next}
            onChangeText={setNext}
            secureTextEntry
            showPasswordToggle
            placeholder="••••••••"
            autoCapitalize="none"
            helperText="Mínimo 6 caracteres"
          />
          <Input
            label="Confirmar nueva contraseña"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            showPasswordToggle
            placeholder="••••••••"
            autoCapitalize="none"
            error={
              confirm.length > 0 && confirm !== next
                ? "Las contraseñas no coinciden"
                : undefined
            }
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          variant="primary"
          title={loading ? "Guardando..." : "Guardar contraseña"}
          onPress={handleSubmit}
          disabled={!isValid || loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  scroll: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.lg,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: SPACING.sm,
  },
  description: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  footer: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
});
