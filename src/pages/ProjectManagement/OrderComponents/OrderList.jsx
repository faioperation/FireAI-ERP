
import { useState, useRef, useEffect } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  UserCircle,
  Clock,
  Sun,
  Moon,
  Filter,
  Search,
  Calendar,
  Hourglass,
  CheckCircle2,
  RotateCcw
} from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";
import { Link } from "react-router";

const initialData = [
  {
    id: "#78894",
    projectId: "#8998778",
    client: "Anik",
    team: "AI Weavers",
    assignStatus: "Done",
    priority: "high",
    totalValue: "$800",
    status: "In Progress",
    timeRemaining: "03 Days",
    deadline: "Mar 15, 2026",
  },
  {
    id: "#78895",
    projectId: "#8998779",
    client: "Rahat",
    team: "Dev Squad",
    assignStatus: "Pending",
    priority: "medium",
    totalValue: "$1200",
    status: "Pending",
    timeRemaining: "05 Days",
    deadline: "Mar 18, 2026",
  },
  {
    id: "#78896",
    projectId: "#8998780",
    client: "Zaman",
    team: "Code Crafters",
    assignStatus: "Done",
    priority: "low",
    totalValue: "$500",
    status: "Completed",
    timeRemaining: "00 Days",
    deadline: "Mar 10, 2026",
  }
];

const FilterDropdown = ({ columnKey, data, onFilterChange, dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Default empty
  const [selectedItems, setSelectedItems] = useState([]); // Default empty
  const dropdownRef = useRef(null);

  const options = [...new Set(data.map(item => String(item[columnKey] || "")))].filter(Boolean);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (option) => {
    const updated = selectedItems.includes(option)
      ? selectedItems.filter(i => i !== option)
      : [...selectedItems, option];
    setSelectedItems(updated);
    onFilterChange(columnKey, updated);
  };

  const handleSelectAll = () => {
    const filtered = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
    setSelectedItems(filtered);
    onFilterChange(columnKey, filtered);
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    onFilterChange(columnKey, []);
    setSearchTerm("");
  };

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative inline-block ml-1" ref={dropdownRef}>
      <Filter
        size={11}
        className={`cursor-pointer hover:text-orange-500 transition-colors ${isOpen ? "text-orange-500" : "opacity-40"}`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className={`absolute left-0 mt-2 w-52 rounded-xl shadow-2xl border z-50 p-3 animate-in fade-in zoom-in duration-150 ${dark ? "bg-[#111827] border-gray-700/80 shadow-black/50" : "bg-white border-gray-200 shadow-gray-200"
          }`}>
          {/* Dark Mode Optimized Search Bar */}
          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-7 pr-2 py-1.5 text-[11px] rounded-lg border outline-none focus:ring-1 focus:ring-orange-500/50 transition-all ${dark
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500"
                : "bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400"
                }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto space-y-0.5 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <label key={idx} className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${dark ? "hover:bg-gray-700/50" : "hover:bg-orange-50"
                  }`}>
                  <input
                    type="checkbox"
                    className="accent-orange-500 w-3.5 h-3.5 rounded border-gray-300"
                    checked={selectedItems.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <span className={`text-[12px] ${dark ? "text-gray-300" : "text-gray-600"}`}>{option}</span>
                </label>
              ))
            ) : (
              <p className="text-[11px] text-gray-500 text-center py-2 font-medium">No results</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center border-t mt-2 pt-2 border-gray-100 dark:border-gray-700">
            <button
              onClick={handleSelectAll}
              className="text-[10px] font-bold text-orange-500 hover:text-orange-600 transition-colors px-1"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors px-1"
            >
              <RotateCcw size={10} /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ... (AssignBadge, PriorityBadge, StatusBadge retain previous styling)

const AssignBadge = ({ status }) => {
  const styles = {
    Done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Review: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${styles[priority] || styles.medium}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "In Progress": "text-orange-500 dark:text-orange-400",
    Completed: "text-green-600 dark:text-green-400",
    Pending: "text-yellow-500 dark:text-yellow-400",
  };
  const icons = {
    "In Progress": <Clock size={13} />,
    "Completed": <CheckCircle2 size={13} />,
    "Pending": <Hourglass size={13} />
  };
  return (
    <span className={`flex items-center gap-1.5 text-xs font-bold ${styles[status] || "text-gray-500"}`}>
      {icons[status]} {status}
    </span>
  );
};

export default function OrderList() {
  const [dark, setDark] = useState(false);
  const [data, setData] = useState(initialData);
  const [activeFilters, setActiveFilters] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleFilterChange = (columnKey, selectedValues) => {
    setActiveFilters(prev => ({ ...prev, [columnKey]: selectedValues }));
  };

  const filtered = data.filter((row) => {
    return Object.keys(activeFilters).every(key => {
      if (!activeFilters[key] || activeFilters[key].length === 0) return true;
      return activeFilters[key].includes(String(row[key]));
    });
  });

  const deleteRow = (id) => setData((prev) => prev.filter((row) => row.id !== id));

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300">



        <div className="hidden lg:block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                <tr>
                  {[
                    { label: "Order ID", key: "id" },
                    { label: "Project ID", key: "projectId" },
                    { label: "Client", key: "client" },
                    { label: "Team", key: "team" },
                    { label: "Assign Status", key: "assignStatus" },
                    { label: "Priority", key: "priority" },
                    { label: "Value", key: "totalValue", noFilter: true },
                    { label: "Status", key: "status" },
                    { label: "Remaining", key: "timeRemaining", noFilter: true },
                    { label: "Deadline", key: "deadline" },
                    { label: "Actions", key: "actions", noFilter: true },
                  ].map((col) => (
                    <th key={col.key} className="px-4 py-4 text-left text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      <div className="flex items-center">
                        {col.label}
                        {!col.noFilter && (
                          <FilterDropdown
                            columnKey={col.key}
                            data={initialData}
                            onFilterChange={handleFilterChange}
                            dark={dark}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-20 text-sm text-gray-400 dark:text-gray-500 font-medium italic">
                      No records match your selection.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-gray-700 dark:text-gray-300">{row.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{row.projectId}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200 font-semibold">{row.client}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{row.team}</td>
                      <td className="px-4 py-4"><AssignBadge status={row.assignStatus} /></td>
                      <td className="px-4 py-4"><PriorityBadge priority={row.priority} /></td>
                      <td className="px-4 py-4 text-sm font-black text-gray-800 dark:text-gray-100">{row.totalValue}</td>
                      <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/80 w-fit px-2 py-1 rounded-lg font-bold uppercase">
                          <Hourglass size={12} className="text-orange-500" /> {row.timeRemaining}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                          <Calendar size={13} className="text-blue-500 opacity-70" /> {row.deadline}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link to="/order-value">
                            <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-500 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                              <UserCircle size={15} />
                            </button>
                          </Link>
                          <button onClick={() => setShowOrderDetails(true)} className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-500 transition-all border border-transparent hover:border-green-100 dark:hover:border-green-800">
                            <Eye size={15} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-gray-400 hover:text-orange-500 transition-all border border-transparent hover:border-orange-100 dark:hover:border-orange-800">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => deleteRow(row.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showOrderDetails && <OrderDetailsModal isOpen={showOrderDetails} onClose={() => setShowOrderDetails(false)} />}
    </div>
  );
}


