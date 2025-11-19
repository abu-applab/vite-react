import { Button } from "@/components/ui/button";
import manateqLogo2 from "../assets/images/manateq-hub-logo.svg"
import qatarFlag from "../assets/images/qatar-flag.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { BellDot, LogOut, Menu, Settings, User } from "lucide-react";
import Footer from "@/components/footer";
import { useApp } from "../context/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import avatar from ".././assets/images/Avatar.svg"
import { NavigationBar } from "@/components/navigationItems";
import { MobileMenu } from "@/components/mobileMenu";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "@/components/loader";
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { clearAllLocalStorage } from "@/lib/utils";

const PortalLayout = () => {
    const { isMenuOpen, setIsMenuOpen, setCompanies, setSelectedCompany, contactId } = useApp();
    const navigate = useNavigate();
    const networkRequest = useNetworkRequest();
    const [isLoading, setIsLoading] = useState(false);
    const { i18n } = useTranslation();
    const lang = localStorage.getItem('lang') ?? 'en'

    useEffect(() => {
        const fetchCompanies = async () => {
            setIsLoading(true)
            const body = {
                // hardcorded
                contactId: contactId
            }
            try {
                const response = await networkRequest(API_ENDPOINTS.getCompanies, {
                    method: 'GET',
                    body: body
                });
                const companyList = response?.data?.[0]?.companies || [];
                setCompanies(companyList);
                companyList.length > 0 && setSelectedCompany(companyList[0])
                setIsLoading(false)
            } catch (error) {
                setIsLoading(true)
                console.error("Failed to fetch companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    const switchLanguage = () => {
        const currentPath = window.location.pathname;
        const newLang = currentPath.startsWith("/en") ? "ar" : "en";

        // Store preference
        localStorage.setItem("lang", newLang);

        // Update i18n
        i18n.changeLanguage(newLang);

        // Update <html> tag direction
        const html = document.documentElement;
        html.setAttribute("lang", newLang);
        html.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");

        // Replace only the language prefix in the URL
        const updatedPath = currentPath.replace(/^\/(en|ar)/, `/${newLang}`);

        window.location.pathname = updatedPath;
    };
    const handleLogOut = async () => {
        try {
            await networkRequest(
                API_ENDPOINTS.logOut,
                {
                    method: 'POST'
                }
            );
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
    return (
        <div className='bg-[#f6f5ef] w-screen min-h-screen flex flex-col'>
            <div className="flex flex-row items-center justify-between w-full h-[88px] lg:px-20 md:px-6 px-4 md:border-b-2">
                <Button variant="ghost" className="cursor-pointer" onClick={() => navigate('/portal')}>
                    <img src={manateqLogo2} alt="logo" className="w-[158px] h-10" />
                </Button>
                <div className="flex items-center justify-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <Button className="flex cursor-pointer h-10 border-1 p-1.5 gap-0.5 hover:bg-gray-50" onClick={switchLanguage}>
                            <img src={qatarFlag} className="w-4 h-4" alt="Qatar flag " />
                            <span className="text-black">{lang === 'en' ? 'العربية' : 'English'}</span>
                        </Button>
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
                                <DropdownMenuItem onClick={() => { handleLogOut() }} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs">
                                    <LogOut className="w-5 h-5 text-black" />
                                    Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Button className={`border text-black h-10 ${isMenuOpen ? 'bg-bg-gray-50 hover:bg-gray-50' : 'bg-transparent hover:bg-transparent'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className={`w-2 h-2`} />
                    </Button>
                </div>
            </div>
            {isMenuOpen &&
                <>
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: "easeIn" }}
                        >
                            <NavigationBar />
                        </motion.div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="block md:hidden">
                        <MobileMenu
                            isOpen={isMenuOpen}
                            onClose={() => setIsMenuOpen(false)}
                            switchLanguage={switchLanguage}
                        />
                    </div>
                </>
            }
            <div className="flex-1">
                <div className="lg:px-20 md:px-6 md:mt-10 m-4">
                    {
                        isLoading ? <Loader /> :
                            <Outlet />
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PortalLayout