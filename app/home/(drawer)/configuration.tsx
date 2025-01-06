import React, { useState, useContext } from "react";
import {
  View,
  Text,
  useColorScheme,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "@/context/GlobalProvider";
import iconsWhite from "@/constants/icons-white";
import { MaterialIcons } from "@expo/vector-icons";
import AddCategoryForm from "@/components/addCategoryform";
import AddDishForm from "@/components/addDishForm";

const Configuration = () => {
  const systemTheme = useColorScheme(); // Detect system theme
  const { menuData, setMenuData } = useContext(GlobalContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0); // State to track selected category
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState("default"); // 'default', 'price-asc', 'price-desc'
  const [vegFilter, setVegFilter] = useState("all"); // 'all', 'veg', 'non-veg'
  const [modalVisible, setModalVisible] = useState(false);
  const [isCategoryPressed, setIsCategoryPressed] = useState(false);
  const [isAddDishPressed, setIsAddDishPressed] = useState(false);
  const [isEditDishPressed, setIsEditDishPressed] = useState(false);
  const [editDishData, setEditDishData] = useState({
    id: "",
    name: "",
    price: 0,
    isVeg: true,
  });

  const handleDeleteCategory = (categoryIndex: number) => {
    const updatedMenuData = [...menuData];
    updatedMenuData.splice(categoryIndex, 1);
    setMenuData(updatedMenuData); // Update the data menu

    // Reset selected category index if it's deleted
    if (selectedCategoryIndex === categoryIndex) {
      setSelectedCategoryIndex(0);
    }
  };

  const handleDeleteDish = (categoryIndex: number, dishId: string) => {
    const updatedMenuData = [...menuData];
    updatedMenuData[categoryIndex].dishes = updatedMenuData[categoryIndex].dishes.filter(dish => dish.id !== dishId);
    setMenuData(updatedMenuData);
  };

  const getBackgroundColor = (isActive: boolean) => {
    return isActive
      ? systemTheme === "dark"
        ? "bg-green-900"
        : "bg-green-200"
      : "";
  };

  const getTextColor = () => {
    return systemTheme === "dark" ? "text-custom-light" : "text-gray-700";
  };

  const getDishCardStyles = () => ({
    backgroundColor: systemTheme === "dark" ? "#27272a" : "#f9fafb",
    borderColor: systemTheme === "dark" ? "#374151" : "#d1d5db",
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
        <View className="relative">
          <View
            className={`rounded-full w-20 h-20 justify-center items-center ${
              systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
            }`}
          >
            {item.isIconUploaded === true && (
              <Image source={{ uri: item.icon }} className="w-10 h-10" />
            ) }
            {item.isIconUploaded === false && (
              <Image source={item.icon} className="w-10 h-10" />
            ) }
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteCategory(index)}
            className="absolute top-0 right-0 w-6 h-6 flex justify-center items-center bg-red-500 rounded-full"
          >
            <Text className="text-white font-bold text-sm">X</Text>
          </TouchableOpacity>
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

  const renderDishCard = (dish: { id: any; name: any; price: any; isVeg: any; }) => {
    const styles = getDishCardStyles();
    return (
      <View
        style={[
          styles,
          { borderWidth: 1, borderRadius: 8, padding: 16, marginBottom: 16 },
        ]}
      >
        <View className="flex-row items-center">
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
          <TouchableOpacity
            className={`w-10 h-10 rounded-full me-2 justify-center items-center ${
              systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
            }`}
            onPress={() => {
              setEditDishData({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                isVeg: dish.isVeg,
              });
              setModalVisible(true);
              setIsEditDishPressed(true);
            }}
          >
            <Image source={iconsWhite.edit} className="w-4 h-4" />
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-10 h-10 rounded-full justify-center items-center ${
              systemTheme === "dark" ? "bg-red-500" : "bg-red-500"
            }`}
            onPress={() => handleDeleteDish(selectedCategoryIndex, dish.id)}
          >
            <Text className="text-white text-lg font-bold">
              <MaterialIcons name="delete" size={16} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    setIsCategoryPressed(false);
    setIsAddDishPressed(false);
    setIsEditDishPressed(false);
  };

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
          return a.price - b.price;
        }
        if (sortOption === "price-desc") {
          return b.price - a.price;
        }
        return 0;
      }) || [];

  return (
    <>
      {isCategoryPressed && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="my-auto">
              <View className="p-5 rounded-lg">
                <AddCategoryForm closeModal={closeModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {isAddDishPressed && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="my-auto">
              <View className="p-5 rounded-lg">
                <AddDishForm
                  closeModal={closeModal}
                  activeCategory={menuData[selectedCategoryIndex]?.category}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {isEditDishPressed && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="my-auto">
              <View className="p-5 rounded-lg">
                <AddDishForm
                  closeModal={closeModal}
                  activeCategory={menuData[selectedCategoryIndex]?.category}
                  isEditDishPressed={isEditDishPressed}
                  editDishData={editDishData}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <SafeAreaView
        className={`flex-1 ${
          systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
        }`}
      >
        <ScrollView
          style={{
            opacity: modalVisible ? 0.3 : 1,
          }}
        >
          <View>
            <Text
              className={`text-4xl mx-5 mt-5 mb-4 font-bold ${
                systemTheme === "dark" ? "text-custom-light" : "text-custom-dark"
              }`}
            >
              Configure
            </Text>
            {menuData.length === 0 ? (
              <View className="h-40 border border-2 mt-5 mx-5 rounded-2xl border-gray-400 border-dashed">
                <Text className={`my-auto text-center ${getTextColor()}`}>
                  No categories available.
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

          <View className="m-5">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                className={`flex-1 px-4 py-3 rounded-md border border-dashed ${
                  systemTheme === "dark" ? "border-gray-50" : "border-gray-950"
                }`}
                onPress={() => {
                  setIsCategoryPressed(true);
                  setModalVisible(true);
                }}
              >
                <Text
                  className={`text-center text-lg font-bold ${
                    systemTheme === "dark"
                      ? "text-custom-light"
                      : "text-custom-dark"
                  }`}
                >
                  Add Category
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                className={`flex-1 px-4 py-3 rounded-md border border-dashed ${
                  systemTheme === "dark" ? "border-gray-50" : "border-gray-950"
                }`}
                onPress={() => {
                  setIsAddDishPressed(true);
                  setModalVisible(true);
                }}
              >
                <Text
                  className={`text-center text-lg font-bold ${
                    systemTheme === "dark"
                      ? "text-custom-light"
                      : "text-custom-dark"
                  }`}
                >
                  Add Dish
                </Text>
              </TouchableOpacity>
            </View>
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

            {filteredDishes.length === 0 ? (
              <View className="h-40 border border-2 mt-5 rounded-2xl border-gray-400 border-dashed">
                <Text className={` my-auto text-center ${getTextColor()}`}>
                  No menu available
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
    </>
  );
};

export default Configuration;