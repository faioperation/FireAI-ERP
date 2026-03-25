import Heading from "@/SharedComponants/Heading"
import TodoNav from "./TodoComponants/TodoNav"
import { Outlet } from "react-router"


const TodoManagement = () => {
  return (
    <div>
      <div>
        <Heading heading="Your Daily To-Do" subHeading="Manage all your Daily To-Do"></Heading>
      </div>
      <div>
        <TodoNav></TodoNav>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default TodoManagement