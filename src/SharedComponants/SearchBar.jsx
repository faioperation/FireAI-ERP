import { Search } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../Componants/Themes/ThemeContext"; 

export default function SearchBar({ 
  placeholder = "Search projects...", 
  onChange, 
  value, 
  className = "" 
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search 
          size={18} 
          className={theme === "dark" ? "text-gray-500" : "text-gray-400"} 
        />
      </span>

      {/* Input Field */}
      <input
        type="text"
        value={value}            
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-12 pr-4 py-2.5 rounded-xl border transition-all duration-300 outline-none text-sm
          ${theme === "dark" 
            ? "bg-[#111827] border-gray-800 text-white focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]/30" 
            : "bg-white border-gray-200 text-gray-800 focus:border-[#F97316] focus:ring-1 focus:ring-orange-200"
          }`}
      />
    </div>
  );
}