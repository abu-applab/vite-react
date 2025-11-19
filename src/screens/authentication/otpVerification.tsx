import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'
import OtpVeirificationForm from '@/components/authForm/OtpVeirificationForm'

const OtpVerification = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto text-center space-y-4">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Enter OTP Code
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    We have sent a 6-digit code to your phone to verify your identity.
                </p>
                <div className="mt-4 flex justify-center">
                    <OtpVeirificationForm onSwitch={(view: any) => navigate(`/${view}`)} />
                </div>
            </div>
        </AuthLayout>
    )
}

export default OtpVerification