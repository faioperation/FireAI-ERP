import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./Themes/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1"></div>
        <Button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button className="relative p-1 text-slate-600 hover:text-blue-600 transition-colors focus:outline-none">
            <Bell size={24} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>
          <button className="p-1 text-slate-600 hover:text-blue-600 transition-colors focus:outline-none">
            <Settings size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
