import React, { createContext, useState, useEffect, ReactNode } from 'react';
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
      { id: "aloo_tikki", name: "Aloo Tikki", price: 50, isVeg: true }
    ]
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
      { id: "biryani", name: "Biryani", price: 250, isVeg: false }
    ]
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
      { id: "ice_cream", name: "Ice-Cream", price: 30, isVeg: true }
    ]
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
  const [menuData, setMenuData] = useState<MenuCategory[]>(dummyMenuData);

  return (
    <GlobalContext.Provider value={{ menuData, setMenuData }}>
      {children}
    </GlobalContext.Provider>
  );
};