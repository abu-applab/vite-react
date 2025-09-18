import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, KeyRound } from "lucide-react";

export default function PasswordResetForm() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
            <h2 className="text-lg font-medium my-6">Reset Password</h2>
            <form className="bg-white p-6 rounded-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="old-password" className="mb-1 font-medium text-gray-900">
                        Enter Old Password
                    </label>
                    <div className="relative mt-1">
                        <Input
                            id="old-password"
                            type={showOldPassword ? "text" : "password"}
                            placeholder="Enter Old Password"
                            className="p-5 pl-10 "
                        />
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            aria-label={showOldPassword ? "Hide password" : "Show password"}
                        >
                            {showOldPassword ? (
                                <Eye className="w-5 h-5 text-gray-900" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="new-password" className="mb-1 font-medium text-gray-900">
                        Enter New Password
                    </label>
                    <div className="relative mt-1">
                        <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            className="p-5 pl-10"
                        />
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                        >
                            {showNewPassword ? (
                                <Eye className="w-5 h-5 text-gray-900" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="confirm-password" className="mb-1 font-medium text-gray-900">
                        Confirm New Password
                    </label>
                    <div className="relative mt-1">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            className="p-5 pl-10"
                        />
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <Eye className="w-5 h-5 text-gray-900" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>
            </form>
            <div className="flex justify-end mt-8">
                <Button className="bg-maroon-100 border-none p-5 rounded-lg">
                    Reset Password
                </Button>
            </div>
        </div>
    );
}
