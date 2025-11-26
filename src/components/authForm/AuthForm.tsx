import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgetPassword";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
    const navigate = useNavigate()
    const [authView, setAuthView] = useState({
        login: true,
        signup: false,
        forgotPassword: false,
        resetPassword: false,
        otpVerification: false,
    });

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSwitch = (view: keyof typeof authView) => {
        navigate(`/${view}`)
        // setAuthView({
        //     login: false,
        //     signup: false,
        //     forgotPassword: false,
        //     resetPassword: false,
        //     otpVerification: false,
        //     [view]: true,
        // });
    };

    useEffect(() => {
        if (token) {
            setAuthView({
                login: false,
                signup: false,
                forgotPassword: false,
                resetPassword: true,
                otpVerification: false,
            });
        }
    }, [token]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {authView.signup
                        ? "Create an Account"
                        : authView.forgotPassword
                            ? "Forgot Password"
                            : authView.resetPassword
                                ? "Reset Password"
                                : authView.otpVerification
                                    ? "Verify OTP"
                                    : "Sign In to your account"}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    {authView.signup
                        ? "Fill the details to create an account."
                        : authView.forgotPassword
                            ? "Enter your registered email to reset your password."
                            : authView.resetPassword
                                ? "Enter your new password below."
                                : authView.otpVerification
                                    ? "Enter the verification code sent to your email."
                                    : "Enter your credentials to continue."}
                </p>
            </div>

            <div className="w-full flex flex-col items-center">
                {authView.login && <LoginForm onSwitch={handleSwitch} />}
                {authView.signup && <SignUpForm onSwitch={handleSwitch} />}
                {authView.forgotPassword && <ForgotPassword onSwitch={handleSwitch} />}
                {authView.resetPassword && <ResetPassword onSwitch={handleSwitch} />}
                {/* {authView.otpVerification && <OTPVerification onSwitch={handleSwitch} />} */}
            </div>
        </div>
    );
};

export default AuthForm;
