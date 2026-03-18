import { useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { X, Calendar } from "lucide-react";

const ProjectCreateModal = ({ isOpen, onClose, onSubmit }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl transition-all
        ${
          theme === "dark"
            ? "bg-[#111827] text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create Project</h2>
          <button onClick={onClose}>
            <X className="cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Inputs */}
          {[
            "Project ID",
            "Client Name",
            "Project Name",
            "Total Timeline",
            "Order ID",
            "Select Team",
            "Total Value",
            "Service Type",
          ].map((label, i) => (
            <div key={i} className="flex flex-col gap-1">
              <label className="text-sm">{label}</label>
              <input
                type="text"
                placeholder={`Enter ${label}`}
                className={`p-3 rounded-lg border outline-none
                ${
                  theme === "dark"
                    ? "bg-[#1f2937] border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              />
            </div>
          ))}

          {/* Phase Section */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <span className="text-sm font-semibold bg-green-600 text-white px-3 py-1 rounded-full">
              UI/UX Design
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label>Phase</label>
            <select
              className={`p-3 rounded-lg border
              ${
                theme === "dark"
                  ? "bg-[#1f2937] border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <option>Select Phase</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Status</label>
            <select
              className={`p-3 rounded-lg border
              ${
                theme === "dark"
                  ? "bg-[#1f2937] border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <option>Select status</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Phase Timeline</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Date"
                className={`w-full p-3 rounded-lg border
                ${
                  theme === "dark"
                    ? "bg-[#1f2937] border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              />
              <Calendar className="absolute right-3 top-3" size={18} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label>Phase Value</label>
            <input
              type="text"
              placeholder="Enter Phase Value"
              className={`p-3 rounded-lg border
              ${
                theme === "dark"
                  ? "bg-[#1f2937] border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>

          {/* Add Phase Button */}
          <div className="col-span-2">
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
            >
              + Add Phase
            </button>
          </div>

          {/* File Upload */}
          <div className="col-span-2 mt-4">
            <label className="text-sm">Upload Document</label>
            <div
              className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center
              ${
                theme === "dark"
                  ? "border-gray-700 bg-[#1f2937]"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <p className="text-sm">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-400">PDF, img (Max 50MB)</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-orange-500 text-white cursor-pointer"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreateModal;