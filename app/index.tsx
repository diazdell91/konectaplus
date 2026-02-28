import { Button } from "@/components/ui";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World</Text>
      <Button variant="filled" onPress={() => alert("Button Pressed")}>
        Press Me
      </Button>
    </View>
  );
}
