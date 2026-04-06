import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import TaskOverview from "./TaskOverview";
import ProjectList from "@/pages/ProjectManagement/ProjectManagementComponents/ProjectList";
import { Target } from "lucide-react";
import TaskList from "./TaskList";

export default function TaskTracker() {
  const [projects, setProjects] = useState([]);
  const { id } = useParams(); // URL/:id theke id pabe
 const navigate = useNavigate()
  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("JSON load error:", err));
  }, []);

  // URL er id (string) k Number e convert kore find kora
  const findProject =id? projects.find((p) => p.order_id === Number(id)):""
 // Dropdown handle
  // const handleSelect = (e) => {
  //   const selectedId = e.target.value;
  //   if (selectedId) navigate(`/task-tracker/${selectedId}`);
  // };
  return (
    <div className="w-full space-y-4">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link 
          to="/project" 
          className="text-xs font-bold px-4 py-2 rounded-lg text-white bg-orange-400 dark:bg-teal-400 dark:text-black shadow-sm"
        >
          ← back to projects
        </Link>
      </div>

      {/* Main Content */}
      <div className="mt-2">
        {findProject ? (
          <TaskOverview findProject={findProject} />
        ) : (
          <div className="text-center   text-gray-500 text-sm space-y-2  ">
             {/* <div>
              <select
              onChange={handleSelect}
              className="border border-orange-400 dark:border-teal-400 rounded-md p-2 text-sm flex justify-end"
              defaultValue=""
            >
              <option value="" disabled>
                Select Order ID
              </option>
              {projects.map((p) => (
                <option className="dark:bg-black bg-white" key={p.order_id} value={p.order_id}>
                  {p.order_id}  {p.title || p.name}
                </option>
              ))}
            </select>
            </div>
           <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-orange-200 dark:border-teal-500 rounded-[32px] bg-muted/5">
        <div className="p-4 bg-muted/20 rounded-full mb-4">
          <Target className="text-muted-foreground w-8 h-8" />
        </div>
        <p className="text-muted-foreground font-semibold">
          Select an order to view the specific task tracker
        </p>
      </div> */}
           <ProjectList/>
          </div>
        )}
      </div>
    </div>
  );
}