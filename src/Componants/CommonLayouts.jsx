import {  Navigate, Outlet,  } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CommonLayouts = () => {
  // const location = useLocation();
  // if ( location.pathname=="/todo/leader"){
  //   return<Navigate to="/todo/leader/mytask"/>
  // }
  // if ( location.pathname=="/todo/member"){
  //   return<Navigate to="/todo/member/assignedtask"/>
  // }
  return (
    <div className="flex mx-auto h-screen w-full  overflow-hidden">
      {/* =============== Common layout starts =============== */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF]  ">
        <Header />
        <div className="flex-1 overflow-y-auto bg-[#FFFFFF] dark:bg-darkBG md:p-12 p-6  ">
          <Outlet />
        </div>
      </div>
      {/* =============== Common layout ends =============== */}
    </div>
  );
};

export default CommonLayouts;