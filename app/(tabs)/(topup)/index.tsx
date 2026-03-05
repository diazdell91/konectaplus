import { TopupScreen } from "@/components/screens";
import { ScreenHeader } from "@/components/ui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader subtitle="Recarga a los tuyos" />
      <TopupScreen />
    </SafeAreaView>
  );
};

export default Index;
