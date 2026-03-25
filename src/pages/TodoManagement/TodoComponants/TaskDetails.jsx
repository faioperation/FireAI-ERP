import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; 
import { cn } from "@/lib/utils";

export default function TaskDetails({ isOpen, onClose, taskData }) {
  // taskData jodi null thake (modal open hobar age), tahole empty object handle korbe
  const data = taskData || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" min-w-2/3 p-0 overflow-hidden rounded-[20px] bg-white dark:bg-darkBG border-none shadow-2xl">
        
        {/* Header Section */}
        <DialogHeader className="px-8 py-6 border-b border-gray-100 dark:border-border">
          <DialogTitle className="text-[20px] font-bold text-foreground">
            Task Details
          </DialogTitle>
          <DialogDescription className="text-[14px] text-muted-foreground mt-0.5">
            Complete information about the task
          </DialogDescription>
        </DialogHeader>

        {/* Content Section */}
        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* Grid for ID, Client, Assigned By/To */}
          <div className="grid grid-cols-2 gap-y-10">
            <DataField label="Project ID" value={data.id} />
            <DataField label="Client Name" value={data.client} />
            <DataField label="Assigned By" value={data.assignedBy || "N/A"} />
            <DataField label="Assigned To" value={data.assignedTo || "Me"} />
          </div>

          {/* Full Width Task Name - data.task use kora hoyeche Mytask table er sathe milate */}
          <DataField label="Task Name" value={data.task} valueClassName="text-[16px]" />

          {/* Description */}
          <DataField 
            label="Description" 
            value={data.description || "No description provided."} 
            valueClassName="text-[14px] font-normal text-foreground/80 leading-relaxed" 
          />

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-y-10">
            <DataField label="Deadline" value={data.deadline} />
            <DataField label="Assigned Date" value={data.assignedDate || "N/A"} />
          </div>

          {/* Badges Section */}
          <div className="flex gap-24">
            <section>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] block mb-3">
                Status
              </label>
              <span className={cn(
                "text-white px-5 py-1.5 rounded-md text-[12px] font-bold shadow-sm capitalize",
                data.status === 'completed' ? "bg-textGreen" : "bg-[#3B82F6]"
              )}>
                {data.status}
              </span>
            </section>
            <section>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] block mb-3">
                Priority
              </label>
              <span className={cn(
                "text-white px-7 py-1.5 rounded-md text-[12px] font-bold shadow-sm",
                data.priority === 'High' ? "bg-destructive" : "bg-textTeal"
              )}>
                {data.priority}
              </span>
            </section>
          </div>

          {/* Remarks */}
          <DataField 
            label="Remarks" 
            value={data.remarks || "No remarks."} 
            valueClassName="text-[14px] font-normal text-foreground/80 leading-relaxed" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DataField({ label, value, valueClassName = "" }) {
  return (
    <section>
      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
        {label}
      </label>
      <p className={cn("text-[15px] font-medium mt-2.5 text-foreground", valueClassName)}>
        {value || "—"}
      </p>
    </section>
  );
}