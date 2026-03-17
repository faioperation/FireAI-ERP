import { Button } from "@/components/ui/button";
import { Bell, Settings, Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./Themes/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const headerStyle =
    theme === "dark" ? { "--color-darkSecBG": "#1F2937" } : {};

  return (
    <nav
      style={headerStyle}
      className={`w-full border-b transition-all duration-300 px-4 py-3 sm:px-6 lg:px-8 
        ${theme === "dark" ? "bg-[#111827] border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <Button
            onClick={toggleTheme}
            variant="outline"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors cursor-pointer
    ${
      theme === "dark"
        ? "border-gray-600 text-white bg-[#111827]"
        : "border-gray-300 text-gray-800"
    }`}
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}

            <span className="hidden sm:inline">
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>

          <button
            className={`relative p-1 transition-colors focus:outline-none cursor-pointer 
            ${theme === "dark" ? "text-gray-300 hover:text-orange-400" : "text-gray-800 hover:text-[#F97316]"}`}
          >
            <Bell size={24} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>

          <button
            className={`p-1 transition-colors focus:outline-none cursor-pointer 
            ${theme === "dark" ? "text-gray-300 hover:text-orange-400" : "text-gray-800 hover:text-[#F97316]"}`}
          >
            <Settings size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
