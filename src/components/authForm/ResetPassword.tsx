import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { resetPasswordFields } from "@/constants";
import { useSearchParams } from "react-router-dom";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import checkCircle from "../../assets/images/check-circle.svg"
import circleX from "../../assets/images/circle-x.svg"
import { passwordRules } from "@/lib/utils";

interface ResetPasswordProps {
    onSwitch: (view: any) => void;
}



const ResetPasswordForm = ({ onSwitch }: ResetPasswordProps) => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const networkRequest = useNetworkRequest();

    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // Real-time password validation state
    const [passwordValidation, setPasswordValidation] = useState<Record<string, boolean>>({
        length: false,
        upperLower: false,
        number: false,
        special: false,
    });

    console.log('passwordValidation: ', passwordValidation);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('name: ', name);

        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setApiError("");

        // Update real-time password validation only if password field changes
        if (name === "password") {
            const newValidation: Record<string, boolean> = {};
            passwordRules.forEach((rule) => {
                newValidation[rule.id] = rule.test(value);
            });
            setPasswordValidation(newValidation);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const password = formData.password || "";

        resetPasswordFields.forEach((field) => {
            const value = formData[field.id];

            if (!value) {
                newErrors[field.id] = `${field.label} is required`;
                return;
            }

            if (field.id === "password") {
                // Recompute password validation on submit to ensure rules are applied
                const currentValidation: Record<string, boolean> = {};
                passwordRules.forEach((rule) => {
                    currentValidation[rule.id] = rule.test(password);
                });
                setPasswordValidation(currentValidation);
                const allRulesPassed = Object.values(currentValidation).every((v) => v);
                if (!allRulesPassed) newErrors[field.id] = "Password does not meet requirements";
            }

            if (field.id === "confirmPassword" && value !== password) {
                newErrors[field.id] = "Passwords do not match";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");

        if (!validateForm()) return;

        try {
            setLoading(true);
            const body = { ...formData, token };
            const response = await networkRequest(API_ENDPOINTS.resetPassword, {
                method: "POST",
                body,
            });

            if (response?.success) {
                onSwitch("login");
            } else {
                setApiError(response?.message || "Failed to reset password");
            }
        } catch (err) {
            console.error(err);
            setApiError("Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
            {resetPasswordFields.map(({ id, label, type, placeholder }) => (
                <div key={id} className="space-y-2 text-left w-full">
                    <Label className="text-sm font-medium">{label}</Label>
                    <Input
                        name={id}
                        type={type}
                        placeholder={placeholder}
                        value={formData[id] || ""}
                        onChange={handleChange}
                        className={`text-sm ${errors[id] ? "ring-1 ring-red-500" : ""}`}
                    />
                    {errors[id] && <p className="text-xs text-red-500">{errors[id]}</p>}
                </div>
            ))}
            {/* Password validation checklist outside input map */}
            {(formData.password || errors.password) && (
                <div className="mt-1 space-y-1">
                    {passwordRules.map((rule) => (
                        <p
                            key={rule.id}
                            className={`flex items-center gap-1 text-zinc-600 text-base leading-6 font-normal}`}
                        >
                            {passwordValidation[rule.id] ? <img src={checkCircle} alt="check" /> : <img src={circleX} alt="circleX" />}
                            {rule.label}
                        </p>
                    ))}
                </div>
            )}
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
                {loading ? "Resetting..." : "Reset Password"}
            </Button>
            <p className="text-sm text-gray-700 mt-4 flex items-center justify-center">
                {"Remember password? Go back to "}
                <span
                    onClick={() => onSwitch("login")}
                    className="text-[#971B2F] font-medium cursor-pointer ml-1"
                >
                    {`${''} Sign In`}
                </span>
            </p>
        </form>
    );
};

export default ResetPasswordForm;
