import { useState, type Dispatch, type SetStateAction } from "react"
import { validateForm } from "./validation"
import useNetworkRequest from "@/api/useNetworkRequest"
import FormSubmitted from "@/components/formSubmitted"
import { getServiceFormConfig } from "@/lib/form-data"
import { serviceOptions } from "../serviceRequestPage/new-service-request-modal"
import { API_SERVICES_ENDPOINTS } from "@/api/apiEndpoints"
import DynamicForm from "@/components/dynamic-form"
import { RequestSubmittedModal } from "./request-submitted-modal"
import { useRef } from "react"

interface ServiceFormHandlerProps {
  selectedService: string
  setSelectedService: Dispatch<SetStateAction<string>>
  onBack: () => void
  onServiceAdded: (service: any) => void
}

export const ServiceFormHandler = ({ selectedService, onBack, onServiceAdded, setSelectedService }: ServiceFormHandlerProps) => {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false)

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})

  const networkRequest = useNetworkRequest();

  const handleInputChange = (fieldId: string, value: any) => {
    setFormState((prev) => ({ ...prev, [fieldId]: value }))
    setErrors((prev) => ({ ...prev, [fieldId]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm(selectedService, formState)
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorFieldId = Object.keys(newErrors)[0]
      const el = fieldRefs.current[firstErrorFieldId]
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
        el.focus({ preventScroll: true })
      }
      return
    }

    const apiConfig = (API_SERVICES_ENDPOINTS as Record<string, { url: string; method: string, contentType: string }>)[selectedService];
    let body: any = apiConfig.contentType === "multipart" ? new FormData() : formState

    if (body instanceof FormData) {
      Object.entries(formState).forEach(([k, v]) =>
        body.append(k, v instanceof File || v instanceof Blob ? v : String(v))
      )
    }

    const response = await networkRequest(apiConfig.url, { method: apiConfig.method as "POST", body })
    // const response = {
    //   id: '23-23-23',
    //   plotNumber: '28237',
    //   status: 'Approved'
    // }
    const serviceTitle = serviceOptions.find((s) => s.key === selectedService)?.title ?? "Unknown Service"

    onServiceAdded({
      id: response?.id || "TEMP-ID",
      plotNumber: response?.plotNumber || "Unknown",
      serviceType: serviceTitle,
      submittedDate: new Date().toLocaleDateString(),
      status: response?.status || "Pending",
    })

    setIsFormSubmitted(true)
  }

  return (
    <div>{
      isFormSubmitted ? (
        <FormSubmitted onGoToRequest={onBack} />
      ) : (
        <DynamicForm
          config={getServiceFormConfig(selectedService)}
          formData={formState}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handlePerviousButton={onBack}
          fieldRefs={fieldRefs}
        />
      )
    }
      <RequestSubmittedModal
        open={isSubmittedModalOpen}
        onOpenChange={setSubmittedModal}
        onGoToRequest={() => {setSelectedService('')}}
      />
    </div>
  )
}
