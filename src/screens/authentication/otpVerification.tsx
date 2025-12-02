import { useNavigate } from 'react-router-dom'
import OtpVeirificationForm from '@/components/authForm/OtpVeirificationForm'

interface OtpVerificationProps {
    phoneNumber?: string;
    setOtpData?: any
}

const OtpVerification = ({ phoneNumber = '', setOtpData }: OtpVerificationProps) => {
    const navigate = useNavigate()
    return (
        <div className="w-full max-w-md mx-auto text-center space-y-4">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Enter OTP Code
            </h1>
            <p className="text-gray-500 text-sm mt-1">
                We have sent a 6-digit code to your phone to verify your identity.
            </p>
            <div className="mt-4 flex justify-center">
                <OtpVeirificationForm phoneNumber={phoneNumber} onSwitch={(view: any) => navigate(`/${view}`)} setOtpData={setOtpData}/>
            </div>
        </div>
    )
}

export default OtpVerification