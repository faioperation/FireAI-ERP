import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Ghost,
} from "lucide-react";
import TaskDetails from "./TaskDetails"; 
import { CiFilter } from "react-icons/ci";

// Shadcn UI Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const MY_TASK_DATA = [
  {
    id: "PRJ-001",
    client: "Shahriar",
    task: "Operation Dashboard",
    deadline: "2026-03-30",
    assignedBy: "Jihad",
    assignedTo: "Tahira",
    priority: "High",
    status: "pending",
    description: "Operation dashboard UI implementation",
    remarks: "N/A",
    assignedDate: "2026-03-20",
  },
  {
    id: "PRJ-002",
    client: "Tahira",
    task: "UI Refinement",
    deadline: "2026-04-05",
    assignedBy: "Jihad",
    assignedTo: "Tahira",
    priority: "Medium",
    status: "pending",
    description: "Refining UI components",
    remarks: "N/A",
    assignedDate: "2026-03-22",
  },
  {
    id: "PRJ-003",
    client: "Mehedi",
    task: "API Integration",
    deadline: "2026-04-10",
    assignedBy: "Shahriar",
    assignedTo: "Tahira",
    priority: "Low",
    status: "pending",
    description: "Backend API integration",
    remarks: "N/A",
    assignedDate: "2026-03-25",
  },
];

export default function Mytask() {
  const [tasks, setTasks] = useState(MY_TASK_DATA);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [remarkText, setRemarkText] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // 🔥 Filter States
  const [activeFilter, setActiveFilter] = useState(null); 
  const [columnFilters, setColumnFilters] = useState({
    id: "",
    client: "",
    assignedBy: "",
    assignedTo: "",
    priority: "",
    status: "",
    startDate: "",
    endDate: ""
  });
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateTask = (id, field, value) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
  };

  const confirmDone = () => {
    if (activeTaskId) {
      updateTask(activeTaskId, "status", "Done");
      updateTask(activeTaskId, "remarks", remarkText);
      setIsRemarkOpen(false);
      setRemarkText("");
      setActiveTaskId(null);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // 🔥 Filter Logic
  const filteredTasks = tasks.filter((task) => {
    const idMatch = task.id.toLowerCase().includes(columnFilters.id.toLowerCase());
    const clientMatch = task.client.toLowerCase().includes(columnFilters.client.toLowerCase());
    const assignedByMatch = task.assignedBy.toLowerCase().includes(columnFilters.assignedBy.toLowerCase());
    const assignedToMatch = task.assignedTo.toLowerCase().includes(columnFilters.assignedTo.toLowerCase());
    const priorityMatch = task.priority.toLowerCase().includes(columnFilters.priority.toLowerCase());
    const statusMatch = task.status.toLowerCase().includes(columnFilters.status.toLowerCase());
    
    let dateMatch = true;
    if (columnFilters.startDate && columnFilters.endDate) {
        dateMatch = task.deadline >= columnFilters.startDate && task.deadline <= columnFilters.endDate;
    }

    return idMatch && clientMatch && assignedByMatch && assignedToMatch && priorityMatch && statusMatch && dateMatch;
  });

  const getStatusStyle = (status) => {
    if (status === "WIP") return "bg-[#3B82F6] text-white";
    if (status === "Completed" || status === "in-progress") return "bg-teal-400 text-white";
    if (status === "Done") return "bg-textGreen text-white";
    return "bg-textOrange text-white";
  };

  // Priority Styles Helper
  const getPriorityStyle = (priority) => {
    if (priority === "High") return "bg-[#fa3636] text-white";
    if (priority === "Medium") return "bg-textOrange text-white";
    if (priority === "Low") return "bg-blue-400 text-white";
    return "bg-gray-400 text-white";
  };

  // Checkbox Filter Component
  const FilterBox = ({ column, dataKey }) => {
    const uniqueOptions = [...new Set(tasks.map(t => t[dataKey]))];
    return (
      <div ref={filterRef} className="absolute mt-2 p-3 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[999] w-64 left-0 top-full normal-case font-normal text-foreground">
        <input
          autoFocus type="text" placeholder={`Search...`}
          value={columnFilters[column]}
          onChange={(e) => setColumnFilters({ ...columnFilters, [column]: e.target.value })}
          className="w-full px-3 py-2 text-xs border rounded-lg dark:bg-[#111827] dark:border-gray-600 outline-none mb-3"
        />
        <div className="flex justify-between items-center px-1 text-[11px] font-bold uppercase cursor-pointer mb-3">
          <span className="text-blue-500" onClick={() => setColumnFilters({...columnFilters, [column]: ""})}>Select All</span>
          <span className="text-red-500" onClick={() => { setColumnFilters({...columnFilters, [column]: ""}); setActiveFilter(null); }}>Clear</span>
        </div>
        <div className="max-h-[160px] overflow-y-auto space-y-1">
          {uniqueOptions.filter(opt => opt.toLowerCase().includes(columnFilters[column].toLowerCase())).map((option, idx) => (
            <div key={idx} className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                 onClick={() => setColumnFilters({ ...columnFilters, [column]: columnFilters[column] === option ? "" : option })}>
              <input type="checkbox" checked={columnFilters[column] === option} readOnly className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
              <span className="text-xs font-medium">{option}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DateFilterBox = () => (
    <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[999] w-72 left-0 top-full flex flex-col gap-3">
        <select className="w-full p-2 border rounded-lg text-xs dark:bg-[#111827]"><option>Between Dates</option></select>
        <input type="date" value={columnFilters.startDate} onChange={(e) => setColumnFilters({...columnFilters, startDate: e.target.value})} className="w-full p-2 border rounded-lg text-xs dark:bg-[#111827]" />
        <input type="date" value={columnFilters.endDate} onChange={(e) => setColumnFilters({...columnFilters, endDate: e.target.value})} className="w-full p-2 border rounded-lg text-xs dark:bg-[#111827]" />
        <div className="flex gap-2">
            <Button onClick={() => setActiveFilter(null)} className="flex-1 bg-blue-500 text-white text-xs h-9">Apply Filter</Button>
            <Button onClick={() => setColumnFilters({...columnFilters, startDate: "", endDate: ""})} className="flex-1 bg-red-500 text-white text-xs h-9">Clear</Button>
        </div>
    </div>
  );

  return (
    <div className="w-full bg-background dark:bg-darkBG rounded-[20px] shadow-sm border border-border overflow-x-auto overflow-y-visible transition-all duration-300">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="border-b border-border bg-muted/20 dark:bg-darkBG">
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'id' ? null : 'id')}>
                Project ID <CiFilter className={columnFilters.id ? "text-cyan-500" : "text-gray-400"} />
              </div>
              {activeFilter === 'id' && <FilterBox column="id" dataKey="id" />}
            </th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'client' ? null : 'client')}>
                Client Name <CiFilter className={columnFilters.client ? "text-cyan-500" : "text-gray-400"} />
              </div>
              {activeFilter === 'client' && <FilterBox column="client" dataKey="client" />}
            </th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Task Name</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'deadline' ? null : 'deadline')}>
                Deadline <CiFilter className={columnFilters.startDate ? "text-cyan-500" : "text-gray-400"} />
              </div>
              {activeFilter === 'deadline' && <DateFilterBox />}
            </th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Assigned By</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'assignedTo' ? null : 'assignedTo')}>
                Assigned To <CiFilter className={columnFilters.assignedTo ? "text-cyan-500" : "text-gray-400"} />
              </div>
              {activeFilter === 'assignedTo' && <FilterBox column="assignedTo" dataKey="assignedTo" />}
            </th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center relative">
              <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'priority' ? null : 'priority')}>
                Priority <CiFilter className={columnFilters.priority ? "text-cyan-500" : "text-gray-400"} />
              </div>
              {activeFilter === 'priority' && <FilterBox column="priority" dataKey="priority" />}
            </th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center relative">
              <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'status' ? null : 'status')}>
                Status <CiFilter className={columnFilters.status ? "text-cyan-500" : "text-gray-400"} />
              </div>
              {activeFilter === 'status' && <FilterBox column="status" dataKey="status" />}
            </th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {filteredTasks.map((item, idx) => (
            <tr key={idx} className="hover:bg-accent/30 dark:hover:bg-darkSecBG/20 transition-colors">
              <td className="px-6 py-8 text-[14px] font-medium">{item.id}</td>
              <td className="px-6 py-8 text-[14px]">{item.client}</td>
              <td className="px-6 py-8 text-[14px] text-muted-foreground max-w-[180px]">{item.task}</td>
              <td className="px-6 py-8 text-[14px]">{item.deadline}</td>
              <td className="px-6 py-8 text-[14px]">{item.assignedBy}</td>
              <td className="px-6 py-8 text-[14px]">{item.assignedTo}</td>

              {/* Priority with Dropdown */}
              <td className="px-6 py-8 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className={`inline-flex px-3 py-1 rounded-lg text-[12px] font-bold cursor-pointer hover:opacity-80 transition-opacity items-center gap-1 ${getPriorityStyle(item.priority)}`}>
                      {item.priority} <ChevronDown size={10} />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-card">
                    {["High", "Medium", "Low"].map((p) => (
                      <DropdownMenuItem key={p} onClick={() => updateTask(item.id, "priority", p)} className="font-bold">{p}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              {/* Status Display Only */}
              <td className="px-6 py-8 text-center">
                <span className={`inline-flex px-3 py-1 rounded-lg text-[12px] font-bold ${getStatusStyle(item.status)}`}>
                  {item.status}
                </span>
              </td>

              {/* Actions with Dropdown */}
              <td className="px-6 py-6">
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleViewTask(item)} className="h-9 w-9 border-border"><Eye size={18} /></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" className="h-9 px-2 text-foreground">Status ▾</Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      {["pending", "WIP", "Completed", "Done"].map((s) => (
                        <DropdownMenuItem key={s} onClick={() => s === "Done" ? (setActiveTaskId(item.id), setIsRemarkOpen(true)) : updateTask(item.id, "status", s)} className="capitalize font-bold">{s}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TaskDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} taskData={selectedTask} />
      {isRemarkOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl text-foreground">
            <h3 className="text-lg font-bold mb-4">Remarks</h3>
            <textarea className="w-full h-32 p-3 rounded-lg border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-orange-500" value={remarkText} onChange={(e) => setRemarkText(e.target.value)} />
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setIsRemarkOpen(false)} variant="outline" className="flex-1">Cancel</Button>
              <Button onClick={confirmDone} className="flex-1 bg-orange-500 dark:bg-textTeal hover:bg-orange-600 text-white font-bold h-12">Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}