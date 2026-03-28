import React from "react";
import { NavLink } from "react-router";

export default function MemberNav() {
  return (
    <div>
      <ul className="flex  gap-6 md:gap-10  my-8">
        <li>
          <NavLink
            to="assignedtask"
            className={({ isActive }) => (isActive ? "text-orange-400 dark:text-teal-300 underline underline-offset-6  " : "")}
          >
           Assigned Task
          </NavLink>
        </li>
        <li>
          <NavLink
            to="selflearning"
            className={({ isActive }) => (isActive ? "text-orange-400 underline underline-offset-6  dark:text-teal-300" : "")}
          >
            Self Learning
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
