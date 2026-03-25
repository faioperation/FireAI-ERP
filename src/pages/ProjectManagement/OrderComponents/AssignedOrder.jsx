import Heading from "@/SharedComponants/Heading";
import SearchBar from "@/SharedComponants/SearchBar";
import { useState } from "react";

const orders = [
  { id: "ORD-001", employeeId: "EMP-762", value: "$500", status: "WIP" },
  { id: "ORD-002", employeeId: "EMP-763", value: "$700", status: "Completed" }, 
  { id: "ORD-003", employeeId: "EMP-764", value: "$700", status: "Completed" }, 
  { id: "ORD-004", employeeId: "EMP-765", value: "$700", status: "WIP" }, 
];

export default function AssignedOrder() {
  const [search, setSearch] = useState("");


  const filtered = orders.filter((o) =>
    Object.values(o).join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Heading
        heading={"Assigned Order"}
        subHeading={"Track and manage project Value"}
      />

      <div className="my-6">
  
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order ID, Employee ID..."
        />
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-gray-500 bg-gray-50/50">
            {" "}
         
            <tr>
              <th className="text-left px-5 py-3 font-medium">Order ID</th>
              <th className="text-left px-5 py-3 font-medium">Employee ID</th>
              <th className="text-left px-5 py-3 font-medium">
                Assigned Value
              </th>
              <th className="text-left px-5 py-3 font-medium">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((order, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">{order.id}</td>
                  <td className="px-5 py-4">{order.employeeId}</td>
                  <td className="px-5 py-4 text-green-600 font-medium">
                    {order.value}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        order.status === "WIP"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No orders found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
