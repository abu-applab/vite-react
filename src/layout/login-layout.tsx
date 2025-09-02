import { Outlet } from "react-router-dom";
import LoginHeader from "../components/loginHeader"

const Layout = () => {
  return (
   <div className='bg-[#f6f5ef] w-screen h-screen'>
      <LoginHeader />
      <Outlet />
    </div>
  )
}

export default Layout