import React, { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import iconsWhite from "@/constants/icons-white";

import { useNavigation, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { GlobalContext } from "@/context/GlobalProvider";
const Home = () => {
  const systemTheme = useColorScheme(); // Detect system theme
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0); // State to track selected category
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState("default"); // 'default', 'price-asc', 'price-desc'
  const [vegFilter, setVegFilter] = useState("all"); // 'all', 'veg', 'non-veg'
  const { menuData, setMenuData, cartData, setCartData } = useContext(GlobalContext);
  const router = useRouter();
  const navigation = useNavigation(); // Hook to access navigation

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
          {item.isIconUploaded === true && (
            <Image source={{ uri: item.icon }} className="w-10 h-10" />
          )}
          {item.isIconUploaded === false && (
            <Image source={item.icon} className="w-10 h-10" />
          )}
        </View>
        <Text
          className={`mt-2 w-24 truncate text-center font-bold text-lg ${getTextColor()}`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDishCard = (dish: {
    name: string;
    price: number;
    isVeg: boolean;
    image?: any;
    id: string;
  }) => {
    const styles = getDishCardStyles();

    function handleAddToCart(dish: { name: string; price: number; isVeg: boolean; image?: any; id: string; }) {
      const existingCartItem = cartData.find((item) => item.id === dish.id);
      if (existingCartItem) {
        setCartData(
          cartData.map((item) =>
            item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCartData([...cartData, { ...dish, quantity: 1 }]);
      }
    }

    return (
      <View
        style={[
          styles,
          { borderWidth: 1, borderRadius: 8, padding: 16, marginBottom: 16 },
        ]}
      >
        <View className="flex-row items-center">
          {/* {dish.image ? (
            <Image source={dish.image} className="w-16 h-16 rounded-md mr-4" />
          ) : (
            <View className="w-16 h-16 bg-black rounded-md justify-center items-center mr-4">
              <Text className="text-white">No Image</Text>
            </View>
          )} */}
          <View className="flex-1">
            <Text
              className={`font-bold text-lg ${
                systemTheme === "dark"
                  ? "text-custom-light"
                  : "text-custom-dark"
              }`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dish.name}
            </Text>
            <Text
              className={`text-base ${
                dish.isVeg ? "text-green-500" : "text-red-500"
              }`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              ₹ {dish.price}
            </Text>
          </View>
          {/* "+" Button */}
          <TouchableOpacity
            className={`w-10 h-10 rounded-full justify-center items-center ${
              systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
            }`}
            onPress={() => {
              handleAddToCart(dish);
            }
            }
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

  // Filter dishes based on search query, category, veg filter, and sort option
  const filteredDishes =
    menuData[selectedCategoryIndex]?.dishes
      ?.filter((dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      ?.filter((dish) => {
        if (vegFilter === "veg") return dish.isVeg;
        if (vegFilter === "non-veg") return !dish.isVeg;
        return true;
      })
      ?.sort((a, b) => {
        if (sortOption === "price-asc") {
          return a.price - b.price; // Direct numeric comparison
        }
        if (sortOption === "price-desc") {
          return b.price - a.price; // Direct numeric comparison
        }
        return 0; // Default order
      }) || [];

  return (
    <SafeAreaView
      className={`flex-1 ${
        systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
      }`}
    >
      <ScrollView>
        {/* Profile Section */}
        <View className="mx-5 mt-5 flex-row items-center mb-10">
          {/* Hamburger Icon (Material Icon) */}
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="mr-4"
          >
            <Text>
              <MaterialIcons
                name="menu"
                size={40}
                color={systemTheme === "dark" ? "#fff" : "#000"}
              />
            </Text>
          </TouchableOpacity>
          {/* <Image
            source={
              data.userData.userProfile
                ? { uri: data.userData.userProfile }
                : iconsColor.user
            }
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
              {data.userData.userName}
            </Text>
            <Text className="text-base font-bold text-lg text-zinc-400">
              {data.userData.userResturantName}
            </Text>
          </View> */}
          <TouchableOpacity
           className="flex-1"
            onPress={() => router.push("/configuration/configuration")}
          >
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
            className={`text-4xl mx-5 mb-2 font-bold ${
              systemTheme === "dark" ? "text-custom-light" : "text-custom-dark"
            }`}
          >
            Categories
          </Text>
          {menuData.length === 0 ? (
            <View className="h-40 border border-2 mt-5 mx-5 rounded-2xl border-gray-400 border-dashed">
              <Text className={`my-auto text-center ${getTextColor()}`}>
                No categories available.{"\n"}Click on edit icon to customize
                menu.
              </Text>
            </View>
          ) : (
            <FlatList
              className="p-5"
              data={menuData}
              horizontal
              renderItem={renderCategory}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* Menu Section */}
        <View className="m-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className={`text-4xl font-bold ${
                systemTheme === "dark"
                  ? "text-custom-light"
                  : "text-custom-dark"
              }`}
            >
              Menu
            </Text>

            {/* Search Bar */}
            <TextInput
              placeholder="Search for dishes..."
              placeholderTextColor={
                systemTheme === "dark" ? "#9ca3af" : "#6b7280"
              }
              value={searchQuery}
              onChangeText={setSearchQuery}
              className={`w-2/3 px-4 py-2 rounded-md ${
                systemTheme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            />
          </View>

          {/* Filters */}
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              className={`px-4 py-2 rounded-md ${
                vegFilter === "all"
                  ? systemTheme === "dark"
                    ? "bg-green-500"
                    : "bg-green-400"
                  : systemTheme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-400"
              }`}
              onPress={() => setVegFilter("all")}
            >
              <Text className="text-white">All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 rounded-md ${
                vegFilter === "veg"
                  ? systemTheme === "dark"
                    ? "bg-green-500"
                    : "bg-green-400"
                  : systemTheme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-400"
              }`}
              onPress={() => setVegFilter("veg")}
            >
              <Text className="text-white">Veg</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 rounded-md ${
                vegFilter === "non-veg"
                  ? systemTheme === "dark"
                    ? "bg-green-500"
                    : "bg-green-400"
                  : systemTheme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-400"
              }`}
              onPress={() => setVegFilter("non-veg")}
            >
              <Text className="text-white">Non-Veg</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 rounded-md ${
                sortOption === "price-asc"
                  ? systemTheme === "dark"
                    ? "bg-green-500"
                    : "bg-green-400"
                  : systemTheme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-400"
              }`}
              onPress={() => setSortOption("price-asc")}
            >
              <Text className="text-white">Price ↓</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 rounded-md ${
                sortOption === "price-desc"
                  ? systemTheme === "dark"
                    ? "bg-green-500"
                    : "bg-green-400"
                  : systemTheme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-400"
              }`}
              onPress={() => setSortOption("price-desc")}
            >
              <Text className="text-white">Price ↑</Text>
            </TouchableOpacity>
          </View>

          {/* Render Dishes */}
          {filteredDishes.length === 0 ? (
            <View className="h-40 border border-2 mt-5 rounded-2xl border-gray-400 border-dashed">
              <Text className={` my-auto text-center ${getTextColor()}`}>
                No menu available.{"\n"}Click on edit icon to customize menu.
              </Text>
            </View>
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
