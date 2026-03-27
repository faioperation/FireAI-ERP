import React from 'react';
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

export default function CreateTask({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="max-w-[800px] md:min-w-2/3 p-0  mt-20 md:mt-0 overflow-hidden rounded-[20px] bg-white dark:bg-darkBG border-none shadow-2xl">
        
        {/* Header */}
        <DialogHeader className="px-10 py-6 border-b border-gray-100 dark:border-gray-400  dark:border-gray-200">
          <DialogTitle className="text-[22px] font-bold text-foreground">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        

        {/* Form Content */}
        <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project ID */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold  text-lightSecText dark:text-darkSecText uppercase tracking-wide">Project ID</label>
              <Input placeholder="PRJ-001" className="h-12 rounded-xl border-gray-400  dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            {/* Client Name */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Client Name</label>
              <Input placeholder="Jihad" className="h-12 rounded-xl border-gray-400  dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            {/* Task Name */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold  text-lightSecText dark:text-darkSecText uppercase tracking-wide">Task Name</label>
              <Input placeholder="Dashboard design" className="h-12 rounded-xl border-gray-400  dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            {/* Deadline */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold  text-lightSecText dark:text-darkSecText uppercase tracking-wide">Deadline</label>
              <Input type="date" className="h-12 rounded-xl border-gray-400  dark:border-gray-200 bg-transparent  focus:ring-1 focus:ring-textOrange" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">Description</label>
            <Textarea 
              placeholder="Create a modern dashboard interface with analytics components" 
              className="rounded-xl border-gray-400  dark:border-gray-200 bg-transparent min-h-[100px] focus:ring-1 focus:ring-textOrange" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Assigned By */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold  text-lightSecText dark:text-darkSecText uppercase tracking-wide">Assigned By</label>
               <Input placeholder="Assigning Leader" className="h-12 rounded-xl border-gray-400  dark:border-gray-200  bg-transparent focus:ring-1 focus:ring-textOrange" />
            </div>

            {/* Assigned To */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold  text-lightSecText dark:text-darkSecText uppercase tracking-wide">Assigned To</label>
              <select className="w-full h-12 px-4 rounded-xl border border-gray-400  dark:border-gray-200 bg-transparent text-sm outline-none focus:ring-1 focus focus:ring-textOrange dark:focus:ring-teal-300">
                <option className='bg-white dark:bg-blue-950 ' >select member</option>
                <option className='bg-white dark:bg-blue-950 ' >Tahira</option>
                <option className='bg-white dark:bg-blue-950 ' >Tabassum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="px-10 py-8 bg-muted/5 flex justify-center items-center gap-4 sm:justify-center">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="h-12 px-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all"
          >
            Cancel
          </Button>
          <Button 
            className="h-12 px-12 rounded-xl bg-textOrange dark:bg-teal-500 hover:bg-textOrange/90 text-white font-bold shadow-lg shadow-textOrange/20 transition-all"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}