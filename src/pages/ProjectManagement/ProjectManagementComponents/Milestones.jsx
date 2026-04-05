// import React, { useState, useContext } from "react";
// import { ThemeContext } from "@/Componants/Themes/ThemeContext";
// import {
//   CheckCircle2,
//   Circle,
//   FileText,
//   Video,
// } from "lucide-react";
// import { projectsData } from "@/data/projectsData";
// import ProjectDetailsPage from "./ProjectDetailsPage";

// const Milestones = ({ projectId }) => {
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";


//   const project = projectsData.find((p) => p.id === projectId);


//   const [completedMilestones, setCompletedMilestones] = useState([0]);

//   if (!project) return null;

//   const toggleMilestone = (index) => {
//     setCompletedMilestones((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   return (
//     <div className={`${isDark ? "bg-[#0B0F1A] text-white" : " text-gray-900"}`}>
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//         {/* Left Column - Dynamic Milestones */}
//         <div className="lg:col-span-8 space-y-6">
//           <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-bold">Milestones</h2>
//               <span className="text-gray-400 text-sm font-medium">
//                 Total ({project.milestones?.length || 0})
//               </span>
//             </div>

//             <div className="space-y-3">
//               {project.milestones?.map((m, idx) => {
//                 const isDone = completedMilestones.includes(idx);
//                 return (
//                   <div
//                     key={idx}
//                     onClick={() => toggleMilestone(idx)}
//                     className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${isDone
//                       ? isDark ? "bg-green-900/10 border-green-500/50" : "bg-green-50 border-green-200"
//                       : isDark ? "bg-transparent border-gray-800" : "bg-transparent border-gray-100"
//                       }`}
//                   >
//                     <div className="flex items-center gap-4">
//                       {isDone ? <CheckCircle2 className="text-green-500" /> : <Circle className="text-gray-300" />}
//                       <div>
//                         <p className={`font-semibold text-sm ${isDone ? "text-green-600" : ""}`}>{m.title}</p>
//                         <p className="text-[10px] text-gray-400 font-medium">{m.date}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-bold">{m.amount}</p>
//                       <p className="text-[10px] text-gray-400">Deadline {m.deadline}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           <ProjectDetailsPage />
//         </div>


//         {/* Right Column - Dynamic Sidebar */}
//         <div className="lg:col-span-4 space-y-6">

//           {/* Team Members - Now Dynamic */}
//           <SidebarCard title="Team Members" isDark={isDark}>
//             {project.team?.map((member, i) => (
//               <div key={i} className={`flex items-center gap-3 p-3 mb-2 rounded-xl border ${isDark ? "border-gray-800 bg-gray-800/20" : "border-gray-50 bg-gray-50/50"}`}>
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${member.bg}`}>
//                   {member.initial}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold">{member.name}</p>
//                   <p className="text-xs text-gray-400">{member.role}</p>
//                 </div>
//               </div>
//             ))}
//           </SidebarCard>

//           {/* Files & Documents */}
//           <SidebarCard title="Files & Documents" isDark={isDark}>
//             {["Project_Brief.pdf", "Requirements.docx"].map((f, i) => (
//               <div key={i} className="flex items-center gap-3 mb-4 last:mb-0">
//                 <FileText className="text-gray-400" size={20} />
//                 <div>
//                   <p className="text-sm font-medium underline cursor-pointer hover:text-orange-500">{f}</p>
//                   <p className="text-[10px] text-gray-400">2.4 MB • 2 days ago</p>
//                 </div>
//               </div>
//             ))}
//           </SidebarCard>

//           {/* Meeting Videos */}
//           <SidebarCard title="Meeting video file" isDark={isDark}>
//             {[1, 2].map((_, i) => (
//               <div key={i} className="flex items-center gap-3 mb-4 last:mb-0">
//                 <Video className="text-gray-400" size={18} />
//                 <div>
//                   <p className="text-xs font-medium underline cursor-pointer hover:text-orange-500">Kickoff_Meeting.mp4</p>
//                   <p className="text-[10px] text-gray-400">45 MB • Yesterday</p>
//                 </div>
//               </div>
//             ))}
//           </SidebarCard>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SidebarCard = ({ title, children, isDark }) => (
//   <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}>
//     <div className="flex justify-between items-center mb-4">
//       <h3 className="font-bold text-sm">{title}</h3>
//       <button className="text-[10px] text-gray-400 hover:text-orange-500 underline font-medium">See All</button>

//     </div>
//     {children}
//   </div>
// );

// export default Milestones;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import {
  CheckCircle2,
  Circle,
  FileText,
  Video,
} from "lucide-react";
import { projectsData } from "@/data/projectsData";
import ProjectDetailsPage from "./ProjectDetailsPage";
import RecentMessage from "./RecentMessage";

const Milestones = ({ projectId }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === projectId);


  const [completedMilestones, setCompletedMilestones] = useState([]);

  if (!project) return null;


  const toggleMilestone = (e, index) => {
    e.stopPropagation();
    setCompletedMilestones((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  const handleRowClick = (e, idx) => {
    navigate("/task-tracker/:id");
  };

  return (
    <div className={`${isDark ? "bg-[#0B0F1A] text-white" : "text-gray-900"}`}>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

        {/* Left Column */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <div className={`p-4 sm:p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold">Milestones</h2>
              <span className="text-gray-400 text-xs sm:text-sm font-medium">
                Total ({project.milestones?.length || 0})
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {project.milestones?.map((m, idx) => {
                const isDone = completedMilestones.includes(idx);
                return (
                  <div
                    key={idx}

                    onClick={(e) => handleRowClick(e, idx)}
                    className={`flex items-center justify-between p-3 sm:p-4 border rounded-xl cursor-pointer transition-all ${isDone
                      ? isDark
                        ? "bg-green-900/10 border-green-500/50"
                        : "bg-green-50 border-green-200"
                      : isDark
                        ? "bg-transparent border-gray-800 hover:border-gray-600"
                        : "bg-transparent border-gray-100 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">

                      <div
                        onClick={(e) => toggleMilestone(e, idx)}
                        className="flex-shrink-0 cursor-pointer p-1 rounded-full hover:scale-110 transition-transform"
                      >
                        {isDone ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : (
                          <Circle className="text-gray-300" size={20} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-semibold text-xs sm:text-sm truncate ${isDone ? "text-green-600" : ""}`}>
                          {m.title}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">{m.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-xs sm:text-sm font-bold">{m.amount}</p>
                      <p className="text-[10px] text-gray-400">Deadline {m.deadline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <ProjectDetailsPage />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Recent Messages */}
          <RecentMessage />

          {/* Team Members */}
          <SidebarCard title="Team Members" isDark={isDark}>
            {project.team?.map((member, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2 sm:p-3 mb-2 rounded-xl border ${isDark ? "border-gray-800 bg-gray-800/20" : "border-gray-50 bg-gray-50/50"
                  }`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${member.bg}`}>
                  {member.initial}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold truncate">{member.name}</p>
                  <p className="text-xs text-gray-400 truncate">{member.role}</p>
                </div>
              </div>
            ))}
          </SidebarCard>

          {/* Files & Documents */}
          <SidebarCard title="Files & Documents" isDark={isDark}>
            {["Project_Brief.pdf", "Requirements.docx"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 mb-3 sm:mb-4 last:mb-0">
                <FileText className="text-gray-400 flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium underline cursor-pointer hover:text-orange-500 truncate">
                    {f}
                  </p>
                  <p className="text-[10px] text-gray-400">2.4 MB • 2 days ago</p>
                </div>
              </div>
            ))}
          </SidebarCard>

          {/* Meeting Videos */}
          <SidebarCard title="Meeting video file" isDark={isDark}>
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-3 sm:mb-4 last:mb-0">
                <Video className="text-gray-400 flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-xs font-medium underline cursor-pointer hover:text-orange-500 truncate">
                    Kickoff_Meeting.mp4
                  </p>
                  <p className="text-[10px] text-gray-400">45 MB • Yesterday</p>
                </div>
              </div>
            ))}
          </SidebarCard>
        </div>
      </div>
    </div>
  );
};

const SidebarCard = ({ title, children, isDark }) => (
  <div className={`p-4 sm:p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}>
    <div className="flex justify-between items-center mb-3 sm:mb-4">
      <h3 className="font-bold text-xs sm:text-sm">{title}</h3>
      <button className="text-[10px] text-gray-400 hover:text-orange-500 underline font-medium">
        See All
      </button>
    </div>
    {children}
  </div>
);

export default Milestones;