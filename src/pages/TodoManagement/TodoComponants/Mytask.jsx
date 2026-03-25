import React, { useState } from 'react';
import { Eye, ChevronDown, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import TaskDetails from './TaskDetails'; // TaskDetails file-er path-ti check kore nio

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
  { id: "PRJ-001", client: "Shahriar", task: "Operation Dashboard", deadline: "Mar 30, 2026", assignedBy: "Jihad", assignedTo: "Tahira", priority: "High", status: "in-progress", description: "Operation dashboard UI implementation", remarks: "N/A", assignedDate: "Mar 20, 2026" },
  { id: "PRJ-002", client: "Tahira", task: "UI Refinement", deadline: "Apr 05, 2026", assignedBy: "Jihad", assignedTo: "Tahira", priority: "Medium", status: "pending", description: "Refining UI components", remarks: "N/A", assignedDate: "Mar 22, 2026" },
  { id: "PRJ-003", client: "Mehedi", task: "API Integration", deadline: "Apr 10, 2026", assignedBy: "Shahriar", assignedTo: "Tahira", priority: "Low", status: "pending", description: "Backend API integration", remarks: "N/A", assignedDate: "Mar 25, 2026" }
];

export default function Mytask() {
  const [tasks, setTasks] = useState(MY_TASK_DATA);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTask = (id, field, value) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Priority styling logic
  const getPriorityStyle = (priority) => {
    if (priority === 'High') return 'bg-destructive/10 text-destructive border border-destructive/20';
    if (priority === 'Medium') return 'bg-textOrange/10 text-textOrange border border-textOrange/20';
    return 'bg-textTeal/10 text-textTeal border border-textTeal/20';
  };

  // Status styling logic
  const getStatusStyle = (status) => {
    if (status === 'in-progress') return 'bg-textTeal/10 text-textTeal border border-textTeal/20';
    if (status === 'completed') return 'bg-textGreen/10 text-textGreen border border-textGreen/20';
    return 'bg-textOrange/10 text-textOrange border border-textOrange/20';
  };

  return (
    <div className="w-full bg-background dark:bg-darkBG rounded-[20px] shadow-sm border border-border overflow-x-auto overflow-y-visible transition-all duration-300">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-border bg-muted/20 dark:bg-darkBG">
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Project ID</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Client</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Task</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Priority</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {tasks.map((item) => (
            <tr key={item.id} className="hover:bg-accent/30 dark:hover:bg-darkSecBG/20 transition-colors group">
              <td className="px-6 py-6 text-[14px] text-muted-foreground group-hover:text-foreground">{item.id}</td>
              <td className="px-6 py-6 text-[14px] font-medium text-foreground">{item.client}</td>
              <td className="px-6 py-6 text-[14px] text-lightSecText dark:text-darkSecText leading-tight max-w-[200px] truncate">{item.task}</td>

              {/* Priority Cell */}
              <td className="px-6 py-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`inline-flex items-center justify-between px-4 py-2 rounded-lg text-[12px] font-bold min-w-[110px] h-9 gap-1
                      ${getPriorityStyle(item.priority)}`}>
                      {item.priority}
                      <ChevronDown size={14} className="opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32 bg-card rounded-xl shadow-xl">
                    <DropdownMenuLabel className="text-[11px] text-muted-foreground font-bold uppercase tracking-wide">Set Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {['High', 'Medium', 'Low'].map(p => (
                      <DropdownMenuItem key={p} onClick={() => updateTask(item.id, 'priority', p)} className="text-[13px] font-medium py-2.5">
                        {p}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              {/* Status Cell */}
              <td className="px-6 py-6 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`inline-flex items-center justify-between px-4 py-2 rounded-lg text-[12px] font-bold min-w-[125px] h-9 gap-1
                      ${getStatusStyle(item.status)} capitalize`}>
                      {item.status}
                      <ChevronDown size={14} className="opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 bg-card rounded-xl shadow-xl">
                    <DropdownMenuLabel className="text-[11px] text-muted-foreground font-bold uppercase tracking-wide">Update Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {['pending', 'in-progress', 'completed'].map(s => (
                      <DropdownMenuItem key={s} onClick={() => updateTask(item.id, 'status', s)} className="text-[13px] font-medium py-2.5 capitalize">
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              {/* Actions Cell */}
              <td className="px-6 py-6 action-cell">
                <div className="flex items-center justify-center gap-3">
                  {/* Link bad diye onClick handler add kora hoyeche */}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleViewTask(item)}
                    className="h-9 w-9 rounded-lg border-border hover:text-textTeal hover:bg-textTeal/5 text-muted-foreground"
                  >
                    <Eye size={18} />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-textGreen hover:bg-textGreen/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all shadow-sm">
                        Done <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-card rounded-xl shadow-2xl p-1.5">
                      <DropdownMenuItem onClick={() => updateTask(item.id, 'status', 'completed')} className="flex items-center gap-2 py-3 text-textGreen font-semibold">
                        <CheckCircle2 size={16} /> Mark as Finished
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert("Notes added!")} className="flex items-center gap-2 py-3 text-muted-foreground font-medium">
                        <Clock size={16} /> Add Extension
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="border-border my-1" />
                      <DropdownMenuItem className="flex items-center gap-2 py-3 text-destructive font-semibold">
                        <AlertTriangle size={16} /> Report Issue
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TaskDetails Modal-ti ekhane add kora hoyeche */}
      <TaskDetails 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskData={selectedTask} 
      />
    </div>
  );
}