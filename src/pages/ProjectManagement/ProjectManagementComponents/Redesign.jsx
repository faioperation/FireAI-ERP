import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { ArrowLeft, Calendar, DollarSign, Users } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { projectsData } from "@/data/projectsData";

export default function Redesign({ projectId }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return <div className="p-10 text-center text-red-500">Project Not Found!</div>;
  }


  const teamNames = Array.isArray(project.team)
    ? project.team.map(member => member.name).join(", ")
    : project.team;

  const stats = [
    { title: "Total Timeline", value: "50 days", icon: <Calendar size={20} className="text-blue-500" /> },
    { title: "Deadline", value: project.deadline, icon: <Calendar size={20} className="text-green-500" /> },
    { title: "Total Budget", value: project.value, icon: <DollarSign size={20} className="text-orange-500" /> },
    { title: "Assign Team", value: teamNames, icon: <Users size={20} className="text-purple-500" /> }
  ];

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/project")}
        className={`flex items-center gap-2 text-sm mb-5 cursor-pointer transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"
          }`}
      >
        <ArrowLeft size={16} />
        <span>Back to Projects</span>
      </button>

      <div className="bg-white dark:bg-[#242526] rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            {project.name}
          </h1>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {project.id} • {project.client}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-3 py-1 rounded-full font-bold uppercase">
            {project.phase}
          </span>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <img
              src={project.avatar}
              alt="avatar"
              className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600"
            />
            {project.assignee}
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {stats.map((stat, index) => (
            <InfoCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#2f3031] p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="p-2 bg-white dark:bg-[#242526] rounded-md shadow-sm">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{title}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate" title={value}>
          {value}
        </p>
      </div>
    </div>
  );
}