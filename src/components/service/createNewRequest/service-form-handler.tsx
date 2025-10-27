import { useState, type Dispatch, type SetStateAction } from "react"
import { validateForm } from "./validation"
import useNetworkRequest from "@/api/useNetworkRequest"
import { getServiceFormConfig } from "@/lib/form-data"
import { serviceOptions } from "../serviceRequestPage/new-service-request-modal"
import { API_SERVICES_ENDPOINTS } from "@/api/apiEndpoints"
import DynamicForm from "@/components/dynamic-form"
import { RequestSubmittedModal } from "./request-submitted-modal"
import { useRef } from "react"
import Loader from "@/components/loader"

interface ServiceFormHandlerProps {
  selectedService: string
  setSelectedService: Dispatch<SetStateAction<string>>
  onBack: () => void
  onServiceAdded: (service: any) => void
}

type ApiConfig =
  | { url: string; method: string; contentType: string; urls?: never }
  | { urls: string[]; method: string; contentType: string; url?: never };

export const ServiceFormHandler = ({ selectedService, onBack, onServiceAdded, setSelectedService }: ServiceFormHandlerProps) => {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false)
  const [referenceNumber, setReferenecMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})

  const networkRequest = useNetworkRequest();

  const handleInputChange = (fieldId: string, value: any) => {
    setFormState((prev) => ({ ...prev, [fieldId]: value }))
    setErrors((prev) => ({ ...prev, [fieldId]: "" }))
  }

  const submitUpdateCompanyInformation = async (formState: any, urls: string[]) => {
    try {
      // --- 1️⃣ First API: createBasicCompanyUpdateRequest (JSON) ---
      const firstBody = {
        agreement: formState.Agreement,
        plot: formState.Plot,
        company: "314cd4d3-097c-ef11-ac20-000d3a246e53",
        contactPerson: "d7323f05-356d-f011-b4cc-6045bd9e8ac7",
      };
  
      const firstResponse = await networkRequest(
       urls[0],
        {
          method: "POST",
          body: firstBody,
        }
      );
  
      if (!firstResponse?.success) {
        throw new Error("Failed to create company update request");
      }
  
      const updateRequestId = firstResponse?.data?.companyUpdateRequestId;
      if (!updateRequestId) throw new Error("Missing updateRequestId from response");
  
      // --- 2️⃣ Second API: updateCompanyUpdateRequestDetails (multipart/form-data) ---
      const secondBody = new FormData();
      secondBody.append("RequiredUpdate", formState.RequiredUpdate);
      secondBody.append("UpdateRequestId", updateRequestId);
      secondBody.append("NewCompanyNameEn", formState.NewCompanyNameEn || "");
      secondBody.append("NewCompanyNameAr", formState.NewCompanyNameAr || "");
      secondBody.append("NewSignatory", formState.NewSignatory || "");
      secondBody.append("Comment", formState.Comment || "");
      secondBody.append("Company", "314cd4d3-097c-ef11-ac20-000d3a246e53");
      secondBody.append("ContactPerson", "d7323f05-356d-f011-b4cc-6045bd9e8ac7");
  
      // Optional file attachments
      if (formState.NewCRCopy) {
        secondBody.append("NewCRCopy", formState.NewCRCopy);
      }
      if (formState.NOCToWhomItMayConcern) {
        secondBody.append("NOCToWhomItMayConcern", formState.NOCToWhomItMayConcern);
      }
  
      const secondResponse = await networkRequest(
       urls[1],
        {
          method: "POST",
          body: secondBody,
        }
      );
  
      if (!secondResponse?.success) {
        throw new Error("Failed to update company details");
      }
  
      const refNumber = Object.keys(secondResponse.data).find((k) =>
        k.toLowerCase().endsWith("referenceid")
      );
      setReferenecMessage(refNumber ?? "");
  
      const serviceTitle =
        serviceOptions.find((s) => s.key === "updateCompanyInformation")?.title ??
        "Update Company Information";
  
      onServiceAdded({
        id: Object.values(secondResponse.data)[0] || "TEMP-ID",
        plotNumber: Object.values(secondResponse.data)[0] || "Unknown",
        serviceType: serviceTitle,
        submittedDate: new Date().toLocaleDateString(),
        status: "Pending",
      });
    } catch (error) {
      console.error("Error in submitUpdateCompanyInformation:", error);
      throw error;
    }
  };
  

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    try {

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

      setIsLoading(true);
      
      const apiConfig = (API_SERVICES_ENDPOINTS as Record<string, ApiConfig>)[selectedService];
      console.log('API_SERVICES_ENDPOINTS: ', API_SERVICES_ENDPOINTS);
      console.log('apiConfig: ', apiConfig);

      if (selectedService === "updateCompanyInformation" && apiConfig.urls) {
        await submitUpdateCompanyInformation(formState, apiConfig.urls);
        setIsLoading(false);
        setSubmittedModal(true);
        return;
      }
  
      
      let body: any;
      
      if (apiConfig.contentType === "multipart") {
        body = new FormData();
      
        // append all form fields
        Object.entries(formState).forEach(([k, v]) => {
          body.append(k, v instanceof File || v instanceof Blob ? v : String(v));
        });
      
        // append extra fields
        body.append("Company", "314cd4d3-097c-ef11-ac20-000d3a246e53");
        body.append("ContactPerson", "d7323f05-356d-f011-b4cc-6045bd9e8ac7");
      } else {
        // JSON case
        body = {
          ...formState,
          company: "314cd4d3-097c-ef11-ac20-000d3a246e53",
          contactPerson: "d7323f05-356d-f011-b4cc-6045bd9e8ac7",
        };
      }
      
      const response = await networkRequest(apiConfig.url!, { method: apiConfig.method as "POST", body })
      
      const serviceTitle = serviceOptions.find((s) => s.key === selectedService)?.title ?? "Unknown Service"
  
      onServiceAdded({
        id: Object.values(response.data)[0]|| "TEMP-ID",
        plotNumber: Object.values(response.data)[0] || "Unknown",
        serviceType: serviceTitle,
        submittedDate: new Date().toLocaleDateString(),
        status: "Pending",
      })
      if(response.success) {
        const refKey = Object.keys(response.data).find(k =>
          k.toLowerCase().endsWith("referenceid")
        );
        const refValue = refKey ? response.data[refKey] : "";
        setReferenecMessage(refValue ?? '')
      }

      setIsLoading(false);
      setSubmittedModal(true)
    } catch (error: any) {
      console.log("error:", error);
    
      let message = "An unexpected error occurred.";
    
      if (error?.data?.Message) {
        console.log('ehehhe', error?.data);
        message = error.data.Message;
      } else if (error instanceof Error) {
        console.log('error: ', error);
        console.log(' here 2');
        message = error.message;
      } else if (typeof error === "string") {
       console.log('its coming here 3');
        message = error;
      }
    
      setErrorMessage(message);
      setIsLoading(false);
      setSubmittedModal(true);
    }
    
  }

  const handelTryAgain = () => {
    setSubmittedModal(false)
    handleSubmit()
  }

  return (
    <div className="">
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
      <RequestSubmittedModal
        open={isSubmittedModalOpen}
        onOpenChange={setSubmittedModal}
        onGoToRequest={() => { setSelectedService('') }}
        referenceNumber={referenceNumber}
        handleTryAgain={handelTryAgain}
        errorMessage={errorMessage}
      />
      {isLoading && <Loader />}
    </div>
  )
}
