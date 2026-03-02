import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export interface KeyboardScrollViewProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  bottomOffset?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Scroll view optimizado que maneja automáticamente el teclado
 *
 * Reemplaza el patrón KeyboardAvoidingView + ScrollView con una solución
 * más eficiente que sincroniza el scroll con las animaciones nativas del teclado.
 *
 * Características:
 * - Scroll automático al input enfocado
 * - Dismissal interactivo con swipe
 * - Comportamiento consistente iOS/Android
 * - Sin configuración platform-specific
 *
 * @example
 * ```tsx
 * <KeyboardScrollView contentContainerStyle={styles.content}>
 *   <Input label="Email" />
 *   <Input label="Password" />
 *   <Button title="Submit" />
 * </KeyboardScrollView>
 * ```
 */
export const KeyboardScrollView: React.FC<KeyboardScrollViewProps> = ({
  children,
  contentContainerStyle,
  bottomOffset = 0,
  style,
}) => {
  return (
    <KeyboardAwareScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      bottomOffset={bottomOffset}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardScrollView;
