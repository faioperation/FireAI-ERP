// import { ThemeContext } from "./Componants/Themes/ThemeContext"
// import Dashboard from "./Dashboard/Dashboard"

// import { useContext } from "react"

import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import CommonLayouts from "./Componants/CommonLayouts";
import { ThemeProvider } from "./Componants/Themes/ThemeProvider";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import TodoManagement from "./pages/TodoManagement/TodoManagement";
import SalesOPCollaboration from "./pages/SalesOPCollaboration/SalesOPCollaboration";
import WorkForce from "./pages/WorkForce/WorkForce";
import Monitoring from "./pages/Monitoring/Monitoring";
import Diagram from "./pages/Diagram/Diagram";
import Settings from "./pages/Settings/Settings";
import Order from "./pages/ProjectManagement/Order";
import ProfileList from "./pages/Dashboard/DashboardComponants/ProfileList";
import ProjectView from "./pages/ProjectManagement/ProjectManagementComponents/ProjectView";
import ProfileDetails from "./pages/Dashboard/DashboardComponants/ProfileDetails";
import DynamicOrderForm from "./pages/ProjectManagement/OrderComponents/DynamicOrderForm";
import AssignedOrder from "./pages/ProjectManagement/OrderComponents/AssignedOrder";
import Leader from "./pages/TodoManagement/TodoComponants/Leader";
import Member from "./pages/TodoManagement/TodoComponants/Member";
import Mytask from "./pages/TodoManagement/TodoComponants/Mytask";
import Assigntask from "./pages/TodoManagement/TodoComponants/Assigntask";
import TaskDetails from "./pages/TodoManagement/TodoComponants/TaskDetails";
import AsssignedTask from "./pages/TodoManagement/TodoComponants/AsssignedTask";
import SelfLearning from "./pages/TodoManagement/TodoComponants/SelfLearning";
import AssignedTask from "./pages/TodoManagement/TodoComponants/AsssignedTask";
import MeetingDetails from "./pages/SalesOPCollaboration/SalesOPCollaborationComponents/MeetingDetails";
import MeetingList from "./pages/SalesOPCollaboration/SalesOPCollaborationComponents/MeetingList";

import TaskTracker from "./pages/TodoManagement/TaskTracker/TaskTracker";
import TaskList from "./pages/TodoManagement/TaskTracker/TaskList";
import Message from "./pages/TodoManagement/TaskTracker/Message";
import AddModule from "./pages/TodoManagement/TaskTracker/AddModule";
import AddMessage from "./pages/TodoManagement/TaskTracker/AddMessage";
import EmployeeManagement from "./pages/WorkForce/EmployeeManagement/EmployeeManagement";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<CommonLayouts />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/profilelist"
            element={<ProfileList></ProfileList>}
          ></Route>
          <Route path="/profilelist/:id" element={<ProfileDetails />}></Route>
          <Route path="/project" element={<ProjectManagement />} />
          <Route path="/project/view" element={<ProjectView />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-value" element={<DynamicOrderForm />} />
          <Route path="/assign-order" element={<AssignedOrder />} />
          <Route path="/todo" element={<TodoManagement />}>
            <Route element={<Leader />}>
              <Route index element={<Mytask />} />{" "}
              {/* Default sub-page: /todo */}
              <Route path="mytask" element={<Mytask />} /> {/* /todo/mytask */}
              <Route path="assigntask" element={<Assigntask />} />{" "}
              {/* /todo/assigntask */}
            </Route>

            {/* Member section-er jonno alada nesting */}
            <Route path="member" element={<Member />}>
              <Route index element={<AssignedTask />} />{" "}
              <Route path="assignedtask" element={<AsssignedTask />} />
              <Route path="selfLearning" element={<SelfLearning />} />
            </Route>
          </Route>
          6
          <Route path="/tasktracker" element={<TaskTracker />}>
            <Route index element={<TaskList />} />{" "}
            {/* Default sub-page: /todo */}
            <Route path="tasklist" element={<TaskList />} />{" "}
            {/* /todo/mytask */}
            <Route path="message" element={<Message />} />{" "}
            {/* /todo/assigntask */}
          </Route>
          <Route path="/addtaskmodule" element={<AddModule />} />
          <Route path="/addmessage" element={<AddMessage/>} />
          <Route path="/sales" element={<SalesOPCollaboration />} />
          <Route path="/meeting/:id" element={<MeetingDetails />} />
          <Route path="/workforce" element={<WorkForce />} />
          <Route path="/workforce/employeemanagement" element={<EmployeeManagement/>} />

          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
