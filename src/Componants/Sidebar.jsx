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
      { id: "p2", label: "Order", sub: ["New Order", "Order In Progress", "Completed Order"] },
    ],
  },
  { id: "todo", label: "To-do Management", icon: ClipboardList, children: ["Daily To-do", "Task-Tracker"] },
  { id: "sales", label: "Sales & OP Collaboration", icon: Users, children: ["Meeting", "Message", "Notice"] },
  { id: "workforce", label: "Work Force Management", icon: Share2, children: ["Team Management", "Employee Management"] },
  { id: "monitoring", label: "Monitoring Dashboard", icon: BarChart3, children: [] },
  { id: "diagram", label: "Diagram", icon: ChartNoAxesCombined, children: ["Management", "Sit plan"] },
  { id: "settings", label: "Settings", icon: Settings, children: ["Profile", "Password"] },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <div className="font-['Inter',_sans-serif] bg-white">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 bg-[#F97316] text-white rounded-lg shadow-lg cursor-pointer">
          {isMobileOpen ? <X size={20} className="cursor-pointer" /> : <Menu size={20} className="cursor-pointer" />}
        </button>
      </div>

      <div className={`fixed inset-y-0 left-0 z-50 flex transition-transform duration-300 lg:relative lg:translate-x-0 h-screen bg-white ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* --- Main Sidebar --- */}
        <aside className={`${isCollapsed ? "w-20" : "w-64"} bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 relative z-[55]`}>
          <div className="h-16 flex items-center px-5 mb-4 shrink-0">
            <button onClick={() => { setIsCollapsed(!isCollapsed); setActiveParent(null); }} className="cursor-pointer">
              <img src={logo} alt="logo" className="w-8 h-8 object-contain cursor-pointer" />
            </button>
            {!isCollapsed && <span className="ml-3 font-bold text-gray-800 text-sm truncate cursor-pointer">Operations Dashboard</span>}
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar pb-20">
            {menuData.map((item) => (
              <div key={item.id} className="relative group/parent">
                <button
                  onClick={() => handleParentClick(item)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer
                    ${activeParent === item.id ? "bg-[#F97316] text-white shadow-md" : "text-gray-500 hover:bg-orange-50 hover:text-[#F97316]"}
                  `}
                >
                  <item.icon size={22} strokeWidth={activeParent === item.id ? 2 : 1.5} className="cursor-pointer" />
                  {!isCollapsed && <span className="text-[13px] font-medium whitespace-nowrap cursor-pointer">{item.label}</span>}
                </button>

                {/* --- Hover Tooltip --- */}
                {isCollapsed && (
                  <div className="fixed left-20 hidden group-hover/parent:flex z-[100] items-center pointer-events-none">
                    <div className="bg-gray-800 text-white text-xs py-1.5 px-3 rounded shadow-xl whitespace-nowrap ml-1">
                      {item.label}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer Section - Bottom */}
          <div className="p-4 border-t border-gray-100 space-y-2 shrink-0 bg-white">
            <button className="flex items-center gap-3 w-full p-2 text-gray-400 hover:text-[#F97316] transition-colors cursor-pointer">
              <HelpCircle size={20} className="cursor-pointer" />
              {!isCollapsed && <span className="text-sm cursor-pointer">Help Center</span>}
            </button>
            <button className="flex items-center gap-3 w-full p-2 text-red-400 hover:bg-[#F97316] hover:text-white rounded-lg transition-colors cursor-pointer">
              <LogOut size={20} className="cursor-pointer" />
              {!isCollapsed && <span className="text-sm font-medium cursor-pointer">Logout Account</span>}
            </button>
          </div>
        </aside>

        {/* --- Secondary Sidebar (Drawer) --- */}
        <aside 
          className={`h-screen bg-white transition-all duration-300 overflow-hidden relative z-40
          ${activeParent && currentItem?.children.length > 0 ? "w-64 border-r border-gray-200" : "w-0"}`}
        >
          <div className="w-64 flex flex-col h-full bg-white">
            <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
              <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider cursor-pointer">{currentItem?.label}</h2>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar bg-white">
              {currentItem?.children.map((child, idx) => (
                typeof child === "string" ? (
                  <button
                    key={idx}
                    onClick={() => handleChildClick(child)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer
                    ${activeChild === child ? "bg-[#F97316] text-white shadow-lg" : "text-gray-600 hover:bg-orange-50 hover:text-[#F97316]"}`}
                  >
                    {child}
                  </button>
                ) : (
                  <div key={idx} className="space-y-1">
                    <button 
                      onClick={() => handleChildClick(child.label)}
                      className={`w-full text-left px-4 py-2 text-[13px] font-bold uppercase rounded-xl transition-all cursor-pointer
                        ${activeChild === child.label ? "bg-[#F97316] text-white shadow-md" : "text-gray-800 hover:bg-orange-50 hover:text-[#F97316]"}
                      `}
                    >
                      {child.label}
                    </button>
                    {child.sub.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleChildClick(sub)}
                        className={`w-full text-left px-8 py-2 rounded-lg text-sm transition-all cursor-pointer
                        ${activeChild === sub ? "text-[#F97316] font-bold bg-orange-50" : "text-gray-500 hover:text-[#F97316]"}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Background Overlay for Mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] lg:hidden cursor-pointer" onClick={() => setIsMobileOpen(false)} />
      )}
    </div>
  );
}