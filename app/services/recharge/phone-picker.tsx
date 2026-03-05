import { TopupContactTab } from "@/components/topup";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhonePickerScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <TopupContactTab />
    </SafeAreaView>
  );
}
