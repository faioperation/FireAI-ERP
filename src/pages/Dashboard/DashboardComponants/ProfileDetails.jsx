import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/profileData.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setProfile(found);
      });
  }, [id]);

  if (!profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 md:p-8">
      
   

      {/* 🔷 Main Card */}
      <div className="border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow hover:shadow-gray-400 duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{profile.company}</h2>
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

        {/* 🔢 Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="p-3 bg-[#F6F6F6] shadow shadow-gray-300 dark:bg-darkSecBG rounded-xl">
            <p className="text-[10px] uppercase">Total Projects</p>
            <p className="text-lg font-bold">
              {profile.summary.total_projects}
            </p>
          </div>

          <div className="p-3 bg-[#F6F6F6] shadow shadow-gray-300 dark:bg-darkSecBG rounded-xl">
            <p className="text-[10px] uppercase">Active</p>
            <p className="text-lg font-bold text-orange-400">
              {profile.summary.active}
            </p>
          </div>

          <div className="p-3 bg-[#F6F6F6] shadow shadow-gray-300 dark:bg-darkSecBG rounded-xl">
            <p className="text-[10px] uppercase">Revenue</p>
            <p className="text-lg font-bold text-green-400">
              {profile.summary.revenue}
            </p>
          </div>
        </div>

        {/* 📊 Orders Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Orders</h3>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-[#1F2937]">
            <table className="min-w-full text-sm">
              
              {/* Table Head */}
              <thead className="bg-gray-100 dark:bg-darkSecBG text-left">
                <tr>
                  <th className="p-3">Order List</th>
                  <th className="p-3">Project ID</th>
                  <th className="p-3">Order Value</th>
                  <th className="p-3">Service Line</th>
                  <th className="p-3">Assigned Team</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {profile.orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 dark:hover:bg-[#111827] transition"
                  >
                    <td className="p-3">{order.order_id}</td>
                    <td className="p-3">{order.project_id}</td>
                    <td className="p-3">${order.order_value}</td>
                    <td className="p-3">{order.service_line}</td>
                    <td className="p-3">{order.assigned_team}</td>

                    {/* Status Badge */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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
             {/* 🔙 Back Button */}
     <div className="flex  justify-end mt-6">
         <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm px-4 py-2 rounded-lg bg-gray-200 dark:bg-darkSecBG hover:shadow"
      >
        ← Back
      </button>
     </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetails;