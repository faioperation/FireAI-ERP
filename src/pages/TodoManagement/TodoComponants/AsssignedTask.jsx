import React, { useState } from 'react';
import { Eye, ChevronDown, CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';
import TaskDetails from './TaskDetails';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const MY_TASK_DATA = [
  { id: "PRJ-001", client: "Shahriar", task: "Operation Dashboard", deadline: "Mar 30, 2026", assignedBy: "Jihad", assignedTo: "Tahira", priority: "High", status: "in-progress", description: "Operation dashboard UI implementation", remarks: "N/A", assignedDate: "Mar 20, 2026" },
  { id: "PRJ-002", client: "Tahira", task: "UI Refinement", deadline: "Apr 05, 2026", assignedBy: "Jihad", assignedTo: "Tahira", priority: "Medium", status: "pending", description: "Refining UI components", remarks: "N/A", assignedDate: "Mar 22, 2026" },
  { id: "PRJ-003", client: "Mehedi", task: "API Integration", deadline: "Apr 10, 2026", assignedBy: "Shahriar", assignedTo: "Tahira", priority: "Low", status: "pending", description: "Backend API integration", remarks: "N/A", assignedDate: "Mar 25, 2026" }
];

export default function AssignedTask() {
  const [tasks, setTasks] = useState(MY_TASK_DATA);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Remark Modal States
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [remarkText, setRemarkText] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // Corrected Update Function (Using item.id)
  const updateTask = (id, field, value) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDoneClick = (id) => {
    setActiveTaskId(id);
    setIsRemarkOpen(true);
  };

  const confirmDone = () => {
    if (activeTaskId) {
      updateTask(activeTaskId, 'status', 'completed');
      updateTask(activeTaskId, 'remarks', remarkText);
      setIsRemarkOpen(false);
      setRemarkText("");
      setActiveTaskId(null);
    }
  };

  return (
    <div className="w-full bg-background dark:bg-darkBG rounded-[20px] shadow-sm border border-border overflow-x-auto overflow-y-visible transition-all duration-300 relative">
      
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-border bg-muted/20 dark:bg-darkBG">
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Project ID</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Client Name</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Task Name</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest">Deadline</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Priority</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-5 text-[11px] font-bold text-muted-foreground dark:text-darkSecText uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {tasks.map((item) => (
            <tr key={item.id} className="hover:bg-accent/30 dark:hover:bg-darkSecBG/20 transition-colors group">
              <td className="px-6 py-8 text-[14px] font-medium">{item.id}</td>
              <td className="px-6 py-8 text-[14px]">{item.client}</td>
              <td className="px-6 py-8 text-[14px] text-muted-foreground max-w-[180px]">{item.task}</td>
              <td className="px-6 py-8 text-[14px]">{item.deadline}</td>
              
              {/* Priority Dropdown Fix */}
              <td className="px-6 py-8 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-[12px] font-bold min-w-[90px] h-8 
                      ${item.priority === 'High' ? 'bg-[#fa3636] text-white' : 'bg-textOrange text-white'}`}>
                      {item.priority}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card">
                    {['High', 'Medium', 'Low'].map(p => (
                      <DropdownMenuItem  key={p} onClick={() => updateTask(item.id, 'priority', p)}>
                        <div className='underline'>  {p} </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              {/* Status Dropdown Fix */}
              <td className="px-6 py-8 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-[12px] font-bold min-w-[110px] h-8 text-white 
                      ${item.status === 'completed' ? 'bg-textGreen' : 'bg-[#3B82F6]'}`}>
                      {item.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card">
                    {['pending', 'in-progress', 'completed'].map(s => (
                      <DropdownMenuItem  className='underline' key={s} onClick={() => updateTask(item.id, 'status', s)}>
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>

              <td className="px-6 py-6">
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => handleViewTask(item)} className="h-9 w-9 rounded-lg border-border hover:text-textTeal">
                    <Eye size={18} />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-textGreen hover:bg-textGreen/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold flex items-center gap-2">
                        Done <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-card shadow-xl p-1.5">
                      <DropdownMenuItem onClick={() => handleDoneClick(item.id)} className="flex items-center gap-2 py-3 text-textGreen font-semibold cursor-pointer hover:bg-muted">
                        <CheckCircle2 size={16} /> Mark as Finished
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 py-3 text-muted-foreground font-medium cursor-pointer hover:bg-muted">
                        <Clock size={16} /> Add Extension
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 py-3 text-destructive font-semibold cursor-pointer hover:bg-muted">
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

      {/* --- Remarks Modal (Popup) --- */}
      {isRemarkOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Remarks</h3>
              <button onClick={() => setIsRemarkOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <textarea 
              className="w-full h-32 p-4 rounded-xl border border-border bg-muted/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none text-sm"
              placeholder="Write your remarks here..."
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
            />

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={confirmDone}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl text-md font-bold transition-all shadow-lg"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedTask && (
        <TaskDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} taskData={selectedTask} />
      )}
    </div>
  );
}