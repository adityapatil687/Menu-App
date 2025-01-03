import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useColorScheme } from "react-native"; // Detect system theme
import * as ImagePicker from "expo-image-picker"; // Image picker for icon
import * as FileSystem from "expo-file-system"; // To check image size

const AddCategoryForm = ({ closeModal }: { closeModal: () => void }) => {
  const systemTheme = useColorScheme(); // Get system theme (dark or light)
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [categoryIcon, setCategoryIcon] = useState<string | null>(null); // State for the category icon
  const [focusedField, setFocusedField] = useState<string | null>(null); // State for tracking the focused field

  // Function to handle the image picker for category icon
  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        // Validate image file type and size
        const fileExtension = imageUri.split(".").pop()?.toLowerCase();
        if (fileExtension !== "png") {
          Alert.alert("Invalid file type", "Please upload a PNG image.");
          return;
        }

        // Check image size (less than 64 KB)
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const fileSizeInBytes = (base64Image.length * 3) / 4; // Approximate size in bytes
        if (fileSizeInBytes > 64000) {
          Alert.alert(
            "File size too large",
            "Please upload an image smaller than 64 KB."
          );
          return;
        }

        setCategoryIcon(imageUri);
      } else {
        Alert.alert("No image selected", "Please select an image.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "An error occurred while selecting the image.");
    }
  };

  return (
    <View
      className={`w-full px-6 py-8 rounded-lg border shadow-md ${
        systemTheme === "dark"
          ? "bg-neutral-800 border-gray-700"
          : "bg-neutral-50 border-gray-400"
      }`}
    >
      {/* Category Icon Upload (Top) */}
      <TouchableOpacity
        onPress={handleImagePick}
        className={`w-30 h-30 p-10 rounded-full border-2 ${
          systemTheme === "dark"
            ? "border-white bg-neutral-900"
            : "border-black bg-neutral-50"
        } justify-center items-center  self-center`}
      >
        {categoryIcon ? (
          <Image
            source={{ uri: categoryIcon }}
            className="w-30 h-30 rounded-xl"
          />
        ) : (
          <Text
            className={`${
              systemTheme === "dark" ? "text-white" : "text-black"
            } text-center text-lg font-medium`}
          >
            Upload{"\n"}Icon
          </Text>
        )}
      </TouchableOpacity>

      {/* Category Name Input */}
      <TextInput
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="Enter category name"
        placeholderTextColor="#C7C7CD" // Placeholder color
        onFocus={() => setFocusedField("categoryName")}
        onBlur={() => setFocusedField(null)}
        className={`w-full p-5 rounded-md mt-7 ${
          focusedField === "categoryName"
            ? "border-2 border-green-500"
            : "border border-gray-400" // Gray border when not focused
        } ${
          systemTheme === "dark"
            ? "bg-custom-input-dark text-custom-light"
            : "bg-custom-input-light text-custom-dark"
        }`}
      />

      {/* Submit Button */}
      <TouchableOpacity
        onPress={() => {
          if (!categoryName || !categoryIcon) {
            Alert.alert(
              "Missing Information",
              "Please provide a category name and an icon."
            );
            return;
          }
          // Proceed to submit the form (e.g., save category)
          Alert.alert("Category Added", `Category: ${categoryName}`);
        }}
        className={`mt-3 py-3 rounded-md justify-center items-center ${
          systemTheme === "dark" ? "bg-green-500" : "bg-green-500"
        }`}
      >
        <Text className="text-white text-xl font-bold">Add Category</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          closeModal()
        }}
        className={`mt-3 py-3 rounded-md justify-center items-center ${
          systemTheme === "dark" ? "bg-red-500" : "bg-red-500"
        }`}
      >
        <Text className="text-white text-xl font-bold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategoryForm;
