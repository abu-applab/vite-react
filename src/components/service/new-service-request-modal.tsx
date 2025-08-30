import { X } from "lucide-react"
import { Button } from "../ui/button"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"

interface NewServiceRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedService: any
  setSelectedService: any
}

export const serviceOptions = [
    {
      title: "Land Use Letter",
      key: "landUseLetter"
    },
    {
      title: "Rental Relationship",
      key: "rentalRelationship"
    },
    {
      title: "Change Activity",
      key: "changeActivity"
    },
    {
      title: "NOC Completion Certificate",
      key: "nocCompletionCertificate"
    },
    {
      title: "Land Transfer",
      key: "landTransfer",
    },
    {
      title: "Sublease",
      key: "sublease",
    },
    {
      title: "NOC Commerial License",
      key: "nocCommerialLicense",
    },
    {
      title: "PEO Letter",
      key: "peoLetter",
    },
    {
      title: "Certified Copy of Agreement",
      key:  "certifiedCopyofAgreement",
    },
    {
      title: "Demarcation Letter",
      key: "demarcationLetter"
    },
    {
      title: "To Whom It May Concern",
      key:  "toWhomItMayConcern",
    },
    {
      title: "Complaint",
      key: "complaint",
    },
    {
      title: "NOC Building Permit",
      key:  "nocBuildingPermit",
    },
    {
      title: "NOC CTO/Renew",
      key: "nocCTORenew",
    },
    {
      title: "NOC Environmental Certificate Permit",
      key:  "nocEnvironmentalCertificatePermit",
    },
    {
      title: "Technical Queries",
      key: "technicalQueries",
    },
    {
      title: "Kharama",
      key:  "kharama",
    },
  ]


export function NewServiceRequestModal({ open, onOpenChange, selectedService, setSelectedService }: NewServiceRequestModalProps) {

  const handleDone = () => {
    if (selectedService) {
      console.log("Selected service:", selectedService)
      // Handle the selected service here
      onOpenChange(false)
    //   setSelectedService("")
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    setSelectedService("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium text-foreground">
            Select the type of service you want to request.
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
          <RadioGroup value={selectedService} onValueChange={setSelectedService}>
            <div className="space-y-3">
              {serviceOptions.map(({key, title}) => (
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
            disabled={!selectedService}
            className="px-6 bg-[#862634] hover:bg-[#7A1F2B] text-white"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}