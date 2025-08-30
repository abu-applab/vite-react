import building from '../assets/images/manateqBuilding.png'
import manateqLoginLogo from '../assets/images/manateq-login-logo.svg'
import isolationMode from '../assets/images/Isolation-Mode.svg'
import LoginForm from '@/components/loginForm'
import { motion } from 'framer-motion'

const Login = () => {
    return (
        <div className='flex flex-row w-screen h-screen'>
            <motion.div
                className='w-[50%] h-screen relative'
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}>
                <img
                    src={building}
                    alt='img'
                    className='w-full h-full object-cover'
                />
                <div className='absolute top-10 left-1/2 transform -translate-x-1/2'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src={isolationMode} alt="manateq logo" />
                        <p className='mt-6 text-[#862634] text-2xl leading-8 text-center'>A Sustainable Foundation For Qatar’s Economic Diversification</p>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className='flex flex-col items-center justify-center w-[50%]'
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="text-center w-[360px]">
                    <div className="flex justify-center mb-4">
                        <img src={manateqLoginLogo} alt="Manateq Logo" className="w-[80px] h-[80px]" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-950">Login to your account</h2>
                    <p className="text-zinc-500">Login with your credentials to keep going!</p>
                </div>
                <LoginForm />
            </motion.div>
        </div>
    )
}

export default Login