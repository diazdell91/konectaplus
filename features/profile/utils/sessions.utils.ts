import { Ionicons } from "@expo/vector-icons";

export function deviceIcon(
  userAgent: string | null
): React.ComponentProps<typeof Ionicons>["name"] {
  if (!userAgent) return "phone-portrait-outline";
  const ua = userAgent.toLowerCase();
  if (ua.includes("ipad") || ua.includes("tablet")) return "tablet-portrait-outline";
  if (ua.includes("android") || ua.includes("iphone") || ua.includes("mobile"))
    return "phone-portrait-outline";
  if (ua.includes("mac") || ua.includes("windows") || ua.includes("linux"))
    return "laptop-outline";
  return "phone-portrait-outline";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}
