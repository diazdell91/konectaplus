import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/components/ui";
import COLORS from "@/theme/colors";
import SPACING from "@/theme/spacing";
import { useContacts } from "@/features/topup/components/contacts/useContacts";
import type { ContactItem as DeviceContact } from "@/features/topup/components/contacts/ContactsList";

interface Contact {
  id: string;
  fullName: string;
  avatar: string | null;
}

function getFirstName(fullName: string): string {
  return fullName.split(" ")[0];
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

interface ContactItemProps {
  contact: Contact;
}

const ContactItem = ({ contact }: ContactItemProps) => (
  <Pressable style={styles.item}>
    {contact.avatar ? (
      <Image
        source={{ uri: contact.avatar }}
        style={styles.avatar}
        contentFit="cover"
      />
    ) : (
      <View style={styles.fallbackAvatar}>
        <Text style={styles.initials}>{getInitials(contact.fullName)}</Text>
      </View>
    )}
    <Text small align="center" color={COLORS.text.secondary} style={styles.name} numberOfLines={1}>
      {getFirstName(contact.fullName)}
    </Text>
  </Pressable>
);

const RecentContactsList = () => {
  const { contacts, loading, permission, loadContacts } = useContacts();

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const recentContacts = useMemo<Contact[]>(() => {
    return contacts.slice(0, 12).map((c: DeviceContact) => ({
      id: c.id,
      fullName: c.displayName,
      avatar: null,
    }));
  }, [contacts]);

  const handleViewAll = () => {
    router.push("/(tabs)/(topup)" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4>Mis Contactos</Text>
        <Pressable onPress={handleViewAll}>
          <Text small color={COLORS.primary.main}>Ver todos</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color={COLORS.primary.main} />
        </View>
      ) : permission === "denied" ? (
        <View style={styles.centered}>
          <Text small color={COLORS.text.secondary}>
            Activa permisos de contactos para ver tus recientes.
          </Text>
        </View>
      ) : (
      <FlatList
        data={recentContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem contact={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text small color={COLORS.text.secondary}>
            No tienes contactos disponibles.
          </Text>
        }
      />
      )}
    </View>
  );
};

export default RecentContactsList;

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.component.screenPadding,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingHorizontal: SPACING.component.screenPadding,
  },
  separator: {
    width: SPACING.md,
  },
  item: {
    alignItems: "center",
    width: 64,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.neutral.gray100,
  },
  fallbackAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary.main,
  },
  name: {
    marginTop: SPACING.xs,
  },
  centered: {
    minHeight: 72,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.component.screenPadding,
  },
});
