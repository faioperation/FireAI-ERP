import { ThemeContext } from "./Componants/Themes/ThemeContext"
import Dashboard from "./Dashboard/Dashboard"

import { useContext } from "react"




const App = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div  className={theme === "dark" ? "bg-[#0B1220] text-white" : "bg-white text-black"}>
        <div className='min-h-screen'>
      <h2>FAI Dashboard</h2>
     
      <button onClick={toggleTheme}>
       Theme
      </button>
      
        <Dashboard></Dashboard>
    </div>
    
     
    
    </div>
  )
}

export default App

