import { Stack } from "expo-router";
import React from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { GlobalProvider } from "@/context/GlobalProvider";
import DrawerLayout from "./home/_layout";
export default function RootLayout() {
  return (
    <GlobalProvider>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
