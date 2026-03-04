import { COLORS, FONTS } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface IntlPhoneInput {
  defaultCountry: {
    code: string;
    dialCode: string;
    mask: string;
    flag: React.ComponentProps<typeof Image>["source"];
  };
  onChangeText?: (props: object) => void;
  inputProps?: object;
  label?: string;
  navigation?: { navigate: any };
}
function PhoneInput(props: IntlPhoneInput) {
  const { defaultCountry } = props;
  const { flag, dialCode, mask } = defaultCountry;
  const [phoneNumber, setPhoneNumber] = useState("");

  //functions
  const onChangePropText = (
    unmaskedPhoneNumber: string,
    phoneNumber: string,
  ) => {
    const countOfNumber = mask ? mask?.match(/9/g).length : 12;
    if (props.onChangeText) {
      const isVerified =
        countOfNumber === unmaskedPhoneNumber?.length &&
        phoneNumber?.length > 0;
      props.onChangeText({
        dialCode,
        unmaskedPhoneNumber,
        phoneNumber,
        isVerified,
      });
    }
  };

  const onChangeText = (value: any) => {
    let unmaskedPhoneNumber = (value.match(/\d+/g) || []).join("");

    if (unmaskedPhoneNumber.length === 0) {
      setPhoneNumber("");
      onChangePropText("", "");
      return;
    }

    let phoneNumber = mask.replace(/9/g, "_");
    for (let index = 0; index < unmaskedPhoneNumber.length; index += 1) {
      phoneNumber = phoneNumber.replace("_", unmaskedPhoneNumber[index]);
    }
    let numberPointer = 0;
    for (let index = phoneNumber.length; index > 0; index -= 1) {
      if (phoneNumber[index] !== " " && !isNaN(phoneNumber[index])) {
        numberPointer = index;
        break;
      }
    }
    phoneNumber = phoneNumber.slice(0, numberPointer + 1);
    unmaskedPhoneNumber = (phoneNumber.match(/\d+/g) || []).join("");

    onChangePropText(unmaskedPhoneNumber, phoneNumber);
    setPhoneNumber(phoneNumber);
  };

  return (
    <View style={styles.container}>
      {props.label && (
        <Text
          style={{ marginVertical: 8, marginStart: 4, ...FONTS.inputLabel }}
        >
          {props.label}
        </Text>
      )}
      <View style={styles.containerInput}>
        <Pressable
          onPress={() => {
            props.navigation?.navigate("SelectCountry");
          }}
          style={styles.openDialogView}
        >
          <Image source={flag} width={24} height={24} />
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={COLORS.light.gray}
          />
          <Text style={[styles.dialCodeTextStyle]}>{dialCode} </Text>
        </Pressable>
        <TextInput
          {...props.inputProps}
          style={styles.textInput}
          autoCorrect={false}
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  containerInput: {
    flexDirection: "row",
    flex: 1,
    height: 56,
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    backgroundColor: COLORS.light.surface,
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
  },

  //Text
  textInput: {
    flex: 1,
    height: 52,
    ...FONTS.boddy,
  },

  dialCodeTextStyle: {
    justifyContent: "center",
    alignItems: "center",
    ...FONTS.boddy,
  },
});
