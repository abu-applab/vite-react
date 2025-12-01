import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'
import ResetPasswordForm from '@/components/authForm/ResetPassword'

const ResetPassword = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Reset Password
            </h1>
            <p className="text-gray-500 text-sm mt-1 mb-4">Enter your new password below.
            </p>
            <ResetPasswordForm onSwitch={(view: any) => navigate(`/${view}`)} />
        </AuthLayout>
    )
}

export default ResetPassword