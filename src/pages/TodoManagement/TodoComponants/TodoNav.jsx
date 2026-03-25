import React from "react";
import { NavLink } from "react-router";

export default function TodoNav() {
  return (
    <div>
      <ul className="flex  gap-6 md:gap-10  my-8">
        <li>
          <NavLink
            to="/todo/leader"
            className={({ isActive }) => (isActive ? "text-orange-400 dark:text-teal-300 underline underline-offset-6  " : "")}
          >
            Leader
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/todo/member"
            className={({ isActive }) => (isActive ? "text-orange-400 underline underline-offset-6  dark:text-teal-300" : "")}
          >
            Member
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
