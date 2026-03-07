/**
 * Wrapper sobre sonner-native para notificaciones consistentes con el design
 * system de KonectaPlus. Importa siempre desde aquí en lugar de sonner-native
 * directamente para garantizar estilos uniformes.
 *
 * Uso:
 *   import { showToast } from "@/utils/toast";
 *   showToast.success("Recarga completada");
 *   showToast.error("Error al procesar el pago");
 *   showToast.info("Pago en procesamiento...");
 */
import { toast } from "sonner-native";

export const showToast = {
  success: (message: string, description?: string) =>
    toast.success(message, { description }),

  error: (message: string, description?: string) =>
    toast.error(message, { description }),

  info: (message: string, description?: string) =>
    toast(message, { description }),

  warning: (message: string, description?: string) =>
    toast.warning(message, { description }),

  loading: (message: string) => toast.loading(message),

  dismiss: (id?: string | number) => toast.dismiss(id),
};
