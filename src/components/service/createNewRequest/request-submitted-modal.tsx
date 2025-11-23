import { X } from "lucide-react"
import { Button } from "../../ui/button"
import successfull from "../../../assets/images/success.svg"
import failed from "../../../assets/images/failed.svg"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { useTranslation } from "react-i18next"

interface RequestSubmittedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGoToRequest: () => void
  referenceMessage?: string
  handleTryAgain: () => void
  errorMessage?: string
  isSaveApplication?: boolean
  buttonText: string
  title: string
  heading: string
}

export function RequestSubmittedModal({
  open,
  onOpenChange,
  onGoToRequest,
  referenceMessage = "",
  handleTryAgain,
  errorMessage = "An unexpected error occurred.",
  isSaveApplication = false,
  buttonText = '',
  title = '',
  heading = ''
}: RequestSubmittedModalProps) {
  const {t} = useTranslation();
  const isSuccess = Boolean(referenceMessage)

  const handleClose = () => onOpenChange(false)

  const status = isSuccess
    ? {
        heading: isSaveApplication ? 'application_saved' : heading,
        icon: successfull,
        title: isSaveApplication ? "application_saved_as_draft" : title,
        subtitle: (
          <>
            <span className="">{`${' '} ${t(referenceMessage)}`}</span>
          </>
        ),
        buttonText: buttonText,
        buttonAction: onGoToRequest,
      }
    : {
        heading: 'request_failed',
        icon: failed,
        title: "not_completed",
        subtitle: errorMessage,
        buttonText: "try_again",
        buttonAction: handleTryAgain,
      }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[600px] overflow-y-auto p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium text-foreground">
            {t(status.heading)}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent cursor-pointer"
            onClick={(isSuccess && !isSaveApplication) ? onGoToRequest : handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col items-center justify-start min-h-[260px] gap-6 px-6 pt-4 pb-8">
          <img src={status.icon} alt="status" className="w-[80px] h-[80px]" />
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-black">{t(status.title)}</h1>
            <p className="text-sm text-zinc-500 leading-relaxed">{status.subtitle}</p>
          </div>
          <Button
            className="bg-[#862634] hover:bg-[#7A1F2B] text-white px-4 py-2 rounded-md text-sm leading-5 font-medium"
            onClick={status.buttonAction}
            type="button"
          >
            {t(status.buttonText)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
