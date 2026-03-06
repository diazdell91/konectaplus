import { TopupTypeTabs } from "@/components/topup";
import TopupFooter from "@/components/topup/footer/TopupFooter";
import OfferList from "@/components/topup/offers/OfferList";
import PhoneProviderSummary from "@/components/topup/summary/PhoneProviderSummary";
import {
  ADMIN_TOPUP_PRODUCT_LISTINGS,
  AdminTopupProductListingsData,
  AdminTopupProductListingsVars,
  TopupListingType,
  TopupProductListing,
} from "@/graphql/adminTopupProductListings";
import { useServiceSelectionStore } from "@/store/useServiceSelectionStore";
import { COLORS } from "@/theme/colors";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function TopupFlowScreen() {
  const { country, provider, account, setProviderId, setProductId } =
    useServiceSelectionStore();

  const countryIso2 = country.iso2;
  const dialCode = country.dialCode ?? "";
  const phoneNormalized = account.normalized ?? account.value ?? "";

  const { data, loading, error, refetch } = useQuery<
    AdminTopupProductListingsData,
    AdminTopupProductListingsVars
  >(ADMIN_TOPUP_PRODUCT_LISTINGS, {
    variables: { status: "ACTIVE", countryIso: countryIso2, pageSize: 500 },
    skip: !countryIso2,
    fetchPolicy: "cache-first",
  });

  const listings: TopupProductListing[] = useMemo(
    () => data?.adminRechargeProductListings.items ?? [],
    [data],
  );

  const selectedProviderCode = provider.id ?? null;

  const [rechargeType, setRechargeType] =
    useState<TopupListingType>("VOUCHER");
  const [selectedListing, setSelectedListing] =
    useState<TopupProductListing | null>(null);

  // Auto-selecciona provider y tipo cuando cambian listings o provider.
  // Si no hay provider elegido, toma el primero de las listings.
  useEffect(() => {
    if (listings.length === 0) return;

    const effectiveProvider =
      selectedProviderCode ?? listings[0].providerCode;

    if (!selectedProviderCode) {
      setProviderId(effectiveProvider, "provider");
      return; // el store update re-renderizará y el effect correrá de nuevo con provider ya seteado
    }

    setSelectedListing(null);
    const available = (
      ["VOUCHER", "BUNDLE", "DATA"] as TopupListingType[]
    ).find((t) =>
      listings.some(
        (l) => l.providerCode === effectiveProvider && l.rechargeType === t,
      ),
    );
    if (available) setRechargeType(available);
  }, [selectedProviderCode, listings, setProviderId]);

  const counts = useMemo<Record<TopupListingType, number>>(() => {
    const base: Record<TopupListingType, number> = {
      VOUCHER: 0,
      BUNDLE: 0,
      DATA: 0,
    };
    if (!selectedProviderCode) return base;
    for (const l of listings) {
      if (l.providerCode === selectedProviderCode) {
        base[l.rechargeType] += 1;
      }
    }
    return base;
  }, [listings, selectedProviderCode]);

  const handleSelectProvider = (code: string) => {
    setProviderId(code, "provider");
  };

  const handleSelectListing = (listing: TopupProductListing) => {
    setSelectedListing(listing);
    setProductId(listing.catalogProductId, "product");
  };

  const canProceed = selectedListing !== null;

  return (
    <View style={styles.root}>
      <PhoneProviderSummary
        phone={phoneNormalized}
        countryIso={countryIso2 ?? ""}
        callingCode={dialCode}
        listings={listings}
        selectedProviderCode={selectedProviderCode}
        onEditPhone={() => router.push("/services/topup/topup-phone-picker")}
        onEditProvider={() => router.push("/(modals)/topup-provider-picker")}
      />

      <View style={styles.content}>
        {/* <ProviderSection
          listings={listings}
          loading={loading}
          error={error}
          selectedProviderCode={selectedProviderCode}
          onSelectProvider={handleSelectProvider}
          onRetry={() => refetch()}
        /> */}

        {selectedProviderCode && (
          <TopupTypeTabs
            counts={counts}
            selectedType={rechargeType}
            onSelectType={(t) => {
              setRechargeType(t);
              setSelectedListing(null);
            }}
          />
        )}

        {selectedProviderCode && (
          <View style={styles.offerList}>
            <OfferList
              listings={listings}
              providerCode={selectedProviderCode}
              rechargeType={rechargeType}
              selectedListingId={selectedListing?.id ?? null}
              onSelectListing={handleSelectListing}
            />
          </View>
        )}
      </View>

      <TopupFooter
        selectedListing={selectedListing}
        canProceed={canProceed}
        onAddToCart={() => {
          // TODO: integrar con cart/checkout
        }}
        onPayNow={() => {
          if (!selectedListing) return;
          router.push({
            pathname: "/services/topup/topup-confirm",
            params: {
              displayName: selectedListing.displayName,
              sellPriceUsdCents: String(selectedListing.sellPriceUsdCents),
              providerName: selectedListing.serviceProvider ?? selectedListing.providerCode,
              providerCode: selectedListing.providerCode,
              listingId: selectedListing.id,
              phoneE164: phoneNormalized,
              countryIso: countryIso2 ?? "",
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  offerList: {
    flex: 1,
  },
});
