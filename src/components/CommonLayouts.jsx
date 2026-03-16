import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CommonLayouts = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* =============== Common layout starts =============== */}
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF] ">
        <Header />
        <div className="flex-1 overflow-y-auto p-12 text-black">
          <Outlet />
        </div>
      </div>
      {/* =============== Common layout ends =============== */}
    </div>
  );
};

export default CommonLayouts;
