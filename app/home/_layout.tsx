import React from "react";
import { useColorScheme, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"; // For custom drawer content

import Sales from "./(drawer)/sales";
import Home from "./home";

// Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  // Get the current theme (light or dark)
  const systemTheme = useColorScheme();

  // Define styles based on systemTheme
  const drawerStyle = {
    backgroundColor: systemTheme === "dark" ? "#171717" : "#FFFFFF", // Dark theme background vs light theme
    width: 340,
    borderRadius: 0,
  };

  // Handle Logout
  const handleLogout = () => {
    // Logic for logging out, e.g., clearing token, navigating to login screen, etc.
    console.log("Logged out");
    // You could add a navigation action like:
    // navigation.navigate('Login');
  };

  // Define icon color (white for all themes)
  const iconColor = "#FFFFFF";

  // Define background color for the icon circle
  const iconBgColor = systemTheme === "dark" ? "#22c55e" : "#4ade80"; // bg-green-500 for dark, bg-green-400 for light

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: drawerStyle, // Apply dynamic style to drawer
        drawerLabelStyle: {
          color: systemTheme === "dark" ? "#FFFFFF" : "#000000", // Text color for inactive labels
          fontSize: 18, // Increased text size
        },
        drawerActiveBackgroundColor:
          systemTheme === "dark" ? "#14532d" : "#bbf7d0", // Active background color
        drawerActiveTintColor: "#FFFFFF", // Active text color
        drawerInactiveTintColor: systemTheme === "dark" ? "#A9A9A9" : "#808080", // Inactive text color (gray)
        drawerItemStyle: {
          borderRadius: 10, // Add rounded corners to the active item
        },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          {/* Drawer Item List */}
          <DrawerItemList {...props} />

          {/* Logout Option */}
          <DrawerItem
            label="Logout" // Label for the logout option
            icon={({ size }) => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: iconBgColor }, // Set dynamic background color
                ]}
              >
                <MaterialIcons name="logout" size={size} color={iconColor} />
              </View>
            )}
            onPress={handleLogout} // Call logout handler
            labelStyle={{
              color: systemTheme === "dark" ? "#FFFFFF" : "#000000", // Change text color based on theme
              fontSize: 18, // Match text size with other labels
            }}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: iconBgColor }, // Set dynamic background color
              ]}
            >
              <MaterialIcons name="home" size={size} color={iconColor} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Sales"
        component={Sales}
        options={{
          drawerIcon: ({ color, size }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: iconBgColor }, // Set dynamic background color
              ]}
            >
              <MaterialIcons name="timeline" size={size} color={iconColor} />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 100, // Circle
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrawerLayout;
