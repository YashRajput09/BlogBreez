/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode via a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   lightBlue: "#60A5FA", // Soft blue for highlights
      //   darkBg: "#1E293B", // Deep navy for background
      //   darkCard: "#27364E", // Softer dark for cards
      //   textDark: "#E5E7EB", // Off-white text
      // },
      colors: {
        primary: "#1E40AF", // Normal Blue
        secondary: "#60A5FA", // Light Blue
        darkBg: "#0A192F", // Dark Blue Background
        darkText: "#E0E7FF", // Light Blue-Gray Text
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
        spinSlow: "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}