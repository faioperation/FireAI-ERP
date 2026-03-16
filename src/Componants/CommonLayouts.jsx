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
<<<<<<< HEAD:src/components/CommonLayouts.jsx
        <div className="flex-1 overflow-y-auto p-12 text-black">
=======
        <div className="bg-[#FFFFFF] p-12 text-black">
>>>>>>> f77747e99fe020f763d248f1a72c49620cfc1d60:src/Componants/CommonLayouts.jsx
          <Outlet />
        </div>
      </div>
      {/* =============== Common layout ends =============== */}
    </div>
  );
};

export default CommonLayouts;
