import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactItem {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onPress: () => void;
}

export const FAQS: FaqItem[] = [
  {
    question: "¿Cómo hago una recarga celular?",
    answer:
      'Ve a la pestaña "Recargas", selecciona el contacto o escribe el número, elige el monto y confirma el pago con tu tarjeta o saldo de wallet.',
  },
  {
    question: "¿En cuánto tiempo llega la recarga?",
    answer:
      "Las recargas son instantáneas. En casos excepcionales puede demorar hasta 5 minutos. Si pasado ese tiempo no llegó, contáctanos.",
  },
  {
    question: "¿Cómo agrego saldo a mi wallet?",
    answer:
      "En la pantalla de inicio toca tu saldo o ve a Wallet → Recargar saldo. Selecciona el monto y paga con tu tarjeta.",
  },
  {
    question: "¿Puedo solicitar un reembolso?",
    answer:
      "Los reembolsos se evalúan caso a caso. Si tu recarga no llegó al destinatario, contáctanos dentro de las 24h y lo revisamos.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas Visa, Mastercard y American Express, así como saldo de tu wallet KonectaPlus.",
  },
];

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "logo-whatsapp",
    label: "WhatsApp",
    value: "+1 (555) 000-0000",
    onPress: () => Linking.openURL("https://wa.me/15550000000"),
  },
  {
    icon: "mail-outline",
    label: "Correo",
    value: "soporte@konectaplus.com",
    onPress: () => Linking.openURL("mailto:soporte@konectaplus.com"),
  },
];
