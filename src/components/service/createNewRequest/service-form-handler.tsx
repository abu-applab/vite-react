import { useState, useRef, type Dispatch, type SetStateAction, useEffect } from "react";
import { validateForm } from "./validation";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_SERVICES_ENDPOINTS } from "@/api/apiEndpoints";
import DynamicForm from "@/components/dynamic-form";
import { RequestSubmittedModal } from "./request-submitted-modal";
import Loader from "@/components/loader";
import { serviceOptions } from "../serviceRequestPage/new-service-request-modal";
import { extractReferenceNumber, parseApiError, prepareRequestBody, submitUpdateCompanyInformation, useFormConfigLoader } from "@/lib/utils";
import { getServiceFormConfig } from "@/lib/form-data";
import { useApp, type CompanyType } from "@/context/AppContext";

interface ServiceFormHandlerProps {
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  onServiceAdded: (service: any) => void;
}

type ApiConfig =
  | { url: string; method: string; contentType: string; urls?: never }
  | { urls: string[]; method: string; contentType: string; url?: never };

export const ServiceFormHandler = ({
  selectedService,
  onBack,
  onServiceAdded,
  setSelectedService,
}: ServiceFormHandlerProps) => {
  const [config, setConfig] = useState<any>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
  const [referenceNumber, setReferenceMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const { loadServiceForm } = useFormConfigLoader()
  const networkRequest = useNetworkRequest();
  const { selectedCompany, setSelectedCompany, companies } = useApp();

  useEffect(() => {
    const loadFormConfig = async () => {
      const initialValues: Record<string, any> = {};
      let baseConfig = getServiceFormConfig(selectedService)
      const companiesOptions = companies.map((company) => ({id: company.accountID, name: company.englishName}))
      baseConfig = {
        ...baseConfig,
        sections: baseConfig.sections.map((section: any) => ({
          ...section,
          fields: section.fields.map((field: any) => {
            if (field.id.toLowerCase() === "company") {
              initialValues[field.id] = selectedCompany?.accountID ?? "";
              return { ...field, options: companiesOptions };
            }
            if (field.id.toLowerCase() === "plot") {
              initialValues[field.id] = "";
              return { ...field, options: [{ id: "loading", name: "Fetching plots...", disabled: true }] };
            }
            if (field.id.toLowerCase() === "agreement") {
              initialValues[field.id] = "";
            }
            return field;
          }),
        })),
      };
      setFormState((prev) => ({
        ...prev,
        ...initialValues
      }));
      setConfig(baseConfig)
      try {
        const finalConfig = await loadServiceForm(baseConfig)
        setConfig(finalConfig)
      }
      catch (error) {
        console.log('error: ', error);
        setErrorMessage(parseApiError(error));
        setSubmittedModal(true);
      }
    }
    loadFormConfig()
  }, [selectedService, selectedCompany])

  const handleInputChange = (fieldId: string, value: any) => {
    if(fieldId.toLowerCase() === 'company') {
       const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
        selectedValue && setSelectedCompany(selectedValue)
    }
    setFormState((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const newErrors = validateForm(selectedService, formState);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        const firstErrorFieldId = Object.keys(newErrors)[0];
        const el = fieldRefs.current[firstErrorFieldId];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus({ preventScroll: true });
        }
        return;
      }

      setIsLoading(true);
      const apiConfig = (API_SERVICES_ENDPOINTS as Record<string, ApiConfig>)[selectedService];

      if (selectedService === "updateCompanyInformation" && apiConfig.urls) {
        await submitUpdateCompanyInformation({
          formState,
          urls: apiConfig.urls,
          networkRequest,
          onServiceAdded,
          setReferenceMessage,
        });
        setSubmittedModal(true);
        setIsLoading(false);
        return;
      }

      const body = prepareRequestBody(formState, apiConfig.contentType);
      const response = await networkRequest(apiConfig.url!, {
        method: apiConfig.method as "POST",
        body,
      });

      const serviceTitle =
        serviceOptions.find((s) => s.key === selectedService)?.title ?? "Unknown Service";

      onServiceAdded({
        id: Object.values(response.data)[0] || "TEMP-ID",
        plotNumber: Object.values(response.data)[0] || "Unknown",
        serviceType: serviceTitle,
        submittedDate: new Date().toLocaleDateString(),
        status: "Pending",
      });

      if (response.success) setReferenceMessage(extractReferenceNumber(response.data));

      setSubmittedModal(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(parseApiError(error));
      setIsLoading(false);
      setSubmittedModal(true);
    }
  };

  const handleTryAgain = () => {
    setSubmittedModal(false);
    handleSubmit();
  };

  // if (!config && isLoading) return <Loader />;

  return (
    <div>
        <DynamicForm
          config={config}
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
        onGoToRequest={() => setSelectedService("")}
        referenceNumber={referenceNumber}
        handleTryAgain={handleTryAgain}
        errorMessage={errorMessage}
        isConfigLoaded={!!config}
      />
      {isLoading && <Loader />}
    </div>
  );
};
