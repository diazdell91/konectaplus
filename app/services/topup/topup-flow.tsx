import { TopupTypeTabs } from "@/components/topup";
import TopupFooter from "@/components/topup/footer/TopupFooter";
import OfferList from "@/components/topup/offers/OfferList";
import PhoneProviderSummary from "@/components/topup/summary/PhoneProviderSummary";
import {
  TOPUP_PRODUCTS,
  TopupListingType,
  TopupProduct,
  TopupProductsData,
  TopupProductsVars,
} from "@/graphql/adminTopupProductListings";
import { useServiceSelectionStore } from "@/store/useServiceSelectionStore";
import { COLORS } from "@/theme/colors";
import { COUNTRIES } from "@/utils/phoneCountry";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function TopupFlowScreen() {
  const { country, account, setProductId, getSnapshot } = useServiceSelectionStore();

  const countryIso2 = country.iso2;
  // Resolve calling code from store or fall back to COUNTRIES catalogue
  const callingCode = useMemo(() => {
    if (country.dialCode) return country.dialCode;
    return COUNTRIES.find((c) => c.iso === countryIso2)?.callingCode ?? "";
  }, [country.dialCode, countryIso2]);
  // Build a display-friendly E.164 number
  const phoneNormalized = useMemo(() => {
    const raw = account.normalized ?? account.value ?? "";
    if (!raw) return "";
    if (raw.startsWith("+")) return raw;
    return callingCode ? `${callingCode}${raw}` : raw;
  }, [account.normalized, account.value, callingCode]);

  const { data, loading, error, refetch } = useQuery<
    TopupProductsData,
    TopupProductsVars
  >(TOPUP_PRODUCTS, {
    variables: { countryIso: countryIso2 ?? "" },
    skip: !countryIso2,
    fetchPolicy: "cache-first",
  });

  const products: TopupProduct[] = useMemo(
    () =>
      (data?.topupListings.items ?? []).map((item) => ({
        ...item,
        displayName: item.product.displayName,
        topupType: item.product.topupType,
        validityPeriod: item.product.validityPeriod,
        description: item.product.description,
      })),
    [data],
  );

  const [topupType, setTopupType] = useState<TopupListingType>("VOUCHER");
  const [selectedProduct, setSelectedProduct] = useState<TopupProduct | null>(
    null,
  );

  const counts = useMemo<Record<TopupListingType, number>>(() => {
    const base: Record<TopupListingType, number> = {
      VOUCHER: 0,
      BUNDLE: 0,
      DATA: 0,
    };
    for (const p of products) {
      base[p.topupType] += 1;
    }
    return base;
  }, [products]);

  const handleSelectProduct = (product: TopupProduct) => {
    setSelectedProduct(product);
    setProductId(product.id, "product");
  };

  const canProceed = selectedProduct !== null;

  return (
    <View style={styles.root}>
      <PhoneProviderSummary
        phone={phoneNormalized}
        countryIso={countryIso2 ?? ""}
        callingCode={callingCode}
        onEditPhone={() => router.push("/services/topup/topup-phone-picker")}
      />

      <View style={styles.content}>
        <TopupTypeTabs
          counts={counts}
          selectedType={topupType}
          onSelectType={(t) => {
            setTopupType(t);
            setSelectedProduct(null);
          }}
        />

        <View style={styles.offerList}>
          <OfferList
            products={products}
            topupType={topupType}
            selectedProductId={selectedProduct?.id ?? null}
            onSelectProduct={handleSelectProduct}
            loading={loading}
            error={error}
            onRetry={() => refetch()}
          />
        </View>
      </View>

      <TopupFooter
        selectedListing={selectedProduct}
        canProceed={canProceed}
        onAddToCart={() => {
          // TODO: integrar con cart/checkout
        }}
        onPayNow={() => {
          if (!selectedProduct) return;
          const snap = getSnapshot();
          router.push({
            pathname: "/services/topup/topup-confirm",
            params: {
              displayName: selectedProduct.displayName,
              sellPriceUsdCents: String(selectedProduct.sellPriceUsdCents),
              providerName: "",
              providerCode: "",
              listingId: selectedProduct.id,
              phoneE164: phoneNormalized,
              phoneNational: snap.accountNational ?? "",
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
