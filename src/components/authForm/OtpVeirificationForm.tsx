import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import checkCircle from "../../assets/images/check-circle.svg";
import { setLocalStorageItem } from "@/lib/utils";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";


interface OtpVerificationFormProps {
    onSwitch: (view: string) => void;
    phoneNumber: string;
    setOtpData: any;
}

const OTP_LENGTH = 6;

export default function OtpVeirificationForm({
    onSwitch,
    phoneNumber,
    setOtpData,
}: OtpVerificationFormProps) {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [resending, setResending] = useState<boolean>(false);
    const [_resendMessage, setResendMessage] = useState<string>("");
    const networkRequest = useNetworkRequest();
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    // const isOtpComplete = otp.every((digit) => digit !== "");
    const hasError = !!error;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const code = otp.join("");

        // Basic validation: require 6 digits
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

        try {
            setSubmitting(true);
            setError("");
            setSuccess(false);

            const body = {
                otpCode: code,
                phoneNumber,
            };

            const response = await networkRequest(API_ENDPOINTS.validateApi, {
                method: "POST",
                body,
            });

            if (response?.success) {
                setLocalStorageItem("auth_txn", response?.data?.session?.token);
                setSuccess(true);
                onSwitch("portal");
            } else {
                setError(response?.message || "OTP verification failed.");
                setSuccess(false);
            }
        } catch (err) {
            console.error("OTP verify error:", err);
            setError("OTP verification failed.");
            setSuccess(false);
        } finally {
            setSubmitting(false);
        }
    };
    const handleResendOtp = async () => {
        try {
            setResending(true);
            setResendMessage("");
            setError("");
            setOtp(Array(OTP_LENGTH).fill(""));

            const body = { phoneNumber };

            const response = await networkRequest(API_ENDPOINTS.resendOtp, {
                method: "POST",
                body,
            });

            if (response?.success) {
                setResendMessage("A new OTP has been sent to your phone.");
            } else {
                setError(response?.message || "Failed to resend OTP.");
            }
        } catch (err) {
            console.error("Resend OTP error:", err);
            setError("Failed to resend OTP.");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="mt-4 flex justify-center">

            <form onSubmit={handleSubmit} className="mt-4 space-y-6 w-full max-w-md mx-auto">
                <div className="flex justify-center gap-2">
                    {otp.map((value, index) => {
                        const baseClasses =
                            "w-13 h-13 text-center text-lg font-medium border-1 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0";

                        const isFilled = value !== "";
                        const isLastBox = index === OTP_LENGTH - 1;

                        let colorClasses = "border-gray-300 focus:border-gray-300";

                        if (hasError) {
                            colorClasses = "border-red-500 focus:border-red-500";
                        } else if (isFilled) {
                            colorClasses = "border-green-500 focus:border-green-500";
                        }
                        if (isLastBox && isFilled && !hasError) {
                            colorClasses = "!border-green-500 !focus:border-green-500";
                        }

                        return (
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
                                className={`${baseClasses} ${colorClasses}`}
                            />
                        );
                    })}
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

                <div className="mt-3 mb-0 flex flex-col items-center space-y-1">
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resending}
                        className="text-xs text-[#971B2F] font-medium underline disabled:opacity-60 cursor-pointer"
                    >
                        {resending ? "Resending OTP..." : "Resend OTP"}
                    </button>

                    {/* {resendMessage && (
                        <p className="text-xs text-green-600 text-center">{resendMessage}</p>
                    )} */}
                </div>

                <div className="w-full flex justify-center">
                    <button
                        type="button"
                        className="flex items-center justify-center font-normal text-sm text-gray-500 hover:text-gray-800 gap-2 mt-4 cursor-pointer"
                        onClick={() => setOtpData((prev: any) => ({
                            ...prev,
                            show: false,
                        }))}
                    >
                        <ArrowLeft size={16} /> Back to login
                    </button>
                </div>
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
