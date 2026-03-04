import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { DynamicColorIOS, Platform } from "react-native";

const activeTint =
  Platform.OS === "ios"
    ? DynamicColorIOS({ light: "#09816c", dark: "#4fbe9f" })
    : "#09816c";

export default function TabLayout() {
  return (
    <NativeTabs tintColor={activeTint} labelStyle={{ fontSize: 11 }}>
      <NativeTabs.Trigger name="(home)/index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(topup)">
        <NativeTabs.Trigger.Icon sf="arrow.up.circle.fill" md="arrow_upward" />
        <NativeTabs.Trigger.Label>Recargas</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calls/index">
        <NativeTabs.Trigger.Icon sf="phone.fill" md="call" />
        <NativeTabs.Trigger.Label>Llamadas</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile/index">
        <NativeTabs.Trigger.Icon sf="person.fill" md="account_circle" />
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
