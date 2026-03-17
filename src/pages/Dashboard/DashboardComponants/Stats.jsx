import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Folder,
  CheckCircle,
  Star,
  ListTodo,
  Clock,
  ArrowUp,
  Clock1,
} from "lucide-react";

const iconMap = {
  "shopping-cart": ShoppingCart,
  folder: Folder,
  "check-circle": CheckCircle,
  star: Star,
  "list-todo": ListTodo,
  clock: Clock,
};

const Stats = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    // overview.json theke data fetch kora hochhe
    fetch("/overview.json")
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch((err) => console.error("Error loading stats:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ">
      {statsData.slice(0, -1).map((stat) => {
        const IconComponent = iconMap[stat.icon] || Folder;

        return (
          <div
            key={stat.id}
            className=" border hover hover:shadow hover:shadow-teal-400 duration-500 border-gray-100 dark:border-none rounded-3xl p-4 shadow-sm flex flex-col dark:bg-darkSecBG  "
          >
            {/* Upper Section: Icon and Growth */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 dark:bg-[#102E3C] rounded-xl">
                <IconComponent className="w-6 h-6 text-orange-500  dark:text-textTeal" />
              </div>

              
            </div>

            {/* Lower Section: Labels and Value */}
            <div>
              <p className="text-gray-500 dark:text-darkSecText  text-sm font-medium mb-2">
                {stat.title}
              </p>
              <h2 className="text-xl  font-semibold text-gray-900 dark:text-white">{stat.value}</h2>
            </div>
            {}
          </div>
        );
      })}
      <div>
    
        <div className="bg-white dark:bg-darkSecBG border border-gray-100 rounded-3xl dark:border-none p-6 shadow-sm shadow-red-400 flex flex-col ">
          {/* Upper Section: Icon and Growth */}
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-orange-50 dark:bg-[#271D2B]  rounded-xl">
              <Clock className="text-red-500" />
            </div>
          </div>

          {/* Lower Section: Labels and Value */}
          <div>
            <p className="text-gray-500 dark:text-darkSecText text-sm font-medium mb-2">
              {statsData[statsData.length-1]?.title}
            </p>
            <h2 className="text-2xl font-bold dark:text-white text-gray-900">
              {statsData[statsData.length-1]?.value}
            </h2>
          </div>
          {}
        </div>
      </div>
    </div>
  );
};

export default Stats;
