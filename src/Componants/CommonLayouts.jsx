import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CommonLayouts = () => {
  return (
    <div className="flex mx-auto w-full  overflow-hidden">
      {/* =============== Common layout starts =============== */}
      <Sidebar />
      <div className="flex-1 flex flex-col  min-w-0 bg-[#FFFFFF]  ">
        <Header />
        <div className="bg-[#FFFFFF]  dark:bg-darkBG p-6 md:p-12  ">
      
          <Outlet />
        </div>
      </div>
      {/* =============== Common layout ends =============== */}
    </div>
  );
};

export default CommonLayouts;
