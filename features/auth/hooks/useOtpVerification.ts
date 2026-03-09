import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const RESEND_SECONDS = 60;
const CODE_LENGTH = 6;

function maskPhone(phone: string): string {
  if (!phone) return "";
  const clean = phone.replace(/\s/g, "");
  if (clean.length <= 4) return clean;
  const visible = clean.slice(-2);
  const prefix = clean.slice(0, Math.min(5, clean.length - 4));
  return `${prefix} ···· ··${visible}`;
}

export function useOtpVerification(phone: string | undefined) {
  const { verifyOtp, requestOtp } = useAuth();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const shake = useSharedValue(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (code.length === CODE_LENGTH && !loading && !success) {
      handleVerify(code);
    }
  }, [code, loading, success]);

  const triggerShake = () => {
    shake.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(
        withSequence(
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
        ),
        3,
        false,
      ),
      withTiming(0, { duration: 50 }),
    );
  };

  const handleVerify = async (currentCode: string) => {
    if (loading || !phone || currentCode.length < CODE_LENGTH) return;
    setLoading(true);
    setError(null);
    try {
      await verifyOtp({
        phone,
        code: currentCode,
        device: {
          deviceName: Platform.OS === "ios" ? "iPhone" : "Android",
          deviceId: "MOBILE",
        },
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e?.message ?? "Código incorrecto. Intenta de nuevo.");
      setCode("");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phone || resending || cooldown > 0) return;
    setResending(true);
    setError(null);
    setCode("");
    try {
      await requestOtp({ phone, purpose: "LOGIN" });
      setCooldown(RESEND_SECONDS);
    } catch (e: any) {
      setError(e?.message ?? "No se pudo reenviar el código");
    } finally {
      setResending(false);
    }
  };

  const handleCodeChange = (val: string) => {
    setCode(val);
    if (error) setError(null);
  };

  return {
    code,
    loading,
    resending,
    cooldown,
    error,
    success,
    shake,
    maskedPhone: maskPhone(phone ?? ""),
    codeLength: CODE_LENGTH,
    handleCodeChange,
    handleVerify,
    handleResend,
  };
}
