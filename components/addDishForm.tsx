import React, { useContext, useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { useColorScheme } from "react-native";
import data from "@/constants/data";
import { GlobalContext } from "@/context/GlobalProvider";

const AddDishForm = ({
  closeModal,
  activeCategory,
  isEditDishPressed,
  editDishData,
}: {
  closeModal: () => void;
  activeCategory: string;
  isEditDishPressed?: boolean;
  editDishData?: {id: string, name: string; price: number; isVeg: boolean }; // Pass dish data when editing
}) => {
  const systemTheme = useColorScheme(); // Get system theme (dark or light)
  const [dishName, setDishName] = useState(""); // State for dish name
  const [dishPrice, setDishPrice] = useState<number>(0); // State for dish price (number)
  const [isVeg, setIsVeg] = useState<boolean>(true); // State for dish type (Veg or Non-Veg)
  const [focusedField, setFocusedField] = useState<string | null>(null); // State for tracking the focused field
  const { menuData, setMenuData } = useContext(GlobalContext); // Access context value
  // Populate form fields if editing
  useEffect(() => {
    if (isEditDishPressed && editDishData) {
      setDishName(editDishData.name);
      setDishPrice(editDishData.price);
      setIsVeg(editDishData.isVeg);
    }
  }, [isEditDishPressed, editDishData]);

  // Function to handle adding or editing a dish
  const handleAddOrEditDish = () => {
    if (!dishName || dishPrice <= 0) {
      Alert.alert("Missing Information", "Please provide a dish name and a valid price.");
      return;
    }

    const newDish = {
      id: dishName.toLowerCase().replace(/\s+/g, "_"), // Generate unique ID
      name: dishName,
      price: dishPrice, // Dish price
      isVeg, // Use the value from the Switch (true for Veg, false for Non-Veg)
    };

    const categoryIndex = menuData.findIndex(
      (category) => category.category === activeCategory
    );

    if (categoryIndex !== -1) {
      if (isEditDishPressed) {
        // Edit existing dish
        const dishIndex = menuData[categoryIndex].dishes.findIndex(
          (dish) => dish.name === editDishData?.name
        );

        if (dishIndex !== -1) {
          menuData[categoryIndex].dishes[dishIndex] = newDish;
          Alert.alert("Dish Updated", `Dish: ${dishName} updated successfully.`);
        } else {
          Alert.alert("Dish Not Found", "Dish to edit was not found.");
          return;
        }
      } else {
        // Add new dish
        menuData[categoryIndex].dishes.push(newDish);
        Alert.alert("Dish Added", `Dish: ${dishName} for ₹${dishPrice}`);
      }
    } else {
      Alert.alert("Category Not Found", "Please select a valid category.");
      return;
    }

    closeModal();
  };

  return (
    <View
      className={`w-full px-6 py-8 rounded-lg shadow-md ${systemTheme === "dark" ? "bg-neutral-800" : "bg-neutral-50"}`}
    >
      {/* Dish Name Input */}
      <TextInput
        value={dishName}
        onChangeText={setDishName}
        placeholder="Enter dish name"
        placeholderTextColor="#C7C7CD"
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
        value={dishPrice.toString()}
        onChangeText={(text) => setDishPrice(Number(text))}
        placeholder="Enter dish price"
        placeholderTextColor="#C7C7CD"
        keyboardType="numeric"
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
        onPress={handleAddOrEditDish}
        className={`mt-3 py-3 rounded-md justify-center items-center bg-green-500`}
      >
        <Text className="text-white text-xl font-bold">
          {isEditDishPressed ? "Update Dish" : "Add Dish"}
        </Text>
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
