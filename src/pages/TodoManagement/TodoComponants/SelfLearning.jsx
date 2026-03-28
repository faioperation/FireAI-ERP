import React from "react";
import { Button } from "@/components/ui/button";

const SelfLearning = () => {
  return (
    <div className="bg-background dark:bg-darkBG min-h-screen transition-colors duration-300">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 ">
        
        {/* Left Side: Form Section */}
        <div className="lg:col-span-5 order-1">
          <div className="bg-white dark:bg-darkSecBG p-5 sm:p-7 rounded-[24px] border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold mb-5 text-foreground border-b border-border pb-3">
              Add Self Learning Note
            </h2>
            
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] sm:text-sm font-bold text-foreground/80 ml-1">Learning Note *</label>    
                <textarea 
                  placeholder="What did you learn today?" 
                  className="w-full h-24 sm:h-32 p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-teal-400/50 transition-all text-[14px] sm:text-[15px] text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] sm:text-sm font-bold text-foreground/80 ml-1">Update Message (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Any additional updates..." 
                  className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-teal-400/50 text-[14px] sm:text-[15px] text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] sm:text-sm font-bold text-foreground/80 ml-1">Source Link</label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-teal-400/50 text-[14px] sm:text-[15px] text-foreground font-mono"
                />
              </div>

              <Button className="w-full bg-orange-400  hover:bg-orange-400  dark:bg-teal-400 dark:hover:bg-teal-700 text-white py-6 sm:py-7 rounded-xl font-bold text-[15px] sm:text-base shadow-lg shadow-orange-500/20 dark:shadow-teal-500/20 transition-all active:scale-[0.97] mt-2 border-none">
                Add & Mark as Done
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: List Section */}
        <div className="lg:col-span-7 order-2 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              My Learning Notes 
              <span className="text-[12px] bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">2</span>
            </h2>
          </div>
          
          <div className="space-y-4 max-h-[none] lg:max-h-[75vh] lg:overflow-y-auto lg:pr-3 custom-scrollbar">
            <LearningNoteCard 
              title="Implementing Responsive Design Systems" 
              date="3/5/2026" 
              updateMsg="Explored Tailwind breakpoints and container queries." 
            />
            
            <LearningNoteCard 
              title="Completed React Hooks advanced tutorial" 
              date="3/4/2026" 
              updateMsg="Implemented custom hooks in practice project" 
              isEditing={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const LearningNoteCard = ({ title, date, updateMsg, isEditing = false }) => {
  return (
    <div className="bg-white dark:bg-darkSecBG p-4 sm:p-6 rounded-[22px] border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-bold text-[15px] sm:text-lg text-foreground leading-snug">{title}</h3>
        <div className="shrink-0 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-green-500/20 uppercase tracking-tighter">
          Completed
        </div>
      </div>
      
      <p className="text-muted-foreground text-[12px] sm:text-[13px] mb-4 font-medium flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></span> {date}
      </p>
      
      <div className="bg-muted/30 dark:bg-muted/5 p-3 sm:p-4 rounded-xl border border-border/50">
        <p className="text-[13px] sm:text-[14px] font-bold text-foreground/90 leading-relaxed">
          Update: <span className="font-medium text-muted-foreground block sm:inline mt-1 sm:mt-0">{updateMsg}</span>
        </p>

        {isEditing ? (
          <div className="space-y-3 mt-4 animate-in fade-in zoom-in-95 duration-200">
            <textarea 
              placeholder="Add update message..." 
              className="w-full h-20 p-3 rounded-lg border border-border bg-[#FFF9F1] dark:bg-muted/10 text-[14px] text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 dark:focus:ring-teal-400"
            />
            <div className="flex gap-2 sm:gap-3">
              <Button className="flex-1 sm:flex-none bg-orange-400  hover:bg-orange-400  dark:bg-teal-400 dark:hover:bg-teal-700 text-white px-6 h-10 rounded-lg font-bold text-[13px] border-none">Save</Button>
              <Button variant="outline" className="flex-1 sm:flex-none px-6 h-10 rounded-lg font-bold border-border text-[13px] dark:hover:bg-teal-500/10 dark:hover:text-teal-400">Cancel</Button>
            </div>
          </div>
        ) : (
          <Button className="w-full sm:w-auto bg-orange-400  hover:bg-orange-400  dark:bg-teal-400 dark:hover:bg-teal-700 text-white px-5 h-10 rounded-xl font-bold mt-4 text-[13px] shadow-sm border-none">
            Update Message
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelfLearning;