import { X } from "lucide-react"
import { Button } from "../../ui/button"
import successfull from "../../../assets/images/success.svg"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"

interface NewServiceRequestModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onGoToRequest: () => void
    referenceNumber?: string
}


export function RequestSubmittedModal({ open, onOpenChange, onGoToRequest, referenceNumber = '1223' }: NewServiceRequestModalProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-[600px] overflow-y-auto p-0 gap-0" showCloseButton={false}>
                <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium text-foreground">
                        Request Submitted.
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="flex flex-col items-center justify-start min-h-[318px] gap-6 px-6 pt-6">
                    <img src={successfull} className="w-[80px] h-[80px]" alt="successfull" />

                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-black">Request Submitted Successfully</h1>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            We have received your request and it is being processed. Your reference number is{" "}
                            <span className="font-medium">{referenceNumber}</span>.
                        </p>
                    </div>

                    <Button
                        className="bg-maroon-100 hover:bg-[#7A1F2B] text-white px-4 py-2 rounded-md text-sm leading-5 font-medium"
                        onClick={onGoToRequest}
                    >
                    My Request
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}