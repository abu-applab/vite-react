import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { useTranslation } from "react-i18next"

interface ConfirmationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description: string
    subTitle?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
}

export function ConfirmationModal({
    open,
    onOpenChange,
    title = "confirmation",
    subTitle= 'confirm_submission',
    description,
    confirmText = "submit",
    cancelText = "cancel",
    onConfirm,
}: ConfirmationModalProps) {
    const { t } = useTranslation();
    const handleClose = () => onOpenChange(false)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="min-w-[600px] overflow-y-auto p-0 gap-0"
                showCloseButton={false}
            >
                <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium text-foreground">
                        {t(title)}
                    </DialogTitle>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent cursor-pointer"
                        onClick={handleClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center px-6 py-6 gap-1">
                    <h4 className="text-xl font-semibold text-black ">{t(subTitle)}</h4>
                    <p className="text-sm text-center text-zinc-500 leading-relaxed">
                        {t(description)}
                    </p>

                    <div className="flex items-center gap-3 mt-6 mb-2">

                        <Button
                            variant="outline"
                            className="px-4 py-2 rounded-md text-sm leading-5 font-medium"
                            onClick={handleClose}
                            type="button"
                        >
                            {t(cancelText)}
                        </Button>

                        <Button
                            className="bg-[#862634] hover:bg-[#7A1F2B] text-white px-4 py-2 rounded-md text-sm leading-5 font-medium"
                            onClick={onConfirm}
                        >
                            {t(confirmText)}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
