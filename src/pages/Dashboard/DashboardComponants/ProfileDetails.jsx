import { Funnel } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { CiFilter } from "react-icons/ci";

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  
  // 🔥 Sorting State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // 🔥 Filter State
  const [activeFilter, setActiveFilter] = useState(null); 
  const [columnFilters, setColumnFilters] = useState({
    service_line: "",
    assigned_team: "",
    order_status: ""
  });

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/profileData.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProfile(found);
      });
  }, [id]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  // 1. Filter Logic
  const filteredOrders = profile.orders.filter((order) => {
    const globalMatch = Object.values(order).some((val) =>
      val.toString().toLowerCase().includes(search.toLowerCase())
    );
    const serviceMatch = order.service_line.toLowerCase().includes(columnFilters.service_line.toLowerCase());
    const teamMatch = order.assigned_team.toLowerCase().includes(columnFilters.assigned_team.toLowerCase());
    const statusMatch = order.order_status.toLowerCase().includes(columnFilters.order_status.toLowerCase());

    return globalMatch && serviceMatch && teamMatch && statusMatch;
  });

  // 2. Sorting Logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === 'order_value' || sortConfig.key === 'project_id' || sortConfig.key === 'order_id') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    const keyword = search.toLowerCase();
    const matchScore = (item) => {
      let score = 0;
      Object.values(item).forEach((val) => {
        if (val.toString().toLowerCase().includes(keyword)) score += 1;
      });
      return score;
    };
    return matchScore(b) - matchScore(a);
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 🔥 Updated Filter Box with Checkbox Options (As per your images)
  const FilterBox = ({ column }) => {
    const uniqueOptions = [...new Set(profile.orders.map(order => order[column]))];

    return (
      <div 
        ref={filterRef} 
        className="absolute mt-2 p-3 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[999] w-64 left-0 top-full"
      >
        <input
          autoFocus
          type="text"
          placeholder={`Search...`}
          value={columnFilters[column]}
          onChange={(e) => setColumnFilters({ ...columnFilters, [column]: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && setActiveFilter(null)}
          className="w-full px-3 py-2 text-xs border rounded-lg dark:bg-[#111827] dark:border-gray-600 outline-none focus:ring-1 focus:ring-cyan-500 mb-3 text-gray-700 dark:text-gray-200"
        />

        <div className="flex justify-between items-center px-1 text-[11px] font-bold uppercase cursor-pointer select-none mb-3">
          <span className="text-blue-500 hover:text-blue-400" onClick={() => setColumnFilters({...columnFilters, [column]: ""})}>Select All</span>
          <span className="text-red-500 hover:text-red-400" onClick={() => {
            setColumnFilters({...columnFilters, [column]: ""});
            setActiveFilter(null);
          }}>Clear</span>
        </div>

        {/* Checkbox List Section */}
        <div className="max-h-[160px] overflow-y-auto space-y-1 custom-scrollbar pr-1">
          {uniqueOptions
            .filter(opt => opt.toLowerCase().includes(columnFilters[column].toLowerCase()))
            .map((option, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                onClick={() => setColumnFilters({ ...columnFilters, [column]: columnFilters[column] === option ? "" : option })}
              >
                <input 
                  type="checkbox" 
                  checked={columnFilters[column] === option}
                  readOnly
                  className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                />
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {option}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (   
    <div className="p-4 md:p-2">
      <div className="dark:border-[#1F2937] rounded-2xl p-2 hover:shadow-gray-400 duration-300">
        
        {/* Header & Stats */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{profile.company}</h2>
            <p className="text-sm text-gray-500 dark:text-darkSecText">{profile.category}</p>
          </div>
          <img src={profile.avatar} alt="" className="w-12 h-12 rounded-lg border border-cyan-500/30" />
        </div>

        {/* Global Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl outline-none border border-gray-300 dark:border-[#1F2937] bg-white dark:bg-darkSecBG focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#1F2937]">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-darkSecBG text-left">
              <tr>
                <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('order_id')}>
                  ORDER LIST <span className="text-gray-400">{sortConfig.key === 'order_id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '⇅'}</span>
                </th>
                <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('project_id')}>
                  PROJECT ID <span className="text-gray-400">{sortConfig.key === 'project_id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '⇅'}</span>
                </th>
                <th className="p-3 cursor-pointer select-none" onClick={() => handleSort('order_value')}>
                  ORDER VALUE <span className="text-gray-400">{sortConfig.key === 'order_value' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '⇅'}</span>
                </th>
                
                <th className="p-3 relative">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'service_line' ? null : 'service_line')}>
                    SERVICE LINE <CiFilter className={columnFilters.service_line ? "text-cyan-500" : "text-gray-400"} />
                  </div>
                  {activeFilter === 'service_line' && <FilterBox column="service_line" />}
                </th>

                <th className="p-3 relative">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'assigned_team' ? null : 'assigned_team')}>
                    ASSIGNED TEAM <CiFilter className={columnFilters.assigned_team ? "text-cyan-500" : "text-gray-400"} />
                  </div>
                  {activeFilter === 'assigned_team' && <FilterBox column="assigned_team" />}
                </th>

                <th className="p-3 relative">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(activeFilter === 'order_status' ? null : 'order_status')}>
                    STATUS <CiFilter className={columnFilters.order_status ? "text-cyan-500" : "text-gray-400"} />
                  </div>
                  {activeFilter === 'order_status' && <FilterBox column="order_status" />}
                </th>
              </tr>
            </thead>
 
            <tbody>
              {sortedOrders.map((order, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-[#1F2937] hover:bg-gray-50 dark:hover:bg-[#111827] transition">
                  <td className="pl-4">{order.order_id}</td>
                  <td className="p-5">{order.project_id}</td>
                  <td className="p-3">${order.order_value}</td>
                  <td className="p-3">{order.service_line}</td>
                  <td className="p-3">{order.assigned_team}</td>
                  <td className="p-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.order_status === "Completed" ? "bg-green-100 text-green-600" : 
                      order.order_status === "WIP" ? "bg-orange-100 text-orange-500" : "bg-gray-200 text-gray-600"
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={() => navigate(-1)} className="text-sm px-4 py-2 rounded-xl bg-gray-200 dark:bg-darkSecBG hover:shadow-md transition flex items-center gap-1">
            ← <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;