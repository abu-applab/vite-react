
import ForgotPasswordForm from '@/components/authForm/ForgetPassword'
import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import mailSentIcon from '@/assets/images/mailsent.svg'
import useNetworkRequest from '@/api/useNetworkRequest'
import { API_ENDPOINTS } from '@/api/apiEndpoints'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const networkRequest = useNetworkRequest();
    const [showMailSentData, setShowMailSent] = useState({
        email: '',
        show: false,
        loading: false
    });
    const handleResend = async () => {
        setShowMailSent(prev => ({ ...prev, loading: true }));

        try {
            const email = showMailSentData.email.trim();
            if (!email) return;

            await networkRequest(API_ENDPOINTS.forgotpassword, {
                method: "POST",
                body: { email: email },
            });

        } catch (error) {
            console.error("Error sending reset link:", error);
            // Optionally show an error message to the user
        } finally {
            setShowMailSent(prev => ({ ...prev, loading: false }));
        }
    };
    return (

        <AuthLayout hideLogo={showMailSentData.show}>
            {showMailSentData.show ? (
                <div className="flex items-center justify-center px-4">
                    <div className="flex flex-col items-center text-center w-full max-w-md px-6 py-10">
                        <img
                            src={mailSentIcon}
                            alt="Mail Sent"
                            className="w-24 h-24 mb-8"
                        />

                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            Password Reset Link Sent!
                        </h2>

                        <p className="text-sm md:text-base text-gray-600 max-w-xl mb-6">
                            If an account exists for the email you provided, you will receive a password reset link shortly. Please check your inbox and follow the instructions.
                        </p>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full rounded-md bg-[#971B2F] hover:bg-[#7A1F2B] text-white text-sm font-medium py-2.5 mb-4"
                        >
                            Back to Login
                        </button>

                        <p className="text-xs md:text-sm text-gray-700">
                            Didn&apos;t receive an email?{' '}
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-[#971B2F] font-medium underline underline-offset-2 hover:cursor-pointer"
                            >
                                {showMailSentData.loading ? 'Resending...' : 'Resend'}
                            </button>
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Forgot Password
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 mb-10">
                        Enter your email to request password reset.
                    </p>
                    <ForgotPasswordForm
                        onSwitch={(view: any) => navigate(`/${view}`)}
                        onResetSuccess={(email: string) => {
                            setShowMailSent(prev => ({ ...prev, show: true, email }));
                        }}
                    />
                </>)}
        </AuthLayout>
    )
}

export default ForgotPassword