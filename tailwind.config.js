/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors:{
      //   darkBG: "#0B1220",
      //   textTeal:"#00F5FF",
      //   textOrange:"#F97316",
      //   textGreen:"#22C55E",
      //   lightSecText:"#99a2b1",
      //   darkSecText:"#1F2937"
      // }
    },
  },
  plugins: [],
};