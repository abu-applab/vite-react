import React, { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export type PasswordInputProps = {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showError?: boolean;
    icon?: React.ReactNode;
    hideIcon?: boolean;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    showError = false,
    icon = <KeyRound className="w-4 h-4 text-gray-400" />,
    hideIcon = false,
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            {!hideIcon && icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {icon}
                </div>
            )}
            <Input
                name={name}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={cn(
                    "text-sm pr-10",
                    (!hideIcon && icon) ? "pl-10" : "pl-3",
                    { "ring-1 ring-red-500": showError },
                )}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                onClick={() => setShow((prev) => !prev)}
            >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
    );
};

export default PasswordInput;