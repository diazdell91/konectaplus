import RechargeHeader from "@/components/topup/header/RechargeHeader";
import PhoneProviderSummary from "@/components/topup/summary/PhoneProviderSummary";

import { COLORS } from "@/theme/colors";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RechargeFlowScreen() {
  return (
    <View style={styles.root}>
      <RechargeHeader />
      <PhoneProviderSummary
        phone="+1234567890"
        countryIso="US"
        callingCode="+1"
        listings={[]}
        selectedProviderCode={null}
        onEditPhone={() => router.push("/services/recharge/phone-picker")}
        onEditProvider={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
});
