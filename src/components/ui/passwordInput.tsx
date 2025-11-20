import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export type PasswordInputProps = {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showError: boolean;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    showError,
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Input
                name={name}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={cn("text-sm pr-10", { "ring-1 ring-red-500": showError })}
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