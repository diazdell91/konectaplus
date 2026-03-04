import { TopupScreen } from "@/components/screens";
import { Screen } from "@/components/ui";
import React from "react";

const Index = () => {
  return (
    <Screen edges={["top"]} style={{ marginTop: 32 }}>
      <TopupScreen />
    </Screen>
  );
};

export default Index;
