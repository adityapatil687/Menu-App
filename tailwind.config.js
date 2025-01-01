/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", // Correct the typo in 'components'
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#121212", // Custom dark background color
        "custom-light": "#FFFFFF", // Custom light background color
        "custom-input-dark": "#27272a",
        "custom-input-light": "#f9fafb",
        // blue: {
        //   500: "#3B82F6", // Adjust color if needed
        // },
      },
      textColor: {
        "custom-dark": "#000000", // Dark text color (for light theme)
        "custom-light": "#FFFFFF", // Light text color (for dark theme)
        "custom-green": "#22c55e",
      },
    },
  },
  plugins: [],
};
