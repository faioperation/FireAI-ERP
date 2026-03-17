import { Plus } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../Componants/Themes/ThemeContext";

export default function DynamicButton({
  label = "Click Me",
  onClick,
  showIcon = true,
  className = "",
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 active:scale-95 shadow-md cursor-pointer text-sm sm:text-base w-full sm:w-auto
        ${
          theme === "dark"
            ? "bg-[#111827] border border-gray-800 text-[#00d2ff] hover:border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
            : "bg-[#F97316] text-white hover:bg-orange-600 shadow-orange-100"
        } 
        ${className}`}
    >
      {showIcon && <Plus size={18} strokeWidth={2.5} className="shrink-0" />}

      <span className="truncate">{label}</span>
    </button>
  );
}
