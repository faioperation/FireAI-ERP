import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
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
import DynamicButton from "@/SharedComponants/DynamicButton";
import OverviewDescription from "@/SharedComponants/OverviewDescription";

export default function ProjectCreateModal() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialState = {
    projectId: "",
    clientName: "",
    projectName: "",
    timeline: "",
    orderId: "",
    team: "",
    type: "",
    status: "",
    totalValue: "",
    phases: [],
    files: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [currentPhase, setCurrentPhase] = useState({ name: "", timeline: "", value: "" });

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...uploadedFiles] }));
  };

  const handleAddPhase = () => {
    if (currentPhase.name) {
      setFormData((prev) => ({ ...prev, phases: [...prev.phases, currentPhase] }));
      setCurrentPhase({ name: "", timeline: "", value: "" });
    } else {
      alert("Please select a Phase name at least.");
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
    console.log("Project Saved:", formData);
    setFormData(initialState);
    navigate("/project-management");
  };

  const calendarIconClass =
    theme === "dark" ? "[&::-webkit-calendar-picker-indicator]:invert" : "";

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#0B1220] text-white" : "bg-white text-gray-900"}`}>

      <h1 className="text-xl font-bold mb-8">Create New Project</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          {/* Project ID */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Project ID*</Label>
            <Input
              placeholder="Project Id" required value={formData.projectId}
              className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            />
          </div>

          {/* Client Name */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Client Name*</Label>
            <Input
              placeholder="Enter Client Name" required value={formData.clientName}
              className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Project Name*</Label>
            <Input
              placeholder="Enter Project title" required value={formData.projectName}
              className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            />
          </div>

          {/* Total Timeline */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Total Timeline</Label>
            <Input
              type="date" value={formData.timeline}
              className={`py-5.5 rounded-xl border w-full ${calendarIconClass} ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            />
          </div>

          {/* Order ID */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Order ID*</Label>
            <Input
              placeholder="Order Id" required value={formData.orderId}
              className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
            />
          </div>

          {/* Select Team */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Select Team</Label>
            <Select value={formData.team} onValueChange={(v) => setFormData({ ...formData, team: v })}>
              <SelectTrigger className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent className="mt-6">
                <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                <SelectItem value="Dev">Frontend and Backend Development</SelectItem>
                <SelectItem value="AI">AI Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Total Value */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Total Value</Label>
            <Input
              placeholder="Enter Total Value" value={formData.totalValue}
              className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
            />
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Service Type</Label>
            <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
              <SelectTrigger className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent className="mt-6">
                <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                <SelectItem value="Dev">Frontend and Backend Development</SelectItem>
                <SelectItem value="AI">AI Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phase */}
          <div className="flex items-end justify-between gap-4 w-full">
            <div className="space-y-2 flex-1">
              <Label className="text-sm font-normal tracking-wider">Phase</Label>
              <Select value={currentPhase.name} onValueChange={(v) => setCurrentPhase({ ...currentPhase, name: v })}>
                <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                  <SelectValue placeholder="Select Phase" />
                </SelectTrigger>
                <SelectContent className="mt-6">
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="FullStack">FullStack Development</SelectItem>
                  <SelectItem value="AI Development">AI Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button type="button" onClick={handleAddPhase}
              className="p-3 bg-orange-50 dark:bg-[#111827] rounded-xl text-orange-500 mb-0.5">
              <BadgePlus size={24} />
            </button>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Status</Label>
            <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
              <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="mt-6">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phase Timeline */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Phase Timeline</Label>
            <Input
              type="date" value={currentPhase.timeline}
              className={`py-5.5 rounded-xl border w-full ${calendarIconClass} ${theme === "dark" ? "bg-[#111827] border-gray-800 text-white" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setCurrentPhase({ ...currentPhase, timeline: e.target.value })}
            />
          </div>

          {/* Phase Value */}
          <div className="space-y-2">
            <Label className="text-sm font-normal tracking-wider">Phase Value</Label>
            <Input
              placeholder="Phase Value" value={currentPhase.value}
              className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
              onChange={(e) => setCurrentPhase({ ...currentPhase, value: e.target.value })}
            />
          </div>
        </div>

        {/* Phases List */}
        {formData.phases.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formData.phases.map((ph, index) => (
              <div key={index}
                className={`flex items-center justify-between p-3 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-gray-50 border-gray-100"}`}>
                <div className="text-xs">
                  <p className="font-bold">{ph.name}</p>
                  <p className="text-gray-400">{ph.timeline} | {ph.value}</p>
                </div>
                <Trash2 size={16} className="text-red-400 cursor-pointer" onClick={() => removePhase(index)} />
              </div>
            ))}
          </div>
        )}

        {/* <DynamicButton label="Add Phases" showIcon={true} onClick={handleAddPhase} /> */}

        <OverviewDescription />

        {/* File Upload */}
        <div className="space-y-3">
          <Label className="text-sm font-normal tracking-wider">Upload Document*</Label>
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <div onClick={() => fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 cursor-pointer transition-all
            ${theme === "dark" ? "border-gray-800 bg-[#111827]/40 hover:bg-[#111827]" : "border-gray-200"}`}>
            <Upload className="text-gray-400" size={40} />
            <div className="text-center">
              <p className="font-bold text-base">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400 mt-1">PDF, img, link (Max 50MB)</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button type="button" variant="outline"
            onClick={() => navigate("/project-management")}
            className={`px-12 py-5.5 rounded-xl font-bold border-gray-300 w-full sm:w-[180px] ${theme === "dark" ? "bg-black text-[#00d2ff] border border-[#00d2ff]/30 hover:border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.1)]" : ""}`}>
            Cancel
          </Button>
          <Button type="submit" variant="none"
            className={`px-12 py-5.5 rounded-xl font-bold w-full sm:w-[180px] transition-all ${theme === "dark"
              ? "bg-black text-[#00d2ff] border border-[#00d2ff]/30 hover:border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.1)]"
              : "bg-[#F97316] text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
              }`}>
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}

