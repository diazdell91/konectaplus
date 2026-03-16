import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePhoneCountryStore } from "@/store/usePhoneCountryStore";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

export function usePhoneEntry() {
  const { requestOtp } = useAuth();
  const selectedCountry = usePhoneCountryStore((s) => s.country);
  const dialCode = usePhoneCountryStore((s) => s.dialCode);
  const validatePhoneLength = usePhoneCountryStore((s) => s.validatePhoneLength);

  const [phoneDigits, setPhoneDigits] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<TextInput>(null);
  const borderAnim = useSharedValue(0);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  const handleChangePhone = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setPhoneDigits(digits);
    setError(null);
  };

  const onFocus = () => {
    borderAnim.value = withTiming(1, { duration: 200 });
  };

  const onBlur = () => {
    borderAnim.value = withTiming(0, { duration: 200 });
  };

  const fullNumber = `${dialCode}${phoneDigits}`;
  const isValid = phoneDigits.length >= 7 && validatePhoneLength(phoneDigits);

  const handleContinue = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    setError(null);
    try {
      await requestOtp({ phone: fullNumber, purpose: "LOGIN" });
      router.push({ pathname: "/otp-phone", params: { phone: fullNumber } });
    } catch (e: any) {
      setError(e?.message ?? "Error al enviar el código");
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedCountry,
    phoneDigits,
    loading,
    error,
    inputRef,
    borderAnim,
    fullNumber,
    isValid,
    handleChangePhone,
    handleContinue,
    onFocus,
    onBlur,
  };
}
