// import { ThemeContext } from "./Componants/Themes/ThemeContext"
// import Dashboard from "./Dashboard/Dashboard"

// import { useContext } from "react"

import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import CommonLayouts from "./Componants/CommonLayouts";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import TodoManagement from "./pages/TodoManagement/TodoManagement";
import SalesOPCollaboration from "./pages/SalesOPCollaboration/SalesOPCollaboration";
import WorkForce from "./pages/WorkForce/WorkForce";
import Monitoring from "./pages/Monitoring/Monitoring";
import Diagram from "./pages/Diagram/Diagram";
import Settings from "./pages/Settings/Settings";


// const App = () => {
// const { theme, toggleTheme } = useContext(ThemeContext)
// return (
// <div>

{
  /* <div  className={theme === "dark" ? "bg-[#0B1220] text-white" : "bg-white text-black"}>
        <div className='min-h-screen'>
      <h2>FAI Dashboard</h2>
     
      <button onClick={toggleTheme}>
       Theme
      </button>
      
   
    </div>
     */
}

{
  /* </div> */
}
{
  /* </div>
  )
} */
}
const App = () => {
  return (
    <Routes>
      <Route element={<CommonLayouts />}>
        <Route index element={<Dashboard />} />
        <Route path="/project" element={<ProjectManagement />} />
        <Route path="/todo" element={<TodoManagement />} />
        <Route path="/sales" element={<SalesOPCollaboration />} />
        <Route path="/workforce" element={<WorkForce />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/diagram" element={<Diagram />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/settings/profile" element={<EdittProfilePage />} /> */}
      </Route>
    </Routes>
  );
};
export default App;
