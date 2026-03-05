import { usePhoneCountry } from "@/context/PhoneCountry";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContactsList from "../contacts/ContactsList";
import { useContacts } from "../contacts/useContacts";
import SearchBar from "../search/SearchBar";

const TopupContactTab = () => {
  const [query, setQuery] = useState("");
  const { contacts, loading, permission, loadContacts } = useContacts();
  const { bottom } = useSafeAreaInsets();
  const { country, dialCode } = usePhoneCountry();
  console.log(country);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onCountryPress={() => router.push("/(modals)/country-picker")}
        onOptionsPress={() => {}}
        countryIso={country.iso}
        countryDialCode={dialCode}
      />
      <ContactsList
        contacts={contacts}
        loading={loading}
        permissionDenied={permission === "denied"}
        query={query}
        countryIso={country.iso}
        onSelect={(phone) =>
          router.push({
            pathname: "/services/recharge/recharge-flow",
            params: { phone },
          })
        }
        onRequestPermission={loadContacts}
      />
    </View>
  );
};

export default TopupContactTab;
