import { detectCountryFromPhone } from "@/utils/phoneCountry";
import * as Contacts from "expo-contacts";
import { useCallback, useState } from "react";
import { ContactItem } from "./ContactsList";

type Permission = "undetermined" | "granted" | "denied";

interface UseContactsResult {
  contacts: ContactItem[];
  loading: boolean;
  permission: Permission;
  loadContacts: () => Promise<void>;
}

export const useContacts = (): UseContactsResult => {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<Permission>("undetermined");

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
          countryIso: country?.iso ?? null,
        };
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));

    setContacts(normalized);
    setLoading(false);
  }, []);

  return { contacts, loading, permission, loadContacts };
};
