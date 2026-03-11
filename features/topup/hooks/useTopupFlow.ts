import {
  TOPUP_PRODUCTS,
  TopupListingType,
  TopupProduct,
  TopupProductsData,
  TopupProductsVars,
} from "@/graphql/adminTopupProductListings";
import { useServiceSelectionStore } from "@/store/useServiceSelectionStore";
import { COUNTRIES } from "@/utils/phoneCountry";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import { useMemo, useState } from "react";

export function useTopupFlow() {
  const { country, account, setProductId, getSnapshot } = useServiceSelectionStore();

  const countryIso2 = country.iso2;

  const callingCode = useMemo(() => {
    if (country.dialCode) return country.dialCode;
    return COUNTRIES.find((c) => c.iso === countryIso2)?.callingCode ?? "";
  }, [country.dialCode, countryIso2]);

  const phoneNormalized = useMemo(() => {
    const raw = account.normalized ?? account.value ?? "";
    if (!raw) return "";
    if (raw.startsWith("+")) return raw;
    return callingCode ? `${callingCode}${raw}` : raw;
  }, [account.normalized, account.value, callingCode]);

  const { data, loading, error, refetch } = useQuery<TopupProductsData, TopupProductsVars>(
    TOPUP_PRODUCTS,
    {
      variables: { countryIso: countryIso2 ?? "" },
      skip: !countryIso2,
      fetchPolicy: "cache-first",
    },
  );

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
  const [selectedProduct, setSelectedProduct] = useState<TopupProduct | null>(null);

  const counts = useMemo<Record<TopupListingType, number>>(() => {
    const base: Record<TopupListingType, number> = { VOUCHER: 0, BUNDLE: 0, DATA: 0 };
    for (const p of products) base[p.topupType] += 1;
    return base;
  }, [products]);

  const handleSelectProduct = (product: TopupProduct) => {
    setSelectedProduct(product);
    setProductId(product.id, "product");
  };

  const handleSelectType = (type: TopupListingType) => {
    setTopupType(type);
    setSelectedProduct(null);
  };

  const handlePayNow = () => {
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
  };

  return {
    countryIso2,
    callingCode,
    phoneNormalized,
    products,
    topupType,
    counts,
    selectedProduct,
    loading,
    error,
    canProceed: selectedProduct !== null,
    handleSelectProduct,
    handleSelectType,
    handlePayNow,
    refetch,
  };
}
