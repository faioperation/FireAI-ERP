import React from 'react';
import { Calendar, DollarSign, Users, Target, ArrowRight } from 'lucide-react';

export default function TaskOverview({ findProject }) {
  // Empty state handling
  if (!findProject) {
    return (
      <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-border rounded-[32px] bg-muted/5">
        <div className="p-4 bg-muted/20 rounded-full mb-4">
          <Target className="text-muted-foreground w-8 h-8" />
        </div>
        <p className="text-muted-foreground font-semibold">Select an order to view project overview</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Main Section */}
      <div className="bg-white dark:bg-darkSecBG rounded-[32px] border border-border p-6 md:p-10 shadow-sm">
        
        {/* Header: Title & Phase */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-2xl font-black text-foreground tracking-tight">
                {findProject.project_name}
              </h1>
              <span className="inline-block w-12 h-1 bg-orange-500 dark:bg-teal-500 rounded-full mt-2 hidden md:block"></span>
            </div>
            
            <div className="flex items-center gap-3 text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">
              <span>{findProject.project_id}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
              <span>{findProject.company}</span>
            </div>

            <div className="pt-2">
              <span className="bg-orange-100 dark:bg-teal-500/10 text-orange-600 dark:text-teal-400 px-4 py-1.5 rounded-xl text-xs md:text-sm font-black tracking-tight border border-orange-200 dark:border-teal-500/20">
                {findProject.category}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <div className="px-6 py-3 rounded-2xl border-2 border-orange-500/20 dark:border-teal-500/20 bg-orange-50/50 dark:bg-teal-500/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 dark:bg-teal-500 animate-pulse"></div>
              <span className="text-orange-600 dark:text-teal-400 font-extrabold text-sm md:text-base">
                {findProject.current_phase}
              </span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="relative mb-10 group">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-500/10 dark:bg-teal-500/10 rounded-full"></div>
          <p className="text-foreground/70 text-[15px] md:text-[18px] leading-relaxed font-medium pl-2">
            {findProject.description}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {findProject.metrics.map((metric, index) => (
            <div 
              key={index}
              className="group p-5 rounded-[24px] border border-border bg-muted/5 dark:bg-muted/10 hover:border-orange-500/30 dark:hover:border-teal-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-darkBG shadow-sm text-orange-500 dark:text-teal-500 group-hover:scale-110 transition-transform">
                  {metric.icon_type === 'calendar' ? <Calendar size={20} strokeWidth={2.5} /> : <DollarSign size={20} strokeWidth={2.5} />}
                </div>
                <div>
                  <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">{metric.label}</p>
                  <p className="text-base md:text-lg font-black text-foreground">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Members Metric */}
          <div className="p-5 rounded-[24px] border border-border bg-muted/5 dark:bg-muted/10">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-darkBG shadow-sm text-blue-500">
                <Users size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Assign Member</p>
                <p className="text-base md:text-lg font-black text-foreground">{findProject.assign_member_count} Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="flex justify-end px-2">
        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-orange-500 dark:hover:text-teal-500 transition-colors group">
          View Detailed Analytics <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}