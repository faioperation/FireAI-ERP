import { useContext, useState } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import Heading from "@/SharedComponants/Heading";
import NoticeGridCard from "./SalesOPCollaborationComponents/NoticeGridCard";
import DynamicButton from "@/SharedComponants/DynamicButton";
import NoticeList from "./SalesOPCollaborationComponents/NoticeList";
import { PostNewNoticeModal } from "./SalesOPCollaborationComponents/PostNewNoticeCreate";
import { Link } from "react-router";

const NoticePage = () => {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <>
      {/* Page header */}
      <div className="flex justify-between mb-6">
        <Heading
          heading="Notice Board"
          subHeading="Company announcements and important updates"
        />
        <div className="flex items-center gap-4">
          <Link to={"/notice-approval"}>
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
              Approval Notice
            </button>
          </Link>

          <DynamicButton
            label="Post Notice"
            showIcon={true}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Notice cards */}
      <NoticeGridCard />
      <div className="mt-8">
        <NoticeList />
      </div>

      {/* Modal */}
      <PostNewNoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={theme}
      />
    </>
  );
};

export default NoticePage;
