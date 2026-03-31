import Heading from "@/SharedComponants/Heading";
import MonitoringGridCard from "./MonitoringComponents.jsx/MonitoringGridCard";

const Monitoring = () => {
  return (
    <>
      <Heading heading={"Monitory Dashboard"} />
      <div className="mt-6">
        <MonitoringGridCard />
      </div>
    </>
  );
};

export default Monitoring;
