
import { useState } from "react";
import DynamicButton from "@/SharedComponants/DynamicButton";
import Heading from "@/SharedComponants/Heading";
import SearchBar from "@/SharedComponants/SearchBar";
import ProjectGridCard from "./ProjectManagementComponents/ProjectGridCard";
import ProjectList from "./ProjectManagementComponents/ProjectList";
import { Link } from "react-router";

const ProjectManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex justify-between mb-6">
        <Heading
          heading={"Project List"}
          subHeading={"Manage all your projects and orders"}
        />
        <Link to="/create-project">
          <DynamicButton label="New Project" showIcon={true} />
        </Link>
      </div>

      <ProjectGridCard />

      <div className="my-10">
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <ProjectList searchQuery={searchQuery} />
    </>
  );
};

export default ProjectManagement;