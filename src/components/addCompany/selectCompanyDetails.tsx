"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "./reviewComapanyDetails/formField"
import { SelectCompanyDetailsformFields } from "@/constants"
import { useTranslation } from "react-i18next"

interface SelectCompanyDetailsProps {
    goToNextStep: () => void
    goToPreviousStep: () => void
  }

function SelectCompanyDetails({goToNextStep, goToPreviousStep}: SelectCompanyDetailsProps) {
  // 🔹 Single formData object
  const [formData, setFormData] = useState({
    companyCategory: "",
    businessSector: "",
    operationType: "",
  })
  const { t } = useTranslation();

  // 🔹 Handle change for all fields
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 🔹 Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted Data:", formData)
    goToNextStep();

    // Example: validation
    // if (!formData.companyCategory || !formData.businessSector || !formData.operationType) {
    //   alert("Please fill in all required fields")
    //   return
    // }

    // alert("Form submitted successfully ✅")
  }

  return (
    <div className="flex-1 relative mx-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t('select_company_details')}</h1>
          <p className="text-gray-600">{t('select_company_details_desc')}</p>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {SelectCompanyDetailsformFields.map((field) => 
              { 
                if(field.id === 'other' && (formData['companyCategory'] !== 'Others')) {
                  return null
                }
                return (
                <FormField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  required={field.required}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(val: string) => handleChange(field.id, val)}
                  options={field.options}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              )
              }
            )}
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" className="bg-transparent" onClick={() => goToPreviousStep()}>
                {t('previous')}
              </Button>
              <Button type="submit" className="px-8 bg-maroon-100 hover:bg-[#60091A]" onClick={handleSubmit}>
                {t('next')}
              </Button>
            </div>
          </div>
        </form>
        </div>
      </div>
  )
}

export default SelectCompanyDetails;
