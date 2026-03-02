import { ContactsHistoryScreen } from "@/components/screens";
import { Screen } from "@/components/ui";
import React from "react";

const Index = () => {
  return (
    <Screen edges={["top"]} style={{ marginTop: 32 }}>
      <ContactsHistoryScreen />
    </Screen>
  );
};

export default Index;
