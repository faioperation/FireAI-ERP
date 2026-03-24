import Heading from "@/SharedComponants/Heading";
import SearchBar from "@/SharedComponants/SearchBar";
import { useState } from "react";

const orders = [
  { id: "ORD-001", employeeId: "EMP-762", value: "$500", status: "WIP" },
  { id: "ORD-001", employeeId: "EMP-763", value: "$500", status: "WIP" },
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
        <SearchBar />
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className=" text-gray-500">
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
            {filtered.map((order, i) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="px-5 py-4">{order.id}</td>
                <td className="px-5 py-4">{order.employeeId}</td>
                <td className="px-5 py-4 text-green-600 font-medium">
                  {order.value}
                </td>
                <td className="px-5 py-4">
                  <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
