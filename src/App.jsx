// import { ThemeContext } from "./Componants/Themes/ThemeContext"
// import Dashboard from "./Dashboard/Dashboard"

// import { useContext } from "react"



import { Routes, Route } from "react-router";

import Dashboard from "./pages/Dashboard/Dashboard";
import CommonLayouts from "./Componants/CommonLayouts";


// const App = () => {
    // const { theme, toggleTheme } = useContext(ThemeContext)
  // return (
  // <div>

 
    {/* <div  className={theme === "dark" ? "bg-[#0B1220] text-white" : "bg-white text-black"}>
        <div className='min-h-screen'>
      <h2>FAI Dashboard</h2>
     
      <button onClick={toggleTheme}>
       Theme
      </button>
      
   
    </div>
     */}
     
    
    {/* </div> */}
     {/* </div>
  )
} */}
const App = () =>{ 
  return(


    <Routes>
      <Route element={<CommonLayouts/>}>
        <Route index element={<Dashboard/>} />
        {/* <Route path="/settings/profile" element={<EdittProfilePage />} /> */}
      </Route>
    </Routes>
  );
};
export default App;

