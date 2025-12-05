import { Button } from "./ui/button"
import successfull from "../assets/images/successfull.svg"

interface FormSubmittedProps {
  onGoToRequest: () => void
  referenceNumber?: string
}

const FormSubmitted = ({ onGoToRequest, referenceNumber = "SR-2025-000123" }: FormSubmittedProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] gap-6">
      <img src={successfull} className="w-[100px] h-[100px]" alt="successfull" />

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-black">Request Submitted Successfully</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          We have received your request and it is being processed. Your reference number is{" "}
          <span className="font-medium">{referenceNumber}</span>.
        </p>
      </div>

      <Button
        className="bg-maroon-100 hover:bg-[#7A1F2B] text-white px-6 py-2 rounded-md text-sm font-medium cursor-pointer"
        onClick={onGoToRequest}
      >
        Go to My Request
      </Button>
    </div>
  )
}

export default FormSubmitted
