/**
 * Phone / Country utilities for the Recharge flow.
 *
 * Responsibilities:
 *  - Map calling codes (+53, +52 …) → ISO country code
 *  - Normalize a raw phone string to a basic E.164 representation
 *  - Provide country metadata (flag emoji, display name, calling code)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CountryInfo {
  iso: string; // ISO 3166-1 alpha-2
  callingCode: string; // e.g. "+53"
  flag: string; // emoji flag
  name: string; // human-readable name
}

// ---------------------------------------------------------------------------
// Country catalogue (extend as needed)
// ---------------------------------------------------------------------------

export const COUNTRIES: CountryInfo[] = [
  { iso: "CU", callingCode: "+53", flag: "🇨🇺", name: "Cuba" },
  { iso: "MX", callingCode: "+52", flag: "🇲🇽", name: "México" },
  { iso: "SV", callingCode: "+503", flag: "🇸🇻", name: "El Salvador" },
  { iso: "US", callingCode: "+1", flag: "🇺🇸", name: "Estados Unidos" },
  { iso: "ES", callingCode: "+34", flag: "🇪🇸", name: "España" },
  { iso: "CO", callingCode: "+57", flag: "🇨🇴", name: "Colombia" },
  { iso: "HN", callingCode: "+504", flag: "🇭🇳", name: "Honduras" },
  { iso: "GT", callingCode: "+502", flag: "🇬🇹", name: "Guatemala" },
  { iso: "HT", callingCode: "+509", flag: "🇭🇹", name: "Haití" },
  { iso: "DO", callingCode: "+1-809", flag: "🇩🇴", name: "Rep. Dominicana" },
];

// Sorted longest-first so "+503" matches before "+1"
const SORTED_COUNTRIES = [...COUNTRIES].sort(
  (a, b) => b.callingCode.length - a.callingCode.length
);

// ---------------------------------------------------------------------------
// Detection helpers
// ---------------------------------------------------------------------------

/**
 * Given a raw phone string (may start with + or not), return the matching
 * CountryInfo if we can detect it, or null otherwise.
 */
export function detectCountryFromPhone(phone: string): CountryInfo | null {
  const cleaned = phone.replace(/[\s\-().]/g, "");
  // Ensure it starts with + for prefix matching
  const e164like = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;

  for (const country of SORTED_COUNTRIES) {
    if (e164like.startsWith(country.callingCode)) {
      return country;
    }
  }
  return null;
}

/**
 * Map a calling code string (e.g. "+53") to a CountryInfo, or null.
 */
export function mapCallingCodeToCountry(callingCode: string): CountryInfo | null {
  return (
    SORTED_COUNTRIES.find((c) => c.callingCode === callingCode) ?? null
  );
}

/**
 * Map a calling code to a plain ISO string (convenience wrapper).
 */
export function mapCallingCodeToCountryIso(callingCode: string): string | null {
  return mapCallingCodeToCountry(callingCode)?.iso ?? null;
}

// ---------------------------------------------------------------------------
// E.164 normalizer (basic / MVP)
// ---------------------------------------------------------------------------

/**
 * Attempts to produce a basic E.164 number from raw input + country info.
 *
 * Rules (MVP):
 *  1. Strip all non-digit characters except a leading +
 *  2. If it already starts with the calling code digits → keep it
 *  3. If it starts with a leading 0 → replace with calling code
 *  4. Otherwise prepend calling code
 *
 * NOTE: This is a simplified normalizer suitable for MVP demos. A production
 * implementation should use libphonenumber-js or a similar library.
 *
 * TODO: replace with libphonenumber-js for production
 */
export function normalizeToE164(
  rawPhone: string,
  country: CountryInfo
): string {
  // Strip everything except digits and a leading +
  const stripped = rawPhone.replace(/[^\d+]/g, "");

  // Already looks like E.164
  if (stripped.startsWith("+")) return stripped;

  const codeDigits = country.callingCode.replace(/[^\d]/g, "");

  // Starts with country code digits already (e.g. user typed "5347581422")
  if (stripped.startsWith(codeDigits)) {
    return `+${stripped}`;
  }

  // Starts with 0 → local format, replace leading 0
  if (stripped.startsWith("0")) {
    return `+${codeDigits}${stripped.slice(1)}`;
  }

  return `+${codeDigits}${stripped}`;
}

/**
 * Very basic validation: E.164 must start with + followed by 7–15 digits.
 */
export function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(phone);
}
