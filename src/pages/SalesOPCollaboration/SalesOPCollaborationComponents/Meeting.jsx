import React, { useState } from "react";
import DynamicButton from "@/SharedComponants/DynamicButton";
import Heading from "@/SharedComponants/Heading";
import MeetingGridCard from "./MeetingGridCard";
import MeetingCreateModal from "./MeetingCreateModal";
import MeetingList from "./MeetingList";

const Meeting = ({ theme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Heading
          heading={"Meeting Management"}
          subHeading={"Schedule and manage all meetings"}
        />
        <DynamicButton
          label="New Meeting"
          showIcon={true}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="my-6">
        <MeetingGridCard theme={theme} />
      </div>
      <MeetingList />

      <MeetingCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={theme}
      />
    </div>
  );
};

export default Meeting;
