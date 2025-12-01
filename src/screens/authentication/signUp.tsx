import SignUpForm from '@/components/authForm/SignUpForm'
import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
            <p className="text-gray-500 text-sm mt-1 mb-10">
                Enter your details to continue.
            </p>
            <SignUpForm onSwitch={(view: any) => navigate(`/${view}`)} />
        </AuthLayout>
    )
}

export default SignUp