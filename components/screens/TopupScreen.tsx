import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { detectCountryFromPhone } from "@/utils/phoneCountry";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RowItem from "../topup/rows/RowItem";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactItem {
  id: string;
  displayName: string;
  primaryPhone: string;
  label: string;
  flag: string | null;
}

interface HistoryItem {
  id: string;
  name: string | null;
  phone: string;
  label: string;
  countryCode: string;
  flag: string | null;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "h1",
    name: null,
    phone: "+53 47 581422",
    label: "principal",
    countryCode: "CU",
    flag: "🇨🇺",
  },
  {
    id: "h2",
    name: null,
    phone: "+1 786 310 6477",
    label: "móvil",
    countryCode: "US",
    flag: "🇺🇸",
  },
  {
    id: "h3",
    name: "Claudia Website 1nation",
    phone: "+1 786 571 2788",
    label: "móvil",
    countryCode: "US",
    flag: "🇺🇸",
  },
  {
    id: "h4",
    name: "Jorge Ramírez",
    phone: "+52 55 1234 5678",
    label: "móvil",
    countryCode: "MX",
    flag: "🇲🇽",
  },
  {
    id: "h5",
    name: null,
    phone: "+53 5 912 3456",
    label: "móvil",
    countryCode: "CU",
    flag: "🇨🇺",
  },
];

// ─── Main screen ──────────────────────────────────────────────────────────────

type Tab = "history" | "contacts";
type Permission = "undetermined" | "granted" | "denied";

interface Section {
  title: string;
  data: ContactItem[];
}

const ContactsHistoryScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [permission, setPermission] = useState<Permission>("undetermined");
  const [loading, setLoading] = useState(false);

  const handleSelectPhone = useCallback(
    (phone: string) => {
      const country = detectCountryFromPhone(phone);
      router.push({
        pathname: "/(tabs)/(topup)/recharge-flow",
        params: {
          phone,
          ...(country ? { countryIso: country.iso } : {}),
        },
      });
    },
    [router],
  );

  const listRef = useRef<SectionList<ContactItem, Section>>(null);

  // ─── Load contacts ──────────────────────────────────────────────────────────

  const loadContacts = useCallback(async () => {
    setLoading(true);
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      setPermission("denied");
      setLoading(false);
      return;
    }
    setPermission("granted");

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      sort: Contacts.SortTypes.FirstName,
    });

    const normalized: ContactItem[] = data
      .filter((c) => c.phoneNumbers && c.phoneNumbers.length > 0)
      .map((c) => {
        const phoneEntry = c.phoneNumbers![0];
        const phone = phoneEntry.number ?? "";
        const label = phoneEntry.label ?? "";
        const country = detectCountryFromPhone(phone);
        return {
          id: c.id ?? String(Math.random()),
          displayName: c.name || phone,
          primaryPhone: phone.trim(),
          label,
          flag: country?.flag ?? null,
        };
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));

    setContacts(normalized);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeTab === "contacts" && permission === "undetermined") {
      loadContacts();
    }
  }, [activeTab, permission, loadContacts]);

  // ─── Filtering ──────────────────────────────────────────────────────────────

  const q = query.toLowerCase();

  const filteredHistory = MOCK_HISTORY.filter((h) => {
    if (!q) return true;
    return (
      h.phone.toLowerCase().includes(q) ||
      (h.name?.toLowerCase().includes(q) ?? false)
    );
  });

  const filteredContacts = contacts.filter((c) => {
    if (!q) return true;
    return (
      c.displayName.toLowerCase().includes(q) ||
      c.primaryPhone.toLowerCase().includes(q)
    );
  });

  // ─── A–Z sections ───────────────────────────────────────────────────────────

  const sections: Section[] = [];
  const letterMap: Record<string, ContactItem[]> = {};
  for (const c of filteredContacts) {
    const letter = c.displayName[0]?.toUpperCase() ?? "#";
    const key = /[A-Z]/.test(letter) ? letter : "#";
    if (!letterMap[key]) letterMap[key] = [];
    letterMap[key].push(c);
  }
  for (const letter of Object.keys(letterMap).sort()) {
    sections.push({ title: letter, data: letterMap[letter] });
  }

  const alphabet = sections.map((s) => s.title);

  const scrollToLetter = (letter: string) => {
    const idx = sections.findIndex((s) => s.title === letter);
    if (idx >= 0 && listRef.current) {
      listRef.current.scrollToLocation({
        sectionIndex: idx,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  // ─── Render states ──────────────────────────────────────────────────────────

  const renderEmptySearch = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No se encontraron resultados</Text>
    </View>
  );

  const renderPermissionDenied = () => (
    <View style={styles.emptyState}>
      <Ionicons name="lock-closed-outline" size={40} color="#C0C8D2" />
      <Text style={styles.emptyTitle}>Sin acceso a contactos</Text>
      <Text style={styles.emptyText}>
        Permite el acceso para ver tus contactos aquí.
      </Text>
      <Pressable style={styles.permButton} onPress={loadContacts}>
        <Text style={styles.permButtonText}>Permitir acceso</Text>
      </Pressable>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.emptyState}>
      <ActivityIndicator size="large" color={COLORS.primary.main} />
      <Text style={[styles.emptyText, { marginTop: 12 }]}>Cargando...</Text>
    </View>
  );

  // ─── History list ───────────────────────────────────────────────────────────

  const renderHistoryContent = () => {
    if (filteredHistory.length === 0) return renderEmptySearch();
    return (
      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RowItem
            displayName={item.name ?? ""}
            phone={item.phone}
            label={item.label}
            flag={item.flag}
            onPress={() => handleSelectPhone(item.phone)}
          />
        )}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  // ─── Contacts list ──────────────────────────────────────────────────────────

  const renderContactsContent = () => {
    if (loading) return renderLoading();
    if (permission === "denied") return renderPermissionDenied();
    if (sections.length === 0 && q) return renderEmptySearch();
    if (sections.length === 0) {
      return (
        <View style={styles.emptyState}>
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
              onPress={() => handleSelectPhone(item.primaryPhone)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionLetter}>{title}</Text>
          )}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          keyboardShouldPersistTaps="handled"
        />

        {/* A–Z index */}
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

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      {/* Segmented control */}
      <View style={styles.segmentWrapper}>
        <View style={styles.segment}>
          {(["history", "contacts"] as Tab[]).map((tab) => (
            <Pressable
              key={tab}
              style={[
                styles.segmentTab,
                activeTab === tab && styles.segmentTabActive,
              ]}
              onPress={() => {
                setActiveTab(tab);
                setQuery("");
              }}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === tab && styles.segmentTextActive,
                ]}
              >
                {tab === "history" ? "Historial" : "Contactos"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Pressable
          style={styles.searchLeft}
          onPress={() => console.log("country picker")}
        >
          <Ionicons name="globe-outline" size={18} color="#6C7B8A" />
          <Ionicons name="chevron-down" size={14} color="#6C7B8A" />
        </Pressable>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#9AA5B4"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
        />

        <Pressable
          style={styles.searchRight}
          onPress={() => console.log("options")}
        >
          <Ionicons name="ellipsis-vertical" size={18} color="#6C7B8A" />
        </Pressable>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {activeTab === "history"
          ? renderHistoryContent()
          : renderContactsContent()}
      </View>
    </View>
  );
};

export default ContactsHistoryScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  // Segment
  segmentWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#EAEAEE",
    borderRadius: 50,
    padding: 4,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  segmentTabActive: {
    backgroundColor: "#47C26B",
    shadowColor: "#47C26B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  segmentText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#6C7B8A",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },

  // Search bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEE",
    paddingHorizontal: 12,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: "#EAEAEE",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 15,
    color: "#111111",
  },
  searchRight: {
    paddingLeft: 8,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionLetter: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: "#47C26B",
    paddingTop: 12,
    paddingBottom: 4,
  },

  // A–Z index
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

  // Empty / permission states
  emptyState: {
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
