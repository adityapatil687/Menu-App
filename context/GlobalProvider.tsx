import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iconsWhite from "@/constants/icons-white";

const dummyMenuData = [
  {
    id: "starters",
    category: "Starters",
    icon: iconsWhite.starters,
    dishes: [
      { id: "masala_papad", name: "Masala Papad", price: 30, isVeg: true },
      { id: "samosa", name: "Samosa", price: 40, isVeg: true },
      { id: "paneer_tikka", name: "Paneer Tikka", price: 120, isVeg: true },
      { id: "aloo_tikki", name: "Aloo Tikki", price: 50, isVeg: true }
    ]
  },
  {
    id: "main_course",
    category: "Main Course",
    icon: iconsWhite.main_course,
    dishes: [
      { id: "butter_paneer", name: "Butter Paneer", price: 300, isVeg: true },
      { id: "dal_makhani", name: "Dal Makhani", price: 180, isVeg: true },
      { id: "palak_paneer", name: "Palak Paneer", price: 220, isVeg: true },
      { id: "chicken_curry", name: "Chicken Curry", price: 350, isVeg: false },
      { id: "biryani", name: "Biryani", price: 250, isVeg: false }
    ]
  },
  {
    id: "desserts",
    category: "Desserts",
    icon: iconsWhite.dessert,
    dishes: [
      { id: "gulab_jamun", name: "Gulab Jamun", price: 60, isVeg: true },
      { id: "rasgulla", name: "Rasgulla", price: 50, isVeg: true },
      { id: "jalebi", name: "Jalebi", price: 40, isVeg: true },
      { id: "ice_cream", name: "Ice-Cream", price: 30, isVeg: true }
    ]
  },
  {
    id: "beverages",
    category: "Beverages",
    icon: iconsWhite.beverages,
    dishes: [
      { id: "water_bottle", name: "Water Bottle", price: 20, isVeg: true },
      { id: "masala_chai", name: "Masala Chai", price: 30, isVeg: true },
      { id: "lassi", name: "Lassi", price: 80, isVeg: true },
      { id: "cold_drink", name: "Cold Drink", price: 40, isVeg: true },
      { id: "jaljeera", name: "Jaljeera", price: 35, isVeg: true }
    ]
  }
];

export const GlobalContext = createContext<{
  menuData: MenuCategory[];
  setMenuData: (data: MenuCategory[]) => void;
}>({
  menuData: [],
  setMenuData: () => {}
});

import { ReactNode } from 'react';

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
  dishes: Dish[];
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);

  useEffect(() => {
    const loadMenuData = async () => {
      const storedMenuData = await AsyncStorage.getItem('menuData');
      if (storedMenuData) {
        setMenuData(JSON.parse(storedMenuData));
      } else {
        setMenuData(dummyMenuData);
        await AsyncStorage.setItem('menuData', JSON.stringify(dummyMenuData));
      }
    };
    loadMenuData();
  }, []);

  const saveMenuData = async (data: React.SetStateAction<MenuCategory[]>) => {
    setMenuData(data);
    await AsyncStorage.setItem('menuData', JSON.stringify(data));
  };

  return (
    <GlobalContext.Provider value={{ menuData, setMenuData: saveMenuData }}>
      {children}
    </GlobalContext.Provider>
  );
};