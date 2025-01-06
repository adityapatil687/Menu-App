import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { GlobalContext } from "@/context/GlobalProvider";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { cartData, setCartData } = useContext(GlobalContext);
  const systemTheme = useColorScheme(); // Detect system theme
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    cartData.reduce((acc: { [key: string]: number }, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  useEffect(() => {
    // Update quantities when cartData changes
    setQuantities(
      cartData.reduce((acc: { [key: string]: number }, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {})
    );
  }, [cartData]);
  // Calculate total price
  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleIncreaseQuantity = (itemId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
    const updatedCart = cartData.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartData(updatedCart);
  };

  const handleDecreaseQuantity = (itemId: string) => {
    if (quantities[itemId] === 1) {
      handleRemoveItem(itemId);
    } else {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
      const updatedCart = cartData.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartData(updatedCart);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartData.filter((item) => item.id !== itemId);
    setCartData(updatedCart);
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const getTextColor = () => {
    return systemTheme === "dark" ? "text-custom-light" : "text-gray-700";
  };

  const getDishCardStyles = () => ({
    backgroundColor: systemTheme === "dark" ? "#27272a" : "#f9fafb", // Tailwind dark:bg-gray-800 and light:bg-zinc-50
    borderColor: systemTheme === "dark" ? "#374151" : "#d1d5db", // Tailwind dark:border-gray-700 and light:border-gray-300
  });

  const styles = getDishCardStyles();

  return (
    <SafeAreaView
      className={`flex-1 ${
        systemTheme === "dark" ? "bg-custom-dark" : "bg-custom-light"
      }`}
    >
      <ScrollView>
        <View className="mx-5 mt-5">
          <Text
            className={`text-4xl mb-5 font-bold ${
              systemTheme === "dark" ? "text-custom-light" : "text-custom-dark"
            }`}
          >
            Cart
          </Text>
          {cartData.length === 0 ? (
            <View className="h-40 border border-2 mt-5 rounded-2xl border-gray-400 border-dashed">
              <Text className={`my-auto text-center ${getTextColor()}`}>
                No items in the cart.
              </Text>
            </View>
          ) : (
            cartData.map((dish) => (
              <View
                key={dish.id}
                style={[
                  styles,
                  {
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 16,
                  },
                ]}
                className={`flex-row items-center justify-between p-5 border-b ${
                  systemTheme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
              >
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
                <View className="flex-row items-center justify-center">
                  <TouchableOpacity
                    className={`w-10 h-10 rounded-full justify-center items-center ${
                      systemTheme === "dark" ? "bg-red-500" : "bg-red-500"
                    }`}
                    onPress={() => handleDecreaseQuantity(dish.id)}
                  >
                    <Text className="text-white text-lg font-bold">-</Text>
                  </TouchableOpacity>
                  <Text
                    className={`mx-4 text-lg font-bold text-center ${
                      systemTheme === "dark"
                        ? "text-custom-light"
                        : "text-custom-dark"
                    }`}
                  >
                    {quantities[dish.id]}
                  </Text>
                  <TouchableOpacity
                    className={`w-10 h-10 rounded-full justify-center items-center ${
                      systemTheme === "dark" ? "bg-green-500" : "bg-green-400"
                    }`}
                    onPress={() => handleIncreaseQuantity(dish.id)}
                  >
                    <Text className="text-white text-lg font-bold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Total */}
      {cartData.length > 0 && (
        <View
          className={`absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-5 py-7 ${
            systemTheme === "dark" ? "bg-custom-input-dark" : "bg-gray-200"
          }`}
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: -1 },
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text
            className={`text-xl font-bold ${
              systemTheme === "dark" ? "text-custom-light" : "text-custom-dark"
            }`}
          >
            Total: ₹ {calculateTotal()}
          </Text>
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-lg"
            onPress={() => {
              console.log("Printing bill...");
              // Add your "Print Bill" logic here
            }}
          >
            <Text className="text-white text-xl font-bold">Print Bill</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
