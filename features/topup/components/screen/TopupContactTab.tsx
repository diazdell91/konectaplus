import React from "react";
import { View } from "react-native";
import ContactsList from "../contacts/ContactsList";
import SearchBar from "../search/SearchBar";
import { useTopupContactTab } from "../../hooks/useTopupContactTab";

const TopupContactTab = () => {
  const {
    query,
    setQuery,
    contacts,
    loading,
    permission,
    loadContacts,
    country,
    dialCode,
    handleSelectContact,
    handleCountryPress,
  } = useTopupContactTab();

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onCountryPress={handleCountryPress}
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
