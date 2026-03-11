import TopupScreen from "@/features/topup/screens/TopupScreen";
import { ScreenHeader } from "@/components/ui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader />
      <TopupScreen />
    </SafeAreaView>
  );
};

export default Index;
