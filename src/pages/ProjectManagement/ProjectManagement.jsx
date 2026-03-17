import DynamicButton from "@/SharedComponants/DynamicButton";
import Heading from "@/SharedComponants/Heading";
import SearchBar from "@/SharedComponants/SearchBar";
import ProjectGridCard from "./ProjectManagementComponents/ProjectGridCard";

const ProjectManagement = () => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <Heading
          heading={"Project List"}
          subHeading={"Manage all your projects and orders"}
        />
        <DynamicButton
          label="New Project"
          showIcon={true}
        
        />
      </div>
      <ProjectGridCard />
      <div className="my-10">
        <SearchBar />
      </div>
    </>
  );
};

export default ProjectManagement;
