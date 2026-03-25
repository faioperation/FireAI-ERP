import React, { useState } from 'react';
import { Eye, Edit, Trash2, ChevronDown, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DynamicButton from '@/SharedComponants/DynamicButton';

const ASSIGN_TASK_DATA = [
  {
    id: "PRJ-001",
    client: "Shahriar",
    task: "Operation Dashboard",
    deadline: "Mar 30, 2026",
    assignedBy: "Jihad",
    assignedTo: "Dipti",
    priority: "High",
    status: "in-progress"
  },
  {
    id: "PRJ-001",
    client: "Shahriar",
    task: "Operation Dashboard",
    deadline: "Mar 30, 2026",
    assignedBy: "Jihad",
    assignedTo: "Dipti",
    priority: "High",
    status: "in-progress"
  }
];

export default function Assigntask({label}) {
  const [tasks, setTasks] = useState(ASSIGN_TASK_DATA);

  const updateTask = (id, field, value) => {
    setTasks(prev => prev.map((t, index) => index === id ? { ...t, [field]: value } : t));
  };

  return (
   <div>
    <div className='flex justify-end mb-8'>
        <DynamicButton label='New Task'></DynamicButton>
    </div>
     <div className="w-full bg-background dark:bg-darkBG rounded-[20px] shadow-sm border border-border overflow-x-auto transition-all duration-300">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="border-b border-border bg-muted/20 dark:bg-darkBG">
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-nowrap">Project ID</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-nowrap">Client Name</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-nowrap">Task Name</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-nowrap">Deadline</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-nowrap">Assigned By</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-nowrap">Assigned To</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Priority</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {tasks.map((item, idx) => (
            <tr key={idx} className="hover:bg-accent/30 dark:hover:bg-darkSecBG/20 transition-colors group">
              <td className="px-6 py-8 text-[14px] font-medium text-foreground">{item.id}</td>
              <td className="px-6 py-8 text-[14px] text-foreground">{item.client}</td>
              <td className="px-6 py-8 text-[14px] text-muted-foreground leading-tight max-w-[180px]">
                {item.task}
              </td>
              <td className="px-6 py-8 text-[14px] text-foreground">{item.deadline}</td>
              <td className="px-6 py-8 text-[14px] text-foreground">{item.assignedBy}</td>
              <td className="px-6 py-8 text-[14px] text-foreground">{item.assignedTo}</td>
              
              {/* Priority Dropdown */}
              <td className="px-6 py-8 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`inline-flex items-center justify-center px-6 py-2 rounded-lg text-[12px] font-bold min-w-[100px] h-9 gap-1
                      ${item.priority === 'High' ? 'bg-[#fa3636] text-white hover:bg-[#f32d0a]' : 'bg-textOrange text-white'}`}>
                      {item.priority}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-card">
                    {['High', 'Medium', 'Low'].map(p => (
                      <DropdownMenuItem key={p} onClick={() => updateTask(idx, 'priority', p)}>
                        {p}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              {/* Status Dropdown */}
              <td className="px-6 py-8 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="inline-flex items-center justify-center px-6 py-2 rounded-lg text-[12px] font-bold min-w-[120px] h-9 bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                      {item.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-card">
                    {['pending', 'in-progress', 'completed'].map(s => (
                      <DropdownMenuItem key={s} onClick={() => updateTask(idx, 'status', s)} className="capitalize">
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              {/* Actions */}
              <td className="px-6 py-8">
                <div className="flex items-center justify-center gap-4">
                  <button className="text-foreground/70 hover:text-foreground transition-colors">
                    <Eye size={20} />
                  </button>
                  <button className="text-foreground/70 hover:text-textTeal transition-colors">
                    <Edit size={19} />
                  </button>
                  <button className="text-foreground/70 hover:text-destructive transition-colors">
                    <Trash2 size={19} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </div>
  );
}