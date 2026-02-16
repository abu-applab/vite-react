import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MobileLogin() {
    const navigate = useNavigate()
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")


    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!validatePhone()) return

        navigate("/login/mobile/verify", { state: { phone } })
    }


    const validatePhone = () => {
        if (!phone.trim()) {
            setError("Mobile number is required")
            return false
        }

        if (!/^\d+$/.test(phone)) {
            setError("Only numbers are allowed")
            return false
        }

        if (phone.length !== 8) {
            setError("Mobile number must be 8 digits")
            return false
        }

        setError("")
        return true
    }

    const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["e", "E", "+", "-", "."].includes(e.key)) {
            e.preventDefault()
        }
    }


    return (
        <div className="w-[400px] text-center">
            <h1 className="text-2xl font-semibold mb-2">Verify your OTP</h1>

            <p className="text-muted-foreground mb-6">
                Enter your registered mobile number to receive a
                one-time password (OTP).
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="">
                    <Label className="mb-2">Enter Phone Number</Label>
                    <Input
                        placeholder="(974) 456 789"
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value
                            setPhone(value)

                            if (error) setError("")
                        }}
                        type="number"
                        onKeyDown={blockInvalidChar}
                    />
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>


                <Button className="w-full h-11 bg-maroon-200 hover:bg-maroon-200 rounded-2xl cursor-pointer mb-3 hover:opacity-90">
                    Send OTP
                </Button>

                <p className="text-sm text-center">
                    Use Tawtheeq instead?{" "}
                    <span
                        className="text-maroon-200 font-semibold cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Sign in with Tawtheeq
                    </span>
                </p>
            </form>
        </div>
    )
}
