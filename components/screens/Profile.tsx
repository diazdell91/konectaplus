import {
  AppInfo,
  ProfileFooter,
  ProfileListItem,
  ProfileSection,
  SocialLinks,
} from "@/components";
import { Screen, ScreenHeader } from "@/components/ui";
import { ScrollView, StyleSheet } from "react-native";

import { useAuth } from "@/context/AuthProvider";
import { SPACING } from "@/theme";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { auth, logout } = useAuth();

  console.log(JSON.stringify(auth, null, 2));

  const handleSignOut = () => {
    logout();
  };

  return (
    <Screen safeArea edges={["top"]}>
      <ScreenHeader
        title="Mi Perfil"
        subtitle="Gestiona tu cuenta y preferencias"
        iconName="man"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileSection title="Mi cuenta">
          <ProfileListItem
            icon="profile"
            title="Información básica"
            subtitle="Nombre, correo y teléfono"
            onPress={() =>
              router.navigate("/(protected)/(profile)/profile-screen")
            }
          />
          <ProfileListItem
            icon="location"
            title="Mis Direcciones"
            subtitle="Gestiona tus ubicaciones de envío"
            onPress={() => router.push("/(protected)/(address)/list-address")}
          />
          <ProfileListItem
            icon="family"
            title="Mis Beneficiarios"
            subtitle="Personas que reciben tus envíos"
            onPress={() =>
              router.navigate("/(protected)/(recipient)/list-recipients")
            }
          />
          <ProfileListItem
            icon="card"
            title="Métodos de pago"
            subtitle="Tarjetas y formas de pago"
            onPress={() => router.push("/services/payment/payment-methods")}
          />
        </ProfileSection>

        <ProfileSection title="Preferencias">
          <ProfileListItem
            icon="notification"
            title="Notificaciones"
            subtitle="Configura tus alertas"
            onPress={() =>
              router.navigate("/(protected)/(profile)/preferences")
            }
          />
          <ProfileListItem
            icon="security"
            title="Cambiar contraseña"
            subtitle="Actualiza tu clave de acceso"
            onPress={() =>
              router.navigate("/(protected)/(profile)/change-pass")
            }
          />
        </ProfileSection>

        <ProfileSection title="Soporte">
          <ProfileListItem
            icon="agent"
            title="Ayuda"
            subtitle="Centro de soporte y preguntas"
            onPress={() =>
              router.navigate("/(protected)/(profile)/help-center")
            }
          />
          <ProfileListItem
            icon="safety"
            title="Política de privacidad"
            subtitle="Términos y condiciones de uso"
            onPress={() => router.push("/(protected)/(profile)/privacy-policy")}
          />
        </ProfileSection>

        <ProfileSection title="Síguenos">
          <SocialLinks />
        </ProfileSection>

        <ProfileSection title="Información de la app">
          <AppInfo />
        </ProfileSection>

        <ProfileFooter />

        <ProfileSection title="">
          <ProfileListItem
            icon="logout"
            title="Cerrar sesión"
            onPress={handleSignOut}
          />
        </ProfileSection>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
});
