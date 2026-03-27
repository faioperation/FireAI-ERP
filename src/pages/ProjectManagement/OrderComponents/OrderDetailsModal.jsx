import React, { useContext } from "react";
import { X } from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";

const OrderDetailsModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-[#111827] border border-gray-800"
            : "bg-white border border-gray-100"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-start">
          <div>
            <h2
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Order Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete information about the order
            </p>      
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-[#00d2ff] transition-colors cursor-pointer ${
              isDark ? "text-gray-400" : "text-gray-400"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Order ID
              </label>
              <p
                className={`text-[15px] font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                PRJ-001
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Project Title
              </label>
              <p
                className={`text-[15px] font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                E-commerce Platform Redesign
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Order Title
              </label>
              <p
                className={`text-[15px] font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Dashboard Design
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Assign to
              </label>
              <p
                className={`text-[15px] font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Emily Davis
              </p>
            </div>
          </div>

          {/* Description Row */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Description
            </label>
            <p
              className={`text-[15px] leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Create a modern dashboard interface with analytics components
            </p>
          </div>

          {/* Row 3 - Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Start Date
              </label>
              <p
                className={`text-[15px] font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                03/03/26
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Deadline
              </label>
              <p
                className={`text-[15px] font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                03/04/26
              </p>
            </div>
          </div>

          {/* Row 4 - Status Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Priority
              </label>
              <div>
                <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                  high
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Status
              </label>
              <div>
                <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                  in-progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
