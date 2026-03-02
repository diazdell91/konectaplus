import { ScrollView, StyleSheet } from "react-native";
import { Button } from "../ui";

export function Profile() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
      style={styles.container}
    >
      <Button onPress={() => {}}>Edit Profile</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
