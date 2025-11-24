import React from 'react'
import building from '../../../assets/images/manateqBuilding.png'
import manateqLoginLogo from '../../../assets/images/manateq-login-logo.svg'
import isolationMode from '../../../assets/images/Isolation-Mode.svg'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useSearchParams } from 'react-router-dom'

export default function AuthLayout({ children, hideLogo = false }: { children: React.ReactNode; hideLogo?: boolean }) {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const addMotion = isDesktop && !token
    return (
        <div className='flex h-screen w-full overflow-hidden flex-col md:flex-row'>
            <motion.div
                className='w-full h-[70%] md:w-1/2 md:h-screen relative'
                initial={addMotion ? { x: '-100%' } : false}
                animate={addMotion ? { x: 0 } : false}
                transition={addMotion ? { duration: 0.8, ease: 'easeOut' } : {}}
            >
                <img
                    src={building}
                    alt='img'
                    className='w-full h-full object-cover'
                />
                <div className='absolute top-[64px] md:top-10 left-1/2 transform -translate-x-1/2 w-full'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src={isolationMode} className='w-[62px] h-[8-px] md:w-[94px] md:h-[120px]' alt="manateq logo" />
                        <p className='mt-4 text-center text-maroon-100 text-sm md:text-2xl md:mt-6'>A Sustainable Foundation For Qatar’s Economic Diversification</p>
                    </div>
                </div>
            </motion.div>
            <motion.div className="relative flex flex-col w-full md:w-1/2 items-center justify-center rounded-t-3xl md:rounded-none md:static bottom-0
                 bg-[#f6f5ef] md:bg-transparent px-4 py-6 pb-[max(env(safe-area-inset-bottom),1rem)] md:p-0"
                initial={addMotion ? { x: '100%' } : false}
                animate={addMotion ? { x: 0 } : false}
                transition={addMotion ? { duration: 0.8, ease: 'easeOut' } : {}}
            >
                {!hideLogo && (
                    <img
                        src={manateqLoginLogo}
                        alt="Manateq Logo"
                        className="w-14 h-14 mb-6"
                    />
                )}
                {children}
            </motion.div>
        </div>
    )
}
