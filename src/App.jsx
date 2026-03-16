// import { ThemeContext } from "./Componants/Themes/ThemeContext"
// import Dashboard from "./Dashboard/Dashboard"

// import { useContext } from "react"



import { Routes, Route } from "react-router";

import Dashboard from "./pages/Dashboard/Dashboard";
import CommonLayouts from "./Componants/CommonLayouts";
import { ThemeProvider } from "./Componants/Themes/ThemeProvider";



const App = () =>{
  
  
  return(

<ThemeProvider>
    <Routes>
      <Route element={<CommonLayouts/>}>
        <Route index element={<Dashboard/>} />
        {/* <Route path="/settings/profile" element={<EdittProfilePage />} /> */}
      </Route>
    </Routes>
    </ThemeProvider>
  );
};
export default App;

