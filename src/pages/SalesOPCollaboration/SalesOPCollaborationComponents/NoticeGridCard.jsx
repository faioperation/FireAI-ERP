import { useContext } from "react";
import { Calendar, Pin, Bell } from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";

const NoticeGridCardData = [
  {
    id: 1,
    title: "Total Notices",
    value: "20",
    icon: Bell,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    id: 2,
    title: "Pinned",
    value: "10",
    icon: Pin,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-50",
  },
  {
    id: 3,
    title: "This Week",
    value: "14",
    icon: Calendar,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];

export default function NoticeGridCard() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {NoticeGridCardData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm flex flex-col justify-between h-40
                ${
                  theme === "dark"
                    ? "bg-[#111827] border-gray-800 text-white hover:border-gray-700"
                    : "bg-white border-gray-100 text-gray-800 hover:shadow-md"
                }`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  {item.title}
                </span>
                <div
                  className={`p-2 rounded-xl ${theme === "dark" ? "bg-gray-800" : item.iconBg}`}
                >
                  <Icon size={20} className={item.iconColor} />
                </div>
              </div>

              <div className="mt-4">
                <h3
                  className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-[#F97316]"}`}
                >
                  {item.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
