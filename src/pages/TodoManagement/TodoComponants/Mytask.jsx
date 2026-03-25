import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  UserCircle,
  Clock,
  ChevronDown,
  Sun,
  Moon,
  Filter,
} from "lucide-react";
import OrderDetailsModal from "../../ProjectManagement/OrderComponents//OrderDetailsModal";
import { Link } from "react-router";

const initialData = [
  {
    id: "#78894",
    projectId: "#8998778",
    client: "Anik",
    team: "AI Weavers",
    assignStatus: "Done",
    priority: "high",
    totalValue: "$800",
    status: "In Progress",
    timeRemaining: "03 Days",
    deadline: "Mar 15, 2026",
  },
  {
    id: "#78894",
    projectId: "#8998778",
    client: "Anik",
    team: "AI Weavers",
    assignStatus: "Done",
    priority: "high",
    totalValue: "$800",
    status: "In Progress",
    timeRemaining: "03 Days",
    deadline: "Mar 15, 2026",
  },
  {
    id: "#78894",
    projectId: "#8998778",
    client: "Anik",
    team: "AI Weavers",
    assignStatus: "Done",
    priority: "high",
    totalValue: "$800",
    status: "In Progress",
    timeRemaining: "03 Days",
    deadline: "Mar 15, 2026",
  },
  {
    id: "#78894",
    projectId: "#8998778",
    client: "Anik",
    team: "AI Weavers",
    assignStatus: "Done",
    priority: "high",
    totalValue: "$800",
    status: "In Progress",
    timeRemaining: "03 Days",
    deadline: "Mar 15, 2026",
  },
  {
    id: "#78894",
    projectId: "#8998778",
    client: "Anik",
    team: "AI Weavers",
    assignStatus: "Pending",
    priority: "low",
    totalValue: "$500",
    status: "Completed",
    timeRemaining: "07 Days",
    deadline: "Mar 20, 2026",
  },
];

const AssignBadge = ({ status }) => {
  const styles = {
    Done: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    Review: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  };
  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium ${styles[status] || styles.Pending}`}
    >
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
    medium:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
    low: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
  };
  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium ${styles[priority] || styles.medium}`}
    >
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "In Progress": "text-orange-500 dark:text-orange-400",
    Completed: "text-green-600 dark:text-green-400",
    Pending: "text-yellow-500 dark:text-yellow-400",
  };
  return (
    <span
      className={`flex items-center gap-1.5 text-sm font-medium ${styles[status] || "text-gray-500"}`}
    >
      <Clock size={13} />
      {status}
    </span>
  );
};

const ColHeader = ({ label, filterable = true }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
    <span className="flex items-center gap-1">
      {label}
      {filterable && <Filter size={11} className="opacity-50" />}
    </span>
  </th>
);

// Mobile card view for each row
const MobileCard = ({ row, dark }) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xs text-gray-400 dark:text-gray-500">Order</span>
        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
          {row.id}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/order-value">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition">
            <UserCircle size={16} />
          </button>
        </Link>
        <button
          onClick={() => setShowOrderDetails(true)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
        >
          <Eye size={16} />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition">
          <Pencil size={16} />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-400 transition">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div>
        <span className="text-gray-400 dark:text-gray-500">Project ID</span>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {row.projectId}
        </p>
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500">Client</span>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {row.client}
        </p>
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500">Team</span>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {row.team}
        </p>
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500">Value</span>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {row.totalValue}
        </p>
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500 block mb-1">
          Assign
        </span>
        <AssignBadge status={row.assignStatus} />
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500 block mb-1">
          Priority
        </span>
        <PriorityBadge priority={row.priority} />
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500 block mb-1">
          Status
        </span>
        <StatusBadge status={row.status} />
      </div>
      <div>
        <span className="text-gray-400 dark:text-gray-500">Deadline</span>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {row.deadline}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-[11px]">
          {row.timeRemaining}
        </p>
      </div>
    </div>
  </div>
);

export default function Mytask() {
  const [dark, setDark] = useState(false);
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const filtered = data.filter(
    (r) =>
      r.id.includes(search) ||
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.team.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteRow = (idx) =>
    setData((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen   transition-colors duration-300 font-sans">
        {/* Desktop Table */}
        <div className="hidden lg:block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <ColHeader label="Order ID" />
                  <ColHeader label="Project ID" />
                  <ColHeader label="Client Name" />
                  <ColHeader label="Assigned Team" />
                  <ColHeader label="Assign Status" />
                  <ColHeader label="Priority" />
                  <ColHeader label="Total Value" />
                  <ColHeader label="Status" filterable={false} />
                  <ColHeader label="Times remaining" filterable={false} />
                  <ColHeader label="Deadline" filterable={false} />
                  <ColHeader label="Actions" filterable={false} />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="text-center py-12 text-sm text-gray-400 dark:text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {row.projectId}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300">
                        {row.client}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {row.team}
                      </td>
                      <td className="px-4 py-3.5">
                        <AssignBadge status={row.assignStatus} />
                      </td>
                      <td className="px-4 py-3.5">
                        <PriorityBadge priority={row.priority} />
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {row.totalValue}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {row.timeRemaining}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {row.deadline}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <Link to="/order-value">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition">
                              <UserCircle size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => setShowOrderDetails(true)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => deleteRow(i)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tablet — compact table */}
        <div className="hidden sm:block lg:hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  {[
                    "Order ID",
                    "Client",
                    "Team",
                    "Status",
                    "Priority",
                    "Deadline",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-3 py-3 font-medium text-gray-700 dark:text-gray-300">
                      {row.id}
                    </td>
                    <td className="px-3 py-3 text-gray-600 dark:text-gray-400">
                      {row.client}
                    </td>
                    <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {row.team}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-3 py-3">
                      <PriorityBadge priority={row.priority} />
                    </td>
                    <td className="px-3 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {row.deadline}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowOrderDetails(true)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition"
                        >
                          <Eye size={14} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteRow(i)}
                          className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile — card view */}
        <div className="sm:hidden space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-10">
              No orders found
            </p>
          ) : (
            filtered.map((row, i) => (
              <MobileCard key={i} row={row} dark={dark} />
            ))
          )}
        </div>
      </div>
      {/* OrderDetailsModal */}
      {showOrderDetails && (
        <OrderDetailsModal
          isOpen={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
        />
      )}
    </div>
  );
}
