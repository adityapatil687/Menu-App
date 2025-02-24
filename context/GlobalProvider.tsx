import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import iconsWhite from "@/constants/icons-white";

const dummyMenuData = [
  {
    id: "starters",
    category: "Starters",
    icon: iconsWhite.starters,
    isIconUploaded: false,
    dishes: [
      { id: "masala_papad", name: "Masala Papad", price: 30, isVeg: true },
      { id: "samosa", name: "Samosa", price: 40, isVeg: true },
      { id: "paneer_tikka", name: "Paneer Tikka", price: 120, isVeg: true },
      { id: "aloo_tikki", name: "Aloo Tikki", price: 50, isVeg: true },
    ],
  },
  {
    id: "main_course",
    category: "Main Course",
    icon: iconsWhite.main_course,
    isIconUploaded: false,
    dishes: [
      { id: "butter_paneer", name: "Butter Paneer", price: 300, isVeg: true },
      { id: "dal_makhani", name: "Dal Makhani", price: 180, isVeg: true },
      { id: "palak_paneer", name: "Palak Paneer", price: 220, isVeg: true },
      { id: "chicken_curry", name: "Chicken Curry", price: 350, isVeg: false },
      { id: "biryani", name: "Biryani", price: 250, isVeg: false },
    ],
  },
  {
    id: "desserts",
    category: "Desserts",
    icon: iconsWhite.dessert,
    isIconUploaded: false,
    dishes: [
      { id: "gulab_jamun", name: "Gulab Jamun", price: 60, isVeg: true },
      { id: "rasgulla", name: "Rasgulla", price: 50, isVeg: true },
      { id: "jalebi", name: "Jalebi", price: 40, isVeg: true },
      { id: "ice_cream", name: "Ice-Cream", price: 30, isVeg: true },
    ],
  },
  {
    id: "beverages",
    category: "Beverages",
    icon: iconsWhite.beverages,
    isIconUploaded: false,
    dishes: [
      { id: "water_bottle", name: "Water Bottle", price: 20, isVeg: true },
      { id: "masala_chai", name: "Masala Chai", price: 30, isVeg: true },
      { id: "lassi", name: "Lassi", price: 80, isVeg: true },
      { id: "cold_drink", name: "Cold Drink", price: 40, isVeg: true },
      { id: "jaljeera", name: "Jaljeera", price: 35, isVeg: true },
    ],
  },
];

const dummyCartData: CartItem[] = [];

export const GlobalContext = createContext<{
  menuData: MenuCategory[];
  setMenuData: (data: MenuCategory[]) => void;
  cartData: CartItem[];
  setCartData: (data: CartItem[]) => void;
}>( {
  menuData: [],
  setMenuData: () => {},
  cartData: [],
  setCartData: () => {},
});

type Dish = {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
};

type MenuCategory = {
  id: string;
  category: string;
  icon: any;
  isIconUploaded: boolean;
  dishes: Dish[];
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  quantity: number;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [cartData, setCartData] = useState<CartItem[]>([]);

  // Load data from AsyncStorage when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedMenuData = await AsyncStorage.getItem("MenuData");
        const storedCartData = await AsyncStorage.getItem("CartData");

        if (storedMenuData) {
          setMenuData(JSON.parse(storedMenuData));
        } else {
          // If no menuData is stored, set the dummy data
          setMenuData(dummyMenuData);
        }

        if (storedCartData) {
          setCartData(JSON.parse(storedCartData));
        } else {
          // If no cartData is stored, set the dummy data
          setCartData(dummyCartData);
        }
      } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
      }
    };

    loadData();
  }, []);

  // Save menuData and cartData to AsyncStorage when they change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("MenuData", JSON.stringify(menuData));
        await AsyncStorage.setItem("CartData", JSON.stringify(cartData));
      } catch (error) {
        console.error("Failed to save data to AsyncStorage", error);
      }
    };

    saveData();
  }, [menuData, cartData]);

  return (
    <GlobalContext.Provider value={{ menuData, setMenuData, cartData, setCartData }}>
      {children}
    </GlobalContext.Provider>
  );
};
