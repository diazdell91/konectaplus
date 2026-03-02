import { View, Platform, Pressable, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/theme";
import Text from "./Text";

interface Props {
  title: string;
  back?: boolean;
  card?: boolean;
  close?: boolean;
  white?: boolean;
  rigthIcon?: React.ComponentProps<typeof Icon>["name"];
  rigthAction?: () => void;
  className?: string;
}

const Header = (props: Props) => {
  const { top: paddingTop } = useSafeAreaInsets();
  const { goBack, canGoBack } = useNavigation();
  const { title, back, card, close, white, rigthIcon, rigthAction } = props;

  const extraPadding = Platform.OS === "ios" ? 0 : 32;
  const calculatedHeight = 56 + (card ? 8 + extraPadding : paddingTop);
  const calculatedPaddingTop = card ? 8 : paddingTop;

  const containerStyle: ViewStyle = {
    height: calculatedHeight,
    paddingTop: calculatedPaddingTop,
    backgroundColor: card || white ? COLORS.neutral.white : "transparent",
    borderBottomWidth: card ? 1 : 0,
    borderBottomColor: card ? COLORS.border.light : "transparent",
  };

  return (
    <View
      style={containerStyle}
    >
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
      }}>
        {back && canGoBack() && (
          <Pressable onPress={goBack} style={{ padding: 8 }}>
            <Icon
              name={close ? "close" : "arrow-left"}
              size={28}
              color={COLORS.text.primary}
            />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <Text h3 size={20} style={{ marginHorizontal: 8 }}>
            {title}
          </Text>
        </View>
        {rigthIcon && (
          <Pressable onPress={rigthAction} style={{ padding: 8 }}>
            <Icon
              name={rigthIcon}
              size={28}
              color={COLORS.text.primary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Header;
