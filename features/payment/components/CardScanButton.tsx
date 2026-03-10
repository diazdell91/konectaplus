/**
 * CardScanButton
 *
 * Requires `expo-camera` to be installed:
 *   npx expo install expo-camera
 *
 * And add to app.json plugins:
 *   ["expo-camera", { "cameraPermission": "Permite escanear tu tarjeta de crédito" }]
 */

import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Lazy import — avoids crash if expo-camera is not installed yet
let Camera: any = null;
let useCameraPermissions: (() => any) | null = null;
try {
  const mod = require("expo-camera");
  Camera = mod.CameraView ?? mod.Camera;
  useCameraPermissions = mod.useCameraPermissions;
} catch {
  // expo-camera not installed — button will show install hint
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScannedCard {
  number: string;   // full card number as string
  expMonth?: string;
  expYear?: string;
  name?: string;
}

interface Props {
  onCardScanned: (card: ScannedCard) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const CardScanButton = ({ onCardScanned }: Props) => {
  const [scanning, setScanning] = useState(false);
  const [requesting, setRequesting] = useState(false);

  // If expo-camera is not installed, render a disabled placeholder
  if (!Camera || !useCameraPermissions) {
    return (
      <View style={styles.notAvailable}>
        <Ionicons name="camera-outline" size={16} color={COLORS.neutral.gray400} />
        <Text style={styles.notAvailableText}>
          Escaneo no disponible · instala expo-camera
        </Text>
      </View>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [permission, requestPermission] = useCameraPermissions();

  const handlePress = async () => {
    if (!permission?.granted) {
      setRequesting(true);
      await requestPermission();
      setRequesting(false);
      return;
    }
    setScanning(true);
  };

  if (scanning) {
    return (
      <CardScannerView
        onScanned={(card) => {
          setScanning(false);
          onCardScanned(card);
        }}
        onCancel={() => setScanning(false)}
      />
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={handlePress}
      disabled={requesting}
    >
      {requesting ? (
        <ActivityIndicator size="small" color={COLORS.primary.main} />
      ) : (
        <Ionicons name="camera-outline" size={20} color={COLORS.primary.main} />
      )}
      <Text style={styles.label}>
        {permission?.granted === false
          ? "Permitir cámara para escanear"
          : "Escanear tarjeta"}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={16}
        color={COLORS.primary.main}
        style={styles.chevron}
      />
    </Pressable>
  );
};

export default CardScanButton;

// ---------------------------------------------------------------------------
// Scanner overlay — shown fullscreen while scanning
// ---------------------------------------------------------------------------

interface ScannerProps {
  onScanned: (card: ScannedCard) => void;
  onCancel: () => void;
}

function CardScannerView({ onScanned, onCancel }: ScannerProps) {
  const handleBarcode = ({ data }: { data: string }) => {
    // Basic card number extraction from raw OCR / barcode data
    const digits = data.replace(/\D/g, "");
    if (digits.length >= 15) {
      onScanned({ number: digits.slice(0, 16) });
    }
  };

  return (
    <View style={scanner.root}>
      <Camera
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={handleBarcode}
      />

      {/* Viewfinder overlay */}
      <View style={scanner.overlay}>
        <View style={scanner.viewfinder}>
          <View style={[scanner.corner, scanner.tl]} />
          <View style={[scanner.corner, scanner.tr]} />
          <View style={[scanner.corner, scanner.bl]} />
          <View style={[scanner.corner, scanner.br]} />
        </View>
        <Text style={scanner.hint}>
          Coloca tu tarjeta dentro del recuadro
        </Text>
      </View>

      {/* Cancel */}
      <Pressable style={scanner.cancelBtn} onPress={onCancel}>
        <Ionicons name="close-circle" size={36} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary.tint,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary.main,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  label: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
  chevron: {
    marginLeft: "auto",
  },
  notAvailable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  notAvailableText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.neutral.gray400,
  },
});

const scanner = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  viewfinder: {
    width: 300,
    height: 190,
    position: "relative",
  },
  hint: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.85,
  },
  // Corner brackets
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#FFFFFF",
  },
  tl: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 4,
  },
  tr: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 4,
  },
  bl: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 4,
  },
  br: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 4,
  },
  cancelBtn: {
    position: "absolute",
    top: 56,
    right: 20,
  },
});
