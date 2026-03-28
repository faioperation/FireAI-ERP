import { useContext } from "react";
import { useNavigate } from "react-router";
import { Eye, Pencil, Trash2, Calendar, Clock, Video, Users } from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";

const meetingsData = [
  {
    id: "1",
    title: "Project Kickoff - E-commerce Platform",
    type: "Client Meeting",
    date: "Mar 1, 2026",
    time: "10:00 AM",
    location: "Zoom",
    attendees: 4,
    participants: ["Sarah Johnson", "Michael Chen", "TechMart Team", "Alice Ray"],
  },
  {
    id: "2",
    title: "Q2 Strategy Planning",
    type: "Internal Meeting",
    date: "Mar 5, 2026",
    time: "2:00 PM",
    location: "Google Meet",
    attendees: 4,
    participants: ["Alice Ray", "Bob Smith", "Clara Lee", "Dan Brown"],
  },
  {
    id: "3",
    title: "Client Feedback Session",
    type: "Client Meeting",
    date: "Mar 10, 2026",
    time: "11:00 AM",
    location: "Conference Room A",
    attendees: 3,
    participants: ["Eve White", "Frank Green", "Client Team"],
  },
];

export default function MeetingList() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const cardBg = isDark ? "bg-[#111827] border-gray-700" : "bg-white border-gray-200";
  const titleColor = isDark ? "text-white" : "text-gray-900";
  const subColor = isDark ? "text-gray-400" : "text-gray-500";
  const metaLabel = isDark ? "text-gray-500" : "text-gray-400";
  const metaValue = isDark ? "text-gray-200" : "text-gray-800";
  const dividerColor = isDark ? "border-gray-700" : "border-gray-100";
  const iconHover = isDark ? "hover:text-white hover:bg-gray-700" : "hover:text-gray-800 hover:bg-gray-100";

  const handleEdit = (id) => console.log("✏️ Edit meeting:", id);
  const handleDelete = (id) => console.log("🗑 Delete meeting:", id);

  return (
    <div className="w-full">
      <h2 className={`text-xl font-semibold mb-5 ${titleColor}`}>Meeting List</h2>

      <div className="flex flex-col gap-4">
        {meetingsData.map((meeting) => (
          <div
            key={meeting.id}
            className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${cardBg}
              ${isDark ? "hover:border-gray-600" : "hover:shadow-md"}`}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className={`text-base sm:text-lg font-semibold ${titleColor}`}>
                  {meeting.title}
                </h3>
                <p className={`text-sm mt-0.5 ${subColor}`}>{meeting.type}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => navigate(`/meeting/${meeting.id}`)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${subColor} ${iconHover}`}
                  title="View"
                >
                  <Eye size={17} />
                </button>
                <button
                  onClick={() => handleEdit(meeting.id)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${subColor} ${iconHover}`}
                  title="Edit"
                >
                  <Pencil size={17} />
                </button>
                <button
                  onClick={() => handleDelete(meeting.id)}
                  className={`p-2 rounded-lg transition-all cursor-pointer text-red-400 hover:text-red-600 ${
                    isDark ? "hover:bg-red-950/40" : "hover:bg-red-50"
                  }`}
                  title="Delete"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="flex items-start gap-2">
                <Calendar size={16} className={`mt-0.5 shrink-0 ${subColor}`} />
                <div>
                  <p className={`text-xs ${metaLabel}`}>Date</p>
                  <p className={`text-sm font-medium ${metaValue}`}>{meeting.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className={`mt-0.5 shrink-0 ${subColor}`} />
                <div>
                  <p className={`text-xs ${metaLabel}`}>Time</p>
                  <p className={`text-sm font-medium ${metaValue}`}>{meeting.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Video size={16} className={`mt-0.5 shrink-0 ${subColor}`} />
                <div>
                  <p className={`text-xs ${metaLabel}`}>Location</p>
                  <p className={`text-sm font-medium ${metaValue}`}>{meeting.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users size={16} className={`mt-0.5 shrink-0 ${subColor}`} />
                <div>
                  <p className={`text-xs ${metaLabel}`}>Attendees</p>
                  <p className={`text-sm font-medium ${metaValue}`}>{meeting.attendees} participants</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className={`mt-4 pt-4 border-t ${dividerColor}`}>
              <p className={`text-sm ${subColor}`}>
                <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Participants:
                </span>{" "}
                {meeting.participants.join(",  ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}