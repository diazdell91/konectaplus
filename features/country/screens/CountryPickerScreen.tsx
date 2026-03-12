import { COUNTRIES } from "@/constants/phoneCountries";
import { usePhoneCountry } from "@/context/PhoneCountry";
import {
  buildLetterIndex,
  filterCountries,
  makeSections,
} from "@/utils/countrySections";
import Input from "@/components/ui/Input";
import { Stack, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

type PhoneCountry = (typeof COUNTRIES)[number];

const POPULAR_ISOS = new Set(["CU", "US", "MX", "DO", "ES"]);

export default function CountryPickerScreen() {
  const router = useRouter();
  const { setCountry } = usePhoneCountry();
  const [q, setQ] = useState("");

  const list = useMemo(() => COUNTRIES.filter((c) => !!c.prefix), []);

  const filtered = useMemo(
    () =>
      filterCountries(
        list,
        q,
        (c) => c.nameEs ?? c.nameEn ?? c.nameEs,
        (c) => c.iso,
        (c) => c.prefix ?? "",
      ),
    [list, q],
  );

  const showPopular = !q.trim();

  const popular = useMemo(() => {
    if (!showPopular) return [];
    return filtered.filter((c) => POPULAR_ISOS.has(c.iso));
  }, [filtered, showPopular]);

  const rest = useMemo(() => {
    if (!showPopular) return filtered;
    return filtered.filter((c) => !POPULAR_ISOS.has(c.iso));
  }, [filtered, showPopular]);

  const sections = useMemo(
    () => makeSections(rest, (c) => c.nameEs ?? c.nameEn ?? c.nameEs),
    [rest],
  );

  const letters = useMemo(() => buildLetterIndex(sections), [sections]);

  const sectionListRef = useRef<SectionList<PhoneCountry>>(null);

  // OJO: si mostramos populares arriba, las secciones de letras empiezan en index 1
  const baseOffset = showPopular && popular.length > 0 ? 1 : 0;

  const letterToSectionIndex = useMemo(() => {
    const map = new Map<string, number>();
    sections.forEach((s, idx) => map.set(s.title, idx + baseOffset));
    return map;
  }, [sections, baseOffset]);

  const select = (c: PhoneCountry) => {
    setCountry(c);
    router.back();
  };

  const scrollToLetter = (letter: string) => {
    const sectionIndex = letterToSectionIndex.get(letter);
    if (sectionIndex == null) return;

    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const finalSections: any[] = [
    ...(showPopular && popular.length
      ? [{ title: "Países populares", data: popular, _popular: true }]
      : []),
    ...sections,
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Selecciona un país",
          presentation: "modal",
          headerBackTitle: "Atrás",
        }}
      />

      {/* Search */}
      <View style={styles.searchWrap}>
        <Input
          value={q}
          onChangeText={setQ}
          placeholder="Buscar país"
          iconLeft="magnify"
          autoCorrect={false}
          autoCapitalize="none"
          size="md"
        />
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <SectionList
          ref={sectionListRef}
          sections={finalSections}
          keyExtractor={(item: any) => `${item.iso}-${item.prefix ?? "np"}`}
          keyboardShouldPersistTaps="handled"
          stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          renderSectionHeader={({ section }: any) => (
            <Text style={styles.sectionTitle}>
              {section._popular
                ? "Países populares"
                : section.title === "#"
                  ? "Otros"
                  : section.title}
            </Text>
          )}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() => select(item)}
              style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
            >
              {item.flag ? (
                <Image source={item.flag} style={styles.flag} />
              ) : (
                <View style={styles.flagPlaceholder} />
              )}

              <Text style={styles.countryName}>{item.nameEs}</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.prefix}>
                {item.prefix ? `+${item.prefix}` : ""}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        {/* Barra lateral A-Z */}
        {letters.length > 0 && showPopular && (
          <View style={styles.alphaRail}>
            {letters.map((l) => (
              <Pressable key={l} onPress={() => scrollToLetter(l)} hitSlop={10}>
                <Text style={styles.alphaLetter}>{l}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  searchWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 },

  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    color: "rgba(0,0,0,0.55)",
    fontSize: 16,
    fontWeight: "700",
  },

  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
  },

  flag: { width: 28, height: 28, borderRadius: 14 },
  flagPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  countryName: { color: "#111827", fontSize: 15, fontWeight: "600" },
  prefix: {
    color: "rgba(0,0,0,0.55)",
    fontSize: 14,
    fontWeight: "700",
    marginEnd: 12,
  },

  sep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  alphaRail: {
    position: "absolute",
    right: 0,
    top: 90,
    bottom: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
  },
  alphaLetter: {
    color: "#16A34A", // verde suave
    fontSize: 12,
    fontWeight: "700",
  },
});
