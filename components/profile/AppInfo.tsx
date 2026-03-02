import { Text } from "@/components/ui";
import { COLORS, SPACING } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";

interface InfoRowProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  showDivider?: boolean;
}

function InfoRow({ icon, label, value, showDivider = false }: InfoRowProps) {
  return (
    <>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={COLORS.text.secondary}
        />
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      {showDivider && <View style={styles.infoDivider} />}
    </>
  );
}

export function AppInfo() {
  const appVersion = Constants.expoConfig?.version || "0.0.10";
  const buildNumber = Constants.expoConfig?.ios?.buildNumber || "1";
  const platform = Constants.platform?.ios ? "iOS" : "Android";

  return (
    <View style={styles.card}>
      <InfoRow
        icon="information-outline"
        label="Versión"
        value={appVersion}
        showDivider
      />
      <InfoRow
        icon="package-variant"
        label="Build"
        value={buildNumber}
        showDivider
      />
      <InfoRow icon="cellphone" label="Plataforma" value={platform} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 12,
    marginHorizontal: SPACING.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    gap: SPACING.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  infoLabel: {
    flex: 1,
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: COLORS.text.primary,
  },
  infoValue: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: COLORS.primary.main,
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
});
