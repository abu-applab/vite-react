import LoginForm from '@/components/authForm/LoginForm'
import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import OtpVerification from './otpVerification'

const Login = () => {
    const navigate = useNavigate()
    const [otpData, setOtpData] = useState<any>({
        phoneNumber: '',
        show: false
    });

    return (
        <AuthLayout animate={true}>
            {otpData.show ? (
                <OtpVerification phoneNumber={otpData.phoneNumber} />
            ) : (<><h1 className="text-xl md:text-2xl font-semibold text-gray-900">Sign In to your account</h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1 mb-10 text-center md:text-left">
                    Enter your credentials to sign in.
                </p>
                <LoginForm
                    onSwitch={(view: any, data?: any) => {
                        if (view === 'otpverification') {
                            setOtpData({
                                phoneNumber: data || '',
                                show: true
                            });
                        } else {
                            navigate(`/${view}`);
                        }
                    }}
                />
            </>
            )}
        </AuthLayout>
    )
}

export default Login