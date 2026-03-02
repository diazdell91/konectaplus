import { COLORS, SPACING } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import { KeyboardScrollView } from "./KeyboardScrollView";
import ProgressIndicator from "./ProgressIndicator";

interface FormScreenProps {
  /** Título del header */
  title?: string;
  /** Mostrar botón de retroceso en el header */
  showBack?: boolean;
  /** Mostrar indicador de progreso */
  showProgress?: boolean;
  /** Paso actual del progreso (1-indexed) */
  currentStep?: number;
  /** Total de pasos del progreso */
  totalSteps?: number;
  /** Label del paso actual */
  stepLabel?: string;
  /** Contenido del formulario */
  children: React.ReactNode;
  /** Contenido del footer (botones, etc.) */
  footer?: React.ReactNode;
  /** Callback al presionar back */
  onBack?: () => void;
  /** Header personalizado (opcional) */
  customHeader?: React.ReactNode;
}

/**
 * FormScreen - Wrapper completo para pantallas de formulario
 *
 * Incluye automáticamente:
 * - SafeAreaView con edges configurables
 * - Header opcional con botón de retroceso
 * - ProgressIndicator opcional
 * - KeyboardScrollView para manejar el teclado
 * - Footer con safe area insets automático
 *
 * @example
 * ```tsx
 * <FormScreen
 *   title="Registro"
 *   showBack
 *   showProgress
 *   currentStep={2}
 *   totalSteps={4}
 *   stepLabel="Correo electrónico"
 *   footer={<Button title="Siguiente" onPress={handleNext} />}
 * >
 *   <FormSection>
 *     <Input label="Email" value={email} onChangeText={setEmail} />
 *   </FormSection>
 * </FormScreen>
 * ```
 */
const FormScreen = ({
  title,
  showBack,
  showProgress,
  currentStep,
  totalSteps,
  stepLabel,
  children,
  footer,
  customHeader,
}: FormScreenProps) => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {/* Header */}
      {customHeader || (title && <Header title={title} back={showBack} />)}

      {/* Progress Indicator */}
      {showProgress && currentStep && totalSteps && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabel={stepLabel || ""}
        />
      )}

      {/* Scrollable Content */}
      <KeyboardScrollView contentContainerStyle={styles.scrollContent}>
        {children}

        {/* Footer */}
        {footer && <View style={styles.footer}>{footer}</View>}
      </KeyboardScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.md,
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    marginTop: "auto",
  },
});

export default FormScreen;
