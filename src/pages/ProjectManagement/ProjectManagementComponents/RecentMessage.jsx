import { useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { useNavigate } from "react-router-dom";

const messages = [
  {
    id: 1,
    name: "Robert Hayes",
    initial: "RH",
    text: "A short document explaining your project idea and goals................",
    time: "2h ago",
    avatarBg: "bg-blue-100 dark:bg-blue-900/30",
    avatarColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    name: "Amy Lee",
    initial: "AL",
    text: "A short document explaining your project idea and goals................",
    time: "5h ago",
    avatarBg: "bg-green-100 dark:bg-green-900/30",
    avatarColor: "text-green-600 dark:text-green-400",
  },
  {
    id: 3,
    name: "James Morgan",
    initial: "JM",
    text: "A short document explaining your project idea and goals................",
    time: "1d ago",
    avatarBg: "bg-amber-100 dark:bg-amber-900/30",
    avatarColor: "text-amber-600 dark:text-amber-400",
  },
];

const RecentMessage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl border
        ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="font-bold text-xs sm:text-sm">Recent Message</h3>
        <button className="text-[10px] text-gray-400 hover:text-orange-500 underline font-medium">
          See All
        </button>
      </div>

      {/* Message List */}
      <div className={`flex flex-col divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => navigate(`/messages/${msg.id}`)}
            className="flex items-center gap-3 py-2.5 sm:py-3 cursor-pointer group first:pt-0 last:pb-0"
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
                flex-shrink-0 text-xs sm:text-sm font-semibold
                ${msg.avatarBg} ${msg.avatarColor}`}
            >
              {msg.initial}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs sm:text-sm font-semibold truncate group-hover:text-orange-500 transition-colors
                ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                {msg.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 truncate mt-0.5">
                {msg.text}
              </p>
            </div>

            {/* Time */}
            <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0">
              {msg.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessage;