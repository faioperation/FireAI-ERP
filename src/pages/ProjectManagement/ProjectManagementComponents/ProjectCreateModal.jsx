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

//   const [formData, setFormData] = useState({
//     projectId: "",
//     clientName: "",
//     projectName: "",
//     timeline: "",
//     orderId: "",
//     team: "",
//     type: "",
//     phase: "",
//     status: "",
//     totalValue: "",
//     phaseTimeline: "",
//     phaseValue: "",
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
//               <Label className="text-sm font-normal tracking-wider">
//                 Project ID*
//               </Label>
//               <Input
//                 placeholder="Project Id"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, projectId: e.target.value })
//                 }
//               />
//             </div>

//             {/* Client Name */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Client Name*
//               </Label>
//               <Input
//                 placeholder="Enter Client Name"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, clientName: e.target.value })
//                 }
//               />
//             </div>

//             {/* Project Name */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Project Name*
//               </Label>
//               <Input
//                 placeholder="Enter Project title"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, projectName: e.target.value })
//                 }
//               />
//             </div>

//             {/* Total Timeline */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Total Timeline
//               </Label>
//               <Input
//                 type="date"
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, timeline: e.target.value })
//                 }
//               />
//             </div>

//             {/* Order ID */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Order ID*
//               </Label>
//               <Input
//                 placeholder="Order Id"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, orderId: e.target.value })
//                 }
//               />
//             </div>

//             {/* Select Team */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Select Team
//               </Label>
//               <Select
//                 onValueChange={(v) => setFormData({ ...formData, team: v })}
//               >
//                 <SelectTrigger
//                   className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 >
//                   <SelectValue placeholder="Select Team" />
//                 </SelectTrigger>
//                 <SelectContent className="mt-8">
//                   <SelectItem value="UI/UX">UI/UX Design</SelectItem>
//                   <SelectItem value="Dev">
//                     Frontend and Backend Development
//                   </SelectItem>
//                   <SelectItem value="AI">AI Development</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Total Value
//               </Label>
//               <Input
//                 placeholder="Enter Total Value"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, totalValue: e.target.value })
//                 }
//               />
//             </div>
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Service Type
//               </Label>
//               <Select
//                 onValueChange={(v) => setFormData({ ...formData, type: v })}
//               >
//                 <SelectTrigger
//                   className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 >
//                   <SelectValue placeholder="Service Type" />
//                 </SelectTrigger>
//                 <SelectContent className="mt-8">
//                   <SelectItem value="UI/UX">UI/UX Design</SelectItem>
//                   <SelectItem value="Dev">
//                     Frontend and Backend Development
//                   </SelectItem>
//                   <SelectItem value="AI">AI Development</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Phase Section - Phase value saved here */}
//             <div className="flex items-end justify-between gap-4 w-full">
//               <div className="space-y-2 flex-1">
//                 <Label className="text-sm font-normal tracking-wider">
//                   Phase
//                 </Label>
//                 <Select
//                   onValueChange={(v) => setFormData({ ...formData, phase: v })}
//                 >
//                   <SelectTrigger
//                     className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                   >
//                     <SelectValue placeholder="Select Phase" />
//                   </SelectTrigger>
//                   <SelectContent className="mt-8">
//                     <SelectItem value="UI/UX">UI/UX Design</SelectItem>
//                     <SelectItem value="FullStack">
//                       FullStack Development
//                     </SelectItem>
//                     <SelectItem value="AI">AI Development</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <button
//                 type="button"
//                 className="p-3 bg-orange-50 dark:bg-[#111827] rounded-xl text-orange-500 mb-0.5"
//               >
//                 <BadgePlus size={24} />
//               </button>
//             </div>

//             {/* Status */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Status
//               </Label>
//               <Select
//                 onValueChange={(v) => setFormData({ ...formData, status: v })}
//               >
//                 <SelectTrigger
//                   className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 >
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent className="mt-8">
//                   <SelectItem value="Active">Active</SelectItem>
//                   <SelectItem value="Pending">Pending</SelectItem>
//                   <SelectItem value="Completed">Completed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Phase Timeline with Calendar */}
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Phase Timeline
//               </Label>
//               <Input
//                 type="date"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800 text-white" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phaseTimeline: e.target.value })
//                 }
//               />
//             </div>
//             <div className="space-y-2">
//               <Label className="text-sm font-normal tracking-wider">
//                 Phase Value
//               </Label>
//               <Input
//                 placeholder="Phase Value"
//                 required
//                 className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phaseValue: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <DynamicButton
//             label="Add Phases"
//             showIcon={true}
//             onClick={() => {}}
//           />

//           <OverviewDescription />

//           <div className="space-y-3">
//             <Label className="text-sm font-normal tracking-wider">
//               Upload Document*
//             </Label>
//             <input
//               type="file"
//               multiple
//               className="hidden"
//               ref={fileInputRef}
//               onChange={handleFileUpload}
//             />
//             <div
//               onClick={() => fileInputRef.current.click()}
//               className={`border-2 border-dashed rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 cursor-pointer transition-all
//               ${theme === "dark" ? "border-gray-800 bg-[#111827]/40 hover:bg-[#111827]" : "border-gray-200 hover:bg-gray-50"}`}
//             >
//               <Upload className="text-gray-400" size={40} />
//               <div className="text-center">
//                 <p className="font-bold text-base">
//                   Click to upload or drag and drop
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                   PDF, img, link (Max 50MB)
//                 </p>
//               </div>
//             </div>

//             {formData.files.length > 0 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
//                 {formData.files.map((file, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-3 rounded-xl border border-gray-100/10 bg-gray-50/5"
//                   >
//                     <div className="flex items-center gap-3">
//                       <FileText size={18} className="text-orange-500" />
//                       <span className="text-xs truncate max-w-[150px]">
//                         {file.name}
//                       </span>
//                     </div>
//                     <X
//                       size={16}
//                       className="cursor-pointer hover:text-red-500"
//                       onClick={() => removeFile(index)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100/10">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="px-12 py-5.5 rounded-xl font-bold border-gray-300 w-full sm:w-[200px]"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="px-12 py-5.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold w-full sm:w-[200px] shadow-lg"
//             >
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
import { Upload, X, FileText, BadgePlus, Trash2 } from "lucide-react";
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
    type: "",
    status: "",
    totalValue: "",
    phases: [], // Multiple phases array
    files: [],
  });

  // Temporary state for the current phase inputs
  const [currentPhase, setCurrentPhase] = useState({
    name: "",
    timeline: "",
    value: "",
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

  // Logic to add a phase into the array
  const handleAddPhase = () => {
    if (currentPhase.name && currentPhase.timeline && currentPhase.value) {
      setFormData((prev) => ({
        ...prev,
        phases: [...prev.phases, currentPhase],
      }));
      setCurrentPhase({ name: "", timeline: "", value: "" }); // Reset phase inputs
    } else {
      alert("Please fill Phase, Timeline, and Value before adding.");
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
    if (formData.phases.length === 0) {
      alert("Please add at least one phase to the project!");
      return;
    }
    console.log("Project Saved Successfully:", formData);
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
                value={formData.projectId}
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
                value={formData.clientName}
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
                value={formData.projectName}
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              />
            </div>

            {/* Total Timeline */}
            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Total Timeline</Label>
              <Input
                type="date"
                value={formData.timeline}
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
                value={formData.orderId}
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
                <SelectContent className="mt-8">
                  <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                  <SelectItem value="Dev">Frontend and Backend Development</SelectItem>
                  <SelectItem value="AI">AI Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Total Value</Label>
              <Input
                placeholder="Enter Total Value"
                required
                value={formData.totalValue}
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Service Type</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, type: v })}>
                <SelectTrigger className={`py-5.5 w-full rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent className="mt-8">
                  <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                  <SelectItem value="Dev">Frontend and Backend Development</SelectItem>
                  <SelectItem value="AI">AI Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phase Selection Logic */}
            <div className="flex items-end justify-between gap-4 w-full">
              <div className="space-y-2 flex-1">
                <Label className="text-sm font-normal tracking-wider">Phase</Label>
                <Select 
                  value={currentPhase.name} 
                  onValueChange={(v) => setCurrentPhase({ ...currentPhase, name: v })}
                >
                  <SelectTrigger className={`w-full py-5.5 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}>
                    <SelectValue placeholder="Select Phase" />
                  </SelectTrigger>
                  <SelectContent className="mt-8">
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="FullStack">FullStack Development</SelectItem>
                    <SelectItem value="AI Development">AI Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Plus Button Logic Added Here */}
              <button
                type="button"
                onClick={handleAddPhase}
                className="p-3 bg-orange-50 dark:bg-[#111827] rounded-xl text-orange-500 mb-0.5 cursor-pointer hover:bg-orange-100 transition-all"
              >
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
                <SelectContent className="mt-8">
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
                type="date"
                value={currentPhase.timeline}
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800 text-white" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setCurrentPhase({ ...currentPhase, timeline: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-normal tracking-wider">Phase Value</Label>
              <Input
                placeholder="Phase Value"
                value={currentPhase.value}
                className={`py-5.5 rounded-xl border w-full ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-transparent border-gray-200"}`}
                onChange={(e) => setCurrentPhase({ ...currentPhase, value: e.target.value })}
              />
            </div>
          </div>

          {/* Added Phases List Display (Layout Safe) */}
          {formData.phases.length > 0 && (
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase text-orange-500">Added Phases:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.phases.map((ph, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-xl border ${theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-gray-50 border-gray-100"}`}>
                    <div className="text-xs">
                      <p className="font-bold">{ph.name}</p>
                      <p className="text-gray-400">{ph.timeline} | ${ph.value}</p>
                    </div>
                    <Trash2 size={16} className="text-red-400 cursor-pointer" onClick={() => removePhase(index)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <DynamicButton label="Add Phases" showIcon={true} onClick={handleAddPhase} />

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

            {/* Uploaded Files Display */}
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
