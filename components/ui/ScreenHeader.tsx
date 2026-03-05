import { COLORS } from "@/theme";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

interface ScreenHeaderProps {
  subtitle: string;
}

export default function ScreenHeader({ subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.headerSection}>
      <View style={styles.headerIconContainer}>
        <Image
          source={require("@/assets/images/icon-logo.png")}
          style={{ width: 72, height: 72 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: COLORS.light.background,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerIconContainer: {
    width: "auto",
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
