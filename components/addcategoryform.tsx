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
import data from "@/constants/data";

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

  // Function to handle adding a new category
  const handleAddCategory = () => {
    if (!categoryName || !categoryIcon) {
      Alert.alert(
        "Missing Information",
        "Please provide a category name and an icon."
      );
      return;
    }

    const newCategory = {
      id: categoryName.toLowerCase().replace(/\s+/g, "_"), // Generate unique ID
      category: categoryName,
      icon: categoryIcon, // Use selected icon URI
      dishes: [], // Start with an empty dishes array
    };

    // Add the new category to menuData
    data.menuData.push(newCategory);

    // Notify user and close modal
    Alert.alert("Category Added", `Category: ${categoryName}`);
    closeModal();
  };

  return (
    <View
      className={`w-full px-6 py-8 rounded-lg shadow-md ${
        systemTheme === "dark" ? "bg-neutral-800" : "bg-neutral-50"
      }`}
    >
      {/* Category Icon Upload (Top) */}
      <TouchableOpacity
        onPress={handleImagePick}
        className={`w-40 h-40 bg-green-500 rounded-full justify-center items-center self-center`}
      >
        {categoryIcon ? (
          <Image source={{ uri: categoryIcon }} className="w-20 h-20" />
        ) : (
          <Text
            className={`${
              systemTheme === "dark" ? "text-white" : "text-white"
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
            : "border border-gray-400"
        } ${
          systemTheme === "dark"
            ? "bg-custom-input-dark text-custom-light"
            : "bg-custom-input-light text-custom-dark"
        }`}
      />

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleAddCategory}
        className={`mt-3 py-3 rounded-md justify-center items-center bg-green-500`}
      >
        <Text className="text-white text-xl font-bold">Add Category</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={closeModal}
        className={`mt-3 py-3 rounded-md justify-center items-center bg-red-500`}
      >
        <Text className="text-white text-xl font-bold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategoryForm;

