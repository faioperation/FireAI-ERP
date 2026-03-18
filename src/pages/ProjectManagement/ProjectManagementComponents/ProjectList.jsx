import React, { useState, useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { Plus, Eye, Edit, Trash2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCreateModal from "./ProjectCreateModal";

const projectsData = [
  {
    id: "FWY12UZS",
    name: "E-commerce Platform Redesign",
    client: "TechMart Inc",
    profile: "AI BYTE",
    phase: "UI/UX",
    status: "Select Status",
    deadline: "Mar 30, 2026",
    value: "$85K",
    team: "AI Weavers",
    teamColor: "bg-purple-100 text-purple-600",
  },
  {
    id: "FWY12UZS",
    name: "AI Customer Support Bot",
    client: "ServiceHub",
    profile: "AI BYTE",
    phase: "UI/UX",
    status: "Select Status",
    deadline: "Mar 30, 2026",
    value: "$45K",
    team: "System saviors",
    teamColor: "bg-pink-100 text-pink-600",
  },
  {
    id: "FWY12UZS",
    name: "E-commerce Platform Redesign",
    client: "TechMart Inc",
    profile: "AI BYTE",
    phase: "UI/UX",
    status: "Select Status",
    deadline: "Mar 30, 2026",
    value: "$85K",
    team: "AI Weavers",
    teamColor: "bg-purple-100 text-purple-600",
  },
  {
    id: "FWY12UZS",
    name: "AI Customer Support Bot",
    client: "ServiceHub",
    profile: "AI BYTE",
    phase: "UI/UX",
    status: "Select Status",
    deadline: "Mar 30, 2026",
    value: "$45K",
    team: "System saviors",
    teamColor: "bg-pink-100 text-pink-600",
  },
  {
    id: "FWY12UZS",
    name: "E-commerce Platform Redesign",
    client: "TechMart Inc",
    profile: "AI BYTE",
    phase: "UI/UX",
    status: "Select Status",
    deadline: "Mar 30, 2026",
    value: "$85K",
    team: "AI Weavers",
    teamColor: "bg-purple-100 text-purple-600",
  },
  {
    id: "FWY12UZS",
    name: "AI Customer Support Bot",
    client: "ServiceHub",
    profile: "AI BYTE",
    phase: "UI/UX",
    status: "Select Status",
    deadline: "Mar 30, 2026",
    value: "$45K",
    team: "System saviors",
    teamColor: "bg-pink-100 text-pink-600",
  },
];

export default function ProjectList() {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={` min-h-screen ${theme === "dark" ? "bg-[#0B0F1A] text-white" : " text-gray-900"}`}
    >
      {/* Project Table */}
      <div
        className={`rounded-2xl border overflow-hidden ${theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`text-xs font-bold uppercase tracking-wider border-b ${theme === "dark" ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}
              >
                <th className="p-4">
                  Project ID <Filter size={12} className="inline orange-500" />
                </th>
                <th className="p-4">Project</th>
                <th className="p-4">Client</th>
                <th className="p-4">
                  Profile Name{" "}
                  <Filter size={12} className="inline cursor-pointer" />
                </th>
                <th className="p-4">
                  Current Phase{" "}
                  <Filter size={12} className="inline cursor-pointer" />
                </th>
                <th className="p-4">
                  Status <Filter size={12} className="inline cursor-pointer" />
                </th>
                <th className="p-4">
                  Deadline{" "}
                  <Filter size={12} className="inline cursor-pointer" />
                </th>
                <th className="p-4">Value</th>
                <th className="p-4">Assigned Team</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {projectsData.map((project, index) => (
                <tr
                  key={index}
                  className={`border-b last:border-0 ${theme === "dark" ? "border-gray-800 hover:bg-gray-800/30" : "border-gray-50 hover:bg-gray-50/50"}`}
                >
                  <td className="p-4 font-medium">{project.id}</td>
                  <td className="p-4 max-w-[200px]">{project.name}</td>
                  <td className="p-4">{project.client}</td>
                  <td className="p-4">{project.profile}</td>
                  <td className="p-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
                      {project.phase}
                    </span>
                  </td>
                  <td className="p-4">
                    <select className="bg-orange-400 text-white px-2 py-1 rounded text-xs outline-none">
                      <option>{project.status}</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-500">{project.deadline}</td>
                  <td className="p-4 font-bold text-green-500">
                    {project.value}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${project.teamColor}`}
                    >
                      {project.team}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3 text-gray-400">
                      <Eye
                        size={18}
                        className="hover:text-orange-500 cursor-pointer"
                      />
                      <Edit
                        size={18}
                        className="hover:text-orange-500 cursor-pointer"
                      />
                      <Trash2
                        size={18}
                        className="hover:text-orange-500 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Import */}
      <ProjectCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
