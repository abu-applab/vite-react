import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import checkCircle from "../../assets/images/check-circle.svg";


interface OtpVerificationFormProps {
    onSwitch: (view: string) => void;
}

const OTP_LENGTH = 6;

export default function OtpVeirificationForm({
    onSwitch,
}: OtpVerificationFormProps) {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        // Allow only digits and max 1 character per box
        const digit = value.replace(/\D/g, "").slice(0, 1);

        setOtp((prev) => {
            const updated = [...prev];
            updated[index] = digit;
            return updated;
        });

        setError("");

        // Auto-focus next input if a digit was entered
        if (digit && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const code = otp.join("");

        // Basic validation: require 6 digits, then show a clear message if OTP is not correct
        if (code.length !== OTP_LENGTH) {
            setError("Please enter the 6-digit code sent to your phone.");
            setSuccess(false);
            return;
        }

        if (!/^\d{6}$/.test(code)) {
            setError("OTP is not correct.");
            setSuccess(false);
            return;
        }

        setSubmitting(true);
        setError("");
        setSuccess(true);

        // Simulate success and redirect to reset password
        setTimeout(() => {
            onSwitch("resetpassword");
        }, 1500);
    };

    return (
        <div className="mt-4 flex justify-center">

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 w-full max-w-md mx-auto">
                <div className="flex justify-center gap-3">
                    {otp.map((value, index) => (
                        <Input
                            key={index}
                            ref={(el: HTMLInputElement | null) => {
                                inputsRef.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg font-medium border-1 rounded-md border-green-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    ))}
                </div>

                {error && (
                    <div className="w-full mb-3 flex items-center justify-center rounded-lg bg-white py-2 text-sm text-red-600 border border-red-200">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <span>{error}</span>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#971B2F] hover:bg-[#7A1F2B] text-white font-medium text-sm py-2 rounded-md"
                >
                    {submitting ? "Verifying..." : "Verify OTP"}
                </Button>

                {success && (
                    <p className="flex items-center justify-center gap-2 text-sm text-green-600">
                        <img src={checkCircle} alt="check" />
                        OTP Verified Successfully. Redirecting to Hub...
                    </p>
                )}
            </form>
        </div>
    );
}
