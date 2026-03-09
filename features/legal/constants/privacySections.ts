export interface PrivacySection {
  title: string;
  body: string;
  bullets?: string[];
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: "1. Información que recopilamos",
    body: "Cuando usas KonectaPlus, podemos recopilar la siguiente información:",
    bullets: [
      "Nombre, número de teléfono y correo electrónico",
      "Información de pago (tarjetas de crédito/débito procesadas de forma segura)",
      "Historial de recargas y transacciones",
      "Datos del dispositivo e información de uso de la aplicación",
      "Preferencias y configuración de la cuenta",
    ],
  },
  {
    title: "2. Cómo usamos tu información",
    body: "Utilizamos tu información para:",
    bullets: [
      "Procesar recargas celulares y transferencias de saldo",
      "Gestionar tu cuenta y autenticar tu identidad",
      "Enviar confirmaciones de transacciones y alertas de seguridad",
      "Mejorar la funcionalidad de la aplicación y tu experiencia",
      "Cumplir con obligaciones legales y prevenir fraudes",
    ],
  },
  {
    title: "3. Compartir información con terceros",
    body: "No vendemos ni transferimos tu información personal a terceros, excepto:",
    bullets: [
      "Proveedores de servicios de recarga (como Ding) para procesar las transacciones",
      "Procesadores de pago (Stripe) bajo estrictos acuerdos de confidencialidad",
      "Cuando lo requiera la ley o un proceso legal",
      "Para proteger nuestros derechos, propiedad o seguridad",
    ],
  },
  {
    title: "4. Seguridad de los datos",
    body: "Implementamos medidas de seguridad apropiadas para proteger tu información:",
    bullets: [
      "Cifrado de extremo a extremo para datos de pago",
      "Servidores seguros con actualizaciones periódicas de seguridad",
      "Controles de acceso y medidas de autenticación (OTP)",
      "Auditorías de seguridad regulares",
    ],
  },
  {
    title: "5. Retención de datos",
    body: "Conservamos tu información personal mientras tu cuenta esté activa o sea necesaria para prestarte servicios. Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento contactándonos.",
  },
  {
    title: "6. Tus derechos",
    body: "Tienes derecho a:",
    bullets: [
      "Acceder a tu información personal",
      "Corregir o actualizar tus datos",
      "Eliminar tu cuenta y los datos asociados",
      "Cancelar la suscripción a comunicaciones de marketing",
      "Solicitar la portabilidad de tus datos",
    ],
  },
  {
    title: "7. Privacidad de menores",
    body: "Nuestro servicio no está dirigido a menores de 18 años. No recopilamos conscientemente información personal de menores. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información, contáctanos de inmediato.",
  },
  {
    title: "8. Cambios en esta política",
    body: "Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos cualquier cambio publicando la nueva política en esta página y actualizando la fecha de última actualización.",
  },
  {
    title: "9. Contáctanos",
    body: "Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, contáctanos en: soporte@konectaplus.com",
  },
];
