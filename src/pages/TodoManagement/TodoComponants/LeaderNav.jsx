import React from "react";
import { NavLink } from "react-router";

export default function LeaderNav() {
  return (
    <div>
      <ul className="flex  gap-6 md:gap-10  my-8">
        <li>
          <NavLink
            to="/todo/leader/mytask"
            className={({ isActive }) => (isActive ? "text-orange-400 dark:text-teal-300 underline underline-offset-6  " : "")}
          >
           My Task
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todo/leader/assigntask"
            className={({ isActive }) => (isActive ? "text-orange-400 underline underline-offset-6  dark:text-teal-300" : "")}
          >
            Assign Task
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
