

import React, { useState, useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData as initialData } from "@/data/projectsData";

export default function ProjectList({ searchQuery = "" }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";


  const [projects, setProjects] = useState(initialData);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const teamMatch = Array.isArray(project.team)
      ? project.team.some(member => member.name.toLowerCase().includes(query))
      : project.team?.toLowerCase().includes(query);

    return (
      project.id.toLowerCase().includes(query) ||
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      project.profile.toLowerCase().includes(query) ||
      teamMatch
    );
  });

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0B0F1A] text-white" : "text-gray-900"}`}>
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-xs font-bold uppercase tracking-wider border-b ${isDark ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                <th className="p-4 whitespace-nowrap">Project ID <Filter size={12} className="inline ml-1 cursor-pointer" /></th>
                <th className="p-4 whitespace-nowrap">Project <Filter size={12} className="inline ml-1 cursor-pointer" /></th>
                <th className="p-4 whitespace-nowrap">Client <Filter size={12} className="inline ml-1 cursor-pointer" /></th>
                <th className="p-4 whitespace-nowrap">Profile Name <Filter size={12} className="inline ml-1 cursor-pointer" /></th>
                <th className="p-4 whitespace-nowrap">Current Phase <Filter size={12} className="inline ml-1 cursor-pointer" /></th>
                <th className="p-4 whitespace-nowrap">Status <Filter size={12} className="inline ml-1 cursor-pointer" /></th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Value</th>
                <th className="p-4">Assigned Team</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`border-b last:border-0 ${isDark ? "border-gray-800 hover:bg-gray-800/30" : "border-gray-50 hover:bg-gray-50/50"}`}
                  >
                    <td className="p-4 font-medium">{project.id}</td>
                    <td className="p-4 max-w-[200px] font-medium">{project.name}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{project.client}</td>
                    <td className="p-4">{project.profile}</td>

                    {/* Current Phase Select */}
                    <td className="p-4">
                      <select className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase outline-none cursor-pointer border ${isDark ? "bg-gray-800 border-gray-700 text-orange-400" : "bg-orange-50 border-orange-100 text-orange-600"}`}>
                        <option value={project.phase}>{project.phase}</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="AI Development">AI Development</option>
                      </select>
                    </td>

                    {/* Status Select */}
                    <td className="p-4">
                      <select className="bg-orange-400 text-white px-2 py-1 rounded text-[10px] outline-none cursor-pointer hover:bg-orange-500 transition-colors">
                        <option>{project.status}</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Pending</option>
                      </select>
                    </td>

                    <td className="p-4 text-gray-500 whitespace-nowrap">{project.deadline}</td>
                    <td className="p-4 font-bold text-green-500">{project.value}</td>

                    <td className="p-4">
                      <div className="flex -space-x-2">
                        {Array.isArray(project.team) ? (
                          project.team.map((member, i) => (
                            <div
                              key={i}
                              title={`${member.name} (${member.role})`}
                              className={`w-8 h-8 rounded-full border-2 ${isDark ? "border-[#111827]" : "border-white"} flex items-center justify-center text-[10px] font-bold shadow-sm ${member.bg}`}
                            >
                              {member.initial}
                            </div>
                          ))
                        ) : (
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${project.teamColor}`}>
                            {project.team}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3 text-gray-400">
                        <Link to={`/project/view/${project.id}`}>
                          <Eye size={18} className="hover:text-orange-500 cursor-pointer transition-colors" />
                        </Link>
                        <Link title="Edit" to={`/project/edit/${project.id}`}>
                          <Edit size={18} className="hover:text-orange-500 cursor-pointer transition-colors" />
                        </Link>
                        {/* Delete Button */}
                        <Trash2
                          size={18}
                          onClick={() => handleDelete(project.id)}
                          className="hover:text-red-500 cursor-pointer transition-colors"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-gray-400">
                    <p className="text-lg font-semibold">No data found</p>
                    <p className="text-sm mt-1">No projects match "{searchQuery}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}