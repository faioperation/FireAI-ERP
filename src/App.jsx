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


const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<CommonLayouts />}>
          <Route index element={<Dashboard />} />
          <Route path="/project" element={<ProjectManagement />} />
          <Route path="/project/order" element={<Order />} />
          <Route path="/todo" element={<TodoManagement />} />
          <Route path="/sales" element={<SalesOPCollaboration />} />
          <Route path="/workforce" element={<WorkForce />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/settings/profile" element={<EdittProfilePage />} /> */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
