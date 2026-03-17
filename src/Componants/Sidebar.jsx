import { useState, useContext } from "react";
import logo from "../assets/images/logo.png";
import { ThemeContext } from "./Themes/ThemeContext";
import {
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  Users,
  BarChart3,
  Share2,
  Settings,
  HelpCircle,
  LogOut,
  ChartNoAxesCombined,
  Menu,
  X,
} from "lucide-react";

const menuData = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, children: [] },
  {
    id: "project",
    label: "Project Management",
    icon: Briefcase,
    children: [
      { id: "p1", label: "Project", sub: [] },
      {
        id: "p2",
        label: "Order",
        sub: ["New Order", "Order In Progress", "Completed Order"],
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
    label: "Sales & OP Collaboration",
    icon: Users,
    children: ["Meeting", "Message", "Notice"],
  },
  {
    id: "workforce",
    label: "Work Force Management",
    icon: Share2,
    children: ["Team Management", "Employee Management"],
  },
  {
    id: "monitoring",
    label: "Monitoring Dashboard",
    icon: BarChart3,
    children: [],
  },
  {
    id: "diagram",
    label: "Diagram",
    icon: ChartNoAxesCombined,
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
  const { theme } = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const darkSecBG = "bg-[#111827]";
  const activeDarkClass = `${darkSecBG} border border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)]`;

  const handleParentClick = (item) => {
    setActiveParent(item.id === activeParent ? null : item.id);
    if (item.children.length > 0) {
      setIsCollapsed(true);
    } else {
      setActiveChild(item.label);
      if (window.innerWidth < 1024) setIsMobileOpen(false);
    }
  };

  const handleChildClick = (child) => {
    setActiveChild(child);
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
      setActiveParent(null);
    }
  };

  const currentItem = menuData.find((m) => m.id === activeParent);

  return (
    <div
      className={`font-['Inter',_sans-serif] h-screen overflow-hidden transition-colors duration-300 ${theme === "dark" ? "bg-[#1F2937]" : "bg-white"}`}
    >
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-[#F97316] text-white rounded-lg shadow-lg cursor-pointer"
        >
          {isMobileOpen ? (
            <X size={20} className="cursor-pointer" />
          ) : (
            <Menu size={20} className="cursor-pointer" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 flex transition-transform duration-300 lg:relative lg:translate-x-0 h-full ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* --- Main Sidebar --- */}
        <aside
          className={`${isCollapsed ? "w-20" : "w-64"} flex flex-col h-full transition-all duration-300 relative z-[55] border-r ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}
        >
          <div className="h-16 flex items-center px-5 mb-4 shrink-0">
            <button
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                setActiveParent(null);
              }}
              className="cursor-pointer"
            >
              <img
                src={logo}
                alt="logo"
                className="w-8 h-8 object-contain cursor-pointer"
              />
            </button>
            {!isCollapsed && (
              <span
                className={`ml-3 font-bold text-sm truncate cursor-pointer ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                Operations Dashboard
              </span>
            )}
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar pb-20">
            {menuData.map((item) => {
              const isActive = activeParent === item.id;
              return (
                <div key={item.id} className="relative group/parent">
                  <button
                    onClick={() => handleParentClick(item)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer
                      ${
                        isActive
                          ? theme === "dark"
                            ? activeDarkClass
                            : "bg-[#F97316] text-white shadow-md"
                          : theme === "dark"
                            ? "text-gray-400 hover:bg-gray-800 hover:text-[#00d2ff]"
                            : "text-gray-500 hover:bg-orange-50 hover:text-[#F97316]"
                      }
                    `}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={isActive ? 2 : 1.5}
                      className="cursor-pointer"
                    />
                    {!isCollapsed && (
                      <span className="text-[13px] font-medium whitespace-nowrap cursor-pointer">
                        {item.label}
                      </span>
                    )}
                  </button>

                  {/* --- Hover Tooltip (Updated for Dark Mode) --- */}
                  {isCollapsed && (
                    <div className="fixed left-20 hidden group-hover/parent:flex z-[100] items-center pointer-events-none">
                      <div
                        className={`text-xs py-1.5 px-3 rounded shadow-xl whitespace-nowrap ml-1 transition-colors
                        ${
                          theme === "dark"
                            ? "bg-[#111827] text-[#00d2ff] border border-[#00d2ff]/30 shadow-[0_0_10px_rgba(0,210,255,0.2)]"
                            : "bg-[#F97316] text-white"
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div
            className={`p-4 space-y-2 shrink-0 ${theme === "dark" ? darkSecBG : "bg-white"}`}
          >
            <button className="flex items-center gap-3 w-full p-2 text-red-400 hover:bg-[#F97316] hover:text-white rounded-lg transition-colors cursor-pointer">
              <LogOut size={20} className="cursor-pointer" />
              {!isCollapsed && (
                <span className="text-sm font-medium cursor-pointer">
                  Sign Out
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* --- Secondary Sidebar (Drawer) --- */}
        <aside
          className={`h-screen transition-all duration-300 overflow-hidden relative z-40
          ${activeParent && currentItem?.children.length > 0 ? "w-64 border-r" : "w-0"}
          ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}
        >
          <div className="w-64 flex flex-col h-full">
            <div className="py-4 flex items-center px-6 shrink-0">
              <h2
                className={`font-bold text-sm uppercase tracking-wider cursor-pointer ${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}
              >
                {currentItem?.label}
              </h2>
            </div>
            <div
              className={`flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar ${theme === "dark" ? darkSecBG : "bg-white"}`}
            >
              {currentItem?.children.map((child, idx) => {
                const isChildActive =
                  activeChild ===
                  (typeof child === "string" ? child : child.label);
                return typeof child === "string" ? (
                  <button
                    key={idx}
                    onClick={() => handleChildClick(child)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer
                    ${
                      isChildActive
                        ? theme === "dark"
                          ? activeDarkClass
                          : "bg-[#F97316] text-white shadow-lg"
                        : theme === "dark"
                          ? "text-gray-400 hover:bg-gray-800 hover:text-[#00d2ff]"
                          : "text-gray-600 hover:bg-orange-50 hover:text-[#F97316]"
                    }`}
                  >
                    {child}
                  </button>
                ) : (
                  <div key={idx} className="space-y-1">
                    <button
                      onClick={() => handleChildClick(child.label)}
                      className={`w-full text-left px-4 py-2 text-[13px] font-bold uppercase rounded-xl transition-all cursor-pointer
                        ${
                          isChildActive
                            ? theme === "dark"
                              ? activeDarkClass
                              : "bg-[#F97316] text-white shadow-md"
                            : theme === "dark"
                              ? "text-gray-300 hover:bg-gray-800 hover:text-[#00d2ff]"
                              : "text-gray-800 hover:bg-orange-50 hover:text-[#F97316]"
                        }`}
                    >
                      {child.label}
                    </button>
                    {child.sub.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleChildClick(sub)}
                        className={`w-full text-left px-8 py-2 rounded-lg text-sm transition-all cursor-pointer 
                        ${
                          activeChild === sub
                            ? theme === "dark"
                              ? "text-[#00d2ff] font-bold"
                              : "text-[#F97316] font-bold bg-orange-50"
                            : theme === "dark"
                              ? "text-gray-500 hover:text-[#00d2ff]"
                              : "text-gray-500 hover:text-[#F97316]"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] lg:hidden cursor-pointer"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}
