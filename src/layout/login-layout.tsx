import loginBanner from '../assets/images/login-banner.png'
import loginLogo from '../assets/images/login-logo.svg'
import vectorLeft from '../assets/images/vector-left.svg'
import vectorRight from '../assets/images/vector-right.svg'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
// import { useMediaQuery } from 'react-responsive'
// import { useSearchParams } from 'react-router-dom'

export default function AuthLayout({ hideLogo = false }: { hideLogo?: boolean, animate?: boolean }) {
    const { t } = useTranslation();
    return (
        <div className="flex min-h-screen flex-row bg-[#f4f5f7] w-screen">
            <div className="relative w-1/2 h-screen overflow-y-auto">

                <div className="min-h-full flex flex-col px-6 pt-10 pb-6">

                    {/* CENTER WRAPPER */}
                    <div className="flex-1 flex flex-col items-center justify-center">

                        {!hideLogo && (
                            <img
                                src={loginLogo}
                                alt="Manateq Logo"
                                className="w-[120px] h-[154px] mb-8"
                            />
                        )}

                      <Outlet />

                    </div>

                    {/* FOOTER */}
                    <p className="font-normal text-sm text-neutral-700 text-center mt-10">
                        Copyrights © 2025 Manateq
                        <br />
                        All Rights Reserved
                    </p>

                </div>

            </div>

            <div className="block w-1/2 h-screen overflow-hidden relative">

                {/* Animated Image */}
                <motion.img
                    src={loginBanner}
                    alt="img"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-1" />

                {/* Text content */}
                <motion.div
                    className="absolute bottom-[50px] w-full z-[2] flex justify-center px-20 2xl:px-40"
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex flex-row items-center justify-center">
                        <img src={vectorLeft} alt="" />

                        <p className="font-normal text-[40px] leading-[46px] tracking-[-0.02em] text-center text-white max-w-[700px]">
                            {t('banner_text')}
                        </p>

                        <img src={vectorRight} alt="" />
                    </div>
                </motion.div>


            </div>
        </div>
    )
}
