import { useState, useRef, type Dispatch, type SetStateAction, useEffect } from "react";
import { validateForm } from "./validation";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_SERVICES_ENDPOINTS } from "@/api/apiEndpoints";
import DynamicForm from "@/components/dynamic-form";
import { RequestSubmittedModal } from "./request-submitted-modal";
import Loader from "@/components/loader";
import { createCompanyUpdateRequest, parseApiError, prepareRequestBody, submitUpdateCompanyInformation } from "@/lib/utils";
import { getServiceFormConfig } from "@/lib/form-data";
import { useApp, type CompanyType } from "@/context/AppContext";
import { useServiceFormConfigLoader } from "@/hooks/useServiceConfigLoader";

interface ServiceFormHandlerProps {
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  onBack: () => void;
}

type ApiConfig =
  | { url: string; method: string; contentType: string; urls?: never }
  | { urls: string[]; method: string; contentType: string; url?: never };

export const ServiceFormHandler = ({
  selectedService,
  onBack,
  setSelectedService,
}: ServiceFormHandlerProps) => {
  const [config, setConfig] = useState<any>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
  const [referenceMessage, setReferenceMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const { loadServicePlot, loadServiceSignatory } = useServiceFormConfigLoader()
  const networkRequest = useNetworkRequest();
  const { selectedCompany, setSelectedCompany, companies, contactId } = useApp();
  const [formStage, setFormStage] = useState(1);

  useEffect(() => {
    const loadFormConfig = async () => {
      const initialValues: Record<string, any> = {};
      let baseConfig = getServiceFormConfig(selectedService)
      const companiesOptions = companies.map((company) => ({ id: company.accountID, name: company.englishName }))
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

      if (selectedService === "updateCompanyInformation" && formStage === 1) {
        const firstSection = baseConfig.sections[0];

        baseConfig = {
          ...baseConfig,
          sections: [
            {
              ...firstSection,
              fields: firstSection?.fields?.filter((f: any) => f.showStage !== 2)
            }
          ]
        };
      }

      setFormState((prev) => ({
        ...prev,
        ...initialValues
      }));
      setConfig(baseConfig)
      try {
        const finalConfig = await loadServicePlot(baseConfig)
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

  useEffect(() => {
     if(formStage === 2) {
      const loadFormConfig = async () => {
        try {
          const finalConfig = await loadServiceSignatory(config)
          setConfig(finalConfig)
        }
        catch (error) {
          console.log('error: ', error);
          setErrorMessage(parseApiError(error));
          setSubmittedModal(true);
        }
      }
      loadFormConfig();
     }
     return;
  }, [formStage])

  const handleInputChange = (fieldId: string, value: any) => {
    if (fieldId.toLowerCase() === 'company') {
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
          setReferenceMessage,
          contactId
        });
        setSubmittedModal(true);
        setIsLoading(false);
        return;
      }

      const body = prepareRequestBody(formState, apiConfig.contentType, contactId);
      const response = await networkRequest(apiConfig.url!, {
        method: apiConfig.method as "POST",
        body,
      });

      if (response.success) setReferenceMessage(response.message);

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

  const handleCompanyUpdateBack = () => {
    if (selectedService === "updateCompanyInformation" && formStage === 2) {
      const firstSection = config.sections[0];
      const updatedSections = [
        {
          ...firstSection,
          fields: firstSection.fields
            ?.filter((f: any) => f.showStage !== 2)
            .map((f: any) => ({
              ...f,
              disabled:
              f.id === "Company" || f.id === "Plot"
                ? false                
                : f.disabled   
            }))
        }
      ];
      setConfig((prev: any) => ({
        ...prev,
        sections: updatedSections
      }));
  
      setFormStage(1);
    }
  };
  

  const handleNext = async (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (selectedService !== "updateCompanyInformation") return;
    setIsLoading(true);
    try {
      const updateRequestId = await createCompanyUpdateRequest({
        formState,
        networkRequest,
        contactId
      });
      setFormState(prev => ({
        ...prev,
        updateRequestId
      }));

      let baseConfig = getServiceFormConfig(selectedService);
      setConfig((prev: any) => ({
        ...prev,
        ...baseConfig,
        sections: baseConfig.sections.map((baseSection: any, i: number) => {
          const prevSection = prev.sections?.[i] ?? {};
      
          return {
            ...baseSection,
            ...prevSection,
            fields: baseSection.fields.map((baseField: any, j: number) => {
              const prevField = prevSection.fields?.[j] ?? {};
      
              const alwaysDisableFields = ["Company", "Plot"]; // 👈 add your fixed fields here
      
              const shouldDisable =
                baseField.showStage === 1 ||  
                alwaysDisableFields.includes(baseField.id) ||   // 👈 Match by field id/name
                prevField.disabled; // keep whatever was disabled before
      
              return {
                ...baseField,
                ...prevField,
                disabled: shouldDisable
              };
            })
          };
        })
      }));
      

      setFormStage(2);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };


  const isNext = selectedService === 'updateCompanyInformation' && formStage === 1
  return (
    <div>
      <DynamicForm
        config={config}
        formData={formState}
        errors={errors}
        setErrors={setErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handlePerviousButton={formStage === 2 ? handleCompanyUpdateBack : onBack}
        fieldRefs={fieldRefs}
        isNext={isNext}
        goToNextStep={handleNext}
      />
      <RequestSubmittedModal
        open={isSubmittedModalOpen}
        onOpenChange={setSubmittedModal}
        onGoToRequest={() => setSelectedService("")}
        referenceMessage={referenceMessage}
        handleTryAgain={handleTryAgain}
        errorMessage={errorMessage}
      />
      {isLoading && <Loader />}
    </div>
  );
};
