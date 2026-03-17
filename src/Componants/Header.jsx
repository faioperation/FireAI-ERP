import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./Themes/ThemeContext";
import { Switch } from "@/components/ui/switch";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-4 sm:space-x-6">
            <Switch  checked={theme === "dark"}
  onCheckedChange={toggleTheme}></Switch>
          <button className="relative p-1 text-black hover:text-[#F97316] transition-colors focus:outline-none cursor-pointer">
            <Bell size={24} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>
          <button className="p-1 text-black hover:text-[#F97316] transition-colors focus:outline-none cursor-pointer">
            <Settings size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
