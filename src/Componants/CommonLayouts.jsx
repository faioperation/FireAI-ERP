import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CommonLayouts = () => {
  return (
    <div className="flex mx-auto w-full bg-red-400">
      {/* =============== Common layout starts =============== */}
      <Sidebar />
      <div className=" w-full">
        <Header />
        <div className="">
          <Outlet />
        </div>
      </div>
      {/* =============== Common layout ends =============== */}
    </div>
  );
};

export default CommonLayouts;
