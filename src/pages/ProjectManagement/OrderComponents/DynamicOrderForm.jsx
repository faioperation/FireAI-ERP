import React, { useState, useContext } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import Heading from "@/SharedComponants/Heading";

const DynamicOrderForm = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // State to manage dynamic rows
  const [rows, setRows] = useState([
    { id: Date.now(), orderId: "", employId: "", assignValue: "", status: "" },
  ]);

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        orderId: "",
        employId: "",
        assignValue: "",
        status: "",
      },
    ]);
  };

  // Function to remove a row
  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  return (
    <>
   <div className="mb-6">
       <Heading
        heading={"Monetary Value  Management"}
        subHeading={"Manage all your Monetary Value"}
      />
   </div>
      <div
        className={`p-6 rounded-2xl shadow-sm border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-100"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Total Value : <span className="text-blue-500">$8000</span>
          </h2>
        </div>

        <div className="space-y-4">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end animate-in fade-in duration-300"
            >
              {/* Order ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Order ID *
                </label>
                <input
                  type="text"
                  placeholder="Order ID"
                  className={`w-full p-2.5 rounded-lg border outline-none transition ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white focus:border-[#00d2ff]/80"
                      : "bg-gray-50 border-gray-200 focus:border-orange-500"
                  }`}
                />
              </div>

              {/* Employ ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Employ ID
                </label>
                <input
                  type="text"
                  placeholder="Employ ID"
                  className={`w-full p-2.5 rounded-lg border outline-none transition ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white focus:border-[#00d2ff]/80"
                      : "bg-gray-50 border-gray-200 focus:border-orange-500"
                  }`}
                />
              </div>

              {/* Assign Value */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Assign Value
                </label>
                <input
                  type="text"
                  placeholder="Assign Value"
                  className={`w-full p-2.5 rounded-lg border outline-none transition ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white focus:border-[#00d2ff]/80"
                      : "bg-gray-50 border-gray-200 focus:border-orange-500"
                  }`}
                />
              </div>

              {/* Status Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <select
                  className={`w-full p-2.5 rounded-lg border outline-none appearance-none transition ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white focus:border-[#00d2ff]/80"
                      : "bg-gray-50 border-gray-200 focus:border-orange-500"
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Actions: Add/Delete Buttons */}
              <div className="flex gap-2">
                {index === rows.length - 1 ? (
                  <button
                    onClick={addRow}
                    className={`flex-1 flex items-center justify-center gap-2 p-2.5 border transition-all font-medium rounded-lg cursor-pointer ${
                      theme === "dark"
                        ? "bg-[#111827] border text-[#00d2ff]  border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                        : " border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    <Plus size={18} /> Add More
                  </button>
                ) : (
                  <button
                    onClick={() => removeRow(row.id)}
                    className={`p-2.5 cursor-pointer rounded-lg ${
                      theme === "dark"
                        ? "bg-[#111827] border text-[#00d2ff] border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                        : " text-red-500 border border-red-200 rounded-lg hover:bg-orange-50 transition-colors"
                    }
        `}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className={`px-10 py-2.5  font-bold rounded-lg shadow-lg transition-all cursor-pointer ${
              theme === "dark"
                ? "bg-[#111827] border border-gray-800 text-[#00d2ff] hover:border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                : "bg-[#F97316] text-white hover:bg-orange-600 "
            }
        `}

        
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default DynamicOrderForm;
