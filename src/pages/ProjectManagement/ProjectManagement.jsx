import { useState } from "react";
import DynamicButton from "@/SharedComponants/DynamicButton";
import Heading from "@/SharedComponants/Heading";
import SearchBar from "@/SharedComponants/SearchBar";
import ProjectGridCard from "./ProjectManagementComponents/ProjectGridCard";
import ProjectCreateModal from "./ProjectManagementComponents/ProjectCreateModal";
import ProjectList from "./ProjectManagementComponents/ProjectList";

const ProjectManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (e) => {
    e.preventDefault();

    console.log("Project Created!");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <Heading
          heading={"Project List"}
          subHeading={"Manage all your projects and orders"}
        />
        <div className="flex items-center justify-between">
          <DynamicButton
            label="New Project"
            showIcon={true}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <ProjectGridCard />

      <div className="my-10">
        <SearchBar />
      </div>
      <ProjectList />

      <ProjectCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </>
  );
};

export default ProjectManagement;
