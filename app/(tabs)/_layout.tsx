import { TabBarIcon } from "@/components/ui";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4fbe9f",
        tabBarInactiveTintColor: "#09816c",
        tabBarStyle: {
          height: 80,
          paddingTop: 14,
          paddingBottom: 10,
          backgroundColor: "transparent",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "rgba(15, 23, 42, 0.10)",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index" // ✅ aquí está el fix
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="account" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
