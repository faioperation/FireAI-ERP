import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  LayoutGrid, 
  Building2, 
  PlusCircle, 
  UserPlus, 
  X 
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function TeamManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Stats Data
  const stats = [
    { label: "Total Member", value: "40", sub: "Active members", icon: <Users size={20} />, color: "text-orange-500" },
    { label: "Active Projects", value: "46", sub: "Across all teams", icon: <Briefcase size={20} />, color: "text-orange-400" },
    { label: "Teams", value: "4", sub: "", icon: <LayoutGrid size={20} />, color: "text-orange-500" },
    { label: "Department", value: "4", sub: "", icon: <Building2 size={20} />, color: "text-orange-600" },
  ];

  // Team Cards Data
  const teams = [
    { name: "Morning", lead: "Sarah Johnson", members: 3, projects: 18 },
    { name: "Evening", lead: "Emily Davis", members: 1, projects: 12 },
    { name: "Night", lead: "Rajesh Kumar", members: 1, projects: 6 },
    { name: "Morning", lead: "Amanda Miller", members: 1, projects: 10 },
  ];

  return (
    <div className="p-4 sm:p-6   min-h-screen animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Team Management</h1>
          <p className="text-muted-foreground text-sm">Manage teams</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-orange-400 dark:bg-teal-400 hover:bg-orange-600 text-white rounded-xl px-6 py-6 font-bold active:scale-95 transition-all"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Create Team
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-darkSecBG p-6 rounded-[24px] border border-border flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
              {stat.sub && <p className="text-[10px] font-bold text-green-500 uppercase">{stat.sub}</p>}
            </div>
            <div className={`p-3 rounded-xl bg-orange-50/50 dark:bg-orange-400 dark:bg-textTeal/10 ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-black mb-6 text-foreground/50 uppercase tracking-widest text-sm">All Teams</h2>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams.map((team, i) => (
          <div key={i} className="bg-white dark:bg-darkSecBG p-6 rounded-[28px] border border-border hover:shadow-xl transition-all group relative">
            <button 
              onClick={() => setIsAssignModalOpen(true)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white hover:bg-orange-50 dark:hover:bg-teal-400 dark:bg-textTeal/10 rounded-full transition-colors"
            >
              <UserPlus size={18} />
            </button>
            
            <div className="w-12 h-12 bg-orange-100/50 dark:bg-teal-400  dark:bg-textteal/10 rounded-2xl flex items-center justify-center text-orange-500 dark:text-white mb-4">
              <Users size={22} />
            </div>
            
            <h3 className="text-lg font-black text-foreground">{team.name}</h3>
            <p className="text-xs text-muted-foreground font-semibold mb-6 italic">Lead: {team.lead}</p>
            
            <div className="flex justify-between items-center text-sm border-t border-border pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Members</span>
                <span className="font-black text-foreground text-lg">{team.members}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Projects</span>
                <span className="font-black text-orange-500 text-lg">{team.projects}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODALS --- */}

      {/* 1. Create New Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-white dark:bg-darkSecBG w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-border flex justify-between items-center bg-[#FFF9F1] dark:bg-muted/5">
              <h2 className="text-xl font-black text-foreground">Create New Team</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={24} /></button>
            </div>
            <form className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1">Team Name *</label>
                <input type="text" placeholder="Enter team name" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 dark:focus:ring-teal-400  outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1">Team Lead *</label>
                <select className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 dark:focus:ring-teal-400  outline-none appearance-none cursor-pointer">
                  <option>Rifat</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1">Description</label>
                <textarea rows={4} placeholder="Enter team description" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 dark:focus:ring-teal-400 outline-none resize-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setIsCreateModalOpen(false)} variant="outline" className="flex-1 py-7 rounded-2xl font-bold text-muted-foreground border-2">Cancel</Button>
                <Button className="flex-1 py-7 rounded-2xl font-black bg-orange-400 dark:bg-teal-400 hover:bg-orange-600 text-white">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Assign Member to Team Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-white dark:bg-darkSecBG w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-border flex justify-between items-center bg-[#FFF9F1] dark:bg-muted/5">
              <h2 className="text-xl font-black text-foreground">Assign Member to Team</h2>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={24} /></button>
            </div>
            <form className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1">Team</label>
                <input type="text" readOnly defaultValue="Development" className="w-full p-4 rounded-2xl border border-border bg-muted/20 text-muted-foreground cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1">Select Employee *</label>
                <select className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 dark:focus:ring-teal-400  outline-none appearance-none">
                  <option>Select employee</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1">Designation</label>
                <input type="text" placeholder="e.g., Lead Developer, Designer" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 dark:focus:ring-teal-400  outline-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setIsAssignModalOpen(false)} variant="outline" className="flex-1 py-7 rounded-2xl font-bold text-muted-foreground border-2">Cancel</Button>
                <Button className="flex-1 py-7 rounded-2xl font-black bg-orange-400 dark:bg-textteal hover:bg-orange-600 dark:bg-teal-400 text-white ">Assign Member</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}