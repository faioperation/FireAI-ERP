import React from 'react';
import { Plus, MoreVertical, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';
import ImportBtn from '@/SharedComponants/ImportBtn';
import ExportBtn from '@/SharedComponants/ExportBtn';
const Message = () => {
  // Image (download 13.png) onusare dummy data
  const messages = Array(12).fill({
    sendingDate: "00/02/2025",
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
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Top Header Action */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
         <div className="md:flex space-y-2 md:space-y-0 items-center gap-3 w-full sm:w-auto">
       
          <ImportBtn/>
        <ExportBtn/>
        <Button className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-black py-6 px-8 rounded-2xl shadow-lg shadow-orange-500/20 dark:shadow-teal-500/20 transition-all active:scale-95">
          <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> <Link to="/addmessage"> Add Message </Link> 
        </Button>
        </div>
       
      </div>

      {/* Message Table Container */}
      <div className="bg-white dark:bg-darkSecBG rounded-[32px] border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead>
              <tr className="bg-muted/30 dark:bg-muted/5 border-b border-border">
                {[
                  "Sending Date", "Profile Name", "Client Name", "Order Number", 
                  "Update By", "Update Message", "Refine Message", "Comment From Operation", 
                  "Approve By", "Sent By", "Important Notes"
                ].map((header) => (
                  <th key={header} className="px-4 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead> 
            <tbody className="divide-y divide-border/50">
              {messages.map((msg, idx) => (
                <tr key={idx} className="hover:bg-muted/10 dark:hover:bg-muted/5 transition-colors group">
                  <td className="px-4 py-4 text-[12px] font-bold text-muted-foreground">{msg.sendingDate}</td>
                  <td className="px-4 py-4 text-[12px] font-black text-foreground/80">{msg.profileName}</td>
                  <td className="px-4 py-4 text-[12px] font-bold text-foreground">{msg.clientName}</td>
                  <td className="px-4 py-4 text-[12px] font-black text-orange-500 dark:text-teal-500">{msg.orderNumber}</td>
                  <td className="px-4 py-4 text-[12px] font-bold text-foreground/70">{msg.updateBy}</td>
                  <td className="px-4 py-4 text-[12px] text-muted-foreground italic truncate max-w-[150px]">{msg.updateMsg}</td>
                  <td className="px-4 py-4 text-[12px] text-muted-foreground italic">{msg.refineMsg}</td>
                  <td className="px-4 py-4 text-[12px] text-muted-foreground italic">{msg.comment}</td>
                  <td className="px-4 py-4 text-[12px] font-bold text-foreground/70">{msg.approveBy}</td>
                  <td className="px-4 py-4 text-[12px] font-bold text-foreground/70">{msg.sentBy}</td>
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