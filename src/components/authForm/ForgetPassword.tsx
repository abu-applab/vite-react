import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { forgotPasswordFields } from "@/constants";

interface ForgotPasswordProps {
  onSwitch: (view: any) => void;
}

const ForgotPassword = ({ onSwitch }: ForgotPasswordProps) => {
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e: any) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Forgot Password:", formData);
    onSwitch("otpVerification");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl px-6">
      {forgotPasswordFields.map(({ id, label, type, placeholder }) => (
        <div key={id} className="space-y-2 mb-4 min-w-[360px]">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            name={id}
            type={type}
            placeholder={placeholder}
            value={formData[id as keyof typeof formData] || ""}
            onChange={handleChange}
            className="text-sm"
          />
        </div>
      ))}

      <Button
        type="submit"
        className="w-full bg-[#971B2F] hover:bg-[#7A1F2B] text-white font-medium text-sm py-2 rounded-md"
      >
        Send OTP
      </Button>

      <p className="text-sm text-gray-700 mt-4 flex items-center justify-center">
        Remember password? Go back to{" "}
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

export default ForgotPassword;
