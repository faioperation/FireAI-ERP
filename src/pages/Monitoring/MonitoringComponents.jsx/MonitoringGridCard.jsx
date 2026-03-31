import React, { useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";

const MonitoringGridCard = () => {
  const { theme } = useContext(ThemeContext);

  const orderRows = [
    { id: "r1", orderNo: "Or-001", price: "$500", status: "Completed" },
    { id: "r2", orderNo: "Or-001", price: "$500", status: "Pending" },
    { id: "r3", orderNo: "Or-001", price: "$500", status: "Completed" },
  ];

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        theme === "dark" ? "bg-[#111827] text-white" : "text-gray-900"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className={`rounded-xl border overflow-hidden shadow-sm ${
              theme === "dark"
                ? "bg-[#1F2937] border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            <div
              className={`py-2 px-4 text-center text-xs border-b ${
                theme === "dark"
                  ? "border-gray-700 text-gray-400"
                  : "border-gray-100 text-gray-400"
              }`}
            >
              35009
            </div>

            <div className="p-4 space-y-3">
              {orderRows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-3 items-center w-full"
                >
                  <span
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {row.orderNo}
                  </span>

                  <span
                    className={`text-sm font-bold text-center ${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    {row.price}
                  </span>
                  <div className="flex justify-end">
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        row.status === "Completed"
                          ? "bg-[#00D26A] text-white"
                          : "bg-[#FFC107] text-black"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
              <div className="h-10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonitoringGridCard;
