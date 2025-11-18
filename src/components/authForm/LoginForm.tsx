import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail, Lock } from "lucide-react";
import outlook from "../../assets/images/outlook-icon.svg";
import google from "../../assets/images/google-icon.svg";
import { loginFields } from "@/constants";
// import useNetworkRequest from "@/api/useNetworkRequest";
// import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { useNavigate } from "react-router-dom";

const icons = { Mail, Lock };

interface LoginFormProps {
  onSwitch: (view: any) => void;
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // const networkRequest = useNetworkRequest();
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => {
      if (!prev[name as keyof FormData]) return prev;
      const copy = { ...prev };
      delete copy[name as keyof FormData];
      return copy;
    });

    if (authError) setAuthError("");
  };

  const validate = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    const email = formData.email.trim();
    const password = formData.password;

    // Email validation
    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email address.";
      }
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    }
    // else {
    //   const passwordRegex =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    //   if (!passwordRegex.test(password)) {
    //     errors.password = "Please enter a valid password.";
    //   }
    // }

    setFieldErrors(errors);
    // return true when no field errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!validate()) return;

    try {
      setLoading(true);
      const body = { email: formData.email.trim(), password: formData.password };
      // const response = await networkRequest(API_ENDPOINTS.logIn, {
      //   method: "POST",
      //   body,
      // });

      const response = {
        success: true,
        message: '',
        body: body
      }

      if (response?.success) {
        navigate('/portal')
      } else {
        setAuthError(response?.message || "Incorrect email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setAuthError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl px-6">
        {loginFields.map(({ id, label, type, placeholder, icon }) => {
          const Icon = icons[icon as keyof typeof icons];
          const fieldKey = id as keyof FormData;
          const showFieldError = Boolean(fieldErrors[fieldKey]);
          const isPasswordField = fieldKey === "password";

          return (
            <div key={id} className="space-y-2 mb-4 min-w-[360px]">
              <Label className="text-sm font-medium">{label}</Label>
              <div className="relative">
                {Icon && <Icon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />}
                <Input
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  value={formData[fieldKey] || ""}
                  onChange={handleChange}
                  className={`pl-10 text-sm ${showFieldError ? "ring-1 ring-red-500" : ""}`}
                />
              </div>

              {showFieldError && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors[fieldKey]}</p>
              )}

              {isPasswordField && authError && (
                <p className="text-xs text-red-500 mt-1">{authError}</p>
              )}
            </div>
          );
        })}

        <div className="text-right mb-4">
          <span
            onClick={() => onSwitch("forgotpassword")}
            className="text-muted-foreground underline text-sm font-normal cursor-pointer"
          >
            Forgot Password?
          </span>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#971B2F] hover:bg-[#7A1F2B] text-white font-medium text-sm py-2 rounded-md"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-200" />
          <span className="mx-3 text-gray-500 text-xs">Or Sign In With</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 text-sm hover:bg-gray-50"
          >
            <img src={outlook} alt="Outlook" className="w-4 h-4" /> Outlook
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 text-sm hover:bg-gray-50"
          >
            <img src={google} alt="Google" className="w-4 h-4" /> Google
          </button>
        </div>

        <p className="text-sm text-gray-700 mt-4 flex items-center justify-center">
          Don’t have an account?{" "}
          <span onClick={() => onSwitch("signup")} className="text-[#971B2F] font-medium cursor-pointer ml-1">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
