import { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, Video, Users } from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";


const meetingsData = [
  {
    id: "1",
    title: "Project Kickoff - E-commerce Platform",
    type: "Client Meeting",
    date: "Mar 1, 2026",
    time: "10:00 AM",
    location: "Zoom",
    attendees: ["Sarah Johnson", "Michael Chen", "TechMart Team", "Alice Ray"],
    agenda: [
      "Project Overview & Objectives",
      "Timeline & Milestones Review",
      "Resource Allocation Discussion",
      "Risk Assessment & Mitigation",
      "Next Steps & Action Items",
    ],
    summary: "The kickoff meeting covered all major project objectives and aligned the team on deliverables. Key decisions were made regarding the project timeline and resource distribution.",
  },
  {
    id: "2",
    title: "Q2 Strategy Planning",
    type: "Internal Meeting",
    date: "Mar 5, 2026",
    time: "2:00 PM",
    location: "Google Meet",
    attendees: ["Alice Ray", "Bob Smith", "Clara Lee", "Dan Brown"],
    agenda: [
      "Q1 Performance Review",
      "Q2 Goals & KPIs",
      "Budget Planning",
      "Team Expansion Discussion",
    ],
    summary: "Q2 strategy was finalized with clear KPIs and budget allocations. Team expansion plans approved for two new hires.",
  },
  {
    id: "3",
    title: "Client Feedback Session",
    type: "Client Meeting",
    date: "Mar 10, 2026",
    time: "11:00 AM",
    location: "Conference Room A",
    attendees: ["Eve White", "Frank Green", "Client Team"],
    agenda: [
      "Product Demo Walkthrough",
      "Client Feedback Collection",
      "Issue Resolution Discussion",
      "Feature Request Review",
    ],
    summary: "Client provided positive feedback on the latest build. Several feature requests were noted for the next sprint.",
  },
];

const tabs = ["Agenda", "Attendees", "Meeting Summary"];

import { useState } from "react";

export default function MeetingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("Agenda");

  const meeting = meetingsData.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className={`p-6 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        Meeting not found.{" "}
        <button
          onClick={() => navigate("/meeting")}
          className="text-orange-500 underline cursor-pointer"
        >
          Go back
        </button>
      </div>
    );
  }


  const cardBg = isDark ? "bg-[#111827] border-gray-700" : "bg-white border-gray-200";
  const titleColor = isDark ? "text-white" : "text-gray-900";
  const subColor = isDark ? "text-gray-400" : "text-gray-500";
  const metaLabel = isDark ? "text-gray-500" : "text-gray-400";
  const metaValue = isDark ? "text-gray-100" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const tabInactive = isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700";
  const agendaBg = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const numberBg = isDark ? "bg-orange-900/40 text-orange-400" : "bg-orange-50 text-orange-500";

  const metaItems = [
    { icon: Calendar, label: "Date", value: meeting.date },
    { icon: Clock, label: "Time", value: meeting.time },
    { icon: Video, label: "Location", value: meeting.location },
    { icon: Users, label: "Attendees", value: `${meeting.attendees.length} people` },
  ];

  return (
    <div className={`min-h-screen`}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/sales")}
        className={`flex items-center gap-2 text-sm mb-5 cursor-pointer transition-colors ${
          isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <ArrowLeft size={16} />
        <span>Back to Meetings</span>
      </button>

      {/* Main Card */}
      <div className={`rounded-2xl border p-5 sm:p-6 mb-5 ${cardBg}`}>
        {/* Title */}
        <h1 className={`text-xl sm:text-2xl font-semibold mb-1 ${titleColor}`}>
          {meeting.title}
        </h1>
        <p className={`text-sm mb-5 ${subColor}`}>{meeting.type}</p>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metaItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={`rounded-xl border p-3 sm:p-4 flex items-center gap-3 ${agendaBg}`}
            >
              <div className={`p-2 rounded-lg ${isDark ? "bg-orange-900/30" : "bg-orange-50"}`}>
                <Icon size={16} className="text-orange-500" />
              </div>
              <div>
                <p className={`text-xs ${metaLabel}`}>{label}</p>
                <p className={`text-sm font-medium ${metaValue}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Card */}
      <div className={`rounded-2xl border ${cardBg}`}>
        {/* Tab Header */}
        <div className={`flex border-b ${borderColor} px-5 sm:px-6`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 mr-6 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-orange-500 text-orange-500"
                  : `border-transparent ${tabInactive}`
              }`}
            >
              {tab}{tab === "Attendees" ? ` (${meeting.attendees.length})` : ""}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6">

          {/* Agenda Tab */}
          {activeTab === "Agenda" && (
            <div>
              <h3 className={`text-base font-semibold mb-4 ${titleColor}`}>Meeting Agenda</h3>
              <div className="flex flex-col gap-3">
                {meeting.agenda.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 ${agendaBg}`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${numberBg}`}>
                      {i + 1}
                    </span>
                    <p className={`text-sm ${metaValue}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendees Tab */}
          {activeTab === "Attendees" && (
            <div>
              <h3 className={`text-base font-semibold mb-4 ${titleColor}`}>
                Attendees ({meeting.attendees.length})
              </h3>
              <div className="flex flex-col gap-3">
                {meeting.attendees.map((name, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${agendaBg}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${numberBg}`}>
                      {name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <p className={`text-sm font-medium ${metaValue}`}>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === "Meeting Summary" && (
            <div>
              <h3 className={`text-base font-semibold mb-4 ${titleColor}`}>Meeting Summary</h3>
              <div className={`rounded-xl border px-5 py-4 ${agendaBg}`}>
                <p className={`text-sm leading-relaxed ${metaValue}`}>{meeting.summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}