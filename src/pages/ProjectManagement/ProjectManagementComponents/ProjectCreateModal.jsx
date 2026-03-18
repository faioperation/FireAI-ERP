// import { useContext } from "react";
// import { ThemeContext } from "@/Componants/Themes/ThemeContext";
// import { X, Calendar } from "lucide-react";

// const ProjectCreateModal = ({ isOpen, onClose, onSubmit }) => {
//   const { theme } = useContext(ThemeContext);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">

//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div
//         className={`relative w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl transition-all
//         ${
//           theme === "dark"
//             ? "bg-[#111827] text-white"
//             : "bg-white text-gray-800"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-normal">Create Project</h2>
//           <button onClick={onClose}>
//             <X className="cursor-pointer" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           {/* Inputs */}
//           {[
//             "Project ID",
//             "Client Name",
//             "Project Name",
//             "Total Timeline",
//             "Order ID",
//             "Select Team",
//             "Total Value",
//             "Service Type",
//           ].map((label, i) => (
//             <div key={i} className="flex flex-col gap-1">
//               <label className="text-sm">{label}</label>
//               <input
//                 type="text"
//                 placeholder={`Enter ${label}`}
//                 className={`p-3 rounded-lg border outline-none
//                 ${
//                   theme === "dark"
//                     ? "bg-[#1f2937] border-gray-700"
//                     : "bg-gray-50 border-gray-200"
//                 }`}
//               />
//             </div>
//           ))}

//           {/* Phase Section */}
//           <div className="col-span-1 md:col-span-2 mt-4">
//             <span className="text-sm font-normal bg-green-600 text-white px-3 py-1 rounded-full">
//               UI/UX Design
//             </span>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label>Phase</label>
//             <select
//               className={`p-3 rounded-lg border
//               ${
//                 theme === "dark"
//                   ? "bg-[#1f2937] border-gray-700"
//                   : "bg-gray-50 border-gray-200"
//               }`}
//             >
//               <option>Select Phase</option>
//             </select>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label>Status</label>
//             <select
//               className={`p-3 rounded-lg border
//               ${
//                 theme === "dark"
//                   ? "bg-[#1f2937] border-gray-700"
//                   : "bg-gray-50 border-gray-200"
//               }`}
//             >
//               <option>Select status</option>
//             </select>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label>Phase Timeline</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Select Date"
//                 className={`w-full p-3 rounded-lg border
//                 ${
//                   theme === "dark"
//                     ? "bg-[#1f2937] border-gray-700"
//                     : "bg-gray-50 border-gray-200"
//                 }`}
//               />
//               <Calendar className="absolute right-3 top-3" size={18} />
//             </div>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label>Phase Value</label>
//             <input
//               type="text"
//               placeholder="Enter Phase Value"
//               className={`p-3 rounded-lg border
//               ${
//                 theme === "dark"
//                   ? "bg-[#1f2937] border-gray-700"
//                   : "bg-gray-50 border-gray-200"
//               }`}
//             />
//           </div>

//           {/* Add Phase Button */}
//           <div className="col-span-2">
//             <button
//               type="button"
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
//             >
//               + Add Phase
//             </button>
//           </div>

//           {/* File Upload */}
//           <div className="col-span-2 mt-4">
//             <label className="text-sm">Upload Document</label>
//             <div
//               className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center
//               ${
//                 theme === "dark"
//                   ? "border-gray-700 bg-[#1f2937]"
//                   : "border-gray-300 bg-gray-50"
//               }`}
//             >
//               <p className="text-sm">Click to upload or drag & drop</p>
//               <p className="text-xs text-gray-400">PDF, img (Max 50MB)</p>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="col-span-2 flex justify-end gap-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 rounded-lg border cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 rounded-lg bg-orange-500 text-white cursor-pointer"
//             >
//               Create Project
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// import React, { useState, useContext, useRef } from "react";
// import { ThemeContext } from "@/Componants/Themes/ThemeContext";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Upload, X, FileText, BadgePlus } from "lucide-react";
// import DynamicButton from "@/SharedComponants/DynamicButton";
// import OverviewDescription from "@/SharedComponants/OverviewDescription";

// export default function ProjectCreateModal({ isOpen, onClose }) {
//   const { theme } = useContext(ThemeContext);
//   const fileInputRef = useRef(null);

//   // FormData corrected based on your fields
//   const [formData, setFormData] = useState({
//     projectId: "",
//     clientName: "",
//     projectName: "",
//     timeline: "",
//     orderId: "", // Added
//     team: "",
//     phase: "",
//     status: "",
//     phaseTimeline: "", // Added
//     files: [],
//   });

//   const handleFileUpload = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       files: [...prev.files, ...uploadedFiles],
//     }));
//   };

//   const removeFile = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       files: prev.files.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     console.log("Project Saved:", formData);
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent
//         className={`sm:max-w-[850px] w-[95vw] h-auto max-h-[92vh] overflow-y-auto rounded-2xl border-none p-0 
//         ${theme === "dark" ? "bg-[#0B0F1A] text-white" : "bg-white text-gray-900"}
//         [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
//       >
//         <DialogHeader className="p-6 border-b border-gray-100/10">
//           <DialogTitle className="text-xl font-bold text-center md:text-left">
//             Create New Project
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSave} className="p-6 md:p-10 space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
//             {/* Project ID */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Project ID*</Label>
//               <Input
//                 placeholder="Project Id"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
//               />
//             </div>

//             {/* Client Name */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Client Name*</Label>
//               <Input
//                 placeholder="Enter Client Name"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
//               />
//             </div>

//             {/* Project Name */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Project Name*</Label>
//               <Input
//                 placeholder="Enter Project title"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
//               />
//             </div>

//             {/* Total Timeline */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Total Timeline</Label>
//               <Input
//                 type="date"
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
//               />
//             </div>

//             {/* Order ID - Fixed Variable Name */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Order ID*</Label>
//               <Input
//                 placeholder="Order Id"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
//               />
//             </div>

//             {/* Select Team */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Select Team</Label>
//               <Select onValueChange={(v) => setFormData({ ...formData, team: v })}>
//                 <SelectTrigger className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
//                   <SelectValue placeholder="Select Team" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="UI/UX">UI/UX Design</SelectItem>
//                   <SelectItem value="Dev">Frontend and Backend Development</SelectItem>
//                   <SelectItem value="AI">AI Development</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Phase Section - Fixed Layout */}
//             <div className="flex items-end justify-between gap-4 w-full">
//               <div className="space-y-2 flex-1">
//                 <Label className="text-sm font-normal tracking-wider">Phase</Label>
//                 <Select onValueChange={(v) => setFormData({ ...formData, phase: v })}>
//                   <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
//                     <SelectValue placeholder="Select Phase" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="UI/UX">UI/UX Design</SelectItem>
//                     <SelectItem value="FullStack">FullStack Development</SelectItem>
//                     <SelectItem value="AI">AI Development</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <button type="button" className="p-3 bg-orange-50 dark:bg-[#111827] rounded-xl text-orange-500 mb-0.5">
//                 <BadgePlus size={24} />
//               </button>
//             </div>

//             {/* Status */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">Status</Label>
//               <Select onValueChange={(v) => setFormData({ ...formData, status: v })}>
//                 <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent className="mt-9">
//                   <SelectItem value="Active">Active</SelectItem>
//                   <SelectItem value="Pending">Pending</SelectItem>
//                   <SelectItem value="Completed">Completed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Phase Timeline */}
//             <div className="space-y-2 md:col-span-2">
//               <Label className="text-sm font-normal tracking-wider">Phase Timeline</Label>
//               <Input
//                 placeholder="e.g. 2 Weeks"
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) => setFormData({ ...formData, phaseTimeline: e.target.value })}
//               />
//             </div>
//           </div>

//           <DynamicButton label="Add Phases" showIcon={true} onClick={() => {}} />

//           <OverviewDescription />

//           {/* Upload Section */}
//           <div className="space-y-3">
//             <Label className="text-sm font-normal tracking-wider">Upload Document*</Label>
//             <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
//             <div
//               onClick={() => fileInputRef.current.click()}
//               className={`border-2 border-dashed rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 cursor-pointer transition-all
//               ${theme === "dark" ? "border-gray-800 bg-[#111827]/40 hover:bg-[#111827]" : "border-gray-200 hover:bg-gray-50"}`}
//             >
//               <Upload className="text-gray-400" size={40} />
//               <div className="text-center">
//                 <p className="font-bold text-base">Click to upload or drag and drop</p>
//                 <p className="text-sm text-gray-400 mt-1">PDF, img, link (Max 50MB)</p>
//               </div>
//             </div>

//             {/* File List */}
//             {formData.files.length > 0 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
//                 {formData.files.map((file, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-100/10 bg-gray-50/5">
//                     <div className="flex items-center gap-3">
//                       <FileText size={18} className="text-orange-500" />
//                       <span className="text-xs truncate max-w-[150px]">{file.name}</span>
//                     </div>
//                     <X size={16} className="cursor-pointer hover:text-red-500" onClick={() => removeFile(index)} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100/10">
//             <Button type="button" variant="outline" onClick={onClose} className="px-12 py-5.5 rounded-xl font-bold border-gray-300 w-full sm:w-[200px]">
//               Cancel
//             </Button>
//             <Button type="submit" className="px-12 py-5.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold w-full sm:w-[200px] shadow-lg">
//               Create Project
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
import { Upload, X, FileText, BadgePlus } from "lucide-react";
import DynamicButton from "@/SharedComponants/DynamicButton";
import OverviewDescription from "@/SharedComponants/OverviewDescription";

export default function ProjectCreateModal({ isOpen, onClose }) {
  const { theme } = useContext(ThemeContext);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    projectId: "",
    clientName: "",
    projectName: "",
    timeline: "",
    orderId: "", 
    team: "",
    phase: "", // Phase value field
    status: "",
    phaseTimeline: "", // Calendar logic eikhane kaj korbe
    phaseValue:"",
    files: [],
  });

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...uploadedFiles],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Project Saved:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[850px] w-[95vw] h-auto max-h-[92vh] overflow-y-auto rounded-2xl border-none p-0 
        ${theme === "dark" ? "bg-[#0B0F1A] text-white" : "bg-white text-gray-900"}
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        <DialogHeader className="p-6 border-b border-gray-100/10">
          <DialogTitle className="text-xl font-bold text-center md:text-left">
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Project ID */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Project ID*</Label>
              <Input
                placeholder="Project Id"
                required
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              />
            </div>

            {/* Client Name */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Client Name*</Label>
              <Input
                placeholder="Enter Client Name"
                required
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>

            {/* Project Name */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Project Name*</Label>
              <Input
                placeholder="Enter Project title"
                required
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              />
            </div>

            {/* Total Timeline */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Total Timeline</Label>
              <Input
                type="date"
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              />
            </div>

            {/* Order ID */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Order ID*</Label>
              <Input
                placeholder="Order Id"
                required
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
              />
            </div>

            {/* Select Team */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Select Team</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, team: v })}>
                <SelectTrigger className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                  <SelectItem value="Dev">Frontend and Backend Development</SelectItem>
                  <SelectItem value="AI">AI Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phase Section - Phase value saved here */}
            <div className="flex items-end justify-between gap-4 w-full">
              <div className="space-y-2 flex-1">
                <Label className="text-sm font-normal tracking-wider">Phase</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, phase: v })}>
                  <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                    <SelectValue placeholder="Select Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                    <SelectItem value="FullStack">FullStack Development</SelectItem>
                    <SelectItem value="AI">AI Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button type="button" className="p-3 bg-orange-50 dark:bg-[#111827] rounded-xl text-orange-500 mb-0.5">
                <BadgePlus size={24} />
              </button>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Status</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phase Timeline with Calendar */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-normal tracking-wider">Phase Timeline</Label>
              <Input
                type="date" // Eikhane calendar add kora hoyeche
                required
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800 text-white" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, phaseTimeline: e.target.value })}
              />
            </div>
          </div>

          <DynamicButton label="Add Phases" showIcon={true} onClick={() => {}} />

          <OverviewDescription />

          <div className="space-y-3">
            <Label className="text-sm font-normal tracking-wider">Upload Document*</Label>
            <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <div
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 cursor-pointer transition-all
              ${theme === "dark" ? "border-gray-800 bg-[#111827]/40 hover:bg-[#111827]" : "border-gray-200 hover:bg-gray-50"}`}
            >
              <Upload className="text-gray-400" size={40} />
              <div className="text-center">
                <p className="font-bold text-base">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400 mt-1">PDF, img, link (Max 50MB)</p>
              </div>
            </div>

            {formData.files.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-100/10 bg-gray-50/5">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-orange-500" />
                      <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                    </div>
                    <X size={16} className="cursor-pointer hover:text-red-500" onClick={() => removeFile(index)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100/10">
            <Button type="button" variant="outline" onClick={onClose} className="px-12 py-5.5 rounded-xl font-bold border-gray-300 w-full sm:w-[200px]">
              Cancel
            </Button>
            <Button type="submit" className="px-12 py-5.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold w-full sm:w-[200px] shadow-lg">
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}