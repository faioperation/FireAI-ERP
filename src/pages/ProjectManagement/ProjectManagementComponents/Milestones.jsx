import React, { useState, useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Plus,
  CheckCircle2,
  Circle,
  FileText,
  Video,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router";
import ProjectDetailsPage from "./ProjectDetailsPage";

const Milestones = () => {
  const { theme } = useContext(ThemeContext);

  // Milestone state management
  const [completedMilestones, setCompletedMilestones] = useState([0]); // Default 1st one checked

  const toggleMilestone = (index) => {
    if (completedMilestones.includes(index)) {
      setCompletedMilestones(completedMilestones.filter((i) => i !== index));
    } else {
      setCompletedMilestones([...completedMilestones, index]);
    }
  };

  const milestones = [
    {
      title: "UI/UX Design",
      date: "Feb 1",
      amount: "$ 400",
      deadline: "Mar 30, 2026",
    },
    {
      title: "Front-End Development",
      date: "Mar 15",
      amount: "$ 500",
      deadline: "Mar 30, 2026",
    },
    {
      title: "Mobile Apps",
      date: "Mar 25",
      amount: "$ 600",
      deadline: "Mar 30, 2026",
    },
    {
      title: "AI Development",
      date: "Mar 25",
      amount: "$ 600",
      deadline: "Mar 30, 2026",
    },
    {
      title: "Back-End Development",
      date: "Mar 25",
      amount: "$ 600",
      deadline: "Mar 30, 2026",
    },
  ];

  const isDark = theme === "dark";

  return (
    <div className={`${isDark ? "bg-[#0B0F1A] text-white" : " text-gray-900"}`}>
      {/* Back Button */}

      {/* Main Container - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main Content) - 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Milestones Card (From Image 2) */}
          <div
            className={`p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Milestones</h2>
              <span className="text-gray-400 text-sm font-medium">
                Total (08)
              </span>
            </div>

            <div className="space-y-3">
              {milestones.map((m, idx) => {
                const isDone = completedMilestones.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleMilestone(idx)}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      isDone
                        ? isDark
                          ? "bg-green-900/10 border-green-500/50"
                          : "bg-green-50 border-green-200"
                        : isDark
                          ? "bg-transparent border-gray-800"
                          : "bg-transparent border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {isDone ? (
                        <CheckCircle2 className="text-green-500" />
                      ) : (
                        <Circle className="text-gray-300" />
                      )}
                      <div>
                        <p
                          className={`font-semibold text-sm ${isDone ? "text-green-600" : ""}`}
                        >
                          {m.title}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {m.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{m.amount}</p>
                      <p className="text-[10px] text-gray-400">
                        Deadline {m.deadline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ProjectDetailsPage />
        </div>

        {/* Right Column (Sidebar) - 4 Cols */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Messages */}
          <SidebarCard title="Recent Message" isDark={isDark}>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className={`p-3 mb-2 rounded-lg border text-[11px] ${isDark ? "bg-gray-800/50 border-gray-700 text-gray-400" : "bg-white border-gray-50 text-gray-500"}`}
              >
                A short document explaining your project idea and
                goals..................
              </div>
            ))}
          </SidebarCard>

          {/* Team Members */}
          <SidebarCard title="Team Members" isDark={isDark}>
            {[
              {
                name: "Sarah Johnson",
                role: "Lead Developer",
                initial: "SJ",
                bg: "bg-orange-100 text-orange-600",
              },
              {
                name: "Michael Chen",
                role: "Backend Developer",
                initial: "MC",
                bg: "bg-blue-100 text-blue-600",
              },
            ].map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 mb-2 rounded-xl border ${isDark ? "border-gray-900" : "border-gray-50"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${m.bg}`}
                >
                  {m.initial}
                </div>
                <div>
                  <p className="text-sm font-bold">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.role}</p>
                </div>
              </div>
            ))}
          </SidebarCard>

          {/* Files */}
          <SidebarCard title="Files & Documents" isDark={isDark}>
            {["Conversation page", "Requirements.pdf"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 mb-4">
                <FileText className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm font-medium underline cursor-pointer">
                    {f}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    2.4 MB • 2 days ago
                  </p>
                </div>
              </div>
            ))}
          </SidebarCard>
          <SidebarCard title="Meeting video file" isDark={isDark}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-4 last:mb-0">
                <Video className="text-gray-400" size={18} />
                <div>
                  <p className="text-xs font-medium underline cursor-pointer hover:text-orange-500">
                    Design_Mockups.Mp4
                  </p>
                  <p className="text-[10px] text-gray-400">
                    2.4 MB • 2 days ago
                  </p>
                </div>
              </div>
            ))}
          </SidebarCard>
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Card Wrapper
const SidebarCard = ({ title, children, isDark }) => (
  <div
    className={`p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-sm">{title}</h3>
      <button className="text-[10px] text-gray-400 hover:text-orange-500 underline">
        See All
      </button>
    </div>
    {children}
  </div>
);

export default Milestones;
