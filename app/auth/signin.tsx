import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme, TextInput  } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const SignIn = () => {
  const systemTheme = useColorScheme(); // Detect system theme (either 'light' or 'dark')
  const router = useRouter(); // Initialize Expo Router's useRouter hook
  // State to manage password visibility and password input
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Track the password input
  const [loading, setLoading] = useState(false); // Loading state for sign-in process

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Handle Sign In button click
  const handleSignIn = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    // Start loading state (you can replace this with an actual sign-in API request)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Handle sign-in success here
    }, 2000);
  };

  return (
    // Wrap the entire component with GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        className={`flex-1 ${
          systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
        }`}
      >
        {/* TouchableWithoutFeedback to dismiss keyboard on touch outside */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
            style={{ flex: 1 }}
          >
            <View className="flex-1 justify-center items-center p-5">
              <Text
                className={`text-3xl font-bold mb-10 ${
                  systemTheme === "dark"
                    ? "text-custom-dark"
                    : "text-custom-light"
                }`}
              >
                Sign In
              </Text>

              {/* Email TextInput Component */}
              <TextInput
                editable
                value={email} // Bind the value to the email state
                onChangeText={setEmail} // Update state on text change
                className={`w-full p-5 rounded-md mb-4  ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="Email"
                keyboardType="email-address" // Setting keyboard type for email
                autoCapitalize="none" // Avoid auto-capitalization
                placeholderTextColor="#C7C7CD"
              />

              {/* Password TextInput Component with Eye Icon */}
              <View className="relative w-full">
                <TextInput
                  editable
                  value={password} // Bind the value to the password state
                  onChangeText={setPassword} // Update state on text change
                  className={`w-full p-5 rounded-md mb-6  ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-dark"
                      : "bg-custom-input-light text-custom-light"
                  }`}
                  placeholder="Password"
                  placeholderTextColor="#C7C7CD"
                  secureTextEntry={!passwordVisible} // Toggle password visibility
                />

                {/* Conditionally render Eye Icon to Toggle Password Visibility */}
                {password.length > 0 && (
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <MaterialIcons
                      className="mb-6"
                      name={passwordVisible ? "visibility" : "visibility-off"} // MaterialIcons names
                      size={24}
                      color={systemTheme === "dark" ? "#fff" : "#000"} // Adjust color based on theme
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                onPress={handleSignIn}
                className="w-full bg-green-500 justify-center items-center mb-6 py-4 rounded-md"
              >
                <Text className="text-white text-base font-bold">
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>
              <Text
                className={`${
                  systemTheme === "dark"
                    ? "text-custom-dark"
                    : "text-custom-light"
                }`}
              >
                Don't have an account?{" "}
                <Text className="text-custom-green" onPress={()=>{router.push("/auth/signin")}}>
                  <Link href="/auth/signup">Signup</Link>
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignIn;
