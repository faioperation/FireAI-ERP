import React, { useState, useRef, useEffect } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';
import ImportBtn from '@/SharedComponants/ImportBtn';
import ExportBtn from '@/SharedComponants/ExportBtn';
import { CiFilter } from "react-icons/ci";

const INITIAL_MESSAGES = Array(12).fill({
  sendingDate: "2025-02-10", // ISO format for better filtering
  profileName: "AI NEST",
  clientName: "JOHN DOE",
  orderNumber: "#889774548",
  updateBy: "Anik",
  updateMsg: "I Will Update......",
  refineMsg: "I WILL UPDATE......",
  comment: "I WILL UPDATE......",
  approveBy: "Salman",
  sentBy: "Urmi",
  importantNotes: "I WILL UPDATE......"
}).map((item, index) => ({ ...item, id: index })); // Added unique ID for mapping

const Message = () => {
  const [messages] = useState(INITIAL_MESSAGES);
  const [activeFilter, setActiveFilter] = useState(null);
  const [columnFilters, setColumnFilters] = useState({
    profileName: "",
    clientName: "",
    orderNumber: "",
    updateBy: "",
    approveBy: "",
    sentBy: "",
    startDate: "",
    endDate: ""
  });

  const filterRef = useRef(null);

  // Click outside to close filter
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setActiveFilter(null);
  };

  // Filter Logic
  const filteredMessages = messages.filter((msg) => {
    const profileMatch = msg.profileName.toLowerCase().includes(columnFilters.profileName.toLowerCase());
    const clientMatch = msg.clientName.toLowerCase().includes(columnFilters.clientName.toLowerCase());
    const orderMatch = msg.orderNumber.toLowerCase().includes(columnFilters.orderNumber.toLowerCase());
    const updateByMatch = msg.updateBy.toLowerCase().includes(columnFilters.updateBy.toLowerCase());
    const approveByMatch = msg.approveBy.toLowerCase().includes(columnFilters.approveBy.toLowerCase());
    const sentByMatch = msg.sentBy.toLowerCase().includes(columnFilters.sentBy.toLowerCase());

    let dateMatch = true;
    if (columnFilters.startDate && columnFilters.endDate) {
      dateMatch = msg.sendingDate >= columnFilters.startDate && msg.sendingDate <= columnFilters.endDate;
    }

    return profileMatch && clientMatch && orderMatch && updateByMatch && approveByMatch && sentByMatch && dateMatch;
  });

  // Reusable Filter Box Component
  const FilterBox = ({ column, dataKey }) => {
    const uniqueOptions = [...new Set(messages.map(m => m[dataKey]))];
    return (
      <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[999] w-64 left-0 top-full normal-case font-normal">
        <input
          autoFocus type="text" placeholder="Search..."
          value={columnFilters[column]}
          onKeyDown={handleKeyDown}
          onChange={(e) => setColumnFilters({ ...columnFilters, [column]: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-[#111827] text-foreground outline-none focus:ring-1 focus:ring-blue-500 mb-3"
        />
        <div className="flex justify-between items-center px-1 text-[11px] font-bold uppercase mb-3">
          <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" onClick={() => setColumnFilters({ ...columnFilters, [column]: "" })}>Select All</span>
          <span className="text-red-500 cursor-pointer hover:underline" onClick={() => { setColumnFilters({ ...columnFilters, [column]: "" }); setActiveFilter(null); }}>Clear</span>
        </div>
        <div className="max-h-[160px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {uniqueOptions.filter(opt => opt.toLowerCase().includes(columnFilters[column].toLowerCase())).map((option, idx) => (
            <div key={idx} className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
              onClick={() => setColumnFilters({ ...columnFilters, [column]: columnFilters[column] === option ? "" : option })}>
              <input type="checkbox" checked={columnFilters[column] === option} readOnly className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{option}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Date Range Filter Component
  const DateFilterBox = () => (
    <div ref={filterRef} className="absolute mt-2 p-4 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[999] w-72 left-0 top-full flex flex-col gap-3">
      <span className="text-[11px] font-bold uppercase text-muted-foreground px-1">Sending Date Range</span>
      <input type="date" value={columnFilters.startDate} onChange={(e) => setColumnFilters({ ...columnFilters, startDate: e.target.value })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground" />
      <input type="date" value={columnFilters.endDate} onChange={(e) => setColumnFilters({ ...columnFilters, endDate: e.target.value })} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-gray-50 dark:bg-[#111827] text-foreground" />
      <div className="flex gap-2 mt-1">
        <Button onClick={() => setActiveFilter(null)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 font-bold">Apply</Button>
        <Button onClick={() => { setColumnFilters({ ...columnFilters, startDate: "", endDate: "" }); setActiveFilter(null); }} variant="outline" className="flex-1 border-red-200 text-red-500 hover:bg-red-50 text-xs h-9 font-bold">Clear</Button>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-500">

      {/* Top Header Action */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
        <div className="md:flex space-y-2 md:space-y-0 items-center gap-3 w-full sm:w-auto">
          <ImportBtn />
          <ExportBtn />
          <Button className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-black py-6 px-8 rounded-2xl shadow-lg shadow-orange-500/20 dark:shadow-teal-500/20 transition-all active:scale-95">
            <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> <Link to="/addmessage"> Add Message </Link>
          </Button>
        </div>
      </div>

      {/* Message Table Container */}
      <div className="bg-white dark:bg-darkSecBG rounded-[32px] border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-visible custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1500px]">
            <thead>
              <tr className="bg-muted/30 dark:bg-muted/5 border-b border-border text-muted-foreground font-black text-[10px] tracking-widest uppercase">
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}>
                    Sending Date <CiFilter className={columnFilters.startDate ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'date' && <DateFilterBox />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'profile' ? null : 'profile')}>
                    Profile Name <CiFilter className={columnFilters.profileName ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'profile' && <FilterBox column="profileName" dataKey="profileName" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'client' ? null : 'client')}>
                    Client Name <CiFilter className={columnFilters.clientName ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'client' && <FilterBox column="clientName" dataKey="clientName" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'order' ? null : 'order')}>
                    Order Number <CiFilter className={columnFilters.orderNumber ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'order' && <FilterBox column="orderNumber" dataKey="orderNumber" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'updateBy' ? null : 'updateBy')}>
                    Update By <CiFilter className={columnFilters.updateBy ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'updateBy' && <FilterBox column="updateBy" dataKey="updateBy" />}
                </th>
                <th className="px-4 py-5">Update Message</th>
                <th className="px-4 py-5">Refine Message</th>
                <th className="px-4 py-5">Comment From Operation</th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'approveBy' ? null : 'approveBy')}>
                    Approve By <CiFilter className={columnFilters.approveBy ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'approveBy' && <FilterBox column="approveBy" dataKey="approveBy" />}
                </th>
                <th className="px-4 py-5 relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground" onClick={() => setActiveFilter(activeFilter === 'sentBy' ? null : 'sentBy')}>
                    Sent By <CiFilter className={columnFilters.sentBy ? "text-blue-500" : ""} />
                  </div>
                  {activeFilter === 'sentBy' && <FilterBox column="sentBy" dataKey="sentBy" />}
                </th>
                <th className="px-4 py-5">Important Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[12px]">
              {filteredMessages.map((msg, idx) => (
                <tr key={idx} className="hover:bg-muted/10 dark:hover:bg-muted/5 transition-colors group">
                  <td className="px-4 py-4 font-bold text-muted-foreground whitespace-nowrap">{msg.sendingDate}</td>
                  <td className="px-4 py-4 font-black text-foreground/80">{msg.profileName}</td>
                  <td className="px-4 py-4 font-bold text-foreground">{msg.clientName}</td>
                  <td className="px-4 py-4 font-black text-orange-500 dark:text-teal-500">{msg.orderNumber}</td>
                  <td className="px-4 py-4 font-bold text-foreground/70">{msg.updateBy}</td>
                  <td className="px-4 py-4 text-muted-foreground italic truncate max-w-[150px]">{msg.updateMsg}</td>
                  <td className="px-4 py-4 text-muted-foreground italic truncate max-w-[150px]">{msg.refineMsg}</td>
                  <td className="px-4 py-4 text-muted-foreground italic truncate max-w-[150px]">{msg.comment}</td>
                  <td className="px-4 py-4 font-bold text-foreground/70">{msg.approveBy}</td>
                  <td className="px-4 py-4 font-bold text-foreground/70">{msg.sentBy}</td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      {msg.importantNotes}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Message;