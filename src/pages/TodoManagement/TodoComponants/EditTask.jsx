import React, { useState, useEffect } from "react";
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

export default function EditTask({ isOpen, onClose, taskData, onUpdateTask }) {
  const [formData, setFormData] = useState({
    id: "",
    client: "",
    task: "",
    deadline: "",
    description: "",
    assignedBy: "",
    assignedTo: "select member",
    priority: "Medium",
    status: "pending",
  });

  useEffect(() => {
    if (taskData) {
      setFormData(taskData);
    }
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    // Basic validation
    if (!formData.task || !formData.client || !formData.assignedBy) {
      alert("Please fill in the required fields.");
      return;
    }
    onUpdateTask(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] md:min-w-2/3 p-0 overflow-hidden rounded-[20px] bg-white dark:bg-darkBG border-none shadow-2xl">
        <DialogHeader className="px-10 py-6 border-b border-gray-100 dark:border-border">
          <DialogTitle className="text-[22px] font-bold text-foreground">
            Edit Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project ID (Disabled because ID shouldn't change) */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
                Project ID
              </label>
              <Input
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled
                className="h-12 rounded-xl border-gray-400 bg-gray-50 dark:bg-gray-800 opacity-60 cursor-not-allowed"
              />
            </div>

            {/* Client Name */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
                Client Name
              </label>
              <Input
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange"
              />
            </div>

            {/* Task Name */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
                Task Name
              </label>
              <Input
                name="task"
                value={formData.task}
                onChange={handleChange}
                className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange"
              />
            </div>

            {/* Deadline */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
                Deadline
              </label>
              <Input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="rounded-xl border-gray-400 dark:border-gray-200 bg-transparent min-h-[100px] focus:ring-1 focus:ring-textOrange"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Assigned By */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
                Assigned By
              </label>
              <Input
                name="assignedBy"
                value={formData.assignedBy}
                onChange={handleChange}
                className="h-12 rounded-xl border-gray-400 dark:border-gray-200 bg-transparent focus:ring-1 focus:ring-textOrange"
              />
            </div>

            {/* Assigned To */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-lightSecText dark:text-darkSecText uppercase tracking-wide">
                Assigned To
              </label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-400 dark:border-gray-200 bg-transparent text-sm outline-none focus:ring-1 focus:ring-textOrange dark:ring-textTeal"
              >
                <option
                  value="select member "
                  className="bg-white dark:bg-blue-950"
                >
                  select member
                </option>
                <option value="Tahira" className="bg-white dark:bg-blue-950">
                  Tahira
                </option>
                <option value="Tabassum" className="bg-white dark:bg-blue-950">
                  Tabassum
                </option>
                <option value="Dipti" className="bg-white dark:bg-blue-950">
                  Dipti
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="px-10 py-8 bg-muted/5 flex justify-center items-center gap-4 sm:justify-center border-t border-gray-100 dark:border-border">
          <Button
            variant="ghost"
            onClick={onClose}
            className="h-12 px-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="h-12 px-12 rounded-xl bg-textOrange dark:bg-teal-500 hover:bg-textOrange/90 text-white font-bold shadow-lg shadow-textOrange/20 transition-all"
          >
            Update Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
