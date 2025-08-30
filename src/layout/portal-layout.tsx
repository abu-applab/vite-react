import { Button } from "@/components/ui/button";
import manateqLogo2 from "../assets/images/manateq-hub-logo.svg"
import qatarFlag from "../assets/images/qatar-flag.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { AppWindow, BellDot, FileQuestionMark, FolderOpen, Home, Menu, MessageSquareDot, SquareDashed, SquareLibrary, User, Wallet } from "lucide-react";
// import { useState } from "react";
import Footer from "@/components/footer";
import { useApp } from "../context/AppContext";

const PortalLayout = () => {
    // const [isDark, setIsDark] = useState(false);
    const {isMenuOpen, setIsMenuOpen} = useApp();
    const pathName = window.location.pathname;
    const navigate = useNavigate();

    // const toggleTheme = () => {
    //     setIsDark(!isDark)
    // }

    const navigationItems = [
        { name: "Home", icon: Home, href: "/portal" },
        { name: "Application", icon: AppWindow, href: "/portal/application" },
        { name: "Payments", icon: Wallet, href: "/portal/payments" },
        { name: "Allocated Plots", icon: SquareDashed, href: "/portal/allocated-plots" },
        { name: "Service", icon: MessageSquareDot, href: "/portal/service" },
        { name: "Bot Request & Reports", icon: FileQuestionMark, href: "/portal/bot-reports" },
        { name: "Violations Reports", icon: SquareLibrary, href: "/portal/violations" },
        { name: "Directory", icon: FolderOpen, href: "/portal/directory" },
    ]

    return (
        <div className='bg-[#f6f5ef] w-screen min-h-scree'>
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
                    <Button className="relative border-[1px] h-10 hover:bg-gray-50">
                        <BellDot className="w-2 h-2 text-black" />
                        <span className="absolute top-[12px] right-[11px] block h-2 w-2 rounded-full bg-green-500"></span>
                    </Button>
                    <Button className="border-[1px] h-10 hover:bg-gray-50">
                        <User className="w-2 h-2 text-black" />
                    </Button>
                    <Button className={`border text-black h-10  ${isMenuOpen ? 'bg-bg-gray-50 hover:bg-gray-50': 'bg-transparent hover:bg-transparent'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className={`w-2 h-2`} />
                    </Button>
                </div>
            </div>
           {isMenuOpen && <div className="flex flex-row justify-between h-[56px] px-[80px] w-full border-b-2">
                {navigationItems.map((item) => (
                    <Button
                        key={item.name}
                        variant="ghost"
                        className={`h-full m-o p-0 px-4 rounded-b-none hover:text-[#852533] hover:bg-[#f6f5ef] ${pathName.replace(/^\/[^/]+/, "") === item.href && 'h-[56px] border-b-2 border-b-[#852533] text-[#852533]'}`}
                        onClick={() => navigate(item.href)}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </Button>
                ))}
            </div>}
            <Outlet />
            <Footer />
        </div>
    )
}

export default PortalLayout