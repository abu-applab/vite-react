import { useState, useRef, type Dispatch, type SetStateAction, useEffect, useMemo } from "react";
import { validateForm } from "./validation";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_SERVICES_ENDPOINTS } from "@/api/apiEndpoints";
import DynamicForm from "@/components/dynamic-form";
import { RequestSubmittedModal } from "./requestSubmittedModal";
import Loader from "@/components/loader";
import { createCompanyUpdateRequest, parseApiError, prepareRequestBody, submitUpdateCompanyInformation } from "@/lib/utils";
import { getServiceFormConfig } from "@/lib/form-data";
import { useApp, type CompanyType } from "@/context/AppContext";
import { useServiceFormConfigLoader } from "@/hooks/useServiceConfigLoader";
import { useTranslation } from "react-i18next";
import { ConfirmationModal } from "@/components/confirmationModal";
import { useParams } from "react-router-dom";

interface ServiceFormHandlerProps {
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  serviceDetails: any;
}

type ApiConfig =
  | { url: string; method: string; contentType: string; urls?: never }
  | { urls: string[]; method: string; contentType: string; url?: never };

export const ServiceFormHandler = ({
  selectedService,
  onBack,
  setSelectedService,
  serviceDetails,
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
  const { selectedCompany, setSelectedCompany, companies, contact } = useApp();
  const [formStage, setFormStage] = useState(1);
  const { t } = useTranslation();
  const [isConfirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const { id } = useParams();
  const isNext = useMemo(() => {
    return selectedService === "updateCompanyInformation" && formStage === 1;
  }, [selectedService, formStage]);

  useEffect(() => {
    if (serviceDetails && id) {
      const baseDetails = serviceDetails.details ?? serviceDetails;

      // Map attached documents (if any) into their corresponding file fields
      const docs = serviceDetails.documents?.documents ?? [];

      const mapDoc = (doc: any) => ({
        fileUrl: doc.fileUrl,
        fileName: doc.fileName,
        createdOn: doc.createdOn,
      });

      const mappedFiles: Record<string, any> = {};

      if (docs.length > 0) {
        // Special case: Company Details Update keeps CR and NOC in a fixed order
        if (selectedService === "SR-Company Details Update" || selectedService === "updateCompanyInformation") {
          if (docs[0]) mappedFiles.NewCRCopy = mapDoc(docs[0]);
          if (docs[1]) mappedFiles.NOCToWhomItMayConcern = mapDoc(docs[1]);
        } else {
          // Generic case: map docs to required_documents file fields in order
          const viewConfig = getServiceFormConfig(selectedService);
          const docSection = viewConfig.sections.find((s: any) => s.title === "required_documents");
          const fileFields = docSection?.fields?.filter((f: any) => f.type === "file") ?? [];

          fileFields.forEach((field: any, index: number) => {
            const doc = docs[index];
            if (doc) {
              mappedFiles[field.id] = mapDoc(doc);
            }
          });

          // Fallback: if there is only one doc and a LetterAttachment field, map it there too
          if (docs[0] && fileFields.some((f: any) => f.id === "LetterAttachment")) {
            mappedFiles.LetterAttachment = mapDoc(docs[0]);
          }
        }
      }

      setFormState({
        ...baseDetails,
        ...mappedFiles,
      })
    }
    return () => {
      setFormState({});
    };
  }, [serviceDetails, selectedService, id])

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

            // For any detail view, hide LetterAttachment when there are no documents in the response
            // if (field.id === "LetterAttachment") {
            //   const docs = serviceDetails?.documents?.documents ?? [];
            //   if (docs.length === 0) {
            //     return { ...field, hidden: true };
            //   }
            // }
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
  }, [selectedService, selectedCompany, serviceDetails])

  useEffect(() => {
    if (formStage === 2) {
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

  const handlePreSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const newErrors = validateForm(selectedService, formState, t);
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
    setConfirmSubmitOpen(true)
  }


  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const newErrors = validateForm(selectedService, formState, t);
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
          contactId: contact?.id ?? ''
        });
        setSubmittedModal(true);
        setIsLoading(false);
        return;
      }

      const body = prepareRequestBody(formState, apiConfig.contentType, contact?.id ?? '');
      const response = await networkRequest(apiConfig.url!, {
        method: apiConfig.method as "POST",
        body,
      });

      if (response.success) setReferenceMessage(response.message);

      setSubmittedModal(true);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(parseApiError(error));
      setIsLoading(false);
      setSubmittedModal(true);
    }
  };

  const handleTryAgain = () => {
    setSubmittedModal(false);
    if(isNext) {
      handleNext();
    } else {
      handleSubmit();
    }
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
    let newErrors = {};
    if (!formState?.plot) {
      newErrors = {
        plot: 'Plot is required',
        agreement: 'Agreement is required'
      }
    }
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
    try {
      const updateRequestId = await createCompanyUpdateRequest({
        formState,
        networkRequest,
        contactId: contact?.id ?? ''
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

              const alwaysDisableFields = ["company", "plot"]; // 👈 add your fixed fields here

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
      setErrorMessage(parseApiError(err));
      setIsLoading(false);
      setSubmittedModal(true);
    }
  };

  const executeSubmit = async () => {
    setConfirmSubmitOpen(false);
    await handleSubmit();
  };

  return (
    <div>
      <DynamicForm
        config={config}
        formData={formState}
        errors={errors}
        setErrors={setErrors}
        handleInputChange={handleInputChange}
        handleSubmit={() => handlePreSubmit()}
        handlePerviousButton={formStage === 2 ? handleCompanyUpdateBack : onBack}
        fieldRefs={fieldRefs}
        isNext={isNext}
        goToNextStep={handleNext}
        isSubmittedApplication={!!id}
      />
      <RequestSubmittedModal
        open={isSubmittedModalOpen}
        onOpenChange={setSubmittedModal}
        onGoToRequest={() => setSelectedService("")}
        referenceMessage={referenceMessage}
        handleTryAgain={handleTryAgain}
        errorMessage={errorMessage}
        buttonText="view_my_requests"
        title="request_submitted_successfully"
        heading="request_submitted"
      />
      <ConfirmationModal
        open={isConfirmSubmitOpen}
        onOpenChange={setConfirmSubmitOpen}
        onConfirm={executeSubmit}
        description="confirmation_request_desc"
      />
      {isLoading && <Loader />}
    </div>
  );
};
