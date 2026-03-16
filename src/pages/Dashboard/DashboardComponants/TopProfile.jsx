import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TopProfile = () => {
  const [topProfiles, setTopProfiles] = useState([]);

  useEffect(() => {
    fetch('/profileData.json') // Tomar JSON file-er path
      .then((res) => res.json())
      .then((data) => {
        // 1. Revenue onujayi sort kora (High to Low)
        const sorted = data.sort((a, b) => {
          const revA = parseFloat(a.summary.revenue.replace('$', '').replace('K', ''));
          const revB = parseFloat(b.summary.revenue.replace('$', '').replace('K', ''));
          return revB - revA;
        });

        // 2. Prothom 2-ti profile neya
        setTopProfiles(sorted.slice(0, 2));
      });
  }, []);

  return (
    <div className="  rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Top Profile Overview</h2>
        <button className="text-gray-600 text-lg hover:scale-120 duration-500 hover:text-teal-500 transition">See more</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {topProfiles.map((profile) => (
          <div key={profile.id} className=" border border-gray-200 rounded-2xl p-6">
            {/* Header: Avatar & Name */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold">{profile.company}</h3>
                <p className="text-sm text-gray-500">{profile.category}</p>
              </div>
              <img src={profile.avatar} alt="avatar" className="w-10 h-10 rounded-lg border border-cyan-500/30" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className=" p-3 bg-[#F6F6F6] rounded-xl">
                <p className="text-[10px]    xl:text-[12px] uppercase">Total Projects</p>
                <p className="md:text-lg text-md font-bold">{profile.summary.total_projects}</p>
              </div>
              <div className=" p-3 rounded-xl bg-[#F6F6F6] text-orange-400">
                <p className="text-[12px] md:text-[10px] xl:text-[12px]  uppercase">Active</p>
                <p className="md:text-lg text-md font-bold">{profile.summary.active}</p>
              </div>
              <div className=" p-3 rounded-xl bg-[#F6F6F6] text-green-400">
                <p className="text-[12px] xl:text-[12px]   md:text-[10px]  uppercase">Revenue</p>
                <p className=" text-md font-bold">{profile.summary.revenue}</p>
              </div>
            </div>

            {/* Chart & Legend Section */}
            <div className="flex items-center 2xl:gap-12 gap-4">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={profile.service_distribution}
                      innerRadius={35}
                      outerRadius={56}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {profile.service_distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1 space-y-2">
                <p className="text-sm md:text-[15px] font-bold  mb-2">Service Distribution</p>
                {profile.service_distribution.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[12px] md:text-[14px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="">{item.label}</span>
                    </div>
                    <span className="font-mono">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProfile;