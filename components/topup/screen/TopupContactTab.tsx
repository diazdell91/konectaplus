import { usePhoneCountry } from "@/context/PhoneCountry";
import {
  ServiceInputKind,
  ServiceType,
  useServiceSelectionStore,
} from "@/store/useServiceSelectionStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ContactsList from "../contacts/ContactsList";
import { useContacts } from "../contacts/useContacts";
import SearchBar from "../search/SearchBar";

const TopupContactTab = () => {
  const [query, setQuery] = useState("");
  const { contacts, loading, permission, loadContacts } = useContacts();
  const { country, dialCode } = usePhoneCountry();

  const { hydrateFromContact, startSelection, setCountryIso2 } =
    useServiceSelectionStore();

  useEffect(() => {
    startSelection({
      serviceType: ServiceType.RECHARGE_MOBILE,
      inputKind: ServiceInputKind.PHONE,
    });
  }, [startSelection]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleSelectContact = (phone: string) => {
    hydrateFromContact(phone, dialCode);
    setCountryIso2(country.iso);
    router.push("/services/topup/topup-flow");
  };

  return (
    <View style={{ flex: 1 }}>
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
        onSelect={handleSelectContact}
        onRequestPermission={loadContacts}
      />
    </View>
  );
};

export default TopupContactTab;
