import { COLORS } from "@/theme";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { DynamicColorIOS, Platform } from "react-native";

const activeTint =
  Platform.OS === "ios"
    ? DynamicColorIOS({
        light: COLORS.primary.main,
        dark: COLORS.primary.light,
      })
    : COLORS.primary.main;

export default function TabLayout() {
  return (
    <NativeTabs tintColor={activeTint} labelStyle={{ fontSize: 11 }}>
      <NativeTabs.Trigger name="(home)/index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(orders)/index">
        <NativeTabs.Trigger.Icon sf="backpack.fill" md="backpack" />
        <NativeTabs.Trigger.Label>Historial</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(profile)/index">
        <NativeTabs.Trigger.Icon sf="person.fill" md="account_circle" />
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
