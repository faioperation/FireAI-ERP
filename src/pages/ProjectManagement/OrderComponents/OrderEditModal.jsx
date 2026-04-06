// import React, { useState, useEffect, useContext, useRef } from "react";
// import { ThemeContext } from "@/Componants/Themes/ThemeContext";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Upload, Trash2 } from "lucide-react";
// import OverviewDescription from "@/SharedComponants/OverviewDescription";

// export default function OrderEditModal({ isOpen, onClose, onSubmit, editData }) {
//   const { theme } = useContext(ThemeContext);
//   const fileInputRef = useRef(null);

//   // Form State - initial data load hobe editData theke
//   const [formData, setFormData] = useState({
//     id: "",
//     projectId: "",
//     clientName: "",
//     projectName: "",
//     totalTimeline: "",
//     orderId: "",
//     serviceType: "",
//     totalValue: "",
//     team: "",
//     assignTo: "",
//     priority: "",
//     status: "",
//     startDate: "",
//     deadline: "",
//     phases: [],
//     files: [],
//   });

//   // Jokhon editData ashbe, tokhon state update hobe
//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         ...editData,
//         // Mapping fields if keys are different (e.g., client vs clientName)
//         clientName: editData.client || editData.clientName || "",
//         projectName: editData.projectName || "Project Name", 
//         orderId: editData.id || "",
//       });
//     }
//   }, [editData]);

//   const inputBaseClass = `py-5.5 rounded-xl border w-full transition-all outline-none ${
//     theme === "dark"
//       ? "bg-[#111827] border-gray-800 text-white focus:border-[#00d2ff]/80 placeholder:text-gray-500"
//       : "bg-white border-gray-200 text-gray-900 focus:border-orange-500 placeholder:text-gray-400"
//   }`;

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (onSubmit) onSubmit(formData);
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className={`sm:max-w-[850px] w-[95vw] h-auto max-h-[92vh] overflow-y-auto rounded-2xl border-none p-0 shadow-2xl transition-colors duration-300 ${theme === "dark" ? "bg-[#0B0F1A] text-white" : "bg-white text-gray-900"} [&::-webkit-scrollbar]:hidden`}>
//         <DialogHeader className="px-6 pb-4 pt-6">
//           <DialogTitle className="text-xl font-bold">Edit Order: {formData.id}</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleUpdate} className="px-6 pb-6 pt-0 md:px-10 space-y-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Project ID*</Label>
//               <Input value={formData.projectId} className={inputBaseClass} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })} />
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Client Name*</Label>
//               <Input value={formData.clientName} className={inputBaseClass} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Project Title</Label>
//               <Input value={formData.projectName} className={inputBaseClass} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Total Value</Label>
//               <Input value={formData.totalValue} className={inputBaseClass} onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })} />
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Select Team</Label>
//               <Select value={formData.team} onValueChange={(v) => setFormData({ ...formData, team: v })}>
//                 <SelectTrigger className={inputBaseClass}><SelectValue placeholder="Select Team" /></SelectTrigger>
//                 <SelectContent className={theme === "dark" ? "bg-[#111827] text-white border-gray-800" : ""}>
//                   <SelectItem value="AI Weavers">AI Weavers</SelectItem>
//                   <SelectItem value="Dev Squad">Dev Squad</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Priority</Label>
//               <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
//                 <SelectTrigger className={inputBaseClass}><SelectValue placeholder="Select Priority" /></SelectTrigger>
//                 <SelectContent className={theme === "dark" ? "bg-[#111827] text-white border-gray-800" : ""}>
//                   <SelectItem value="high">High</SelectItem>
//                   <SelectItem value="medium">Medium</SelectItem>
//                   <SelectItem value="low">Low</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Status</Label>
//               <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
//                 <SelectTrigger className={inputBaseClass}><SelectValue placeholder="Select Status" /></SelectTrigger>
//                 <SelectContent className={theme === "dark" ? "bg-[#111827] text-white border-gray-800" : ""}>
//                   <SelectItem value="In Progress">In Progress</SelectItem>
//                   <SelectItem value="Pending">Pending</SelectItem>
//                   <SelectItem value="Completed">Completed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm opacity-70">Deadline</Label>
//               <Input type="date" value={formData.deadline} className={inputBaseClass} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
//             </div>
//           </div>

//           <OverviewDescription />

//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
//             <Button type="button" variant="outline" onClick={onClose} className={`px-12 py-5.5 rounded-xl font-bold w-full sm:w-[180px] ${theme === "dark" ? "bg-black text-[#00d2ff] border border-[#00d2ff]/30" : ""}`}>
//               Cancel
//             </Button>
//             <Button type="submit" className={`px-12 py-5.5 rounded-xl font-bold w-full sm:w-[180px] ${theme === "dark" ? "bg-black text-[#00d2ff] border border-[#00d2ff]/30" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
//               Update Order
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState, useRef, useEffect } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  UserCircle,
  Clock,
  Filter,
  Search,
  Calendar,
  Hourglass,
  CheckCircle2,
  RotateCcw
} from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderEditModal from "./OrderEditModal";
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
    deadline: "2026-03-15",
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
    deadline: "2026-03-18",
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
    deadline: "2026-03-10",
  }
];

// --- Sub-components (Badges & Filter) ---

const FilterDropdown = ({ columnKey, data, onFilterChange, dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const dropdownRef = useRef(null);

  const options = [...new Set(data.map(item => String(item[columnKey] || "")))].filter(Boolean);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
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
        <div className={`absolute left-0 mt-2 w-52 rounded-xl shadow-2xl border z-50 p-3 animate-in fade-in zoom-in duration-150 ${dark ? "bg-[#111827] border-gray-700/80 shadow-black/50" : "bg-white border-gray-200 shadow-gray-200"}`}>
          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-7 pr-2 py-1.5 text-[11px] rounded-lg border outline-none focus:ring-1 focus:ring-orange-500/50 transition-all ${dark ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500" : "bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-40 overflow-y-auto space-y-0.5 custom-scrollbar">
            {filteredOptions.map((option, idx) => (
              <label key={idx} className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${dark ? "hover:bg-gray-700/50" : "hover:bg-orange-50"}`}>
                <input type="checkbox" className="accent-orange-500 w-3.5 h-3.5 rounded border-gray-300" checked={selectedItems.includes(option)} onChange={() => handleCheckboxChange(option)} />
                <span className={`text-[12px] ${dark ? "text-gray-300" : "text-gray-600"}`}>{option}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between items-center border-t mt-2 pt-2 border-gray-100 dark:border-gray-700">
            <button onClick={() => { setSelectedItems(options); onFilterChange(columnKey, options); }} className="text-[10px] font-bold text-orange-500 px-1">Select All</button>
            <button onClick={handleClearAll} className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-500 px-1"><RotateCcw size={10} /> Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  };
  return <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize ${styles[priority] || styles.medium}`}>{priority}</span>;
};

const StatusBadge = ({ status }) => {
  const styles = { "In Progress": "text-orange-500", Completed: "text-green-600", Pending: "text-yellow-500" };
  const icons = { "In Progress": <Clock size={13} />, Completed: <CheckCircle2 size={13} />, Pending: <Hourglass size={13} /> };
  return <span className={`flex items-center gap-1.5 text-xs font-bold ${styles[status] || "text-gray-500"}`}>{icons[status]} {status}</span>;
};

// --- Main Component ---

export default function OrderList() {
  const [dark, setDark] = useState(false); // Can be linked to your ThemeContext
  const [data, setData] = useState(initialData);
  const [activeFilters, setActiveFilters] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Edit & Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleFilterChange = (columnKey, selectedValues) => {
    setActiveFilters(prev => ({ ...prev, [columnKey]: selectedValues }));
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleUpdateOrder = (updatedOrder) => {
    // We map back the form fields to our list structure if needed
    const mappedOrder = {
      ...updatedOrder,
      id: updatedOrder.orderId || updatedOrder.id,
      client: updatedOrder.clientName || updatedOrder.client,
    };
    setData((prev) => prev.map((item) => (item.id === mappedOrder.id ? mappedOrder : item)));
    setIsEditModalOpen(false);
  };

  const deleteRow = (id) => {
    if (window.confirm("Delete this order?")) {
      setData((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const filtered = data.filter((row) => {
    return Object.keys(activeFilters).every(key => {
      if (!activeFilters[key] || activeFilters[key].length === 0) return true;
      return activeFilters[key].includes(String(row[key]));
    });
  });

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300">
        <div className="max-w-full mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                  <tr>
                    {[
                      { label: "Order ID", key: "id" },
                      { label: "Project ID", key: "projectId" },
                      { label: "Client", key: "client" },
                      { label: "Priority", key: "priority" },
                      { label: "Value", key: "totalValue", noFilter: true },
                      { label: "Status", key: "status" },
                      { label: "Deadline", key: "deadline" },
                      { label: "Actions", key: "actions", noFilter: true },
                    ].map((col) => (
                      <th key={col.key} className="px-4 py-4 text-left text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        <div className="flex items-center">
                          {col.label}
                          {!col.noFilter && (
                            <FilterDropdown columnKey={col.key} data={initialData} onFilterChange={handleFilterChange} dark={dark} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {filtered.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-gray-700 dark:text-gray-300">{row.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{row.projectId}</td>
                      <td className="px-4 py-4 text-sm font-semibold">{row.client}</td>
                      <td className="px-4 py-4"><PriorityBadge priority={row.priority} /></td>
                      <td className="px-4 py-4 text-sm font-black">{row.totalValue}</td>
                      <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-4 text-sm text-gray-500">{row.deadline}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => { setSelectedOrder(row); setShowOrderDetails(true); }} className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-500">
                            <Eye size={15} />
                          </button>
                          <button onClick={() => handleEditClick(row)} className="p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-gray-400 hover:text-orange-500">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => deleteRow(row.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showOrderDetails && (
        <OrderDetailsModal
          isOpen={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          orderData={selectedOrder}
        />
      )}

      {isEditModalOpen && (
        <OrderEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateOrder}
          editData={selectedOrder}
        />
      )}
    </div>
  );
}