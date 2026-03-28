import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function Redesign() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <div>
      {/* Back */}
      {/* <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
        <ArrowLeft size={18} /> 
      </button> */}
      <button
        onClick={() => navigate("/project")}
        className={`flex items-center gap-2 text-sm mb-5 cursor-pointer transition-colors ${
          isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <ArrowLeft size={16} />
        <span>Back to Projects</span>
      </button>

      {/* Card */}
      <div className="bg-white dark:bg-[#242526] rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            E-commerce Platform Redesign
          </h1>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          PRJ-001 • TechMart Inc
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
            Website Application
          </span>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <img
              src="https://i.pravatar.cc/30"
              alt="avatar"
              className="w-6 h-6 rounded-full"
            />
            AI nest/Tauqir
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          The redesign includes a simplified navigation system, improved product
          pages, a streamlined checkout process, and a responsive layout
          optimized for both desktop and mobile devices. User-centered design
          principles and usability testing were applied to ensure the platform
          meets customer needs and reduces friction during the shopping journey.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <InfoCard title="Total Timeline" value="50 days" icon="📅" />
          <InfoCard title="Incoming Date" value="Mar 30, 2026" icon="📅" />
          <InfoCard title="Total Budget" value="$85K" icon="💰" />
          <InfoCard title="Assign Member" value="3 members" icon="👥" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#2f3031] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-xl">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
