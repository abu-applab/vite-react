import { Button } from "@/components/ui/button";
import manateqLogo2 from "../assets/images/manateq-hub-logo.svg"
import qatarFlag from "../assets/images/qatar-flag.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { BellDot, LogOut, Menu, Settings, User } from "lucide-react";
import Footer from "@/components/footer";
import { useApp } from "../context/AppContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationBar } from "@/components/navigationItems";
import { MobileMenu } from "@/components/mobileMenu";
import { useEffect, useRef, useState } from "react";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "@/components/loader";
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { clearAllLocalStorage } from "@/lib/utils";
import { PAGE_SIZE } from "@/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ErrorState } from "@/components/errorState";

const PortalLayout = () => {
    const { isMenuOpen, setIsMenuOpen, setCompanies, setSelectedCompany, contact, setCompaniesFilter } = useApp();
    const navigate = useNavigate();
    const networkRequest = useNetworkRequest();
    const [isLoading, setIsLoading] = useState(false);
    const { i18n } = useTranslation();
    const lang = localStorage.getItem('lang') ?? 'en'
    const { t } = useTranslation();
    const abortControllerRef = useRef<AbortController | null>(null);
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const fullName = `${contact?.firstName} ${contact?.lastName}`
    const initials = `${contact?.firstName.charAt(0)}${contact?.lastName.charAt(0)}`.toUpperCase();

    useEffect(() => {
        if (!contact?.id) return;

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const fetchCompanies = async () => {
            if (isLoading || signal.aborted) return;

            setIsLoading(true);
            const body = {
                contactId: contact.id
            };

            try {
                const response = await networkRequest(API_ENDPOINTS.getCompanies, {
                    method: 'GET',
                    body: body,
                    signal: signal
                });
                if (!signal.aborted) {
                    const companyList = response?.data?.[0]?.companies || [];
                    setCompanies(companyList);
                    if (companyList.length > 0) {
                        setSelectedCompany(companyList[0]);
                        setCompaniesFilter((prev) => ({
                            ...prev,
                            totalPages: Math.ceil(companyList.length / PAGE_SIZE)
                        }));
                    }
                    setIsLoading(false);
                }
            } catch (error: any) {
                if (!signal.aborted) {
                    console.error("Failed to fetch companies:", error);
                    if (error?.status === 500) {
                        setHasError(true);
                    }
                    setIsLoading(false);
                }
            }
        };

        fetchCompanies();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [contact?.id, retryCount]);

    const switchLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang === "en" ? "ar" : "en";
        localStorage.setItem("lang", newLang);
        i18n.changeLanguage(newLang);
        const html = document.documentElement;
        html.setAttribute("lang", newLang);
        html.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
    };

    const handleLogOut = async () => {
        try {
            clearAllLocalStorage()
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


    const handleTryAgain = () => {
        // Reset states and increment retry count to trigger useEffect
        setHasError(false);
        abortControllerRef.current = null
        setRetryCount(prev => prev + 1);
    };

    return (
        <div className='bg-[#f6f5ef] w-screen min-h-screen flex flex-col'>
            <div className="flex flex-row items-center justify-between w-full h-[88px] lg:px-20 md:px-6 md:border-b-2 max-md:px-4">
                <Button variant="ghost" className="cursor-pointer p-0" onClick={() => navigate('/portal')}>
                    <img src={manateqLogo2} alt="logo" className="w-[158px] h-10" />
                </Button>
                <div className="flex items-center justify-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <Button className="flex cursor-pointer h-10 border-1 p-1.5 gap-0.5 hover:bg-gray-50" onClick={switchLanguage}>
                            <img src={qatarFlag} className="w-4 h-4" alt="Qatar flag " />
                            <span className="text-black">{lang === 'en' ? 'العربية' : 'English'}</span>
                        </Button>
                        <Button onClick={() => navigate('/portal/notifications')} className="relative border-[1px] h-10 hover:bg-gray-50" disabled>
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
                                <DropdownMenuLabel className="px-4 py-2 font-medium flex flex-row gap-2 items-center bg-zinc-100">
                                    <Avatar className="h-8 w-8 text-maroon-100">
                                        {/* <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" /> */}
                                        <AvatarFallback className="bg-white">{initials}</AvatarFallback>
                                    </Avatar>
                                    <h1 className="text-xs">{`${fullName}`}</h1>
                                </DropdownMenuLabel>
                                <DropdownMenuItem className="flex items-center mt-2 gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs" onClick={() => navigate('/portal/my-profile')} disabled>
                                    <User className="w-5 h-5  text-black" />
                                    {t('my_profile')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/portal/settings')} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs" disabled>
                                    <Settings className="w-5 h-5  text-black" />
                                    {t('settings')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { handleLogOut() }} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-xs">
                                    <LogOut className="w-5 h-5 text-black" />
                                    {t('log_out')}
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
            <div className="flex-1 flex flex-col">
                <div className="lg:px-20 md:px-6 md:mt-10 flex-1 flex flex-col justify-center max-md:m-4">

                    {isLoading ? (
                        <Loader />
                    ) : hasError ? (
                        <ErrorState handleTryAgain={handleTryAgain} />
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PortalLayout