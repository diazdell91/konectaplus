import { Button, Text } from "@/components/ui";
import { useAuth } from "@/context/AuthProvider";
import { View } from "react-native";

export default function Index() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ margin: 16 }}>Profile Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
