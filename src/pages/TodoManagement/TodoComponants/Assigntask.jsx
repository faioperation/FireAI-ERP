import React, { useState, useRef, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DynamicButton from "@/SharedComponants/DynamicButton";
import TaskDetails from "./TaskDetails";
import EditTask from "./EditTask";
import ImportBtn from "@/SharedComponants/ImportBtn";
import ExportBtn from "@/SharedComponants/ExportBtn";
import { Link } from "react-router";
import { CiFilter } from "react-icons/ci";

const ASSIGN_TASK_DATA = [
  {
    id: "PRJ-001",
    client: "Shahriar",
    task: "Operation Dashboard",
    deadline: "2026-03-30",
    assignedBy: "Jihad",
    assignedTo: "Dipti", 
    priority: "High",
    status: "Pending",
  },
  {
    id: "PRJ-002",
    client: "Tahira",
    task: "UI Refinement",
    deadline: "2026-04-05",
    assignedBy: "Jihad",
    assignedTo: "Dipti",
    priority: "Medium",
    status: "WIP",
  },
];

export default function Assigntask() {
  const [tasks, setTasks] = useState(ASSIGN_TASK_DATA);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 

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

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-orange-500 hover:bg-orange-600',
      'WIP': 'bg-blue-500 hover:bg-blue-600',
      'Completed': 'bg-green-500 hover:bg-green-600',
    };
    return colors[status] || 'bg-gray-500';
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };

  const updateTask = (id, field, value) => {
    setTasks((prev) =>
      prev.map((t, index) => (index === id ? { ...t, [field]: value } : t)),
    );
  };

  // Filter Logic
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

  // Enter key press korle box bondho hobe
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setActiveFilter(null);
    }
  };

  const FilterBox = ({ column, dataKey }) => {
    const uniqueOptions = [...new Set(tasks.map(t => t[dataKey]))];
    return (
      <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[999] w-64 left-0 top-full normal-case font-normal">
        <input
          autoFocus type="text" placeholder="Search..."
          value={columnFilters[column]}
          onKeyDown={handleKeyDown}
          onChange={(e) => setColumnFilters({ ...columnFilters, [column]: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-[#111827] text-foreground outline-none focus:ring-1 focus:ring-blue-500 mb-3"
        />
        <div className="flex justify-between items-center px-1 text-[11px] font-bold uppercase mb-3">
          <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" onClick={() => setColumnFilters({...columnFilters, [column]: ""})}>Select All</span>
          <span className="text-red-500 cursor-pointer hover:underline" onClick={() => { setColumnFilters({...columnFilters, [column]: ""}); setActiveFilter(null); }}>Clear</span>
        </div>
        <div className="max-h-[160px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {uniqueOptions.filter(opt => opt.toLowerCase().includes(columnFilters[column].toLowerCase())).map((option, idx) => (
            <div key={idx} className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                 onClick={() => setColumnFilters({ ...columnFilters, [column]: columnFilters[column] === option ? "" : option })}>
              <input type="checkbox" checked={columnFilters[column] === option} readOnly className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{option}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DateFilterBox = () => (
    <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[999] w-72 left-0 top-full flex flex-col gap-3">
        <span className="text-[11px] font-bold uppercase text-muted-foreground px-1">Filter by Deadline</span>
        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground"><option>Between Dates</option></select>
        <div className="space-y-2">
            <input type="date" value={columnFilters.startDate} onChange={(e) => setColumnFilters({...columnFilters, startDate: e.target.value})} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground" />
            <input type="date" value={columnFilters.endDate} onChange={(e) => setColumnFilters({...columnFilters, endDate: e.target.value})} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground" />
        </div>
        <div className="flex gap-2 mt-1">
            <Button onClick={() => setActiveFilter(null)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 font-bold">Apply Filter</Button>
            <Button onClick={() => {setColumnFilters({...columnFilters, startDate: "", endDate: ""}); setActiveFilter(null);}} variant="outline" className="flex-1 border-red-200 text-red-500 hover:bg-red-50 text-xs h-9 font-bold">Clear</Button>
        </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-0">
      <div className="sm:flex space-y-2 sm:gap-3 justify-end mb-8">
        <Link to="/newtask"><DynamicButton label="New Task" /></Link>
        <ImportBtn/><ExportBtn/>
      </div>
      <div className="w-full bg-white dark:bg-darkBG rounded-[20px] shadow-sm border border-gray-200 dark:border-border overflow-x-auto overflow-y-visible transition-all duration-300">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-border bg-gray-50/50 dark:bg-darkBG">
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
                <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'id' ? null : 'id')}>
                  Project ID <CiFilter className={columnFilters.id ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'id' && <FilterBox column="id" dataKey="id" />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
                <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'client' ? null : 'client')}>
                  Client Name <CiFilter className={columnFilters.client ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'client' && <FilterBox column="client" dataKey="client" />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Task Name</th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
                <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'deadline' ? null : 'deadline')}>
                  Deadline <CiFilter className={columnFilters.startDate ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'deadline' && <DateFilterBox />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
                <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'assignedBy' ? null : 'assignedBy')}>
                   Assigned By <CiFilter className={columnFilters.assignedBy ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'assignedBy' && <FilterBox column="assignedBy" dataKey="assignedBy" />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest relative">
                <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'assignedTo' ? null : 'assignedTo')}>
                  Assigned To <CiFilter className={columnFilters.assignedTo ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'assignedTo' && <FilterBox column="assignedTo" dataKey="assignedTo" />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center relative">
                <div className="flex items-center justify-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'priority' ? null : 'priority')}>
                  Priority <CiFilter className={columnFilters.priority ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'priority' && <FilterBox column="priority" dataKey="priority" />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center relative">
                <div className="flex items-center justify-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={() => setActiveFilter(activeFilter === 'status' ? null : 'status')}>
                  Status <CiFilter className={columnFilters.status ? "text-blue-500" : "text-gray-400"} />
                </div>
                {activeFilter === 'status' && <FilterBox column="status" dataKey="status" />}
              </th>
              <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-border/50">
            {filteredTasks.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-darkSecBG/20 transition-colors group">
                <td className="px-6 py-8 text-[14px] font-medium text-foreground">{item.id}</td>
                <td className="px-6 py-8 text-[14px] text-foreground">{item.client}</td>
                <td className="px-6 py-8 text-[14px] text-muted-foreground leading-tight max-w-[180px] font-medium">{item.task}</td>
                <td className="px-6 py-8 text-[14px] text-foreground font-medium">{item.deadline}</td>
                <td className="px-6 py-8 text-[14px] text-foreground">{item.assignedBy}</td>
                <td className="px-6 py-8 text-[14px] text-foreground">{item.assignedTo}</td>

                <td className="px-6 py-8 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-[12px] font-bold min-w-[100px] h-9 gap-1 text-white shadow-sm ${item.priority === "High" ? "bg-[#fa3636] hover:bg-[#f32d0a]" : "bg-textOrange"}`}>
                        {item.priority}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-card">
                      {["High", "Medium", "Low"].map((p) => (
                        <DropdownMenuItem key={p} onClick={() => updateTask(idx, "priority", p)} className="font-medium cursor-pointer">{p}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="px-6 py-8 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-[12px] font-bold min-w-[120px] h-9 text-white shadow-sm ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-card">
                      {["Pending", "WIP", "Completed"].map((s) => (
                        <DropdownMenuItem key={s} onClick={() => updateTask(idx, "status", s)} className="capitalize font-medium cursor-pointer">{s}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="px-6 py-8">
                  <div className="flex items-center justify-center gap-4">
                    <button onClick={() => {setSelectedTask(item); setIsDetailsOpen(true);}} className="text-gray-400 hover:text-blue-500 transition-colors"><Eye size={19} /></button>
                    <button onClick={() => {setEditingTask(item); setIsEditOpen(true);}} className="text-gray-400 hover:text-teal-500 transition-colors"><Edit size={19} /></button>
                    <button onClick={() => {if(window.confirm("Delete this task?")) setTasks(prev => prev.filter((_, i) => i !== idx))}} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={19} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TaskDetails isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} taskData={selectedTask} />
      <EditTask isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} taskData={editingTask} onUpdateTask={handleUpdateTask} />
    </div>
  );
}