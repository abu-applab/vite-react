import { X } from "lucide-react"
import { Button } from "../../ui/button"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Label } from "../../ui/label"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface NewServiceRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  setSelectedService: any
}

export const serviceOptions = [
    {
      title: "rental_relationship",
      key: "rentalRelationship"
    },
    {
      title: "certified_copy_of_agreement",
      key:  "certifiedCopyOfAgreement",
    },
    {
      title: "demarcation_letter",
      key: "demarcationLetter"
    },
    {
      title: "complaint",
      key: "complaint",
    },
    {
      title: "technical_queries",
      key: "technicalQueries",
    },
    {
      title: "kahramaa",
      key:  "kahramaa",
    },
    {
      title: "update_contact_details",
      key: "updateContactDetails",
    },
    {
      title: "update_company_information",
      key:  "updateCompanyInformation",
    },
  ]


export function NewServiceRequestModal({ open, onOpenChange, setSelectedService }: NewServiceRequestModalProps) {

  const [value, setValue] = useState('')
  const { t } = useTranslation();

  const handleDone = () => {
    if (value) {
      setValue('')
      setSelectedService(value)
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setValue('')
    onOpenChange(false)
    setSelectedService("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-md max-h-[80vh] overflow-y-auto p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium text-foreground text-left">
            {t('select_type_of_service')}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent cursor-pointer"
            onClick={() => handleCancel()}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="px-5 py-3">
          <RadioGroup value={value} onValueChange={setValue}>
            <div className="space-y-3">
              {serviceOptions.map(({key, title}) => (
                <div key={key} className="flex items-center space-x-3">
                  <RadioGroupItem value={key} id={key} className="border-border text-primary" />
                  <Label htmlFor={key} className="text-sm font-normal text-foreground cursor-pointer flex-1">
                    {t(title)}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between space-x-3 px-5 py-3 border-t border-border h-[56px]">
          <Button variant="outline" onClick={handleCancel} className="px-6 bg-transparent" type="button">
            {t('cancel')}
          </Button>
          <Button
            onClick={handleDone}
            disabled={!value}
            className="px-6 bg-maroon-100 hover:bg-[#7A1F2B] text-white cursor-pointer"
            type="button"
          >
            {t('done')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}