import React, { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { Filter, Eye, Edit, Trash2, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData as initialData } from "@/data/projectsData";

// --- Filter Dropdown Component ---
const FilterDropdown = ({ columnKey, label, data, onFilterChange, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const dropdownRef = useRef(null);


  const options = [...new Set(data.map(item => String(item[columnKey])))];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAll = () => {
    setSelectedItems(options);
    onFilterChange(columnKey, options);
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    onFilterChange(columnKey, []);
  };

  const handleCheckboxChange = (option) => {
    const updated = selectedItems.includes(option)
      ? selectedItems.filter(i => i !== option)
      : [...selectedItems, option];
    setSelectedItems(updated);
    onFilterChange(columnKey, updated);
  };

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block ml-1" ref={dropdownRef}>
      <Filter
        size={13}
        className={`cursor-pointer hover:text-orange-500 transition-colors ${isOpen ? "text-orange-500" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className={`absolute left-0 mt-2 w-64 rounded-lg shadow-xl border z-50 p-3 ${isDark ? "bg-[#1F2937] border-gray-700 shadow-black/40" : "bg-white border-gray-200 shadow-gray-200"
          }`}>
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
            <input
              type="text"
              placeholder={`Search ${label}...`}
              className={`w-full pl-8 pr-3 py-2 text-xs rounded-md border outline-none focus:border-orange-500 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto mb-3 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <label key={idx} className="flex items-center gap-2 p-1.5 hover:bg-orange-50 dark:hover:bg-gray-700 cursor-pointer rounded transition-colors">
                  <input
                    type="checkbox"
                    className="accent-orange-500 w-3.5 h-3.5"
                    checked={selectedItems.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <span className={`text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>{option}</span>
                </label>
              ))
            ) : (
              <p className="text-center text-[10px] text-gray-400 py-2">No results</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center border-t pt-2 mt-1 border-gray-100 dark:border-gray-700">
            <button
              onClick={handleSelectAll}
              className="text-[10px] font-bold text-orange-500 hover:underline"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="text-[10px] font-bold text-gray-400 hover:text-red-500"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function ProjectList({ searchQuery = "" }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [projects, setProjects] = useState(initialData);
  const [activeFilters, setActiveFilters] = useState({});

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleFilterChange = (columnKey, selectedValues) => {
    setActiveFilters(prev => ({
      ...prev,
      [columnKey]: selectedValues
    }));
  };


  // const filteredProjects = projects.filter((project) => {
  //   // 1. Global Search
  //   const query = searchQuery.toLowerCase();
  //   const globalMatch = 
  //     project.id.toLowerCase().includes(query) ||
  //     project.name.toLowerCase().includes(query) ||
  //     project.client.toLowerCase().includes(query);

  //   // 2. Column-wise Checkbox Filters
  //   const columnMatch = Object.keys(activeFilters).every(key => {
  //     if (!activeFilters[key] || activeFilters[key].length === 0) return true;
  //     return activeFilters[key].includes(String(project[key]));
  //   });

  //   return globalMatch && columnMatch;
  // });

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const teamNames = Array.isArray(project.team)
      ? project.team.map(member => member.name.toLowerCase()).join(" ")
      : "";

    const globalMatch =
      project.id.toLowerCase().includes(query) ||
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      (project.profile && project.profile.toLowerCase().includes(query)) ||
      (project.phase && project.phase.toLowerCase().includes(query)) ||
      (project.status && project.status.toLowerCase().includes(query)) ||
      (project.deadline && project.deadline.toLowerCase().includes(query)) ||
      (project.value && project.value.toLowerCase().includes(query)) ||
      teamNames.includes(query);

    // 2. Column-wise Checkbox Filters 
    const columnMatch = Object.keys(activeFilters).every(key => {
      if (!activeFilters[key] || activeFilters[key].length === 0) return true;
      return activeFilters[key].includes(String(project[key]));
    });

    return globalMatch && columnMatch;
  });

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0B0F1A] text-white" : "text-gray-900"}`}>
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-xs font-bold uppercase tracking-wider border-b ${isDark ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                <th className="p-4 whitespace-nowrap">
                  Project ID <FilterDropdown columnKey="id" label="ID" data={projects} onFilterChange={handleFilterChange} isDark={isDark} />
                </th>
                <th className="p-4 whitespace-nowrap">
                  Project <FilterDropdown columnKey="name" label="Project" data={projects} onFilterChange={handleFilterChange} isDark={isDark} />
                </th>
                <th className="p-4 whitespace-nowrap">
                  Client <FilterDropdown columnKey="client" label="Client" data={projects} onFilterChange={handleFilterChange} isDark={isDark} />
                </th>
                <th className="p-4 whitespace-nowrap">
                  Profile Name <FilterDropdown columnKey="profile" label="Profile" data={projects} onFilterChange={handleFilterChange} isDark={isDark} />
                </th>
                <th className="p-4 whitespace-nowrap">
                  Current Phase <FilterDropdown columnKey="phase" label="Phase" data={projects} onFilterChange={handleFilterChange} isDark={isDark} />
                </th>
                <th className="p-4 whitespace-nowrap">
                  Status <FilterDropdown columnKey="status" label="Status" data={projects} onFilterChange={handleFilterChange} isDark={isDark} />
                </th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Value</th>
                <th className="p-4">Assigned Team</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className={`border-b last:border-0 ${isDark ? "border-gray-800 hover:bg-gray-800/30" : "border-gray-50 hover:bg-gray-50/50"}`}>
                    <td className="p-4 font-medium">{project.id}</td>
                    <td className="p-4 max-w-[200px] font-medium">{project.name}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{project.client}</td>
                    <td className="p-4">{project.profile}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${isDark ? "bg-gray-800 text-orange-400 border border-gray-700" : "bg-orange-50 text-orange-600 border border-orange-100"}`}>
                        {project.phase}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-orange-400 text-white px-2 py-1 rounded text-[10px] font-bold uppercase">
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap">{project.deadline}</td>
                    <td className="p-4 font-bold text-green-500">{project.value}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shadow-sm border ${isDark ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-orange-50 text-orange-600 border-orange-100"
                          }`}>
                          {project.assignee
                            ? project.assignee.split(' ').map(n => n[0]).join('').toUpperCase()
                            : "NA"}
                        </div>


                        <div className="flex flex-col text-left">
                          <span className={`text-sm font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                            {project.assignee}
                          </span>

                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3 text-gray-400">
                        <Link to={`/project/view/${project.id}`}><Eye size={18} className="hover:text-orange-500 transition-colors" /></Link>
                        <Link to={`/project/edit/${project.id}`}><Edit size={18} className="hover:text-orange-500 transition-colors" /></Link>
                        <Trash2 size={18} onClick={() => handleDelete(project.id)} className="hover:text-red-500 cursor-pointer transition-colors" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-gray-400">
                    <p className="text-lg font-semibold">No projects match your filters</p>
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
