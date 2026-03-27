import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateTask({ isOpen, onClose, onAddTask }) {
  // Local state for form fields

  const [formData, setFormData] = useState({
    id: '', client: '', task: '', deadline: '', 
    description: '', assignedBy: '', assignedTo: 'select member',
    priority: 'Medium', status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (
      !formData.id || 
      !formData.client || 
      !formData.task || 
      !formData.deadline || 
      !formData.description || 
      !formData.assignedBy || 
      formData.assignedTo === 'select member'
    ) {
      alert("Please fill in all fields before creating a task.");
      return; // Error thakle ekhanei theme jabe, data add hobe na
    } 
    onAddTask(formData); // Parent component-e data pathano
    onClose(); // Modal bondho kora
    setFormData({ id: '', client: '', task: '', deadline: '', description: '', assignedBy: '', assignedTo: 'select member', priority: 'Medium', status: 'pending' }); // Reset
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="max-w-[800px] md:min-w-2/3 p-0 mt-20 md:mt-0 overflow-hidden rounded-[20px] bg-white dark:bg-darkBG border-none shadow-2xl">
        
        <DialogHeader className="px-10 py-6 border-b border-gray-100 dark:border-gray-400 dark:border-gray-200">
          <DialogTitle className="text-[22px] font-bold text-foreground">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Project ID</label>
              <Input name="id" value={formData.id} onChange={handleChange} placeholder="PRJ-001" className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Client Name</label>
              <Input name="client" value={formData.client} onChange={handleChange} placeholder="Jihad" className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Task Name</label>
              <Input name="task" value={formData.task} onChange={handleChange} placeholder="Dashboard design" className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Deadline</label>
              <Input name="deadline" type="date" value={formData.deadline} onChange={handleChange} className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Description</label>
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Create a modern dashboard interface..." className="rounded-xl border-gray-400 dark:border-gray-200 bg-transparent min-h-[100px] focus:ring-1 focus:ring-textOrange" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Assigned By</label>
               <Input name="assignedBy" value={formData.assignedBy} onChange={handleChange} placeholder="Assigning Leader" className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Assigned To</label>
              <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-400 dark:border-gray-200 bg-transparent text-sm outline-none focus:ring-1 focus:ring-textOrange dark:focus:ring-teal-300">
                <option value="select member">select member</option>
                <option value="Tahira">Tahira</option>
                <option value="Tabassum">Tabassum</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter className="px-10 py-8 bg-muted/5 flex justify-center items-center gap-4 sm:justify-center">
          <Button variant="ghost" onClick={onClose} className="h-12 px-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all">
            Cancel
          </Button>
          <Button onClick={handleCreate} className="h-12 px-12 rounded-xl bg-textOrange dark:bg-teal-500 hover:bg-textOrange/90 text-white font-bold shadow-lg shadow-textOrange/20 transition-all">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}