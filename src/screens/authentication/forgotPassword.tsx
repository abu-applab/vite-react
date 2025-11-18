
import ForgotPasswordForm from '@/components/authForm/ForgetPassword'
import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Forgot Password
            </h1>
            <p className="text-gray-500 text-sm mt-1">
                Enter your registered email to reset your password.
            </p>
            <ForgotPasswordForm onSwitch={(view: any) => navigate(`/${view}`)} />
        </AuthLayout>
    )
}

export default ForgotPassword