      import React from 'react';
import { Plus, FileDown, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function TaskList() {
 
 const tasks = [
  {
    id: "P-24-M4-T1",
    module: "Requirement Analysis",
    name: "Email Analysis",
    details: "Analysis On Risk...",
    timeline: "0.3 DAYS",
    assignedBy: "ANIK",
    completedBy: "ANIK", // Missing before
    status: "Select Status",
    notes: "SALMAN", // Missing before
    attachment: "DOC.PDF",
    updateForClient: "The Agent Will", // Missing before
    dateOfUpdate: "05/12/2024" // Missing before
  },
  {
    id: "P-24-M4-T2",
    module: "Development Phase",
    name: "Quantum AI 2.0",
    details: "Dashboard Logic...",
    timeline: "1.2 DAYS",
    assignedBy: "AKASH",
    completedBy: "AKASH",
    status: "Select Status",
    notes: "JIHAD",
    attachment: "DASH.PDF",
    updateForClient: "API Pending",
    dateOfUpdate: "06/12/2024"
  },
{
    id: "P-24-M4-T1",
    module: "Requirement Analysis",
    name: "Email Analysis",
    details: "Analysis On Risk...",
    timeline: "0.3 DAYS",
    assignedBy: "ANIK",
    completedBy: "ANIK", // Missing before
    status: "Select Status",
    notes: "SALMAN", // Missing before
    attachment: "DOC.PDF",
    updateForClient: "The Agent Will", // Missing before
    dateOfUpdate: "05/12/2024" // Missing before
  },
  {
    id: "P-24-M4-T2",
    module: "Development Phase",
    name: "Quantum AI 2.0",
    details: "Dashboard Logic...",
    timeline: "1.2 DAYS",
    assignedBy: "AKASH",
    completedBy: "AKASH",
    status: "Select Status",
    notes: "JIHAD",
    attachment: "DASH.PDF",
    updateForClient: "API Pending",
    dateOfUpdate: "06/12/2024"
  },
{
    id: "P-24-M4-T1",
    module: "Requirement Analysis",
    name: "Email Analysis",
    details: "Analysis On Risk...",
    timeline: "0.3 DAYS",
    assignedBy: "ANIK",
    completedBy: "ANIK", // Missing before
    status: "Select Status",
    notes: "SALMAN", // Missing before
    attachment: "DOC.PDF",
    updateForClient: "The Agent Will", // Missing before
    dateOfUpdate: "05/12/2024" // Missing before
  },
  {
    id: "P-24-M4-T2",
    module: "Development Phase",
    name: "Quantum AI 2.0",
    details: "Dashboard Logic...",
    timeline: "1.2 DAYS",
    assignedBy: "AKASH",
    completedBy: "AKASH",
    status: "Select Status",
    notes: "JIHAD",
    attachment: "DASH.PDF",
    updateForClient: "API Pending",
    dateOfUpdate: "06/12/2024"
  }];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-darkSecBG p-4 rounded-2xl border border-border shadow-sm">
 
        <div className="md:flex space-y-2 md:space-y-0 items-center gap-3 w-full sm:w-auto">
          <Button className="flex-1 sm:flex-none bg-orange-400 hover:bg-orange-500 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold h-11 rounded-xl px-6">
            <Plus className="mr-2 h-4 w-4 stroke-[3px]" /> Add Task
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none border-orange-500/50 dark:border-teal-500/50 text-orange-600 dark:text-teal-400 font-bold h-11 rounded-xl px-6">
            <FileDown className="mr-2 h-4 w-4" /> Import From Excel
          </Button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-darkSecBG rounded-[28px] border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-muted/30 dark:bg-muted/5 border-b border-border text-muted-foreground font-black text-[10px] tracking-widest uppercase">
              <th className="px-4 py-5">Task ID</th>
              <th className="px-4 py-5">Module Name</th>
              <th className="px-4 py-5">Task Name</th>
              <th className="px-4 py-5">Task Details</th>
              <th className="px-4 py-5">Estimated Timeline</th>
              <th className="px-4 py-5">Assigned By</th>
              <th className="px-4 py-5">Completed By</th>
              <th className="px-4 py-5 text-center">Status</th>
              <th className="px-4 py-5">Notes</th>
              <th className="px-4 py-5">Attachment</th>
              <th className="px-4 py-5">Update For Client</th>
              <th className="px-4 py-5">Date of Providing Update</th>
             
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-[12px]">
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors">
                <td className="px-4 py-4 font-bold text-muted-foreground">{task.id}</td>
                <td className="px-4 py-4 font-bold text-foreground/80">{task.module}</td>
                <td className="px-4 py-4 font-medium">{task.name}</td>
                <td className="px-4 py-4 text-muted-foreground">{task.details}</td>
                <td className="px-4 py-4 font-black">{task.timeline}</td>
                <td className="px-4 py-4 font-bold">{task.assignedBy}</td>
                <td className="px-4 py-4 font-bold">{task.completedBy}</td>
                <td className="px-4 py-4">
                  <select className="bg-orange-500 dark:bg-teal-600 text-white text-[10px] font-black px-2 py-1.5 rounded-lg border-none outline-none w-full">
                    <option>{task.status} ▾</option>
                  </select>
                </td>
                <td className="px-4 py-4 font-bold">{task.notes}</td>
                <td className="px-4 py-4">
                   <div className="flex items-center gap-1 text-blue-500 font-bold">
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
};

