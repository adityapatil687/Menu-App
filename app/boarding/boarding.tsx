import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Importing useRouter for navigation

export default function Boarding() {
  const scheme = useColorScheme();
  const router = useRouter(); // Initialize the router
  const DoneButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      className="bg-green-500 py-3 px-6 me-5 rounded-full"
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text className="text-white text-base font-bold">Continue</Text>
    </TouchableOpacity>
  );

  const Dots = ({ selected }: { selected: boolean }) => (
    <View
      className={`h-3 w-3 mx-1 rounded-full ${
        selected ? "bg-green-500" : "bg-gray-400"
      }`}
    />
  );

  return (
    // <SafeAreaView className="flex-1">

      <Onboarding
        pages={[
          {
            backgroundColor: scheme === "dark" ? "#121212" : "#FFFFFF",
            image: (
              <View className="bg-green-200 p-4 rounded-full">
                <MaterialIcons name="menu-book" size={64} color="#16A34A" />
              </View>
            ),
            title: "Welcome to MenuHost",
            subtitle:
              "Your one-stop solution to host and manage menus effortlessly.",
          },
          {
            backgroundColor: scheme === "dark" ? "#121212" : "#FFFFFF",
            image: (
              <View className="bg-green-200 p-4 rounded-full">
                <MaterialIcons name="create" size={64} color="#16A34A" />
              </View>
            ),
            title: "Create and Customize",
            subtitle:
              "Add items, categories, and personalize your menu in minutes.",
          },
          {
            backgroundColor: scheme === "dark" ? "#121212" : "#FFFFFF",
            image: (
              <View className="bg-green-200 p-4 rounded-full">
                <MaterialIcons name="cloud" size={64} color="#16A34A" />
              </View>
            ),
            title: "Saved on Cloud",
            subtitle:
              "Save menu on cloud and access any time.",
          },
        ]}
        showNext={false} // Disable default "Next" button
        showSkip={false} // Disable default "Skip" button
        bottomBarHighlight={false} // Disable default highlight on bottom bar
        DoneButtonComponent={DoneButton} // Custom "Done" button
        DotComponent={Dots} // Custom dots
        onDone={() => router.replace("/auth/signin")}
      />
    // </SafeAreaView>
  );
}
