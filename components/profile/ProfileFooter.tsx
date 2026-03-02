import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@/components/ui";
import { COLORS, SPACING } from "@/theme";

export function ProfileFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.madeWithLoveText}>
        Hecho con el{" "}
        <MaterialCommunityIcons
          name="heart"
          size={14}
          color={COLORS.semantic.error}
        />{" "}
        para los cubanos.
      </Text>
      <Text style={styles.copyrightText}>
        © 2025 Pa Cubita Envíos. Todos los derechos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    gap: SPACING.xs,
  },
  madeWithLoveText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  copyrightText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
});
