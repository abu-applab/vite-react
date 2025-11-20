import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { signUpFields } from "@/constants";
import outlook from "../../assets/images/outlook-icon.svg";
import google from "../../assets/images/google-icon.svg";
import { cn, passwordRules } from "@/lib/utils";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import checkCircle from "../../assets/images/check-circle.svg";
import circleX from "../../assets/images/circle-x.svg";

interface SignUpFormProps {
  onSwitch: (view: any) => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  landlineNumber: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = ({ onSwitch }: SignUpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    landlineNumber: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<Record<string, boolean>>({
    length: false,
    upperLower: false,
    number: false,
    special: false,
  });
  const networkRequest = useNetworkRequest();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let nextValue: string | boolean = type === "checkbox" ? checked : value;

    // For phone fields, allow only digits
    if (name === "landlineNumber" || name === "mobileNumber") {
      nextValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    // Clear field-level error while typing
    setFieldErrors((prev) => {
      if (!prev[name as keyof FormData]) return prev;
      const updated = { ...prev };
      delete updated[name as keyof FormData];
      return updated;
    });

    // Update live password validation when password changes
    if (name === "password") {
      const newValidation: Record<string, boolean> = {};
      passwordRules.forEach((rule) => {
        newValidation[rule.id] = rule.test(String(nextValue));
      });
      setPasswordValidation(newValidation);
    }

    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    signUpFields.forEach((field) => {
      const value = formData[field.id as keyof typeof formData];

      // Required check
      if (!value) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      // Dynamic validations using if/else
      if (field.id === "email") {
        if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors[field.id] = "Please enter a valid email address";
        }
      } else if (field.id === "landlineNumber" || field.id === "mobileNumber") {
        if (!/^\d{8}$/.test(value)) {
          newErrors[field.id] = `${field.label} must be 8 digits`;
        }
      } else if (field.id === "password") {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(value)) {
          newErrors[field.id] =
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
        }
      } else if (field.id === "confirmPassword") {
        if (value !== formData.password) {
          newErrors[field.id] = "Passwords do not match";
        }
      }
    });

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;

    try {
      setLoading(true);

      const body = {
        "firstName": formData?.firstName,
        "lastName": formData?.lastName,
        "email": formData?.email,
        "mobilePhone": formData?.mobileNumber,
        "landline": formData?.landlineNumber,
        "password": formData?.password,
        "confirmPassword": formData?.confirmPassword
      };
      const response = await networkRequest(API_ENDPOINTS?.signUp, {
        method: "POST",
        body,
      });

      if (response?.success) {
        console.log("Signup successful:", response);
        // You can auto-switch to login after success
        // onSwitch("login");
      } else {
        setApiError(response?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setApiError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-40 space-y-4">
      <div className="grid grid-cols-2 gap-8">
        {signUpFields.map(({ id, label, type, placeholder }) => {
          const fieldKey = id as keyof FormData;
          const showError = Boolean(fieldErrors[fieldKey]);
          const isConfirmPassword = fieldKey === "confirmPassword";

          return (
            <div
              key={id}
              className={cn("space-y-2 min-w-[250px]", {
                "col-span-2": label === "Email",
              })}
            >
              <Label className="text-sm font-medium">{label}</Label>
              <Input
                name={id}
                type={type}
                placeholder={placeholder}
                value={formData[fieldKey] || ""}
                onChange={handleChange}
                inputMode={id === "landlineNumber" || id === "mobileNumber" ? "numeric" : undefined}
                maxLength={id === "landlineNumber" || id === "mobileNumber" ? 8 : undefined}
                className={cn("text-sm", { "ring-1 ring-red-500": showError })}
              />

              {/* field-level validation error */}
              {showError && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors[fieldKey]}</p>
              )}

              {fieldKey === "password" && (
                <div className="mt-2 space-y-1 mt-6">
                  {passwordRules.map((rule) => (
                    <div key={rule.id} className="flex items-center my-2">
                      <img
                        src={passwordValidation[rule.id] ? checkCircle : circleX}
                        alt={passwordValidation[rule.id] ? "Check" : "Cross"}
                        className="w-3.5 h-3.5 mr-2"
                      />
                      <span
                        className={cn("text-xs", {
                          "text-green-600": passwordValidation[rule.id],
                          "text-gray-500": !passwordValidation[rule.id],
                        })}
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {apiError && (
        <div className="w-full mb-3 flex items-center justify-center rounded-lg bg-white py-2 text-sm text-red-600 border border-red-200">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{apiError}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#971B2F] hover:bg-[#7A1F2B] text-white font-medium text-sm py-2 rounded-md"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-200" />
        <span className="mx-3 text-gray-500 text-xs">Or Sign Up With</span>
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
        Already a member?{" "}
        <span
          onClick={() => onSwitch("login")}
          className="text-[#971B2F] font-medium cursor-pointer ml-1"
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
