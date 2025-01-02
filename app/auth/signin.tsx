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
import { useColorScheme, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const SignIn = () => {
  const systemTheme = useColorScheme(); // Detect system theme (either 'light' or 'dark')
  const router = useRouter(); // Initialize Expo Router's useRouter hook
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false); // Track focus state of email input
  const [passwordFocused, setPasswordFocused] = useState(false); // Track focus state of password input

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      // alert("Please enter both email and password.");
      router.replace("/home/Home");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (loading === false) {
      router.replace("/home/Home");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        className={`flex-1 ${
          systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
        }`}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View className="flex-1 justify-center items-center p-5">
              <Text
                className={`text-3xl font-bold mb-10 ${
                  systemTheme === "dark"
                    ? "text-custom-light"
                    : "text-custom-dark"
                }`}
              >
                Sign In
              </Text>

              {/* Email TextInput Component */}
              <TextInput
                editable
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full p-5 rounded-md mb-4 ${
                  emailFocused
                    ? "border-2 border-green-500"
                    : "border border-gray-400" // Set default gray border when not focused
                } ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#C7C7CD"
              />

              {/* Password TextInput Component with Eye Icon */}
              <View className="relative w-full">
                <TextInput
                  editable
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className={`w-full p-5 rounded-md mb-6 ${
                    passwordFocused
                      ? "border-2 border-green-500"
                      : "border border-gray-400" // Set default gray border when not focused
                  } ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-dark"
                      : "bg-custom-input-light text-custom-light"
                  }`}
                  placeholder="Password"
                  placeholderTextColor="#C7C7CD"
                  secureTextEntry={!passwordVisible}
                />
                {password.length > 0 && (
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <MaterialIcons
                      className="mb-6"
                      name={passwordVisible ? "visibility" : "visibility-off"}
                      size={24}
                      color={systemTheme === "dark" ? "#fff" : "#000"}
                    />
                  </TouchableOpacity>
                )}
              </View>

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
                    ? "text-custom-light"
                    : "text-custom-dark"
                }`}
              >
                Don't have an account?{" "}
                <Text
                  className="text-custom-green"
                  onPress={() => router.push("/auth/signup")}
                >
                  Signup
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
