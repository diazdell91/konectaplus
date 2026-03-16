import { COUNTRIES } from "@/constants/phoneCountries";
import { create } from "zustand";

export type PhoneCountry = (typeof COUNTRIES)[number];

type PhoneCountryStore = {
  country: PhoneCountry;
  dialCode: string;
  setCountry: (country: PhoneCountry) => void;
  validatePhoneLength: (digits: string) => boolean;
};

const COUNTRY_LIST = COUNTRIES.filter((c) => !!c.prefix);

function resolveDefaultCountry(defaultIso = "US"): PhoneCountry {
  return (
    COUNTRY_LIST.find((c) => c.iso === defaultIso) ??
    COUNTRY_LIST.find((c) => c.iso === "US") ??
    COUNTRY_LIST[0]
  );
}

function getDialCode(country: PhoneCountry): string {
  if (country?.dialCode) return country.dialCode;
  if (country?.prefix) return `+${country.prefix}`;
  return "";
}

export const usePhoneCountryStore = create<PhoneCountryStore>()((set, get) => {
  const defaultCountry = resolveDefaultCountry();

  return {
    country: defaultCountry,
    dialCode: getDialCode(defaultCountry),

    setCountry: (country) => {
      set({
        country,
        dialCode: getDialCode(country),
      });
    },

    validatePhoneLength: (digits) => {
      const { country, dialCode } = get();
      const clean = digits.replace(/\D/g, "");

      if (country?.minLength == null || country?.maxLength == null) {
        return true;
      }

      const callingCodeLen = dialCode.replace(/\D/g, "").length;
      const localMin = Math.max(0, country.minLength - callingCodeLen);
      const localMax = Math.max(0, country.maxLength - callingCodeLen);

      return clean.length >= localMin && clean.length <= localMax;
    },
  };
});

