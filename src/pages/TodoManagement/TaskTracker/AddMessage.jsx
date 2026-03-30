import React from 'react';
import { Button } from "@/components/ui/button";

export default function AddMessage() {
  // Mobile-first structure with appropriate padding
  return (
    <div className="bg-background dark:bg-darkBG min-h-screen py-6 sm:py-8 px-3 sm:px-6 md:px-8 animate-in fade-in duration-500">
      
      {/* Form Container with modern rounded edges and shadow */}
      <div className="md:min-w-3xl mx-auto bg-white dark:bg-darkSecBG p-6 sm:p-8 md:p-12 rounded-[24px] sm:rounded-[32px] border   shadow:gray-400 border-gray-200 dark:border-gray-600 shadow-lg">
        
        {/* Header Section per image styling */}
        <div className="text-center mb-8 sm:mb-12 pb-5 sm:pb-6 border-b   shadow shadow:gray-400 border-gray-300  dark:border-gray-600 space-y-1 sm:y-2">
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tighter leading-tight">
            Update Message
          </h1>
          <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] max-w-lg mx-auto">
            Sales & Operation Record Updates Message Here
          </p>
        </div>

        {/* Form Grid for responsiveness (1 col on mobile, 2 on md+) */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-8">
          
          {/* Sending Date (Read-only styled as per image) */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Sending Date</label>
            <input 
              type="text" 
              defaultValue="00/02/2025" 
              readOnly 
              className="w-full p-3.5 border-gray-200 sm:p-4 rounded-xl border  dark:border-gray-600 shadow shadow:gray-400   bg-[#FFF9F1] dark:bg-muted/10 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 text-foreground text-sm sm:text-[15px] cursor-not-allowed"
            />
          </div>

          {/* Profile Name */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Profile Name</label>
            <input 
              type="text" 
              placeholder="Your name" 
              className="w-full p-3.5 sm:p-4 rounded-xl border   bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow border-gray-200 shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none transition-all placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Client Name */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Client Name</label>
            <input 
              type="text" 
              placeholder="Your client name" 
              className="w-full p-3.5 sm:p-4 rounded-xl border   shadow:gray-400 border-gray-200  bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Order Number */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Order Number</label>
            <input 
              type="text" 
              placeholder="Order Number" 
              className="w-full p-3.5 sm:p-4 rounded-xl border   shadow:gray-400 border-gray-200  bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Update By */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Update By</label>
            <input 
              type="text" 
              placeholder="Update By" 
              className="w-full p-3.5 sm:p-4 rounded-xl border   shadow:gray-400  border-gray-200 bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Textareas (Full width on all screens per image) */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Update Message</label>
            <textarea 
              placeholder="Tell us a little about the project..." 
              className="w-full h-28 sm:h-36 p-3.5 sm:p-4 rounded-xl border border-gray-200  shadow:gray-400   bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none leading-relaxed resize-none placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Refine Message</label>
            <textarea 
              placeholder="Tell us a little about the project..." 
              className="w-full h-28 sm:h-36 p-3.5 sm:p-4 rounded-xl border border-gray-200  shadow:gray-400  bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none leading-relaxed resize-none placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Comment From Operation</label>
            <textarea 
              placeholder="Tell us a little about the project..." 
              className="w-full h-28 sm:h-36 p-3.5 sm:p-4 rounded-xl border  border-gray-200 shadow:gray-400   bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none leading-relaxed resize-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Single Column inputs grouped on left in md view per implied structure */}
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Update For</label>
            <input 
              type="text" 
              placeholder="Update For" 
              className="w-full p-3.5 sm:p-4 rounded-xl border border-gray-200  bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Approve By</label>
            <input 
              type="text" 
              placeholder="Approve By" 
              className="w-full p-3.5 sm:p-4 rounded-xl border   bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2 border-gray-200 dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Send By</label>
            <input 
              type="text" 
              placeholder="Send By" 
              className="w-full p-3.5 sm:p-4 rounded-xl border   bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2 border-gray-200 dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Important Notes Textarea (Full width) */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-foreground/80 ml-1">Important Notes</label>
            <textarea 
              placeholder="Tell us a little about the project..." 
              className="w-full h-28 sm:h-36 p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-[#FFF9F1] dark:bg-muted/10 text-foreground text-sm sm:text-[15px] focus:ring-2  dark:border-gray-600 shadow shadow:gray-400 dark:focus:ring-teal-500/40 focus:ring-orange-500/40 outline-none leading-relaxed resize-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Action Buttons Section */}
          <div className="md:col-span-2 pt-6 sm:pt-10 flex flex-col-reverse sm:flex-row gap-4 justify-center sm:justify-end">
            <Button variant="outline" type="button" className="w-full sm:w-auto py-6 sm:py-7 px-10 rounded-2xl  border-gray-200 dark:border-gray-600 shadow shadow:gray-400   font-bold text-muted-foreground hover:bg-muted/10 dark:hover:bg-muted/5 transition-all text-base sm:text-lg border-2">
              Cancel
            </Button>
            <Button className="w-full sm:w-auto bg-orange-400 hover:bg-orange-400 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-black py-6 sm:py-7 px-12 rounded-2xl text-base sm:text-lg shadow-lg shadow-orange-500/20  dark:shadow-teal-500/20 active:scale-[0.98] transition-all">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}