import { useState } from "react";
import logo from "../assets/images/logo.png";
import {
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  Users,
  BarChart3,
  Share2,
  Settings,
  ChevronUp,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuData = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, children: [] },
  {
    id: "project",
    label: "Project Management",
    icon: Briefcase,
    children: [
      { label: "Project", sub: [] },
      {
        label: "Order",
        sub: [
          "New Order",
          "Pending Order",
          "Completed Order",
          "Assigned Order",
        ],
      },
    ],
  },
  {
    id: "todo",
    label: "To-do Management",
    icon: ClipboardList,
    children: ["Daily To-do", "Task-Tracker"],
  },
  {
    id: "sales",
    label: "Sales & OP Collabo...",
    icon: Users,
    children: ["Meeting", "Message", "Notice"],
  },
  {
    id: "workforce",
    label: "Work Force Manag...",
    icon: Share2,
    children: ["Team Management", "Employee Manage..."],
  },
  {
    id: "monitoring",
    label: "Monitoring Dashbo...",
    icon: BarChart3,
    children: [],
  },
  {
    id: "diagram",
    label: "Diagram",
    icon: Share2,
    children: ["Management", "Sit plan"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: ["Profile", "Password"],
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div  className="flex h-screen  font-sans">
      {/* Sidebar Navigation */}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"} bg-white border-r border-gray-100 flex flex-col transition-all duration-300 relative z-30`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 mb-4">
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <img src={logo} alt="logo" className="cursor-pointer" />
          </button>
          {!isCollapsed && (
            <span className="ml-3 font-bold text-gray-800 truncate text-sm">
              Operations Dashboard
            </span>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-3 space-y-1 relative">
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-gray-400 px-3 mb-2 tracking-widest">
              MAIN
            </p>
          )}

          {menuData.map((item) => (
            <div key={item.id} className="relative group cursor-pointer">
              {/* Main Button */}
              <button
                onClick={() => {
                  if (item.children.length > 0) {
                    setIsCollapsed(true);
                    setActiveItem(activeItem === item.id ? null : item.id);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all
                  ${activeItem === item.id && isCollapsed ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-500 hover:bg-gray-50"}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={22}
                    strokeWidth={1.5}
                    className="cursor-pointer"
                  />
                  {!isCollapsed && (
                    <span className="text-[13px] font-medium whitespace-nowrap cursor-pointer">
                      {item.label}
                    </span>
                  )}
                </div>
                {!isCollapsed && item.children.length > 0 && (
                  <ChevronUp size={14} className="opacity-40 cursor-pointer" />
                )}

                {/* --- Hover Tooltip (Only when collapsed & no active popup) --- */}
                {isCollapsed && activeItem !== item.id && (
                  <div className="absolute left-16 hidden group-hover:block z-50">
                    <div className="bg-gray-900 text-white text-[11px] py-1 px-2 rounded-md whitespace-nowrap shadow-lg">
                      {item.label}
                    </div>
                  </div>
                )}
              </button>

              {/* --- Floating Popup Sub-menu (Exactly like Image 2) --- */}
              {isCollapsed &&
                activeItem === item.id &&
                item.children.length > 0 && (
                  <div className="absolute left-[70px] top-0 w-52 bg-white rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.1)] border border-gray-50 p-4 z-50">
                    <div className="flex flex-col gap-1">
                      {item.children.map((child, idx) =>
                        typeof child === "string" ? (
                          <div
                            key={idx}
                            className="text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                          >
                            {child}
                          </div>
                        ) : (
                          <div key={idx} className="mb-2">
                            <p className="text-[13px] font-bold text-gray-900 px-3 py-1">
                              {child.label}
                            </p>
                            <div className="ml-3 border-l-2 border-gray-100">
                              {child.sub.map((sub, sIdx) => (
                                <p
                                  key={sIdx}
                                  className="text-[12px] text-gray-500 hover:text-orange-500 px-4 py-1.5 cursor-pointer"
                                >
                                  {sub}
                                </p>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Footer Icons */}
        {/* <div className="p-4 border-t border-gray-50 space-y-2">
          <div className="flex flex-col items-center gap-4">
            <HelpCircle
              size={22}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            />
            <LogOut
              size={22}
              className="text-red-400 cursor-pointer hover:text-red-600"
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
            <div className="h-9 w-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
              JD
            </div>
          </div>
        </div> */}
      </aside>
    </div>
  );
}
