import SignUpForm from '@/components/authForm/SignUpForm'
import AuthLayout from './components/authlayout'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()

    return (
        <AuthLayout>
            <p className="text-gray-500 text-sm mt-1">
                Fill the details to create an account.
            </p>
            <SignUpForm onSwitch={(view: any) => navigate(`/${view}`)} />
        </AuthLayout>
    )
}

export default SignUp