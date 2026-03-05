import { getCountryByIso } from "@/constants/phoneCountries";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RowItem from "../rows/RowItem";

export interface ContactItem {
  id: string;
  displayName: string;
  primaryPhone: string;
  label: string;
  flag: string | null;
  countryIso: string | null;
}

interface Section {
  title: string;
  isCountryGroup?: boolean;
  data: ContactItem[];
}

interface Props {
  contacts: ContactItem[];
  loading: boolean;
  permissionDenied: boolean;
  query: string;
  countryIso?: string | null;
  onSelect: (phone: string) => void;
  onRequestPermission: () => void;
}

function buildLetterSections(items: ContactItem[]): Section[] {
  const letterMap: Record<string, ContactItem[]> = {};
  for (const c of items) {
    const letter = c.displayName[0]?.toUpperCase() ?? "#";
    const key = /[A-Z]/.test(letter) ? letter : "#";
    if (!letterMap[key]) letterMap[key] = [];
    letterMap[key].push(c);
  }
  return Object.keys(letterMap)
    .sort()
    .map((letter) => ({ title: letter, data: letterMap[letter] }));
}

const ContactsList = ({
  contacts,
  loading,
  permissionDenied,
  query,
  countryIso,
  onSelect,
  onRequestPermission,
}: Props) => {
  const listRef = useRef<SectionList<ContactItem, Section>>(null);

  const q = query.toLowerCase();

  const matchesQuery = (c: ContactItem) =>
    !q ||
    c.displayName.toLowerCase().includes(q) ||
    c.primaryPhone.toLowerCase().includes(q);

  // Split into country-matching and others
  const countryContacts = contacts.filter(
    (c) => countryIso && c.countryIso === countryIso && matchesQuery(c)
  );
  const otherContacts = contacts.filter(
    (c) =>
      !(countryIso && c.countryIso === countryIso) && matchesQuery(c)
  );

  // Build sections: country group (single section) + letter sections for others
  const countryInfo = countryIso ? getCountryByIso(countryIso) : null;
  const sections: Section[] = [];

  if (countryContacts.length > 0) {
    sections.push({
      title: countryInfo?.nameEs ?? countryIso ?? "",
      isCountryGroup: true,
      data: countryContacts,
    });
  }

  sections.push(...buildLetterSections(otherContacts));

  // Alphabet index only for letter sections (not the country group)
  const alphabet = sections
    .filter((s) => !s.isCountryGroup)
    .map((s) => s.title);

  const scrollToLetter = (letter: string) => {
    const idx = sections.findIndex((s) => !s.isCountryGroup && s.title === letter);
    if (idx >= 0 && listRef.current) {
      listRef.current.scrollToLocation({
        sectionIndex: idx,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
        <Text style={[styles.emptyText, { marginTop: 12 }]}>Cargando...</Text>
      </View>
    );
  }

  if (permissionDenied) {
    return (
      <View style={styles.centered}>
        <Ionicons name="lock-closed-outline" size={40} color="#C0C8D2" />
        <Text style={styles.emptyTitle}>Sin acceso a contactos</Text>
        <Text style={styles.emptyText}>
          Permite el acceso para ver tus contactos aquí.
        </Text>
        <Pressable style={styles.permButton} onPress={onRequestPermission}>
          <Text style={styles.permButtonText}>Permitir acceso</Text>
        </Pressable>
      </View>
    );
  }

  if (sections.length === 0 && q) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No se encontraron resultados</Text>
      </View>
    );
  }

  if (sections.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Sin contactos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        ref={listRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RowItem
            displayName={item.displayName}
            phone={item.primaryPhone}
            label={item.label}
            flag={item.flag}
            onPress={() => onSelect(item.primaryPhone)}
          />
        )}
        renderSectionHeader={({ section }) =>
          section.isCountryGroup ? (
            <View style={styles.countryHeader}>
              <Text style={styles.countryHeaderText}>{section.title}</Text>
            </View>
          ) : (
            <Text style={styles.sectionLetter}>{section.title}</Text>
          )
        }
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.alphabetIndex} pointerEvents="box-none">
        {alphabet.map((letter) => (
          <Pressable key={letter} onPress={() => scrollToLetter(letter)}>
            <Text style={styles.alphabetLetter}>{letter}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ContactsList;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  countryHeader: {
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEE",
    marginBottom: 4,
  },
  countryHeaderText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
  sectionLetter: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: "#47C26B",
    paddingTop: 12,
    paddingBottom: 4,
  },
  alphabetIndex: {
    position: "absolute",
    right: 4,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  alphabetLetter: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: "#47C26B",
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
    paddingTop: 60,
  },
  emptyTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: "#6C7B8A",
    textAlign: "center",
  },
  permButton: {
    marginTop: 8,
    backgroundColor: "#47C26B",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  permButtonText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
