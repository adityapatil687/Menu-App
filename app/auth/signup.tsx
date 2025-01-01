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
  KeyboardTypeOptions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Image picker for profile picture
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router"; // Use Expo Router's useRouter hook

const SignUp = () => {
  const systemTheme = useColorScheme(); // Detect system theme (either 'light' or 'dark')

  // State to manage user input, visibility, and focus
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password state
  const [passwordVisible, setPasswordVisible] = useState(false); // Visibility for password
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Visibility for confirm password
  const [profilePic, setProfilePic] = useState(""); // Store profile picture
  const [loading, setLoading] = useState(false);

  // Focus state for borders
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const router = useRouter(); // Initialize Expo Router's useRouter hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  // Profile picture picker
  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        // Validate image size
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const fileSizeInBytes = (base64Image.length * 3) / 4; // Approximation
        if (fileSizeInBytes > 750000) {
          alert("Please select an image smaller than 750 KB.");
        } else {
          setProfilePic(imageUri);
        }
      } else {
        alert("No image selected.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("An error occurred while picking the image.");
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
    setTimeout(() => {
      setLoading(false);
      alert("Signed up successfully!");
      router.back();
    }, 2000);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
      }`}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View className="flex-1 justify-center items-center">
              <Text
                className={`text-3xl font-bold mb-5 ${
                  systemTheme === "light"
                    ? "text-custom-dark"
                    : "text-custom-light"
                }`}
              >
                Sign Up
              </Text>

              {/* Profile Picture */}
              <TouchableOpacity
                onPress={handleImagePick}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  marginBottom: 20,
                  backgroundColor: systemTheme === "dark" ? "#27272a" : "#f4f4f5",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#d1d5db", // Gray border
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

              {[ 
                { label: "First Name", value: firstName, setter: setFirstName },
                { label: "Last Name", value: lastName, setter: setLastName },
                { label: "Restaurant Name", value: restaurantName, setter: setRestaurantName },
                { label: "Email", value: email, setter: setEmail },
                { label: "Phone Number", value: phoneNumber, setter: setPhoneNumber, keyboardType: "phone-pad" }
              ].map((field, index) => (
                <TextInput
                  key={index}
                  value={field.value}
                  onChangeText={field.setter}
                  onFocus={() => setFocusedField(field.label)}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-5 rounded-md mb-4 ${
                    focusedField === field.label
                      ? "border-2 border-green-500"
                      : "border border-gray-400" // Gray border when not focused
                  } ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-light"
                      : "bg-custom-input-light text-custom-dark"
                  }`}
                  placeholder={field.label}
                  keyboardType={field.keyboardType as KeyboardTypeOptions || "default"}
                  placeholderTextColor="#C7C7CD"
                />
              ))}

              {/* Password Input */}
              <View className="relative w-full mb-4">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("Password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-5 rounded-md ${
                    focusedField === "Password"
                      ? "border-2 border-green-500"
                      : "border border-gray-400" // Gray border when not focused
                  } ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-light"
                      : "bg-custom-input-light text-custom-dark"
                  }`}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor="#C7C7CD"
                />
                {password.length > 0 && ( // Only show eye icon when data is entered
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
                )}
              </View>

              {/* Confirm Password Input */}
              <View className="relative w-full mb-4">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField("Confirm Password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-5 rounded-md ${
                    focusedField === "Confirm Password"
                      ? "border-2 border-green-500"
                      : "border border-gray-400" // Gray border when not focused
                  } ${
                    systemTheme === "dark"
                      ? "bg-custom-input-dark text-custom-light"
                      : "bg-custom-input-light text-custom-dark"
                  }`}
                  placeholder="Confirm Password"
                  secureTextEntry={!confirmPasswordVisible}
                  placeholderTextColor="#C7C7CD"
                />
                {confirmPassword.length > 0 && ( // Only show eye icon when data is entered
                  <TouchableOpacity
                    onPress={toggleConfirmPasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <MaterialIcons
                      name={confirmPasswordVisible ? "visibility" : "visibility-off"}
                      size={24}
                      color={systemTheme === "dark" ? "#fff" : "#000"}
                    />
                  </TouchableOpacity>
                )}
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
                    ? "text-custom-light"
                    : "text-custom-dark"
                }`}
              >
                Already have an account?{" "}
                <Text
                  onPress={() => router.back()}
                  className="text-custom-green"
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
