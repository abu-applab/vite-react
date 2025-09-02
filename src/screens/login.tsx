import building from '../assets/images/manateqBuilding.png'
import manateqLoginLogo from '../assets/images/manateq-login-logo.svg'
import isolationMode from '../assets/images/Isolation-Mode.svg'
import LoginForm from '@/components/loginForm'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const Login = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return (
        <div className='flex h-screen w-full overflow-hidden flex-col md:flex-row'>
            <motion.div
                className='w-full h-[70%] relative md:w-1/2 md:h-screen'
                initial={isDesktop ? { x: '-100%' } : false}
                animate={isDesktop ? { x: 0 } : false}
                transition={isDesktop ? { duration: 0.8, ease: 'easeOut' } : {}}
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
            <motion.div
                className="flex flex-col w-full md:w-1/2 items-center justify-center rounded-t-3xl md:rounded-none absolute md:static bottom-0
                 bg-[#f6f5ef] md:bg-transparent px-4 py-6 pb-[max(env(safe-area-inset-bottom),1rem)] md:p-0"
                initial={isDesktop ? { x: '100%' } : false}
                animate={isDesktop ? { x: 0 } : false}
                transition={isDesktop ? { duration: 0.8, ease: 'easeOut' } : {}}
            >
                <div className="text-center w-[360px]">
                    <div className="flex justify-center mb-4">
                        <img src={manateqLoginLogo} alt="Manateq Logo" className="w-10 h-10 md:w-[80px] md:h-[80px]" />
                    </div>
                    <h2 className="md:text-2xl text-lg font-semibold text-zinc-950">Login to your account</h2>
                    <p className="text-zinc-500 md:text-base text-sm">Enter your credentials or use Qatar Pass to continue.</p>
                </div>
                <LoginForm />
            </motion.div>
        </div>
    )
}

export default Login