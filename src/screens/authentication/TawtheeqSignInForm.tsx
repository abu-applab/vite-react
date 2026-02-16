import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, Eye, EyeOff, CreditCard, LoaderCircle } from "lucide-react"
import AuthError from "../../components/authForm/AuthError"
import tawtheeqLogo from '../../assets/images/tawtheeq-logo1.svg'


interface error {
    userName?: string
    password?: string
}

export default function TawtheeqSignInForm() {
    const [form, setForm] = useState({
        userName: "",
        password: "",
        remember: true,
    })
    const [apiError, setApiError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<error>({})
    const [loading, setLoading] = useState(false)

    // handle change
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }))
        if (apiError) setApiError(false)
    }


    // checkbox change
    const handleCheckbox = (checked: boolean) => {
        setForm((prev) => ({ ...prev, remember: checked }))
    }

    // simple validation
    const validate = () => {
        let newErrors: any = {}

        if (!form.userName.trim()) newErrors.userName = "User Name is required"
        if (!form.password.trim()) newErrors.password = "Password is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // submit
    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!validate()) return

        setLoading(true)

        setTimeout(() => {
            const validUser = "Test@123"
            const validPassword = "12345"

            if (form.userName === validUser && form.password === validPassword) {
                console.log("LOGIN SUCCESS", form)
                setApiError(false)
            } else {
                setApiError(true)
            }

            setLoading(false)
        }, 1200) // simulate api delay
    }


    if (apiError) {
        return (
            <div className='flex flex-col items-center justify-center'>
                <AuthError onRetry={() => setApiError(false)} />
            </div>
        )
    }


    return (
        <div >
            <h1 className="text-2xl leading-8 tracking-normal text-center font-semibold text-gray-900 mb-2">Welcome to Manateq Partners Portal </h1>
            <div className='flex flex-col items-center justify-center gap-1'>
                <p className="font-normal text-base tracking-normal text-center align-middle text-[#5C5A5B]">
                    Please sign in with
                </p>
                <img src={tawtheeqLogo} alt='' className='w-24 h-8' />
            </div>
            <div className="w-[400px] mx-auto space-y-6 mt-8">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* User Name */}
                    <div className="space-y-2">
                        <Label className="text-neutral-900 font-semibold text-base leading-6 tracking-normal align-middle">QID/Username</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="userName"
                                //   placeholder="hello@user112233@gmail.com"
                                value={form.userName}
                                onChange={handleChange}
                                className="pl-9"
                            />
                        </div>
                        {errors.userName && (
                            <p className="text-sm text-red-500">{errors.userName}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label className="text-neutral-900 font-semibold text-base leading-6 tracking-normal align-middle">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                className="pl-9 pr-10"
                            />

                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-0.5 text-muted-foreground bg-transparent hover:bg-transparent flex justify-center items-center"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={form.remember}
                                onCheckedChange={handleCheckbox}
                                id="remember"
                            />
                            <Label htmlFor="remember" className="cursor-pointer">
                                Keep me logged in
                            </Label>
                        </div>

                        <Button
                            className="text-muted-foreground hover:text-primary"
                            variant="ghost"
                        >
                            Forgot password?
                        </Button>
                    </div>

                    {/* Sign In */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-xl cursor-pointer h-11 disabled:opacity-100 mb-3 hover:opacity-90 ${loading
                                ? "bg-[#E6D3D6] cursor-not-allowed"
                                : "bg-maroon-200 hover:bg-maroon-200"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2 text-maroon-200">
                                <LoaderCircle className="animate-spin" size={18} />
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </Button>


                    {/* Sign up */}
                    <p className="text-center text-sm text-muted-foreground">
                        Don’t have an account?{" "}
                        <span className="text-rose-800 font-medium cursor-pointer">
                            Sign Up
                        </span>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                            Or sign in with
                        </span>
                        <Separator className="flex-1" />
                    </div>

                    {/* Smart Card */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center gap-2"
                    >
                        <CreditCard size={16} />
                        Smart Card
                    </Button>

                </form>
            </div>
        </div>
    )
}
