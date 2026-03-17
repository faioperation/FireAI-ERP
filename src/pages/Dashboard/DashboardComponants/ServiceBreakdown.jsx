import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ServiceBreakdown = () => {
  const [allData, setAllData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('January');

  useEffect(() => {
    fetch('/ServiceData.json')
      .then((res) => res.json())
      .then((data) => setAllData(data.months));
  }, []);

  const currentData = allData[selectedMonth] || [];

  // Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-darkSecBG rounded-[10px] px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)] text-[12px]">
        <p className="font-bold text-slate-900 dark:text-white mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="font-semibold" style={{ color: p.fill }}>
            {p.dataKey === 'revenue'
              ? `Revenue: $${(p.value / 1000).toFixed(0)}K`
              : `Projects: ${p.value}`}
          </p>
        ))}
      </div>
    );
  };

  // Legend
  const CustomLegend = () => (
    <div className="flex justify-center items-center gap-8 mt-2">
      {[
        { color: '#00E5FF', label: 'projects' },
        { color: '#22C55E', label: 'revenue' },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2">
          <span
            className="w-[12px] h-[12px] rounded-[3px]"
            style={{ background: color }}
          />
          <span
            className="text-[12px] italic font-medium tracking-[0.01em]"
            style={{ color }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-white dark:bg-darkBG font-sans box-border">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-[17px] font-bold text-slate-900  dark:text-white tracking-[-0.2px]">
          Service Line Breakdown
        </h2>

        <div className="relative inline-block w-full  sm:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white dark:text-gray-300 dark:bg-darkBG
            border border-slate-300 rounded-[10px] text-slate-700 text-[13px] font-semibold px-3 pr-8 py-[7px] cursor-pointer outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            {Object.keys(allData).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <svg
            width="11"
            height="6"
            viewBox="0 0 11 6"
            fill="none"
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path
              d="M1 1L5.5 5L10 1"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[200px] md:h-[360px]  mt-8">
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={currentData}
            barCategoryGap="30%"
            barGap={4}
            margin={{ top: 8, right: 40, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#e2e8f0"
            />

            <XAxis className='text-wrap'
              dataKey="service"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11.5, fontWeight: 500 }}
              dy={10}
            />

            {/* LEFT Y */}
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              width={28}
            />

            {/* RIGHT Y */}
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              domain={[0, 80000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
              tickFormatter={(v) => v.toLocaleString()}
              width={50}
            />

            <Tooltip
              cursor={{fill: 'rgb(137, 186, 217)' }}
              
              content={<CustomTooltip />}
            />

            <Bar
              yAxisId="left"
              dataKey="projects"
              fill="#00E5FF"
              radius={0}
              maxBarSize={42}
            />

            <Bar
              yAxisId="right"
              dataKey="revenue"
              fill="#22C55E"
              radius={0}
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <CustomLegend />

      {/* STAT CARDS (Tailwind Responsive) */}
      <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-[14px] mt-6">
        {currentData.map((item, i) => (
          <div
            key={i}
            className="rounded-[14px] shadow shadow-gray-200  bg-white dark:bg-darkBG   px-3 py-[14px] text-center transition hover:shadow-md"
          >
            <p className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-2">
              {item.service}
            </p>

            <p className="text-[17px] font-extrabold dark:text-white text-slate-900 mb-[5px] tracking-[-0.3px] leading-[1.2]">
              {item.projects} Projects
            </p>

            <p className="text-[13.5px] font-bold text-green-600">
              {item.revenue_display}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBreakdown;