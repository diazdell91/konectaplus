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
}: {
  children: React.ReactNode;
}) {
  const list = COUNTRIES.filter((c) => !!c.prefix);

  const defaultCountry = list.find((c) => c.iso === "CU") ?? list[0];

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

    return (
      clean.length >= country.minLength && clean.length <= country.maxLength
    );
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
