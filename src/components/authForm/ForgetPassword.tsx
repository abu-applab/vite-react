import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { forgotPasswordFields } from "@/constants";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { AlertCircle } from "lucide-react";

interface ForgotPasswordProps {
  onSwitch: (view: any) => void;
}

const ForgotPasswordForm = ({ onSwitch }: ForgotPasswordProps) => {
  const networkRequest = useNetworkRequest();
  const [formData, setFormData] = useState({ email: "" });
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => {
      if (!prev.email) return prev;
      const copy = { ...prev };
      if (name === "email") delete copy.email;
      return copy;
    });

    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const errors: { email?: string } = {};
    const email = formData.email.trim();

    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email address.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    try {
      setLoading(true);
      const body = { email: formData.email.trim() };

      const response = await networkRequest(API_ENDPOINTS.forgotpassword, {
        method: "POST",
        body,
      });
      console.log("Forgot password response:", response);

      if (response?.success) {
        setSuccessMessage(
          response?.message || "OTP has been sent to your email address."
        );
        setSubmitError("");
      } else {
        setSuccessMessage("");
        setSubmitError(response?.message || "Failed to send OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setSubmitError(
        err?.message || "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl px-6">
      {forgotPasswordFields.map(({ id, label, type, placeholder }) => (
        <div key={id} className="space-y-2 mb-4">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            name={id}
            type={type}
            placeholder={placeholder}
            value={formData[id as keyof typeof formData] || ""}
            onChange={handleChange}
            className={`text-sm ${fieldErrors.email ? "ring-1 ring-red-500" : ""}`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>
      ))}

      {submitError && (
        <div className="w-full mb-3 flex items-center justify-center rounded-lg bg-white py-2 text-sm text-red-600 border border-red-200">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{submitError}</span>
        </div>
      )}

      {successMessage && (
        <div className="w-full p-4 mb-3 flex items-center justify-center rounded-lg bg-white py-2 text-sm text-green-600 border border-green-200">
          <span>{successMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#971B2F] hover:bg-[#7A1F2B] text-white font-medium text-sm py-2 rounded-md"
      >
        {loading ? "Sending..." : "Send"}
      </Button>

      <p className="text-sm text-gray-700 mt-4 flex items-center justify-center">
        {"Remember password? Go back to\u00a0"}
        <span
          onClick={() => onSwitch("login")}
          className="text-[#971B2F] font-medium cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;