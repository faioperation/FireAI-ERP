import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import CommonLayouts from "./Componants/CommonLayouts";
import { ThemeProvider } from "./Componants/Themes/ThemeProvider";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import TodoManagement from "./pages/TodoManagement/TodoManagement";
import SalesOPCollaboration from "./pages/SalesOPCollaboration/SalesOPCollaboration";
import WorkForce from "./pages/WorkForce/WorkForce";
import Monitoring from "./pages/Monitoring/Monitoring";
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
import NoticePage from "./pages/SalesOPCollaboration/NoticePage";
import NoticeApproval from "./pages/SalesOPCollaboration/SalesOPCollaborationComponents/NoticeApproval";
import TaskTracker from "./pages/TodoManagement/TaskTracker/TaskTracker";
import TaskList from "./pages/TodoManagement/TaskTracker/TaskList";
import Message from "./pages/TodoManagement/TaskTracker/Message";
import Management from "./pages/Diagram/Management";
import SitPlan from "./pages/Diagram/SitPlan";
import AddModule from "./pages/TodoManagement/TaskTracker/AddModule";
import AddMessage from "./pages/TodoManagement/TaskTracker/AddMessage";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<CommonLayouts />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="/profilelist" element={<ProfileList />} />
          <Route path="/profilelist/:id" element={<ProfileDetails />} />
          {/* Project Management */}
          <Route path="/project" element={<ProjectManagement />} />
          <Route path="/project/view" element={<ProjectView />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-value" element={<DynamicOrderForm />} />
          <Route path="/assign-order" element={<AssignedOrder />} />
          {/* To-do Management */}
          <Route path="/todo" element={<TodoManagement />}>
            <Route element={<Leader />}>
              <Route index element={<Mytask />} />
              <Route path="mytask" element={<Mytask />} />
              <Route path="assigntask" element={<Assigntask />} />
            </Route>
            <Route path="member" element={<Member />}>
              <Route index element={<AssignedTask />} />
              <Route path="assignedtask" element={<AsssignedTask />} />
              <Route path="selfLearning" element={<SelfLearning />} />
            </Route>
          </Route>
          {/* Task Tracker (Child of Todo in Sidebar) */}
          <Route path="/task-tracker" element={<TaskTracker />}>
            <Route index element={<TaskList />} />
            <Route path="tasklist" element={<TaskList />} />
          </Route>
          <Route path="/addtaskmodule" element={<AddModule />} />
          <Route path="/addmessage" element={<AddMessage />} />
          {/* Sales & Collaboration */}
          <Route path="/sales" element={<SalesOPCollaboration />} />
          <Route path="/meeting/:id" element={<MeetingDetails />} />
          <Route path="/message" element={<Message />} />{" "}
          {/* Sidebar-এ এটি Sales-এর আন্ডারে */}
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice-approval" element={<NoticeApproval />} />
          {/* Workforce & Monitoring */}
          <Route path="/workforce" element={<WorkForce />} />
          <Route path="/monitoring" element={<Monitoring />} />
          {/* Diagram */}
          <Route path="/diagram" element={<Management />} />
          <Route path="/sit-plan" element={<SitPlan />} />
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
