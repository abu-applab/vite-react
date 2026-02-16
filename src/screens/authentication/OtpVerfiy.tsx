import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function OtpVerify() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [value, setValue] = useState("")
    const [verifying, setVerifying] = useState(false)

    const phone = state?.phone || "+974 XXXXXXXX"

    const handleVerify = async () => {
        if (value.length !== 6) return

        setVerifying(true)

        setTimeout(() => {
            console.log("OTP VERIFIED")
            setVerifying(false)
        }, 2000)
    }

    const isComplete = value.length === 6

    return (
        <div className="w-[400px] text-center">
            <h1 className="text-2xl font-semibold mb-2">Verify your OTP</h1>

            <p className="text-muted-foreground text-base mb-6">
                We’ve sent a 6-digit OTP to <span className="text-maroon-200">{phone}</span>.
            </p>

            <div className="text-left space-y-4">
                <Label>Enter OTP</Label>
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                    className=""
                >
                    <InputOTPGroup className="w-full justify-between gap-0">
                        {[...Array(6)].map((_, i) => (
                            <InputOTPSlot
                                key={i}
                                index={i}
                                className="h-12 w-full text-lg border focus-visible:ring-maroon-200"
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                <Button
                    disabled={!isComplete || verifying}
                    onClick={handleVerify}
                    className={cn(
                        "w-full h-11 mt-4 rounded-xl cursor-pointer disabled:opacity-100 mb-3",
                        {
                            "bg-neutral-500": !isComplete,
                            "bg-[#E6D3D6] cursor-not-allowed": verifying,
                            "bg-maroon-200 hover:bg-maroon-200 hover:opacity-90": isComplete && !verifying,
                        }
                    )}
                >
                    {verifying ?
                        <span className="flex items-center justify-center gap-2 text-maroon-200">
                            <LoaderCircle className="rotate" />
                            Verifying</span>
                        :
                        "Verify and Sign In"}
                </Button>

                <p className="text-sm text-center mt-2">
                    Use Tawtheeq instead?{" "}
                    <span
                        className="text-maroon-200 font-semibold cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Sign in with Tawtheeq
                    </span>
                </p>
            </div>
        </div>
    )
}
