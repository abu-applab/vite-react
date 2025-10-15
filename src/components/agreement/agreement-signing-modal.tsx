import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

const AgreementSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-6 mb-6 px-4">
            <div className="bg-green-700 p-4 rounded-full mb-4">
                <Check className="text-white w-8 h-8" strokeWidth={5}  />
            </div>
            <h2 className="text-xl font-semibold">
                Agreement Signed Successfully
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
                Your signature has been applied to <span className="font-medium text-black">#AG-LP-203587-000009921-1</span>
            </p>
            <Button
                className="mt-8 bg-[#800020] hover:bg-[#66001A] text-white px-8 py-2 rounded-lg"
            >
                Continue
            </Button>
        </div>
    )
}

export default function SigningAgreementModal({ open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (open) {
            setLoading(true)
            const timer = setTimeout(() => {
                setLoading(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent showCloseButton={false} className="sm:max-w-xl p-0 rounded-xl">
                <DialogHeader className="flex flex-row py-2 px-4 justify-between items-center border-b border-gray-300">
                    <DialogTitle className="text-sm font-medium">
                        Signing Agreement
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(false)}
                        className="rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-6 px-4 py-6 mb-6">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                        <div className="text-center">
                            <h2 className="text-lg font-medium">Authentication In Progress</h2>
                            <p className="text-xs text-muted-foreground mt-2">
                                Please wait while we confirm your identity with the e-signature provider.
                                <br />
                                This ensures your agreement is securely and legally signed.
                            </p>
                        </div>
                    </div>
                ) : (
                    <AgreementSuccess />
                )}
            </DialogContent>
        </Dialog>
    )
}
