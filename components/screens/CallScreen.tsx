import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SegmentedTopTabsPager } from "../ui";

function Page({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{title}</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>
        Contenido aquí (listado, formularios, etc.)
      </Text>
    </View>
  );
}

const CallScreen = () => {
  const [index, setIndex] = React.useState(0);

  const tabs = [
    { key: "mobile", title: "Móvil" },
    { key: "data", title: "Datos" },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SegmentedTopTabsPager
        tabs={tabs}
        index={index}
        onIndexChange={setIndex}
        renderPage={(key) => {
          switch (key) {
            case "mobile":
              return <Page title="Recarga Móvil" />;
            case "data":
              return <Page title="Recarga Datos" />;
            default:
              return null;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CallScreen;
