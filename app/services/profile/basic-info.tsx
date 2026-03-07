import { Button, Input, Text } from "@/components/ui";
import { ME, MeData } from "@/graphql/me";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasicInfoScreen() {
  const { data, loading } = useQuery<MeData>(ME, {
    fetchPolicy: "cache-and-network",
  });

  const me = data?.me;
  const profile = me?.profile;

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
        {/* Avatar placeholder */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.primary.main} />
          </View>
          <Text style={styles.avatarName}>
            {profile?.fullName ?? profile?.firstName ?? me?.phone ?? "—"}
          </Text>
          {me?.email && (
            <Text style={styles.avatarEmail}>{me.email}</Text>
          )}
        </View>

        {/* Info fields (solo lectura por ahora) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Datos personales</Text>

          <Input
            label="Nombre"
            value={profile?.firstName ?? ""}
            editable={false}
            placeholder="—"
          />
          <Input
            label="Apellido"
            value={profile?.lastName ?? ""}
            editable={false}
            placeholder="—"
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
          <Button
            variant="outline"
            title="Editar información"
            onPress={() => {}}
            disabled
          />
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
  avatarWrap: {
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  avatarName: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  avatarEmail: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
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
});
