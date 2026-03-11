import { COUNTRIES } from "@/constants/phoneCountries";
import React, { createContext, useContext, useMemo, useState } from "react";

export type PhoneCountry = (typeof COUNTRIES)[number];

type Ctx = {
  country: PhoneCountry;
  setCountry: (c: PhoneCountry) => void;

  // helpers derivados
  dialCode: string;
  validatePhoneLength: (digits: string) => boolean;
};

const PhoneCountryContext = createContext<Ctx | null>(null);

export function PhoneCountryProvider({
  children,
  defaultIso = "US",
}: {
  children: React.ReactNode;
  defaultIso?: string;
}) {
  const list = COUNTRIES.filter((c) => !!c.prefix);

  const defaultCountry =
    list.find((c) => c.iso === defaultIso) ??
    list.find((c) => c.iso === "US") ??
    list[0];

  const [country, setCountry] = useState<PhoneCountry>(defaultCountry);

  const dialCode = useMemo(() => {
    if (country?.dialCode) return country.dialCode;
    if (country?.prefix) return `+${country.prefix}`;
    return "";
  }, [country]);

  const validatePhoneLength = (digits: string) => {
    const clean = digits.replace(/\D/g, "");

    if (country?.minLength == null || country?.maxLength == null) {
      return true;
    }

    // minLength/maxLength include the country calling code digits (e.g. US: 11 = 1 for "+1" + 10 local).
    // The user enters only the local digits, so we subtract the calling code digit count.
    const callingCodeLen = dialCode.replace(/\D/g, "").length;
    const localMin = Math.max(0, country.minLength - callingCodeLen);
    const localMax = Math.max(0, country.maxLength - callingCodeLen);

    return clean.length >= localMin && clean.length <= localMax;
  };

  const value = useMemo(
    () => ({
      country,
      setCountry,
      dialCode,
      validatePhoneLength,
    }),
    [country, dialCode, validatePhoneLength],
  );

  return (
    <PhoneCountryContext.Provider value={value}>
      {children}
    </PhoneCountryContext.Provider>
  );
}

export function usePhoneCountry() {
  const ctx = useContext(PhoneCountryContext);
  if (!ctx) {
    throw new Error("usePhoneCountry must be used within PhoneCountryProvider");
  }
  return ctx;
}
