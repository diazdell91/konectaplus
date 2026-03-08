import {
  AppInfo,
  ProfileFooter,
  ProfileListItem,
  ProfileSection,
  SocialLinks,
} from "@/components";
import { Screen, ScreenHeader } from "@/components/ui";
import { ME, MeData } from "@/graphql/me";
import { useAuth } from "@/context/AuthProvider";
import { SPACING } from "@/theme";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const { data } = useQuery<MeData>(ME, { fetchPolicy: "cache-and-network" });

  const profile = data?.me?.profile;
  const displayName = profile?.fullName ?? profile?.firstName ?? data?.me?.phone ?? "Mi Perfil";
  const subtitle = data?.me?.email ?? "Gestiona tu cuenta y preferencias";

  const handleSignOut = () => {
    logout();
  };

  return (
    <Screen safeArea edges={["top"]}>
      <ScreenHeader
        title={displayName}
        subtitle={subtitle}
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
            onPress={() => router.push("/services/profile/basic-info")}
          />
          <ProfileListItem
            icon="location"
            title="Mis Direcciones"
            subtitle="Gestiona tus ubicaciones de envío"
            onPress={() => router.push("/services/profile/addresses")}
          />
          <ProfileListItem
            icon="family"
            title="Mis Beneficiarios"
            subtitle="Personas que reciben tus envíos"
            onPress={() => router.push("/services/profile/recipients")}
          />
          <ProfileListItem
            icon="card"
            title="Métodos de pago"
            subtitle="Tarjetas y formas de pago"
            onPress={() => router.push("/services/payment/payment-methods")}
          />
          <ProfileListItem
            icon="receipt"
            title="Mis Pedidos"
            subtitle="Historial de tus transacciones"
            onPress={() => router.push("/services/orders/my-orders")}
          />
        </ProfileSection>

        <ProfileSection title="Preferencias">
          <ProfileListItem
            icon="notification"
            title="Notificaciones"
            subtitle="Configura tus alertas"
            onPress={() => router.push("/services/profile/notifications")}
          />
        </ProfileSection>

        <ProfileSection title="Seguridad">
          <ProfileListItem
            icon="security"
            title="Cambiar contraseña"
            subtitle="Actualiza tu clave de acceso"
            onPress={() => router.push("/services/profile/change-password")}
          />
          <ProfileListItem
            icon="shield-check-outline"
            title="Sesiones activas"
            subtitle="Dispositivos con acceso a tu cuenta"
            onPress={() => router.push("/services/profile/sessions")}
          />
        </ProfileSection>

        <ProfileSection title="Soporte">
          <ProfileListItem
            icon="agent"
            title="Ayuda"
            subtitle="Centro de soporte y preguntas"
            onPress={() => router.push("/services/profile/help-center")}
          />
          <ProfileListItem
            icon="safety"
            title="Política de privacidad"
            subtitle="Términos y condiciones de uso"
            onPress={() => router.push("/privacy-policy")}
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
