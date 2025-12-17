import { CircleAlert, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface AddCRNumberModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    handleCRNumber: () => void
    handleCancel: () => void
    handleValueChange: (val: string) => void
    error: string
    value: string
    apiMessage: string
    isSuccess: boolean
}

const AddCRNumberModal = ({
    open,
    onOpenChange,
    handleCRNumber,
    handleCancel,
    handleValueChange,
    error,
    value,
    apiMessage,
    isSuccess,
}: AddCRNumberModalProps) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="min-w-[550px] overflow-y-auto p-0 gap-0"
                showCloseButton={false}
                onInteractOutside={(e) => {
                    e.preventDefault();
                    handleCancel();
                }}    
            >
                <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium text-foreground">
                        {t('add_new_company')}
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent cursor-pointer"
                        onClick={handleCancel}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="flex flex-col px-6 pt-4 pb-8 gap-10">
                    {/* <img src={status.icon} alt="status" className="w-20 h-20" /> */}
                    <div className="flex flex-col gap-2">
                        <Label>{t('cr_number')}</Label>
                        <Input
                            type={"number"}
                            value={value}
                            onChange={(e) => { handleValueChange(e.target.value) }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {error && (
                            <p className="text-red-500 text-xs">{error}</p>
                        )}
                        {apiMessage && (
                            <div className={cn("flex text-red-500 flex-row items-center justify-start gap-1", {'text-green-500': isSuccess})}>
                                <CircleAlert className="h-4 w-4" />
                                <p className="text-xs">{apiMessage}</p>
                            </div>    
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between gap-2">
                        <Button variant="outline" onClick={handleCancel} className="px-6 bg-transparent cursor-pointer" type="button">
                            {t('cancel')}
                        </Button>
                        <Button
                            onClick={handleCRNumber}
                            className="px-6 bg-maroon-100 hover:bg-[#7A1F2B] text-white cursor-pointer"
                            type="button"
                        >
                            {t('next')}
                        </Button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddCRNumberModal