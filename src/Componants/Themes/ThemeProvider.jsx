// import { useEffect, useState } from "react";
// import { ThemeContext } from "./ThemeContext";




// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(()=>{
//     return localStorage.getItem("theme") || "light";
//   });

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };
//   useEffect(()=>{
//     localStorage.setItem("theme" , theme)
//   },[theme])

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };