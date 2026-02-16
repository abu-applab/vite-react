import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface AuthErrorProps {
  onRetry: () => void
}

export default function AuthError({ onRetry }: AuthErrorProps) {
  const navigate = useNavigate()

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">

      <h2 className="font-semibold text-3xl leading-9 tracking-normal text-center text-maroon-200 mb-2">
        Authentication Error
      </h2>

      <p className="font-normal text-base leading-6 tracking-normal text-center text-foreground" >
        Tawtheeq sign-in is currently unavailable.
        <br />
        You can log in using mobile number & OTP, or try again.
      </p>

      <Button
        className="w-full h-11 rounded-xl mb-3 bg-maroon-200 hover:bg-maroon-200  hover:opacity-90 font-semibold text-base leading-6 tracking-normal align-middle"
        onClick={() => navigate("/login/mobile")}
      >
        Sign In using Phone Number
      </Button>
      <p className="text-sm text-center">
        Use Tawtheeq instead?{" "}
        <span
          className="text-maroon-200 font-semibold cursor-pointer"
          onClick={onRetry}
        >
          Sign in with Tawtheeq
        </span>
      </p>
    </div>
  )
}
