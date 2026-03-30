import Heading from "@/SharedComponants/Heading";
import NoticeApprovalGridCard from "./NoticeApprovalGridCard";
import NoticeApprovalList from "./NoticeApprovalList";
import { Link } from "react-router";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { useContext } from "react";

const NoticeApproval = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return (
    <>
      <div className="flex justify-between mb-6">
        <Heading
          heading={"Notice Approval"}
          subHeading={"Review and approve notices before publishing"}
        />
        <Link to={"/notice"}>
          <button
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium
              transition-all duration-300 active:scale-95 cursor-pointer text-sm sm:text-base w-full sm:w-auto
              ${
                isDark
                  ? "bg-[#111827] border border-gray-800 text-[#00d2ff] hover:border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                  : "bg-gray-50 text-black border border-gray-200"
              }
            `}
          >
            View Published Notices
          </button>
        </Link>
      </div>
      <div className="my-6">
        <NoticeApprovalGridCard />
      </div>
      <NoticeApprovalList />
    </>
  );
};

export default NoticeApproval;
