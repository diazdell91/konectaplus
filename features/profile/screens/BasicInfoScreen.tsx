import { Button, Input } from "@/components/ui";
import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BasicInfoAvatar } from "../components/BasicInfoAvatar";
import { useBasicInfoScreen } from "../hooks/useBasicInfoScreen";

export default function BasicInfoScreen() {
  const {
    me,
    profile,
    loading,
    saving,
    editing,
    setEditing,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isDirty,
    handleSave,
    handleCancel,
  } = useBasicInfoScreen();

  if (loading && !me) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <BasicInfoAvatar
          displayName={profile?.fullName ?? profile?.firstName ?? me?.phone ?? "—"}
          email={me?.email}
        />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Datos personales</Text>
          <Input
            label="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            editable={editing}
            placeholder="Tu nombre"
            autoCapitalize="words"
          />
          <Input
            label="Apellido"
            value={lastName}
            onChangeText={setLastName}
            editable={editing}
            placeholder="Tu apellido"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contacto</Text>
          <Input
            label="Teléfono"
            value={me?.phone ?? ""}
            editable={false}
            iconLeft="phone-outline"
          />
          <Input
            label="Correo electrónico"
            value={me?.email ?? ""}
            editable={false}
            placeholder="Sin correo registrado"
            iconLeft="email-outline"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Cuenta</Text>
          <Input
            label="Estado"
            value={me?.status ?? ""}
            editable={false}
            iconLeft="shield-check-outline"
          />
          <Input
            label="Miembro desde"
            value={
              me?.createdAt
                ? new Date(me.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""
            }
            editable={false}
            iconLeft="calendar-outline"
          />
        </View>

        <View style={styles.footer}>
          {editing ? (
            <View style={styles.editActions}>
              <Button
                variant="outline"
                title="Cancelar"
                onPress={handleCancel}
                style={styles.actionBtn}
              />
              <Button
                variant="primary"
                title={saving ? "Guardando…" : "Guardar"}
                onPress={handleSave}
                disabled={saving || !isDirty}
                style={styles.actionBtn}
              />
            </View>
          ) : (
            <Button
              variant="outline"
              title="Editar información"
              onPress={() => setEditing(true)}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface.primary,
  },
  scroll: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.lg,
  },
  section: {
    gap: SPACING.xs,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: SPACING.xs,
  },
  footer: {
    marginTop: SPACING.md,
  },
  editActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
  },
});
