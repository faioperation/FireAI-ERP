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
            <Route path="/todo/leader" element={<Leader></Leader>}>
              <Route path="/todo/leader/mytask" element={<Mytask />}></Route>
              <Route
                path="/todo/leader/assigntask"
                element={<Assigntask />}
              ></Route>
            </Route>
            <Route path="/todo/member" element={<Member></Member>}></Route>
          </Route>

       
          <Route path="/sales" element={<SalesOPCollaboration />} />
          <Route path="/workforce" element={<WorkForce />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
