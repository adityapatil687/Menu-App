import React, { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import iconsWhite from "@/constants/icons-white";
import data from "@/constants/data";
import iconsColor from "@/constants/icons-color";

const Home = () => {
  const systemTheme = useColorScheme(); // Detect system theme
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0); // State to track selected category

  const getBackgroundColor = (isActive: boolean) => {
    if (isActive) {
      return systemTheme === "dark" ? "bg-green-900" : "bg-green-200";
    }
    return "";
  };

  const getTextColor = () => {
    return systemTheme === "dark" ? "text-custom-light" : "text-gray-700";
  };

  const getDishCardStyles = () => ({
    backgroundColor: systemTheme === "dark" ? "#27272a" : "#f9fafb", // Tailwind dark:bg-gray-800 and light:bg-zinc-50
    borderColor: systemTheme === "dark" ? "#374151" : "#d1d5db", // Tailwind dark:border-gray-700 and light:border-gray-300
  });

  const renderCategory = ({ item, index }: { item: any; index: number }) => {
    const isActive = selectedCategoryIndex === index;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategoryIndex(index)}
        className={`w-30 h-40 p-5 rounded-3xl justify-center items-center ${getBackgroundColor(
          isActive
        )}`}
      >
        <View
          className={`rounded-full w-20 h-20 justify-center items-center ${
            systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
          }`}
        >
          <Image source={item.icon} className="w-10 h-10" />
        </View>
        <Text
          className={`mt-2 font-bold text-lg text-center ${getTextColor()}`}
        >
          {item.category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDishCard = (dish: {
    name: string;
    price: string;
    isVeg: boolean;
    image?: any;
    id: string;
  }) => {
    const styles = getDishCardStyles();

    return (
      <View
        style={[
          styles,
          { borderWidth: 1, borderRadius: 8, padding: 16, marginBottom: 16 },
        ]}
      >
        <View className="flex-row items-center">
          {dish.image ? (
            <Image source={dish.image} className="w-16 h-16 rounded-md mr-4" />
          ) : (
            <View className="w-16 h-16 bg-black rounded-md justify-center items-center mr-4">
              <Text className="text-white">No Image</Text>
            </View>
          )}
          <View className="flex-1">
            <Text
              className={`font-bold text-lg ${
                systemTheme === "dark"
                  ? "text-custom-light"
                  : "text-custom-dark"
              }`}
            >
              {dish.name}
            </Text>
            <Text
              className={`text-base ${
                dish.isVeg ? "text-green-500" : "text-red-500"
              }`}
            >
              {dish.price}
            </Text>
          </View>
          {/* "+" Button */}
          <TouchableOpacity
            className={`w-10 h-10 rounded-full justify-center items-center ${
              systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
            }`}
            onPress={() => console.log(`${dish.name} added to cart!`)}
          >
            <Text
              className={`text-white text-lg font-bold ${
                systemTheme === "dark" ? "text-green-200" : "text-green-900"
              }`}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Filter dishes based on the selected category
  const filteredDishes = data[selectedCategoryIndex]?.dishes || [];

  return (
    <SafeAreaView
      className={`flex-1 ${
        systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
      }`}
    >
      <ScrollView>
        {/* Profile Section */}
        <View className="m-5 flex-row items-center mb-10">
          <Image
            source={iconsColor.user}
            className="w-20 h-20 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text
              className={`text-3xl font-bold mb-1 ${
                systemTheme === "dark"
                  ? "text-custom-light"
                  : "text-custom-dark"
              }`}
            >
              Aditya Patil
            </Text>
            <Text className="text-base font-bold text-zinc-400">
              Manan Foods
            </Text>
          </View>
          <TouchableOpacity>
            <View
              className={`ml-auto rounded-full p-3 ${
                systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
              }`}
            >
              <Image source={iconsWhite.edit} className="w-8 h-8" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View>
          <Text
            className={`text-4xl m-5 font-bold ${
              systemTheme === "dark" ? "text-custom-light" : "text-custom-dark"
            }`}
          >
            Categories
          </Text>
          {data.length === 0 ? (
            <Text className={`text-center ${getTextColor()}`}>
              No categories available.{"\n"}Click on edit icon to customize menu.
            </Text>
          ) : (
            <FlatList
              className="p-5"
              data={data}
              horizontal
              renderItem={renderCategory}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* Menu Section */}
        <View className="m-5">
          <Text
            className={`text-4xl font-bold mb-10 ${
              systemTheme === "dark" ? "text-custom-light" : "text-custom-dark"
            }`}
          >
            Menu
          </Text>
          {filteredDishes.length === 0 ? (
            <Text className={`text-center ${getTextColor()}`}>
              No dishes available in this category.{"\n"}Click on edit icon to customize menu.
            </Text>
          ) : (
            filteredDishes.map((dish) => (
              <View key={dish.id}>{renderDishCard(dish)}</View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

