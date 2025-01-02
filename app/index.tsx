import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./home/home";
import Boarding from "./boarding/boarding";
import React from "react";
export default function Index() {
  return (
    <>
      <Boarding />
      {/* <Home /> */}
    </>
  );
}
