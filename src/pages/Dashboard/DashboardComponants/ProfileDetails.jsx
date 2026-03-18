import { Funnel } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CiFilter } from "react-icons/ci";
const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/profileData.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProfile(found);
      });
  }, [id]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  // 🔥 FULL FIELD SEARCH (UPDATED)
  const sortedOrders = [...profile.orders].sort((a, b) => {
    const keyword = search.toLowerCase();

    const matchScore = (item) => {
      let score = 0;

      Object.values(item).forEach((val) => {
        if (
          val.toString().toLowerCase().includes(keyword)
        ) {
          score += 1;
        }
      });

      return score;
    };

    return matchScore(b) - matchScore(a);
  });

  return (
    <div className="p-4 md:p-8">

      {/* 🔷 Main Card */}
      <div className="border border-gray-200 dark:border-[#1F2937] 
      rounded-2xl p-6 shadow hover:shadow-gray-400 duration-300">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {profile.company}
            </h2>
            <p className="text-sm text-gray-500 dark:text-darkSecText">
              {profile.category}
            </p>
          </div>
          <img
            src={profile.avatar}
            alt=""
            className="w-12 h-12 rounded-lg border border-cyan-500/30"
          />
        </div>

        {/* 📊 Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 md:text-xl md:p-8 bg-[#F6F6F6] shadow shadow-orange-300 dark:bg-darkSecBG rounded-xl">
            <p className="text-[10px] uppercase">Total</p>
            <p className="font-bold">
              {profile.summary.total_projects}
            </p>
          </div>

          <div className="p-3 md:p-8 md:text-xl bg-[#F6F6F6] shadow shadow-green-300 dark:bg-darkSecBG rounded-xl">
            <p className="text-[10px] uppercase">Active</p>
            <p className="font-bold text-orange-400">
              {profile.summary.active}
            </p>
          </div>

          <div className="p-3  md:p-8 md:text-xl bg-[#F6F6F6] shadow shadow-teal-300 dark:bg-darkSecBG rounded-xl">
            <p className="text-[10px] uppercase">Revenue</p>
            <p className="font-bold text-green-400">
              {profile.summary.revenue}
            </p>
          </div>
        </div>

        {/* 🔍 Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search anything (ID, team, status...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl outline-none
            border border-gray-300 dark:border-[#1F2937]
            bg-white dark:bg-darkSecBG
            focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#1F2937]">
          <table className="min-w-full text-sm">

            <thead className="bg-gray-100 dark:bg-darkSecBG text-left">
              <tr>
                <th className="p-3">ORDER LIST <span className="text-gray-400">⇅</span></th>
                <th className="p-3">PROJECT ID <span className="text-gray-400">⇅</span></th>
                <th className="p-3 ">ORDER VALUE <span className="text-gray-400"> ⇅</span></th>
                <th className="p-3 lg:flex items-center gap-2">SERVICE LINE  <span className=""><CiFilter /></span></th>
                <th className="p-3  ">ASSIGNED TEAM </th>
                <th className="p-3 lg:flex items-center gap-2">STATUS <span className=""><CiFilter /></span></th>
              </tr>
            </thead>

            <tbody>
              {sortedOrders.map((order, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 dark:border-[#1F2937]
                  hover:bg-gray-50 dark:hover:bg-[#111827] transition"
                >
                  <td className="p-3">{order.order_id}</td>
                  <td className="p-3">{order.project_id}</td>
                  <td className="p-3">${order.order_value}</td>
                  <td className="p-3">{order.service_line}</td>
                  <td className="p-3">{order.assigned_team}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.order_status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : order.order_status === "WIP"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* 🔙 Back */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-4 py-2 rounded-xl 
            bg-gray-200 dark:bg-darkSecBG 
            hover:shadow-md transition"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetails;