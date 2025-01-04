import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert, Switch } from "react-native";
import { useColorScheme } from "react-native"; // Detect system theme
import data from "@/constants/data";

const AddDishForm = ({
  closeModal,
  activeCategory,
}: {
  closeModal: () => void;
  activeCategory: string;
}) => {
  const systemTheme = useColorScheme(); // Get system theme (dark or light)
  const [dishName, setDishName] = useState(""); // State for dish name
  const [dishPrice, setDishPrice] = useState(""); // State for dish price
  const [isVeg, setIsVeg] = useState<boolean>(true); // State for dish type (Veg or Non-Veg)
  const [focusedField, setFocusedField] = useState<string | null>(null); // State for tracking the focused field

  // Function to handle adding a new dish
  const handleAddDish = () => {
    if (!dishName || !dishPrice) {
      Alert.alert(
        "Missing Information",
        "Please provide a dish name and price."
      );
      return;
    }

    const priceValue = parseFloat(dishPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert(
        "Invalid Price",
        "Please enter a valid price greater than 0."
      );
      return;
    }

    const newDish = {
      id: dishName.toLowerCase().replace(/\s+/g, "_"), // Generate unique ID
      name: dishName,
      price: priceValue, // Dish price
      isVeg, // Use the value from the Switch (true for Veg, false for Non-Veg)
    };

    // Find the active category based on its name
    const categoryIndex = data.menuData.findIndex(
      (category) => category.category === activeCategory
    ); // Use activeCategory instead of a hardcoded ID

    if (categoryIndex !== -1) {
      // Add the new dish to the dishes array of the active category
      data.menuData[categoryIndex].dishes.push(newDish);
    } else {
      Alert.alert("Category Not Found", "Please select a valid category.");
      return;
    }

    // Notify user and close modal
    Alert.alert("Dish Added", `Dish: ${dishName} for ₹${dishPrice}`);
    closeModal();
  };

  return (
    <View
      className={`w-full px-6 py-8 rounded-lg shadow-md ${
        systemTheme === "dark" ? "bg-neutral-800" : "bg-neutral-50"
      }`}
    >
      {/* Dish Name Input */}
      <TextInput
        value={dishName}
        onChangeText={setDishName}
        placeholder="Enter dish name"
        placeholderTextColor="#C7C7CD" // Placeholder color
        onFocus={() => setFocusedField("dishName")}
        onBlur={() => setFocusedField(null)}
        className={`w-full p-5 rounded-md mt-7 ${
          focusedField === "dishName"
            ? "border-2 border-green-500"
            : "border border-gray-400"
        } ${
          systemTheme === "dark"
            ? "bg-custom-input-dark text-custom-light"
            : "bg-custom-input-light text-custom-dark"
        }`}
      />

      {/* Dish Price Input */}
      <TextInput
        value={dishPrice}
        onChangeText={setDishPrice}
        placeholder="Enter dish price"
        placeholderTextColor="#C7C7CD" // Placeholder color
        keyboardType="numeric" // For numeric input
        onFocus={() => setFocusedField("dishPrice")}
        onBlur={() => setFocusedField(null)}
        className={`w-full p-5 rounded-md mt-7 ${
          focusedField === "dishPrice"
            ? "border-2 border-green-500"
            : "border border-gray-400"
        } ${
          systemTheme === "dark"
            ? "bg-custom-input-dark text-custom-light"
            : "bg-custom-input-light text-custom-dark"
        }`}
      />

      {/* Veg/Non-Veg Toggle Switch */}
      <View className="flex-row justify-between items-center mt-7">
        <Text className={`text-lg ${systemTheme === "dark" ? "text-white" : "text-black"}`}>
          {isVeg ? "Veg" : "Non-Veg"}
        </Text>
        <Switch
          value={isVeg}
          onValueChange={setIsVeg}
          trackColor={{ false: "#ef4444", true: "#22c55e" }}
          thumbColor={isVeg ? "#FFFFFF" : "#FFFFFF"}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleAddDish}
        className={`mt-3 py-3 rounded-md justify-center items-center bg-green-500`}
      >
        <Text className="text-white text-xl font-bold">Add Dish</Text>
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity
        onPress={closeModal}
        className={`mt-3 py-3 rounded-md justify-center items-center bg-red-500`}
      >
        <Text className="text-white text-xl font-bold">Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDishForm;
