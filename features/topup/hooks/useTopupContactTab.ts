import { usePhoneCountry } from "@/context/PhoneCountry";
import {
  ServiceInputKind,
  ServiceType,
  useServiceSelectionStore,
} from "@/store/useServiceSelectionStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useContacts } from "../components/contacts/useContacts";

export function useTopupContactTab() {
  const [query, setQuery] = useState("");
  const { contacts, loading, permission, loadContacts } = useContacts();
  const { country, dialCode } = usePhoneCountry();
  const { hydrateFromContact, startSelection, setCountryIso2 } =
    useServiceSelectionStore();

  useEffect(() => {
    startSelection({
      serviceType: ServiceType.TOPUP_MOBILE,
      inputKind: ServiceInputKind.PHONE,
    });
  }, [startSelection]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleSelectContact = (phone: string) => {
    hydrateFromContact(phone, dialCode);
    setCountryIso2(country.iso);
    router.push({
      pathname: "/services/topup/topup-flow",
      params: { serviceItemKey: "TOPUP_MOBILE" },
    });
  };

  const handleCountryPress = () => router.push("/(modals)/country-picker");

  return {
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
  };
}
