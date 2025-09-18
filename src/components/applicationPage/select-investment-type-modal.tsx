import { X } from "lucide-react"
import { Button } from "../ui/button"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { serviceOptions } from "@/constants"

interface SelectInvestmentTypeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedApplication: any
    setSelectedApplication: any
}


export function SelectInvestmentTypeModal({ open, onOpenChange, selectedApplication, setSelectedApplication }: SelectInvestmentTypeModalProps) {

    const handleDone = () => {
        if (selectedApplication) {
            console.log("Selected service:", selectedApplication)
            // Handle the selected service here
            onOpenChange(false)
            //   setSelectedService("")
        }
    }

    const handleCancel = () => {
        onOpenChange(false)
        setSelectedApplication("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto p-0 gap-0" showCloseButton={false}>
                <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium text-foreground">
                        What kind of investment are you looking for?
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

                <div className="px-5 py-3">
                    <RadioGroup value={selectedApplication} onValueChange={setSelectedApplication}>
                        <div className="space-y-3">
                            {serviceOptions.map(({ key, title }) => (
                                <div key={key} className="flex items-center space-x-3">
                                    <RadioGroupItem value={key} id={key} className="border-border text-primary" />
                                    <Label htmlFor={key} className="text-sm font-normal text-foreground cursor-pointer flex-1">
                                        {title}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>

                <div className="flex justify-between space-x-3 px-5 py-3 border-t border-border h-[56px]">
                    <Button variant="outline" onClick={handleCancel} className="px-6 bg-transparent">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDone}
                        disabled={!selectedApplication}
                        className="px-6 bg-maroon-100 hover:bg-[#7A1F2B] text-white"
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}