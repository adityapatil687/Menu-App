import { Stack } from "expo-router";
import React from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
