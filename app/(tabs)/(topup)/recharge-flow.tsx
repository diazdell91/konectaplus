/**
 * RechargeFlowScreen
 *
 * Orchestrates the full recharge flow:
 *   Phone input → Country detect → Provider picker → Type tabs → Offer list → CTA footer
 *
 * Uses Apollo Client (cache-first) — no fetch/axios.
 *
 * TODOs:
 *  - Country picker modal (real, searchable)
 *  - Real contacts integration (currently uses a mock contact button)
 *  - Execute actual recharge mutation (buildDingRechargeRequest is ready)
 *  - Real checkout screen at /(checkout)/recharge
 */

import RechargeFooter from "@/components/topup/footer/RechargeFooter";
import OfferList from "@/components/topup/offers/OfferList";
import CountryModal from "@/components/topup/phone/CountryModal";
import PhoneInputSection from "@/components/topup/phone/PhoneInputSection";
import ProviderPicker from "@/components/topup/provider/ProviderPicker";
import LoadingSkeleton from "@/components/topup/shared/LoadingSkeleton";
import RechargeTypeTabs from "@/components/topup/tabs/RechargeTypeTabs";
import { useRechargeCart } from "@/context/RechargeCartContext";
import {
  ADMIN_RECHARGE_PRODUCT_LISTINGS,
  AdminRechargeProductListingsData,
  AdminRechargeProductListingsVars,
  buildDingRechargeRequest,
  RechargeListingType,
  RechargeProductListing,
} from "@/graphql/adminRechargeProductListings";
import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import {
  COUNTRIES,
  CountryInfo,
  detectCountryFromPhone,
  isValidE164,
  normalizeToE164,
} from "@/utils/phoneCountry";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { toast } from "sonner-native";

// ---------------------------------------------------------------------------
// Default country (Cuba)
// ---------------------------------------------------------------------------

const DEFAULT_COUNTRY: CountryInfo = COUNTRIES.find((c) => c.iso === "CU")!;

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

export default function RechargeFlowScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    phone?: string;
    countryIso?: string;
  }>();
  const { addItem } = useRechargeCart();

  // ── Phone state ──────────────────────────────────────────────────────────
  const [rawPhone, setRawPhone] = useState(params.phone ?? "");
  const [country, setCountry] = useState<CountryInfo>(DEFAULT_COUNTRY);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const phoneInputRef = useRef<TextInput>(null);

  // ── Selection state ──────────────────────────────────────────────────────
  const [selectedProviderCode, setSelectedProviderCode] = useState<
    string | null
  >(null);
  const [selectedRechargeType, setSelectedRechargeType] =
    useState<RechargeListingType>("VOUCHER");
  const [selectedListing, setSelectedListing] =
    useState<RechargeProductListing | null>(null);

  // ── Detect country from phone as user types ──────────────────────────────
  useEffect(() => {
    if (!rawPhone) return;
    const detected = detectCountryFromPhone(rawPhone);
    if (detected && detected.iso !== country.iso) {
      setCountry(detected);
      setSelectedProviderCode(null);
      setSelectedListing(null);
    }
  }, [rawPhone]);

  // If navigated with a pre-set countryIso, try to apply it
  useEffect(() => {
    if (params.countryIso) {
      const found = COUNTRIES.find((c) => c.iso === params.countryIso);
      if (found) setCountry(found);
    }
  }, [params.countryIso]);

  // ── E.164 phone ──────────────────────────────────────────────────────────
  const phoneE164 = useMemo(() => {
    if (!rawPhone) return "";
    return normalizeToE164(rawPhone, country);
  }, [rawPhone, country]);

  const isPhoneValid = isValidE164(phoneE164);

  // ── Apollo query ─────────────────────────────────────────────────────────
  const { data, loading, error, refetch } = useQuery<
    AdminRechargeProductListingsData,
    AdminRechargeProductListingsVars
  >(ADMIN_RECHARGE_PRODUCT_LISTINGS, {
    variables: {
      status: "ACTIVE",
      countryIso: country.iso,
      page: 1,
      pageSize: 500,
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    skip: !country.iso,
  });

  const listings = useMemo(
    () => data?.adminRechargeProductListings.items ?? [],
    [data],
  );

  // ── Counts per type ──────────────────────────────────────────────────────
  const counts = useMemo<Record<RechargeListingType, number>>(() => {
    if (!selectedProviderCode) {
      return { VOUCHER: 0, BUNDLE: 0, DATA: 0 };
    }
    const filtered = listings.filter(
      (l) => l.providerCode === selectedProviderCode,
    );
    return filtered.reduce(
      (acc, l) => {
        acc[l.rechargeType] = (acc[l.rechargeType] ?? 0) + 1;
        return acc;
      },
      { VOUCHER: 0, BUNDLE: 0, DATA: 0 } as Record<RechargeListingType, number>,
    );
  }, [listings, selectedProviderCode]);

  // Auto-select first available tab when provider changes
  useEffect(() => {
    if (!selectedProviderCode) return;
    const order: RechargeListingType[] = ["VOUCHER", "BUNDLE", "DATA"];
    const first = order.find((t) => counts[t] > 0);
    if (first && counts[selectedRechargeType] === 0) {
      setSelectedRechargeType(first);
    }
  }, [counts, selectedProviderCode]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSelectProvider = useCallback(
    (providerCode: string) => {
      if (providerCode === selectedProviderCode) return;
      setSelectedProviderCode(providerCode);
      setSelectedListing(null);
    },
    [selectedProviderCode],
  );

  const handleSelectType = useCallback((type: RechargeListingType) => {
    setSelectedRechargeType(type);
    setSelectedListing(null);
  }, []);

  const handleSelectListing = useCallback((listing: RechargeProductListing) => {
    setSelectedListing((prev) => (prev?.id === listing.id ? null : listing));
  }, []);

  // ── Mock contact button ──────────────────────────────────────────────────
  // TODO: replace with real expo-contacts picker
  const handlePickContact = () => {
    const mockPhone = "+53 5 123 4567";
    setRawPhone(mockPhone);
    phoneInputRef.current?.blur();
  };

  const handleSelectCountry = useCallback(
    (c: CountryInfo) => {
      setCountry(c);
      setSelectedProviderCode(null);
      setSelectedListing(null);
      if (!rawPhone || !rawPhone.startsWith("+")) {
        setRawPhone(c.callingCode + " ");
      }
    },
    [rawPhone],
  );

  // ── Validation for CTA ───────────────────────────────────────────────────
  const canProceed =
    isPhoneValid &&
    !!country.iso &&
    !!selectedProviderCode &&
    !!selectedListing;

  // ── Cart handler ─────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!canProceed || !selectedListing) return;

    const dingRequest = buildDingRechargeRequest({
      listing: selectedListing,
      destinationPhone: phoneE164,
      countryIso: country.iso,
    });
    console.log("[Recharge] Ding request payload:", dingRequest);

    addItem({
      listingId: selectedListing.id,
      catalogProductId: selectedListing.catalogProductId,
      variantKey: selectedListing.variantKey,
      providerCode: selectedListing.providerCode,
      skuCodeProviderProduct: selectedListing.skuCodeProviderProduct,
      countryIso: country.iso,
      phoneE164,
      sellPriceUsdCents: selectedListing.sellPriceUsdCents,
      displayName: selectedListing.displayName,
    });

    toast.success("Agregado al carrito", {
      description: selectedListing.displayName,
    });
  };

  // ── Pay now handler ──────────────────────────────────────────────────────
  const handlePayNow = () => {
    if (!canProceed || !selectedListing) return;

    const dingRequest = buildDingRechargeRequest({
      listing: selectedListing,
      destinationPhone: phoneE164,
      countryIso: country.iso,
    });
    console.log("[Recharge] Ding request payload (pay now):", dingRequest);

    // TODO: navigate to real checkout screen
    router.push({
      pathname: "/(tabs)/(topup)",
      params: {
        rechargePayload: JSON.stringify({
          listingId: selectedListing.id,
          catalogProductId: selectedListing.catalogProductId,
          variantKey: selectedListing.variantKey,
          providerCode: selectedListing.providerCode,
          skuCodeProviderProduct: selectedListing.skuCodeProviderProduct,
          countryIso: country.iso,
          phoneE164,
          sellPriceUsdCents: selectedListing.sellPriceUsdCents,
          displayName: selectedListing.displayName,
        }),
      },
    });
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.text.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Nueva Recarga</Text>
          <View style={{ width: 34 }} />
        </View>
      </SafeAreaView>

      {/* ── Scrollable content ── */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1, 2]}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── A: Phone input ── */}
          <PhoneInputSection
            rawPhone={rawPhone}
            onChangePhone={setRawPhone}
            country={country}
            onOpenCountryModal={() => setCountryModalVisible(true)}
            onPickContact={handlePickContact}
            phoneE164={phoneE164}
            isPhoneValid={isPhoneValid}
            phoneInputRef={phoneInputRef}
          />

          {/* ── B: Provider picker (sticky) ── */}
          <View style={styles.stickyBlock}>
            {loading && listings.length === 0 ? (
              <View style={styles.providerLoadingRow}>
                <ActivityIndicator size="small" color={COLORS.primary.main} />
                <Text style={styles.loadingText}>Cargando proveedores…</Text>
              </View>
            ) : error ? (
              <View style={styles.errorRow}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={COLORS.semantic.error}
                />
                <Text style={styles.errorText}>Error al cargar ofertas. </Text>
                <Pressable onPress={() => refetch()}>
                  <Text style={styles.retryText}>Reintentar</Text>
                </Pressable>
              </View>
            ) : (
              <ProviderPicker
                listings={listings}
                selectedProviderCode={selectedProviderCode}
                onSelectProvider={handleSelectProvider}
              />
            )}
          </View>

          {/* ── C/D: Type tabs (sticky) ── */}
          <View style={styles.stickyBlock}>
            {selectedProviderCode && (
              <RechargeTypeTabs
                counts={counts}
                selectedType={selectedRechargeType}
                onSelectType={handleSelectType}
              />
            )}
          </View>

          {/* ── E: Offer list ── */}
          {loading && listings.length === 0 ? (
            <LoadingSkeleton />
          ) : (
            <OfferList
              listings={listings}
              providerCode={selectedProviderCode}
              rechargeType={selectedRechargeType}
              selectedListingId={selectedListing?.id ?? null}
              onSelectListing={handleSelectListing}
            />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* ── F: Footer CTA ── */}
      <RechargeFooter
        selectedListing={selectedListing}
        canProceed={canProceed}
        onAddToCart={handleAddToCart}
        onPayNow={handlePayNow}
      />

      {/* ── Country picker modal ── */}
      <CountryModal
        visible={countryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        onSelect={handleSelectCountry}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },

  // ── Header
  headerSafe: {
    backgroundColor: COLORS.surface.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.neutral.gray100,
  },
  headerTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
  },

  // ── Scroll
  scrollContent: {
    paddingBottom: 8,
  },

  // ── Sticky blocks (provider picker + tabs)
  stickyBlock: {
    backgroundColor: COLORS.background.secondary,
    paddingTop: 12,
  },

  // ── Loading / error rows
  providerLoadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  loadingText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.semantic.error,
  },
  retryText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary.main,
    textDecorationLine: "underline",
  },
});
