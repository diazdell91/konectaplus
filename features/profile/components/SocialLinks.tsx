import { View, StyleSheet, Linking, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@/components/ui";
import { COLORS, SPACING } from "@/theme";
import { CONTACT_INFO } from "@/constants/contact";

interface SocialLink {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  url: string;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    icon: "facebook",
    url: CONTACT_INFO.social.facebook,
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: CONTACT_INFO.social.instagram,
    color: "#E4405F",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    url: CONTACT_INFO.social.whatsapp,
    color: "#25D366",
  },
];

export function SocialLinks() {
  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {SOCIAL_LINKS.map((social) => (
        <Pressable
          key={social.name}
          style={styles.button}
          onPress={() => handleSocialPress(social.url)}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${social.color}15` },
            ]}
          >
            <MaterialCommunityIcons
              name={social.icon}
              size={24}
              color={social.color}
            />
          </View>
          <Text style={styles.name}>{social.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.sm,
    gap: SPACING.sm,
  },
  button: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    gap: SPACING.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
    color: COLORS.text.primary,
  },
});
