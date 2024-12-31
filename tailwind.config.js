/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}" // Correct the typo in 'components'
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#121212",  // Custom dark background color
        "custom-light": "#FFFFFF", // Custom light background color
        "custom-input-dark": "#27272a",
        "custom-input-light": "#f4f4f5",
      },
      textColor: {
        "custom-dark": "#ffffff", // Custom dark text color (light theme text color)
        "custom-light": "#000000", // Custom light text color (dark theme text color)
        "custom-green": "#22c55e"
      },
    },
  },
  plugins: [],
};
