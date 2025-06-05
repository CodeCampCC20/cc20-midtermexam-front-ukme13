import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function MainLayout() {
  return (
    <div className=" min-h-screen flex flex-col items-center">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout