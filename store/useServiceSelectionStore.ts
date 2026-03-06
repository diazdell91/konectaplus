/**
 * useServiceSelectionStore — Zustand store for service selection UI state.
 *
 * Handles the selection flow for services (MVP: recargas). Designed to be
 * extensible for future services (marketplace, delivery, etc.) via `extras`.
 *
 * Runtime only — no persistence.
 */

import { create } from "zustand";
import {
  COUNTRIES,
  detectCountryFromPhone,
  isValidE164,
} from "@/utils/phoneCountry";

// ---------------------------------------------------------------------------
// Enums & Types
// ---------------------------------------------------------------------------

export enum ServiceInputKind {
  NONE = "NONE",
  PHONE = "PHONE",
  EMAIL = "EMAIL",
}

export enum ServiceType {
  RECHARGE_MOBILE = "RECHARGE_MOBILE",
  RECHARGE_NAUTA = "RECHARGE_NAUTA",
  // Extend here for future services:
  // GIFT_CARD = "GIFT_CARD",
  // WALLET_TOPUP = "WALLET_TOPUP",
}

/** Services that require a product.id to be submitted. */
const CATALOG_BASED_SERVICES: ServiceType[] = [
  ServiceType.RECHARGE_MOBILE,
  ServiceType.RECHARGE_NAUTA,
];

export type SelectionSource =
  | "contact"
  | "manual"
  | "promo"
  | "provider"
  | "product"
  | "unknown";

export type AccountKind = "PHONE" | "EMAIL" | "NONE";

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------

interface SelectedService {
  serviceType?: ServiceType;
  inputKind: ServiceInputKind;
}

interface CountryState {
  iso2?: string;
  dialCode?: string;
}

interface ProviderState {
  id?: string;
}

interface ProductState {
  id?: string;
}

interface AccountState {
  kind: AccountKind;
  value?: string;      // raw user-visible input
  normalized?: string; // E.164 if PHONE, lowercase email if EMAIL
}

export interface ServiceSelectionState {
  selectedService: SelectedService;
  country: CountryState;
  provider: ProviderState;
  product: ProductState;
  account: AccountState;
  source: SelectionSource;
  extras: Record<string, unknown>; // for future: beneficiary, address, etc.
}

export interface ValidationResult {
  ok: boolean;
  errorMessage?: string;
  warnings?: string[];
}

export interface SelectionSnapshot {
  serviceType?: ServiceType;
  inputKind: ServiceInputKind;
  countryIso2?: string;
  dialCode?: string;
  providerId?: string;
  productId?: string;
  accountRaw?: string;
  accountNormalized?: string;
  extras: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Helpers / normalizers (no external libraries)
// ---------------------------------------------------------------------------

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Strips formatting from a phone string and ensures it starts with "+".
 * Returns undefined if we can't determine the international prefix.
 */
export function normalizePhoneE164(value: string): string | undefined {
  const cleaned = value.replace(/[\s\-().]/g, "");
  if (!cleaned.startsWith("+")) return undefined;
  // Remove any remaining non-digit chars after the "+"
  return "+" + cleaned.slice(1).replace(/\D/g, "");
}

/**
 * Extracts a dial code from an E.164 string by matching against the known
 * COUNTRIES catalogue. Uses longest-match strategy (e.g. "+503" before "+1").
 */
export function parseDialCodeFromE164(e164: string): string | undefined {
  if (!e164.startsWith("+")) return undefined;
  const sorted = [...COUNTRIES].sort(
    (a, b) => b.callingCode.length - a.callingCode.length
  );
  for (const c of sorted) {
    if (e164.startsWith(c.callingCode)) {
      // Normalize: strip the dash variants (e.g. "+1-809" -> "+1809")
      return c.callingCode.replace(/[^\d+]/g, (m) =>
        m === "+" ? "+" : ""
      );
    }
  }
  return undefined;
}

function accountKindFromInputKind(inputKind: ServiceInputKind): AccountKind {
  if (inputKind === ServiceInputKind.PHONE) return "PHONE";
  if (inputKind === ServiceInputKind.EMAIL) return "EMAIL";
  return "NONE";
}

function normalizeAccount(
  value: string,
  inputKind: ServiceInputKind
): string | undefined {
  if (inputKind === ServiceInputKind.PHONE) return normalizePhoneE164(value);
  if (inputKind === ServiceInputKind.EMAIL) return normalizeEmail(value);
  return undefined;
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const INITIAL_STATE: ServiceSelectionState = {
  selectedService: { inputKind: ServiceInputKind.NONE },
  country: {},
  provider: {},
  product: {},
  account: { kind: "NONE" },
  source: "unknown",
  extras: {},
};

// ---------------------------------------------------------------------------
// Store actions interface
// ---------------------------------------------------------------------------

interface ServiceSelectionActions {
  // Core reset
  resetSelection(): void;

  // Service setup
  startSelection(payload: {
    serviceType: ServiceType;
    inputKind?: ServiceInputKind;
  }): void;
  setServiceType(serviceType: ServiceType): void;
  setInputKind(inputKind: ServiceInputKind): void;

  // Provider
  setProviderId(providerId: string | undefined, source?: SelectionSource): void;

  // Product
  setProductId(productId: string | undefined, source?: SelectionSource): void;
  clearProduct(): void;

  // Country
  setCountryIso2(iso2: string | undefined, source?: SelectionSource): void;
  setCountryFromDialCode(
    dialCode: string,
    source?: SelectionSource
  ): void;

  // Account
  setAccountRaw(value: string, source?: SelectionSource): void;

  // Hydrators
  hydrateFromContact(phoneRaw: string): void;
  hydrateFromManualPhone(phoneRaw: string): void;
  hydrateFromPromo(payload: {
    serviceType: ServiceType;
    providerId?: string;
    countryIso2?: string;
    inputKind?: ServiceInputKind;
  }): void;
  hydrateFromProviderSelection(payload: {
    providerId: string;
    countryIso2?: string;
    inputKind?: ServiceInputKind;
  }): void;
  hydrateFromProductSelection(payload: {
    productId: string;
    providerId?: string;
    countryIso2?: string;
    inputKind?: ServiceInputKind;
  }): void;

  // Selectors
  isReadyForFlow(): boolean;
  isReadyToSubmit(): boolean;
  getSnapshot(): SelectionSnapshot;
  validateSelection(): ValidationResult;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useServiceSelectionStore = create<
  ServiceSelectionState & ServiceSelectionActions
>((set, get) => ({
  ...INITIAL_STATE,

  // -------------------------------------------------------------------------
  // Reset
  // -------------------------------------------------------------------------

  resetSelection() {
    set(INITIAL_STATE);
  },

  // -------------------------------------------------------------------------
  // Service setup
  // -------------------------------------------------------------------------

  startSelection({ serviceType, inputKind }) {
    const state = get();
    const newKind = inputKind ?? state.selectedService.inputKind;
    const kindChanged =
      newKind !== state.selectedService.inputKind;
    const typeChanged =
      serviceType !== state.selectedService.serviceType;

    set((s) => ({
      selectedService: { serviceType, inputKind: newKind },
      // Clear account/product if service type changes to avoid stale data
      account:
        kindChanged || typeChanged
          ? { kind: accountKindFromInputKind(newKind) }
          : s.account,
      product: typeChanged ? {} : s.product,
    }));
  },

  setServiceType(serviceType) {
    set((s) => ({
      selectedService: { ...s.selectedService, serviceType },
      product: {}, // clear product when service changes
    }));
  },

  setInputKind(inputKind) {
    const newAccountKind = accountKindFromInputKind(inputKind);
    set((s) => ({
      selectedService: { ...s.selectedService, inputKind },
      account: {
        kind: newAccountKind,
        // Keep value but re-normalize; if kind doesn't apply, clear
        value: s.account.value,
        normalized: s.account.value
          ? normalizeAccount(s.account.value, inputKind)
          : undefined,
      },
    }));
  },

  // -------------------------------------------------------------------------
  // Provider
  // -------------------------------------------------------------------------

  setProviderId(providerId, source = "unknown") {
    set((s) => {
      const changed = providerId !== s.provider.id;
      return {
        provider: { id: providerId },
        // Changing provider invalidates the selected product
        product: changed ? {} : s.product,
        source,
      };
    });
  },

  // -------------------------------------------------------------------------
  // Product
  // -------------------------------------------------------------------------

  setProductId(productId, source = "unknown") {
    set({ product: { id: productId }, source });
  },

  clearProduct() {
    set({ product: {} });
  },

  // -------------------------------------------------------------------------
  // Country
  // -------------------------------------------------------------------------

  setCountryIso2(iso2, source = "unknown") {
    set((s) => {
      const changed = iso2 !== s.country.iso2;
      return {
        country: { ...s.country, iso2 },
        // Changing country invalidates the selected product
        product: changed ? {} : s.product,
        source,
      };
    });
  },

  setCountryFromDialCode(dialCode, source = "unknown") {
    // Normalize dial code: ensure it starts with "+"
    const normalized = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
    const country = COUNTRIES.find((c) =>
      c.callingCode.replace(/[^\d+]/g, (m) =>
        m === "+" ? "+" : ""
      ) === normalized || c.callingCode === dialCode
    );

    set((s) => {
      const newIso2 = country?.iso ?? undefined;
      const isoChanged = newIso2 !== s.country.iso2;
      return {
        country: { iso2: newIso2, dialCode: normalized },
        product: isoChanged ? {} : s.product,
        source,
      };
    });
  },

  // -------------------------------------------------------------------------
  // Account
  // -------------------------------------------------------------------------

  setAccountRaw(value, source = "unknown") {
    const { selectedService } = get();
    const normalized = normalizeAccount(value, selectedService.inputKind);
    set({
      account: {
        kind: accountKindFromInputKind(selectedService.inputKind),
        value,
        normalized,
      },
      source,
    });
  },

  // -------------------------------------------------------------------------
  // Hydrators
  // -------------------------------------------------------------------------

  hydrateFromContact(phoneRaw) {
    const store = get();
    store.setInputKind(ServiceInputKind.PHONE);
    store.setAccountRaw(phoneRaw, "contact");

    const normalized = normalizePhoneE164(phoneRaw);
    if (normalized) {
      const detected = detectCountryFromPhone(normalized);
      if (detected) {
        store.setCountryFromDialCode(detected.callingCode, "contact");
      }
    }
    set({ source: "contact" });
  },

  hydrateFromManualPhone(phoneRaw) {
    const store = get();
    store.setInputKind(ServiceInputKind.PHONE);
    store.setAccountRaw(phoneRaw, "manual");

    const normalized = normalizePhoneE164(phoneRaw);
    if (normalized) {
      const detected = detectCountryFromPhone(normalized);
      if (detected) {
        store.setCountryFromDialCode(detected.callingCode, "manual");
      }
    }
    set({ source: "manual" });
  },

  hydrateFromPromo({ serviceType, providerId, countryIso2, inputKind }) {
    const store = get();
    store.startSelection({ serviceType, inputKind });
    if (providerId) store.setProviderId(providerId, "promo");
    if (countryIso2) store.setCountryIso2(countryIso2, "promo");
    set({ source: "promo" });
  },

  hydrateFromProviderSelection({ providerId, countryIso2, inputKind }) {
    const store = get();
    store.setProviderId(providerId, "provider");
    if (countryIso2) store.setCountryIso2(countryIso2, "provider");
    if (inputKind !== undefined) store.setInputKind(inputKind);
    set({ source: "provider" });
  },

  hydrateFromProductSelection({
    productId,
    providerId,
    countryIso2,
    inputKind,
  }) {
    const store = get();
    if (providerId) store.setProviderId(providerId, "product");
    if (countryIso2) store.setCountryIso2(countryIso2, "product");
    if (inputKind !== undefined) store.setInputKind(inputKind);
    // Set product last so provider/country clears don't wipe it
    store.setProductId(productId, "product");
    set({ source: "product" });
  },

  // -------------------------------------------------------------------------
  // Selectors
  // -------------------------------------------------------------------------

  isReadyForFlow() {
    const { provider, country, selectedService, account, product } = get();
    return !!(
      provider.id ||
      country.iso2 ||
      selectedService.serviceType ||
      account.value ||
      product.id
    );
  },

  isReadyToSubmit() {
    const { selectedService, account, country, product } = get();
    const { inputKind, serviceType } = selectedService;

    // Validate account according to inputKind
    if (inputKind === ServiceInputKind.PHONE) {
      if (account.kind !== "PHONE") return false;
      if (!account.normalized || !isValidE164(account.normalized)) return false;
    } else if (inputKind === ServiceInputKind.EMAIL) {
      if (account.kind !== "EMAIL") return false;
      if (!account.normalized || !isValidEmail(account.normalized)) return false;
    }
    // ServiceInputKind.NONE: no account validation needed

    // Product requirement depends on service type
    if (serviceType && CATALOG_BASED_SERVICES.includes(serviceType)) {
      // Catalog-based services always need a product
      if (!product.id) return false;
    }
    // TODO: For ServiceInputKind.NONE services (e.g. GIFT_CARD, WALLET_TOPUP),
    // product.id may or may not be required depending on the specific serviceType.
    // Add additional checks here as new service types are introduced.

    return true;
  },

  getSnapshot(): SelectionSnapshot {
    const { selectedService, country, provider, product, account, extras } =
      get();
    return {
      serviceType: selectedService.serviceType,
      inputKind: selectedService.inputKind,
      countryIso2: country.iso2,
      dialCode: country.dialCode,
      providerId: provider.id,
      productId: product.id,
      accountRaw: account.value,
      accountNormalized: account.normalized,
      extras,
    };
  },

  validateSelection(): ValidationResult {
    const { selectedService, account, country } = get();
    const { inputKind } = selectedService;
    const warnings: string[] = [];

    if (inputKind === ServiceInputKind.PHONE) {
      if (!account.normalized || !isValidE164(account.normalized)) {
        return {
          ok: false,
          errorMessage: "Se requiere un número de teléfono válido en formato internacional.",
        };
      }
      if (!country.iso2) {
        warnings.push(
          "No se pudo determinar el país a partir del número. Algunas funciones podrían no estar disponibles."
        );
      }
    } else if (inputKind === ServiceInputKind.EMAIL) {
      if (!account.normalized || !isValidEmail(account.normalized)) {
        return {
          ok: false,
          errorMessage: "Se requiere un correo electrónico válido.",
        };
      }
    }

    return { ok: true, warnings: warnings.length ? warnings : undefined };
  },
}));
