import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function OrderEditModal({ isOpen, onClose, onSubmit, editData }) {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState(editData);

  // Edit data change hole state update hobe
  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const inputBaseClass = `py-5.5 rounded-xl border w-full transition-all outline-none ${
    theme === "dark"
      ? "bg-[#111827] border-gray-800 text-white focus:border-[#00d2ff]/80 placeholder:text-gray-500"
      : "bg-white border-gray-200 text-gray-900 focus:border-orange-500 placeholder:text-gray-400"
  }`;

  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[850px] w-[95vw] h-auto max-h-[92vh] overflow-y-auto rounded-2xl border-none p-0 shadow-2xl transition-colors duration-300
        ${theme === "dark" ? "bg-[#0B0F1A] text-white" : "bg-white text-gray-900"}
        [&::-webkit-scrollbar]:hidden`}
      >
        <DialogHeader className="px-6 pb-4 pt-6">
          <DialogTitle className="text-xl font-bold">Edit Order: {formData.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="px-6 pb-6 pt-0 md:px-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Client Name*</Label>
              <Input
                value={formData.client}
                className={inputBaseClass}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm opacity-70">Project ID*</Label>
              <Input
                value={formData.projectId}
                className={inputBaseClass}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm opacity-70">Total Value</Label>
              <Input
                value={formData.totalValue}
                className={inputBaseClass}
                onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm opacity-70">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger className={inputBaseClass}>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className={theme === "dark" ? "bg-[#111827] text-white border-gray-800" : ""}>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) => setFormData({ ...formData, priority: v })}
              >
                <SelectTrigger className={inputBaseClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={theme === "dark" ? "bg-[#111827] text-white border-gray-800" : ""}>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm opacity-70">Deadline</Label>
              <Input
                value={formData.deadline}
                className={inputBaseClass}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button type="button" variant="outline" onClick={onClose} className="px-12 py-5.5 rounded-xl font-bold w-full sm:w-[180px]">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#F97316] text-white px-12 py-5.5 rounded-xl font-bold w-full sm:w-[180px]">
              Update Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}