import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import COLORS from "@/theme/colors";
import SPACING from "@/theme/spacing";
import { FONT_FAMILIES, FONT_SIZES } from "@/theme/typography";

interface Contact {
  id: string;
  fullName: string;
  avatar: string;
}

const CONTACTS: Contact[] = [
  { id: "1", fullName: "Brian Smith", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", fullName: "Ana Torres", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", fullName: "Carlos Mendez", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "4", fullName: "Laura Pérez", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: "5", fullName: "Miguel Rojas", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "6", fullName: "Sofia Castillo", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: "7", fullName: "Diego Vargas", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "8", fullName: "Valeria Rios", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: "9", fullName: "Andrés Fuentes", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "10", fullName: "Camila Herrera", avatar: "https://i.pravatar.cc/150?img=10" },
];

function getFirstName(fullName: string): string {
  return fullName.split(" ")[0];
}

interface ContactItemProps {
  contact: Contact;
}

const ContactItem = ({ contact }: ContactItemProps) => (
  <Pressable style={styles.item}>
    <Image
      source={{ uri: contact.avatar }}
      style={styles.avatar}
      contentFit="cover"
    />
    <Text style={styles.name} numberOfLines={1}>
      {getFirstName(contact.fullName)}
    </Text>
  </Pressable>
);

const RecentContactsList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Contactos</Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.viewAll}>Ver todos</Text>
        </Pressable>
      </View>

      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem contact={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  title: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  viewAll: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary.main,
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
  name: {
    marginTop: SPACING.xs,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
});
