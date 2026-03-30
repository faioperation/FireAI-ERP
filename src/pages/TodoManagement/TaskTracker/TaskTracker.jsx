import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import TaskOverview from "./TaskOverview";
import TaskList from "./TaskList";

export default function TaskTracker() {
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    fetch("/OrderList.json")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);

        // 👉 first id auto select
        if (data.length > 0) {
          setOrderID(data[0].id);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const findProject = orderID
    ? projects.find((project) => project.order_id === orderID)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <button className="mb-4 text-xs dark:text-black px-4 py-2 rounded-lg bg-gray-200">
          <Link to="/project/view">← back to projects</Link>
        </button>

        {/* ✅ Dropdown */}
        <select
          value={orderID || ""}
          onChange={(e) => setOrderID(Number(e.target.value))}
          className="
    border rounded-lg px-3 py-2 text-sm mr-8
    bg-white text-gray-800 border-gray-300 font-semibold
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
    focus:outline-none focus:ring-2 dark:focus:ring-blue-400 focus:ring-orange-400
    dark:focus:ring-blue-500
    transition
  "
        >
          {orders.map((order) => (
            <option
              key={order.id}
              value={order.id}
              className="bg-white  text-gray-800 dark:bg-gray-800 dark:text-gray-100 "
            >
              {order.project_id} 
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Selected Project Show */}

      <div>
        <TaskOverview findProject={findProject}></TaskOverview>
      </div>
      
    </div>
  );
}
