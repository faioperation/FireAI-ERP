import DynamicButton from "@/SharedComponants/DynamicButton";
import Heading from "@/SharedComponants/Heading";
import OrderGridCard from "./OrderComponents/OrderGridCard";
import OrderList from "./OrderComponents/OrderList";

const Order = () => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <Heading heading={"Order List"} subHeading={"Manage all your orders"} />
        <DynamicButton label="Create Order" showIcon={true} />
      </div>
      <OrderGridCard />
      <div className="mt-10">
        <OrderList />
      </div>
    </>
  );
};

export default Order;
