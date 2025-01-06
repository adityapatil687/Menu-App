import iconsWhite from "./icons-white";

let userData = 
  {
    userId: "1908djfvjsbv987",
    userName: "Aditya Patil",
    userEmail: "adityapatil687@gmail.com",
    userResturantName: "Manan Foods",
    userProfile: "",
    
  }


let menuData = [
  {
    id: "starters", // Unique key for category
    category: "Starters",
    icon: iconsWhite.starters,
    dishes: [
      {
        id: "masala_papad", // Unique key for each dish
        name: "Masala Papad",
        price: 30,
        isVeg: true
      },
      {
        id: "samosa",
        name: "Samosa",
        price: 40,
        isVeg: true
      },
      {
        id: "paneer_tikka",
        name: "Paneer Tikka",
        price: 120,
        isVeg: true
      },
      {
        id: "aloo_tikki",
        name: "Aloo Tikki",
        price: 50,
        isVeg: true
      }
    ]
  },
  {
    id: "main_course", // Unique key for category
    category: "Main Course",
    icon: iconsWhite.main_course,
    dishes: [
      {
        id: "butter_paneer",
        name: "Butter Paneer",
        price: 300,
        isVeg: true
      },
      {
        id: "dal_makhani",
        name: "Dal Makhani",
        price: 180,
        isVeg: true
      },
      {
        id: "palak_paneer",
        name: "Palak Paneer",
        price: 220,
        isVeg: true
      },
      {
        id: "chicken_curry",
        name: "Chicken Curry",
        price: 350,
        isVeg: false
      },
      {
        id: "biryani",
        name: "Biryani",
        price: 250,
        isVeg: false
      }
    ]
  },
  {
    id: "desserts", // Unique key for category
    category: "Desserts",
    icon: iconsWhite.dessert,
    dishes: [
      {
        id: "gulab_jamun",
        name: "Gulab Jamun",
        price: 60,
        isVeg: true
      },
      {
        id: "rasgulla",
        name: "Rasgulla",
        price: 50,
        isVeg: true
      },
      {
        id: "jalebi",
        name: "Jalebi",
        price: 40,
        isVeg: true
      },
      {
        id: "ice_cream",
        name: "Ice-Cream",
        price: 30,
        isVeg: true
      }
    ]
  },
  {
    id: "beverages", // Unique key for category
    category: "Beverages",
    icon: iconsWhite.beverages,
    dishes: [
      {
        id: "water_bottle",
        name: "Water Bottle",
        price: 20,
        isVeg: true
      },
      {
        id: "masala_chai",
        name: "Masala Chai",
        price: 30,
        isVeg: true
      },
      {
        id: "lassi",
        name: "Lassi",
        price: 80,
        isVeg: true
      },
      {
        id: "cold_drink",
        name: "Cold Drink",
        price: 40,
        isVeg: true
      },
      {
        id: "jaljeera",
        name: "Jaljeera",
        price: 35,
        isVeg: true
      }
    ]
  }
];


let cartData = [
  {
    id: "lassi",
    name: "Lassi",
    price: 80,
    isVeg: true,
    quantity: 2
  },
  {
    id: "paneer_tikka",
    name: "Paneer Tikka",
    price: 120,
    isVeg: true,
    quantity: 1
  },
]

export default {menuData, userData};
