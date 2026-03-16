import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CommonLayouts = () => {
  return (
    <div className="flex mx-auto w-full">
      {/* =============== Common layout starts =============== */}
      <Sidebar />
      <div className=" w-full">
        <Header />
        <div className="bg-[#FFFFFF] p-12 text-black dark:bg-black">
          <Outlet />
        </div>
      </div>
      {/* =============== Common layout ends =============== */}
    </div>
  );
};

export default CommonLayouts;
