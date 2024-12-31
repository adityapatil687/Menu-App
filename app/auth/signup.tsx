import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Image picker for profile picture
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router"; // Use Expo Router's useRouter hook

const SignUp = () => {
  const systemTheme = useColorScheme(); // Detect system theme (either 'light' or 'dark')

  // State to manage user input and visibility
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(""); // Store profile picture
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize Expo Router's useRouter hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  const handleImagePick = async () => {
    try {
      // Launch image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        // Convert image to base64 to calculate exact size
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Calculate file size from base64 string length
        const fileSizeInBytes = (base64Image.length * 3) / 4; // Approximation
        console.log("Calculated File Size:", fileSizeInBytes, "bytes");

        // Allow image up to 750 KB
        if (fileSizeInBytes > 750000) {
          // 750 KB
          alert("Please select an image smaller than 750 KB.");
        } else {
          setProfilePic(imageUri); // Set the profile picture if size is valid
        }
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("An error occurred while picking the image. Please try again.");
    }
  };

  const handleSignUp = () => {
    if (
      !firstName ||
      !lastName ||
      !restaurantName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !profilePic
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Simulate a sign-up process
    setTimeout(() => {
      setLoading(false);
      alert("Signed up successfully!");
      // Navigate to the Sign In screen after successful sign up
      router.back(); // Using Expo Router's push for navigation
    }, 2000);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
      }`}
    >
      {/* TouchableWithoutFeedback to dismiss keyboard */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View className="flex-1 justify-center items-center">
              <Text
                className={`text-3xl font-bold mb-5 ${
                  systemTheme === "dark"
                    ? "text-custom-dark"
                    : "text-custom-light"
                }`}
              >
                Sign Up
              </Text>

              {/* Profile Picture Upload */}
              <TouchableOpacity
                onPress={handleImagePick}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  marginBottom: 20,
                  backgroundColor: systemTheme === "dark" ? "#333" : "#eee",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: systemTheme === "dark" ? "#fff" : "#000",
                }}
              >
                {profilePic ? (
                  <Image
                    source={{ uri: profilePic }}
                    style={{ width: 116, height: 116, borderRadius: 58 }}
                  />
                ) : (
                  <Text
                    style={{
                      color: systemTheme === "dark" ? "#fff" : "#000",
                      textAlign: "center",
                    }}
                  >
                    Upload{"\n"}Profile Pic
                  </Text>
                )}
              </TouchableOpacity>

              {/* First Name */}
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                className={`w-full p-5 rounded-md mb-4 ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="First Name"
                placeholderTextColor="#C7C7CD"
              />

              {/* Last Name */}
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                className={`w-full p-5 rounded-md mb-4 ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="Last Name"
                placeholderTextColor="#C7C7CD"
              />

              {/* Restaurant Name */}
              <TextInput
                value={restaurantName}
                onChangeText={setRestaurantName}
                className={`w-full p-5 rounded-md mb-4 ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="Restaurant Name"
                placeholderTextColor="#C7C7CD"
              />

              {/* Email */}
              <TextInput
                value={email}
                onChangeText={setEmail}
                className={`w-full p-5 rounded-md mb-4 ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#C7C7CD"
              />

              {/* Phone Number */}
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                className={`w-full p-5 rounded-md mb-4 ${
                  systemTheme === "dark"
                    ? "bg-custom-input-dark text-custom-dark"
                    : "bg-custom-input-light text-custom-light"
                }`}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                placeholderTextColor="#C7C7CD"
              />

              {/* Password */}
              <View className="relative w-full mb-4">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  className={`w-full p-5 rounded-md ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-dark"
                      : "bg-custom-input-light text-custom-light"
                  }`}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor="#C7C7CD"
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <MaterialIcons
                    name={passwordVisible ? "visibility" : "visibility-off"}
                    size={24}
                    color={systemTheme === "dark" ? "#fff" : "#000"}
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View className="relative w-full mb-6">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  className={`w-full p-5 rounded-md ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-dark"
                      : "bg-custom-input-light text-custom-light"
                  }`}
                  placeholder="Confirm Password"
                  secureTextEntry={!confirmPasswordVisible}
                  placeholderTextColor="#C7C7CD"
                />
                <TouchableOpacity
                  onPress={toggleConfirmPasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <MaterialIcons
                    name={
                      confirmPasswordVisible ? "visibility" : "visibility-off"
                    }
                    size={24}
                    color={systemTheme === "dark" ? "#fff" : "#000"}
                  />
                </TouchableOpacity>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={handleSignUp}
                className="w-full bg-green-500 justify-center items-center mb-6 py-4 rounded-md"
              >
                <Text className="text-white text-base font-bold">
                  {loading ? "Signing Up..." : "Sign Up"}
                </Text>
              </TouchableOpacity>

              <Text
                className={`${
                  systemTheme === "dark"
                    ? "text-custom-dark"
                    : "text-custom-light"
                }`}
              >
                Already have an account?{" "}
                {/* Using router.push() instead of Link */}
                <Text onPress={() => router.back()} className="text-custom-green mt-5">Sign In</Text>{" "}
                {/* Text component added here */}
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
