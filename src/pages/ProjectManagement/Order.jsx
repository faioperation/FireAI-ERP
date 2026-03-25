// import DynamicButton from "@/SharedComponants/DynamicButton";
// import Heading from "@/SharedComponants/Heading";
// import OrderGridCard from "./OrderComponents/OrderGridCard";
// import OrderList from "./OrderComponents/OrderList";

// const Order = () => {
//   return (
//     <>
//       <div className="flex justify-between mb-6">
//         <Heading heading={"Order List"} subHeading={"Manage all your orders"} />
//         <DynamicButton label="Create Order" showIcon={true} />
//       </div>
//       <OrderGridCard />
//       <div className="mt-10">
//         <OrderList />
//       </div>
//     </>
//   );
// };

// export default Order;

import React, { useState } from "react";
import DynamicButton from "@/SharedComponants/DynamicButton";
import Heading from "@/SharedComponants/Heading";
import OrderGridCard from "./OrderComponents/OrderGridCard";
import OrderList from "./OrderComponents/OrderList";
import OrderCreateModal from "./OrderComponents/OrderCreateModal";


const Order = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Heading heading={"Order List"} subHeading={"Manage all your orders"} />
        

        <DynamicButton 
          label="Create Order" 
          showIcon={true} 
          onClick={() => setIsModalOpen(true)} 
        />
      </div>

      <OrderGridCard />

      <div className="mt-10">
        <OrderList />
      </div>

 
      <OrderCreateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={(data) => console.log("Order Data:", data)}
      />
    </>
  );
};

export default Order;
