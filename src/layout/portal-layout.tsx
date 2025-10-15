import { Button } from "@/components/ui/button";
import manateqLogo2 from "../assets/images/manateq-hub-logo.svg"
import qatarFlag from "../assets/images/qatar-flag.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { BellDot, LogOut, Menu, Settings, User } from "lucide-react";
// import { useState } from "react";
import Footer from "@/components/footer";
import { useApp } from "../context/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import avatar from ".././assets/images/Avatar.svg"
import { NavigationBar } from "@/components/navigationItems";

const PortalLayout = () => {
    // const [isDark, setIsDark] = useState(false);
    const { isMenuOpen, setIsMenuOpen } = useApp();
    const navigate = useNavigate();
    // const toggleTheme = () => {
    //     setIsDark(!isDark)
    // }

    return (
        <div className='bg-[#f6f5ef] w-screen min-h-screen flex flex-col'>
            <div className="flex flex-row items-center justify-between w-full h-[88px] px-[80px] py-6 border-b-2">
                <img src={manateqLogo2} alt="logo" className="w-[158px] h-10" />
                <div className="flex items-center justify-center gap-2">
                    <Button className="flex cursor-pointer h-10 border-1 p-1.5 gap-0.5 hover:bg-gray-50">
                        <img src={qatarFlag} className="w-4 h-4" alt="Qatar flag " />
                        <span className="text-black">العربية</span>
                    </Button>
                    {/* <div className="flex shadow-sm p-0.5 rounded-md h-10">
                        <Button className={`${isDark ? 'border-none shadow-none hover:bg-gray-100 ' : 'bg-white hover:bg-whites'} cursor-pointer rounded-l-sm`} onClick={() => toggleTheme()}>
                            <Sun className="h-4 w-4 text-[#852533]" />
                        </Button>
                        <Button className={`${isDark ? 'bg-white hover:bg-white' : 'border-none shadow-none hover:bg-gray-100'} cursor-pointer rounded-l-sm`} onClick={() => toggleTheme()}>
                            <Moon className="h-4 w-4 text-[#852533]" />
                        </Button>
                    </div> */}
                    <Button onClick={() => navigate('/portal/notifications')} className="relative border-[1px] h-10 hover:bg-gray-50">
                        <BellDot className="w-2 h-2 text-black" />
                        <span className="absolute top-[12px] right-[11px] block h-2 w-2 rounded-full bg-green-500"></span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="relative border-[1px] h-10 hover:bg-gray-50">
                                <User className="w-2 h-2 text-black" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 mt-2 rounded-lg shadow-lg border bg-white p-0 pb-2">
                            <DropdownMenuLabel className="px-4 py-2 font-medium flex flex-row gap-4 items-center bg-zinc-100">
                                <img
                                    src={avatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-xs">Mushthofa Ahmad Kamal</span>
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center mt-2 gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs" onClick={() => navigate('/portal/my-profile')}>
                                <User className="w-5 h-5  text-black" />
                                My Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/portal/settings')} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs">
                                <Settings className="w-5 h-5  text-black" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs">
                                <LogOut className="w-5 h-5 text-black" />
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className={`border text-black h-10  ${isMenuOpen ? 'bg-bg-gray-50 hover:bg-gray-50' : 'bg-transparent hover:bg-transparent'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className={`w-2 h-2`} />
                    </Button>
                </div>
            </div>
            {isMenuOpen &&
                <NavigationBar />
            }
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default PortalLayout