import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AddModule() {
  return (
    <div className="bg-background dark:bg-darkBG min-h-screen py-4 sm:py-8 px-3 sm:px-6 animate-in fade-in duration-500">
      
      {/* Form Container */}
      <div className="md:min-w-3xl mx-auto bg-white dark:bg-darkSecBG p-5 sm:p-8 md:p-12 rounded-[24px] sm:rounded-[32px] border border-border shadow-lg">
        
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-border space-y-1 sm:y-2">
          <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tighter leading-tight">
            Task Tracker Update
          </h1>
          <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
            Record Updates To Tasks Here
          </p>
        </div>

        {/* Form Grid */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-8">
          
          {/* Task ID */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Task ID</label>
            <input 
              type="text" 
              defaultValue="00/02/2025" 
              readOnly 
              className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10  text-foreground text-sm sm:text-[15px] cursor-not-allowed"
            />
          </div>

          {/* Module Name */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Module Name</label>
            <div className="flex  gap-2 sm:gap-3">
              <input 
                type="text" 
                placeholder="Enter Module..." 
                className="flex-1 p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none transition-all"
              />
              <Button size="icon" type="button" className="shrink-0 w-12 h-12 sm:w-[54px] sm:h-[54px] bg-orange-400 hover:bg-orange-500 dark:bg-teal-600 rounded-xl text-white active:scale-90 transition-transform">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
              </Button>
            </div>
          </div>

          {/* Task Name */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Task Name</label>
            <input 
              type="text" 
              placeholder="Task name" 
              className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none"
            />
          </div>

          {/* Task Details */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Task Details</label>
            <textarea 
              placeholder="Tell us a little about the project..." 
              className="w-full h-28 sm:h-36 p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none leading-relaxed resize-none"
            />
          </div>

          {/* Estimated Timeline */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Estimated Timeline</label>
            <input 
              type="text" 
              placeholder="0.0 Days" 
              className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none"
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Status</label>
            <div className="relative group">
              <select className="w-full p-3.5 sm:p-4 pr-10 rounded-xl border border-border bg-[#FFF9F1] dark:bg-transparent text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none appearance-none cursor-pointer">
                <option className='dark:bg-black bg-white'>Select Status</option>
                <option className='dark:bg-black bg-white'>Pending</option>
                <option className='dark:bg-black bg-white'>In Progress</option>
                <option className='dark:bg-black bg-white'>Completed</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-focus-within:text-orange-400 transition-colors">▾</span>
            </div>
          </div>

          {/* Remark & Attachment (Stacked on mobile, side-by-side on md) */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Remark</label>
            <input 
              type="text" 
              placeholder="Notes..." 
              className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Attachment</label>
            <input 
              type="text" 
              placeholder="DOC.PDF" 
              className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 text-sm sm:text-[15px] focus:ring-2 focus:ring-orange-500/40  dark:focus:ring-teal-500/40  outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4 sm:pt-6">
            <Button className="w-full py-6 sm:py-7 bg-orange-400 hover:bg-orange-500 dark:bg-teal-600 text-white font-black rounded-2xl text-base sm:text-lg shadow-lg shadow-orange-500/ 20  dark:shadow-gray-400 active:scale-[0.98] transition-all">
              Add Record Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}