import Heading from "@/SharedComponants/Heading";
import ProfileInformation from "./SettingsComponents.jsx/ProfileInformation";

const Settings = () => {
  return (
    <>
      <Heading
        heading={"Profile Information"}
        subHeading={"Manage your personal details and preferences"}
      />
      <div className="mt-6">
        <ProfileInformation />
      </div>
    </>
  );
};

export default Settings;
