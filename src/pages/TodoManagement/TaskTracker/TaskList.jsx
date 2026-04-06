import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileDown, Edit, Trash2, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';
import ImportBtn from '@/SharedComponants/ImportBtn';
import ExportBtn from '@/SharedComponants/ExportBtn';
import { CiFilter } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const INITIAL_TASKS = [
  { id: "P-24-M4-T1", module: "Requirement Analysis", name: "Email Analysis", details: "Analysis On Risk...", timeline: "0.3 DAYS", assignedBy: "JIHAD", completedBy: "ANIK", status: "Pending", notes: "SALMAN", attachment: "DOC.PDF", updateForClient: "The Agent Will", dateOfUpdate: "2024-12-05" },
  { id: "P-24-M4-T2", module: "Development Phase", name: "Quantum AI 2.0", details: "Dashboard Logic...", timeline: "1.2 DAYS", assignedBy: "JIHAD", completedBy: "AKASH", status: "WIP", notes: "JIHAD", attachment: "DASH.PDF", updateForClient: "API Pending", dateOfUpdate: "2024-12-06" },
  { id: "P-24-M4-T3", module: "Requirement Analysis", name: "Email Analysis", details: "Analysis On Risk...", timeline: "0.3 DAYS", assignedBy: "JIHAD", completedBy: "ANIK", status: "Pending", notes: "SALMAN", attachment: "DOC.PDF", updateForClient: "The Agent Will", dateOfUpdate: "2024-12-05" },
  { id: "P-24-M4-T4", module: "Development Phase", name: "Quantum AI 2.0", details: "Dashboard Logic...", timeline: "1.2 DAYS", assignedBy: "JIHAD", completedBy: "AKASH", status: "WIP", notes: "JIHAD", attachment: "DASH.PDF", updateForClient: "API Pending", dateOfUpdate: "2024-12-06" },
  { id: "P-24-M4-T5", module: "Requirement Analysis", name: "Email Analysis", details: "Analysis On Risk...", timeline: "0.3 DAYS", assignedBy: "JIHAD", completedBy: "ANIK", status: "Pending", notes: "SALMAN", attachment: "DOC.PDF", updateForClient: "The Agent Will", dateOfUpdate: "2024-12-05" },
  { id: "P-24-M4-T6", module: "Development Phase", name: "Quantum AI 2.0", details: "Dashboard Logic...", timeline: "1.2 DAYS", assignedBy: "JIHAD", completedBy: "AKASH", status: "WIP", notes: "JIHAD", attachment: "DASH.PDF", updateForClient: "API Pending", dateOfUpdate: "2024-12-06" }
];

export default function TaskList() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeFilter, setActiveFilter] = useState(null);
  const [columnFilters, setColumnFilters] = useState({
    id: "", module: "", name: "", assignedBy: "", completedBy: "", status: "", timeline: "", startDate: "", endDate: ""
  });
  
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) setActiveFilter(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setActiveFilter(null);
  };

  const handleStatusUpdate = (id, newStatus) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const filteredTasks = tasks.filter((task) => {
    const idMatch = task.id.toLowerCase().includes(columnFilters.id.toLowerCase());
    const moduleMatch = task.module.toLowerCase().includes(columnFilters.module.toLowerCase());
    const nameMatch = task.name.toLowerCase().includes(columnFilters.name.toLowerCase());
    const assignedByMatch = task.assignedBy.toLowerCase().includes(columnFilters.assignedBy.toLowerCase());
    const completedByMatch = task.completedBy.toLowerCase().includes(columnFilters.completedBy.toLowerCase());
    const statusMatch = task.status.toLowerCase().includes(columnFilters.status.toLowerCase());
    const timelineMatch = task.timeline.toLowerCase().includes(columnFilters.timeline.toLowerCase());
    
    let dateMatch = true;
    if (columnFilters.startDate && columnFilters.endDate) {
      dateMatch = task.dateOfUpdate >= columnFilters.startDate && task.dateOfUpdate <= columnFilters.endDate;
    }

    return idMatch && moduleMatch && nameMatch && assignedByMatch && completedByMatch && statusMatch && dateMatch && timelineMatch;
  });

  const FilterBox = ({ column, dataKey }) => {
    const uniqueOptions = [...new Set(tasks.map(t => t[dataKey]))];
    return (
      <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[999] w-64 left-0 top-full normal-case font-normal text-foreground">
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
              <input type="checkbox" checked={columnFilters[column] === option} readOnly className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer" />
              <span className="text-xs font-medium">{option}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DateFilterBox = () => (
    <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[999] w-72 left-0 top-full flex flex-col gap-3">
        <span className="text-[11px] font-bold uppercase text-muted-foreground px-1">Update Date Range</span>
        <input type="date" value={columnFilters.startDate} onChange={(e) => setColumnFilters({...columnFilters, startDate: e.target.value})} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground" />
        <input type="date" value={columnFilters.endDate} onChange={(e) => setColumnFilters({...columnFilters, endDate: e.target.value})} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground" />
        <div className="flex gap-2 mt-1">
            <Button onClick={() => setActiveFilter(null)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 font-bold">Apply</Button>
            <Button onClick={() => {setColumnFilters({...columnFilters, startDate: "", endDate: ""}); setActiveFilter(null);}} variant="outline" className="flex-1 border-red-200 text-red-500 hover:bg-red-50 text-xs h-9 font-bold">Clear</Button>
        </div>
    </div>
  );
  const handleImport = (excelData) => {
  console.log("Imported Data:", excelData); // Console-e check korun data ashlo kina
  // setMessages(excelData); // State update korle table-e data chole ashbe
  if (excelData && excelData.length > 0) {
      // setMessages(excelData); 
      // Jodi puran data thakbe + notun add hobe emon chan, tobe:
      setTasks((prev) => [...prev, ...excelData]);
    }
};
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-darkSecBG p-4 rounded-2xl border border-border shadow-sm">
        <div className="md:flex space-y-2 md:space-y-0 items-center gap-3 w-full sm:w-auto">
          <Button className="flex-1 sm:flex-none bg-orange-400 hover:bg-orange-500 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold h-11 rounded-xl px-6">
            <Plus className="mr-2 h-4 w-4 stroke-[3px]" /> <Link to="/addtaskmodule">Add Task</Link> 
          </Button>
         <ImportBtn  onDataImported={handleImport}/>
          <ExportBtn data={tasks} fileName="Tasks_List_2026"/>
        </div>
      </div>

      <div className="bg-white dark:bg-darkSecBG rounded-[28px] border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-visible custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead>
              <tr className="bg-muted/30 dark:bg-muted/5 border-b border-border text-muted-foreground font-black text-[10px] tracking-widest uppercase">
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'id' ? null : 'id')}>
                    Task ID <CiFilter className={columnFilters.id ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'id' && <FilterBox column="id" dataKey="id" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'module' ? null : 'module')}>
                    Module Name <CiFilter className={columnFilters.module ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'module' && <FilterBox column="module" dataKey="module" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'name' ? null : 'name')}>
                    Task Name <CiFilter className={columnFilters.name ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'name' && <FilterBox column="name" dataKey="name" />}
                </th>
                <th className="px-4 py-5">Task Details</th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'timeline' ? null : 'timeline')}>
                    Timeline <CiFilter className={columnFilters.timeline ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'timeline' && <FilterBox column="timeline" dataKey="timeline" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'assignedBy' ? null : 'assignedBy')}>
                    Assigned By <CiFilter className={columnFilters.assignedBy ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'assignedBy' && <FilterBox column="assignedBy" dataKey="assignedBy" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'completedBy' ? null : 'completedBy')}>
                    Completed By <CiFilter className={columnFilters.completedBy ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'completedBy' && <FilterBox column="completedBy" dataKey="completedBy" />}
                </th>
                <th className="px-4 py-5 text-center relative">
                  <div className="flex items-center justify-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'status' ? null : 'status')}>
                    Status <CiFilter className={columnFilters.status ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'status' && <FilterBox column="status" dataKey="status" />}
                </th>
                <th className="px-4 py-5">Notes</th>
                <th className="px-4 py-5">Attachment</th>
                <th className="px-4 py-5">Update Client</th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}>
                    Update Date <CiFilter className={columnFilters.startDate ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'date' && <DateFilterBox />}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[12px]">
              {filteredTasks.map((task, index) => (
                <tr key={index} className="hover:bg-muted/5 transition-colors">
                  <td className="px-4 py-4 font-bold text-muted-foreground">{task.id}</td>
                  <td className="px-4 py-4 font-bold text-foreground/80">{task.module}</td>
                  <td className="px-4 py-4 font-medium">{task.name}</td>
                  <td className="px-4 py-4 text-muted-foreground max-w-[150px] truncate">{task.details}</td>
                  <td className="px-4 py-4 font-black">{task.timeline}</td>
                  <td className="px-4 py-4 font-bold">{task.assignedBy}</td>
                  <td className="px-4 py-4 font-bold">{task.completedBy}</td>
                  <td className="px-4 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className={`text-white text-[10px] font-black px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-opacity hover:opacity-90 ${task.status === 'WIP' ? 'bg-blue-500' : task.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500 dark:bg-teal-600'}`}>
                          {task.status} <ChevronDown size={10} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="bg-white dark:bg-darkSecBG border-border">
                        {['Pending', 'WIP', 'Completed'].map((s) => (
                          <DropdownMenuItem key={s} onClick={() => handleStatusUpdate(task.id, s)} className="text-[11px] font-bold cursor-pointer">
                            {s}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-4 py-4 font-bold">{task.notes}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-blue-500 font-bold cursor-pointer hover:underline">
                      <ExternalLink size={12} /> {task.attachment}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{task.updateForClient}</td>
                  <td className="px-4 py-4 font-semibold">{task.dateOfUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}