import LoginForm from '@/components/authForm/LoginForm'
import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Sign In to your account</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to continue.</p>
            <LoginForm onSwitch={(view: any) => navigate(`/${view}`)} />
        </AuthLayout>
    )
}

export default Login