import React, { useState, useContext, useRef } from "react";
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
import { Upload, BadgePlus, Trash2 } from "lucide-react";
import OverviewDescription from "@/SharedComponants/OverviewDescription";

export default function OrderCreateModal({ isOpen, onClose, onSubmit }) {
  const { theme } = useContext(ThemeContext);
  const fileInputRef = useRef(null);

  // Initial Form State
  const initialState = {
    projectId: "",
    clientName: "",
    projectName: "",
    totalTimeline: "",
    orderId: "",
    serviceType: "",
    totalValue: "",
    team: "",
    assignTo: "",
    priority: "",
    status: "",
    startDate: "",
    deadline: "",
    phases: [],
    files: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [currentPhase, setCurrentPhase] = useState({
    name: "",
    timeline: "",
    value: "",
  });

  // Input styling based on theme
  const inputBaseClass = `py-5.5 rounded-xl border w-full transition-all outline-none ${
    theme === "dark"
      ? "bg-[#111827] border-gray-800 text-white focus:border-[#00d2ff]/80 placeholder:text-gray-500"
      : "bg-white border-gray-200 text-gray-900 focus:border-orange-500 placeholder:text-gray-400"
  }`;

  const calendarIconClass =
    theme === "dark" ? "[&::-webkit-calendar-picker-indicator]:invert" : "";

  // Handlers
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...uploadedFiles],
    }));
  };

  const handleAddPhase = () => {
    if (currentPhase.name) {
      setFormData((prev) => ({
        ...prev,
        phases: [...prev.phases, currentPhase],
      }));
      setCurrentPhase({ name: "", timeline: "", value: "" });
    } else {
      alert("Please select a Phase name.");
    }
  };

  const removePhase = (index) => {
    setFormData((prev) => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.projectId || !formData.projectName || !formData.clientName) {
      alert("Please fill all required fields (*)");
      return;
    }
    if (onSubmit) onSubmit(formData);
    setFormData(initialState);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[850px] w-[95vw] h-auto max-h-[92vh] overflow-y-auto rounded-2xl border-none p-0 shadow-2xl transition-colors duration-300
        ${theme === "dark" ? "bg-[#0B0F1A] text-white" : "bg-white text-gray-900"}
        [&::-webkit-scrollbar]:hidden`}
      >
        <DialogHeader className="p-6 border-b border-gray-100/10">
          <DialogTitle className="text-xl font-bold">
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Project ID */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Project ID*</Label>
              <Input
                placeholder="Enter Project ID"
                required
                value={formData.projectId}
                className={inputBaseClass}
                onChange={(e) =>
                  setFormData({ ...formData, projectId: e.target.value })
                }
              />
            </div>

            {/* Client Name */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Client Name*</Label>
              <Input
                placeholder="Enter Client Name"
                required
                value={formData.clientName}
                className={inputBaseClass}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
              />
            </div>

            {/* Project Title */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Project Title*</Label>
              <Input
                placeholder="Enter Project Title"
                required
                value={formData.projectName}
                className={inputBaseClass}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
              />
            </div>

            {/* Total Timeline */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Total Timeline</Label>
              <Input
                type="date"
                value={formData.totalTimeline}
                className={`${inputBaseClass} ${calendarIconClass}`}
                onChange={(e) =>
                  setFormData({ ...formData, totalTimeline: e.target.value })
                }
              />
            </div>

            {/* Total Value */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Total Value</Label>
              <Input
                placeholder="Enter Total Value"
                value={formData.totalValue}
                className={inputBaseClass}
                onChange={(e) =>
                  setFormData({ ...formData, totalValue: e.target.value })
                }
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Service Type</Label>
              <Input
                placeholder="e.g. Website Application"
                value={formData.serviceType}
                className={inputBaseClass}
                onChange={(e) =>
                  setFormData({ ...formData, serviceType: e.target.value })
                }
              />
            </div>

            {/* Order ID */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Order ID*</Label>
              <Input
                placeholder="Enter Order ID"
                required
                value={formData.orderId}
                className={inputBaseClass}
                onChange={(e) =>
                  setFormData({ ...formData, orderId: e.target.value })
                }
              />
            </div>

            {/* Phase Selection Logic */}
            <div className="flex items-end gap-3">
              <div className="flex-1 space-y-2">
                <Label className="text-sm opacity-70">Phase</Label>
                <Select
                  value={currentPhase.name}
                  onValueChange={(v) =>
                    setCurrentPhase({ ...currentPhase, name: v })
                  }
                >
                  <SelectTrigger className={inputBaseClass}>
                    <SelectValue placeholder="Select Phase" />
                  </SelectTrigger>
                  <SelectContent 
                    className={
                     `${ theme === "dark"
                        ? "bg-[#111827] text-white border-gray-800"
                        : ""}`
                    }
                  >
                    <SelectItem value="Discovery">Discovery</SelectItem>
                    <SelectItem value="Design">UI/UX Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <button
                type="button"
                onClick={handleAddPhase}
                className="p-3.5 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all mb-0.5"
              >
                <BadgePlus size={20} />
              </button> */}
            </div>

            {/* Team Selection */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Select Team</Label>
              <Select
                onValueChange={(v) => setFormData({ ...formData, team: v })}
              >
                <SelectTrigger className={inputBaseClass}>
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent
                  className={
                    theme === "dark"
                      ? "bg-[#111827] text-white border-gray-800"
                      : ""
                  }
                >
                  <SelectItem value="Team A">Team AI Weavers</SelectItem>
                  <SelectItem value="Team B">System Saviors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assign To */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Assign To</Label>
              <Select
                onValueChange={(v) => setFormData({ ...formData, assignTo: v })}
              >
                <SelectTrigger className={inputBaseClass}>
                  <SelectValue placeholder="Select Member" />
                </SelectTrigger>
                <SelectContent
                  className={
                    theme === "dark"
                      ? "bg-[#111827] text-white border-gray-800"
                      : ""
                  }
                >
                  <SelectItem value="Member 1">Member 1</SelectItem>
                  <SelectItem value="Member 2">Member 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Priority</Label>
              <Select
                onValueChange={(v) => setFormData({ ...formData, priority: v })}
              >
                <SelectTrigger className={inputBaseClass}>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent
                  className={
                    theme === "dark"
                      ? "bg-[#111827] text-white border-gray-800"
                      : ""
                  }
                >
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Status</Label>
              <Select
                onValueChange={(v) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger className={inputBaseClass}>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent
                  className={
                    theme === "dark"
                      ? "bg-[#111827] text-white border-gray-800"
                      : ""
                  }
                >
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Start Date</Label>
              <Input
                type="datetime-local"
                className={`${inputBaseClass} ${calendarIconClass}`}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm opacity-70">Deadline</Label>
              <Input
                type="datetime-local"
                className={`${inputBaseClass} ${calendarIconClass}`}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>
          </div>

          {/* Phase Badges */}
          {formData.phases.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {formData.phases.map((ph, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-xs font-bold border border-orange-500/20"
                >
                  {ph.name}
                  <Trash2
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => removePhase(idx)}
                  />
                </div>
              ))}
            </div>
          )}

          <OverviewDescription />

          {/* File Upload Area */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold tracking-wide">
              Upload Document*
            </Label>
            <div
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-2 cursor-pointer transition-all
              ${theme === "dark" ? "border-gray-800 bg-[#111827]/30 hover:bg-[#111827]/50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
            >
              <Upload className="text-gray-400" size={32} />
              <p className="font-bold">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, img, link (Max 50MB)</p>
              <input
                type="file"
                hidden
                ref={fileInputRef}
                multiple
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={`px-12 py-5.5 rounded-xl font-bold border-gray-300 w-full sm:w-[180px] ${theme === "dark" ? "hover:bg-gray-800" : ""}`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-12 py-5.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold w-full sm:w-[180px] shadow-lg shadow-orange-500/20"
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
