import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  LayoutGrid, 
  Building2, 
  PlusCircle, 
  Edit3, 
  Trash2,
  X,
  Mail, Phone,
  Search,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function EmployeeManagement() {
  const [activeModal, setActiveModal] = useState(null); // 'add', 'edit', 'terminate'

  // Stats Data per reference style
 const stats = [
    { label: "Total Member", value: "40", sub: "Active members", icon: <Users size={18} />, color: "text-orange-500" },
    { label: "Active Projects", value: "46", sub: "Across all teams", icon: <Briefcase size={18} />, color: "text-orange-400" },
    { label: "Teams", value: "4", sub: "", icon: <LayoutGrid size={18} />, color: "text-orange-500" },
    { label: "Department", value: "4", sub: "", icon: <Building2 size={18} />, color: "text-orange-600" },
  ];

  const employees = [
    { name: "Sarah Johnson", role: "General Inquiries", email: "sarah.j@company.com", phone: "+1 (555) 123-4567", dept: "Business Development", date: "12/04/25", shift: "Morning", status: "active" },
    { name: "Michael Chen", role: "Backend Developer", email: "michael.c@company.com", phone: "+1 (555) 234-5678", dept: "Operations", date: "14/08/25", shift: "Evening", status: "active" },
    { name: "Emily Davis", role: "Sales Representative", email: "emily.d@company.com", phone: "+1 (555) 345-6789", dept: "Sales", date: "12/04/25", shift: "Night", status: "active" },
    { name: "Sarah Johnson", role: "General Inquiries", email: "sarah.j@company.com", phone: "+1 (555) 123-4567", dept: "Business Development", date: "12/04/25", shift: "Morning", status: "active" },
    { name: "Michael Chen", role: "Backend Developer", email: "michael.c@company.com", phone: "+1 (555) 234-5678", dept: "Operations", date: "14/08/25", shift: "Evening", status: "active" },
    { name: "Emily Davis", role: "Sales Representative", email: "emily.d@company.com", phone: "+1 (555) 345-6789", dept: "Sales", date: "12/04/25", shift: "Night", status: "active" },
  ];
  
  return (
    <div className="p-4 sm:p-6 md:p-8  min-h-screen animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Employee list</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage employees</p>
        </div>
        <Button 
          onClick={() => setActiveModal('add')}
          className="bg-orange-500 dark:bg-teal-500 hover:bg-orange-600 dark:hover:bg-teal-600 text-white rounded-xl px-6 py-6 font-bold shadow-lg  active:scale-95 transition-all"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Employee
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-darkSecBG p-6 rounded-[24px] border border-border flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
              {stat.sub && <p className="text-[10px] font-bold text-green-500 uppercase">{stat.sub}</p>}
            </div>
            <div className={`p-3 rounded-xl bg-orange-50/50 dark:bg-orange-500/10 ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search employees..." 
          className="w-full p-4 pl-12 rounded-2xl border border-border bg-white dark:bg-darkSecBG focus:ring-2 dark:focus:ring-teal-500 focus:ring-orange-400 outline-none transition-all font-medium"
        />
      </div>

     {/* Employee Table Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-[32px] border border-[#E2E8F0] dark:border-[#334155] overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] dark:border-[#334155]">
          <h2 className="font-black text-[#1E293B] dark:text-white">All Employees ({employees.length})</h2>
        </div>
        
        <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155]">
          {employees.map((emp, i) => (
            <div key={i} className="p-6 grid grid-cols-1 md:grid-cols-12 items-center gap-6 group hover:bg-gray-50/50 dark:hover:bg-[#334155]/20 transition-all">
              
              {/* Profile & Name */}
              <div className="md:col-span-3 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#FFF7ED] flex items-center justify-center font-black text-[#F97316] text-lg border-2 border-white shadow-sm">SJ</div>
                <div>
                  <h4 className="font-black text-[#1E293B] dark:text-white">{emp.name}</h4>
                  <p className="text-xs text-gray-400 font-bold mb-1">{emp.role}</p>
                  <span className="px-3 py-0.5 bg-[#FFF7ED] text-[#F97316] text-[10px] font-black rounded-md">{emp.shift}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-3 space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 font-bold">
                  <Mail size={14} className="text-gray-400 dark:text-gray-200" /> {emp.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 font-bold">
                  <Phone size={14} className="text-gray-400 dark:text-gray-300" /> {emp.phone}
                </div>
              </div>

              {/* Department */}
              <div className="md:col-span-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Department</p>
                <p className="text-xs font-black text-[#F97316] uppercase">{emp.dept}</p>
              </div>

              {/* Joining Date */}
              <div className="md:col-span-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Joining Date</p>
                <p className="text-xs font-black text-[#1E293B] dark:text-white">{emp.date}</p>
              </div>

              {/* Status & Actions */}
              <div className="md:col-span-2 flex items-center justify-between gap-4">
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase tracking-widest">{emp.status}</span>
                <button 
                  onClick={() => setActiveModal('edit')}
                  className="p-2 text-gray-400 hover:text-[#F97316] transition-colors border-2 border-transparent hover:border-[#FFF7ED] rounded-lg"
                >
                  <Edit3 size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL LOGIC --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-darkSecBG w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-[#FFF9F1] dark:bg-muted/5">
              <h2 className="text-xl font-black text-foreground">
                {activeModal === 'add' ? 'Add New Employee' : activeModal === 'edit' ? 'Edit Employee' : 'Terminate Employee'}
              </h2>
              <div className="flex items-center gap-2">
                {activeModal === 'edit' && (
                  <button 
                    onClick={() => setActiveModal('terminate')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-black hover:bg-orange-100 transition-colors"
                  >
                    <Trash2 size={14} /> Terminate Employee
                  </button>
                )}
                <button onClick={() => setActiveModal(null)} className="text-muted-foreground hover:text-foreground transition-colors p-1"><X size={24} /></button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {activeModal === 'terminate' ? (
                /* Terminate View */
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-2xl flex gap-3">
                    <AlertTriangle className="text-orange-500 shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-black text-orange-700">Warning: This action cannot be undone</p>
                      <p className="text-xs text-orange-600/80 font-medium">Terminating an employee will change their status to inactive and remove them from active projects.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-xl">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">Terminating Employee</p>
                      <p className="font-black text-foreground">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Senior Front-end Developer • Operation</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase ml-1">Termination Type *</label>
                        <select className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 outline-none"><option className='dark:bg-black'>without notice</option>
                        <option className='dark:bg-black'>with notice</option></select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase ml-1">Termination Date *</label>
                        <input type="date" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase ml-1">Reason for Termination *</label>
                      <textarea rows={4} placeholder="Please provide detailed reason..." className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 outline-none resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button onClick={() => setActiveModal('edit')} variant="outline" className="flex-1 py-7 rounded-2xl font-bold border-2">Cancel</Button>
                    <Button className="flex-1 py-7 rounded-2xl font-black bg-orange-700 text-white">Confirm Termination</Button>
                  </div>
                </div>
              ) : (
                /* Add/Edit Form View */
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase ml-1">First Name *</label>
                      <input type="text" placeholder="Enter first name" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase ml-1">Last Name</label>
                      <input type="text" placeholder="Enter last name" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 focus:ring-2 focus:ring-orange-400 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase ml-1">Department</label>
                      <select className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 outline-none"><option>Operations</option></select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase ml-1">Employee ID *</label>
                      <input type="text" placeholder="35009" className="w-full p-4 rounded-2xl border border-border bg-[#FFF9F1] dark:bg-muted/10 outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button type="button" onClick={() => setActiveModal(null)} variant="outline" className="flex-1 py-7 rounded-2xl font-bold border-2">Cancel</Button>
                    <Button className="flex-1 py-7 rounded-2xl font-black bg-orange-500 dark:bg-teal-500 text-white">Save</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}