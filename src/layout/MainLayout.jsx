import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function MainLayout() {
  return (
    <div className="bg-[#121926] min-h-lvh">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout