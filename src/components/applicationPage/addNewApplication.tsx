import { getApplicationFormConfig, TotalCalculationMap } from "@/lib/form-data"
import { Card } from "../ui/card"
import FormSteps from "../addCompany/formSteps"
import Instruction from "./instruction"
import DynamicForm from "../dynamic-form"
import { useEffect, useRef, useState } from "react"
import { newApplicationPlots } from "@/constants"
import FormSubmitted from "../formSubmitted"
import { useApp } from "@/context/AppContext"
import useNetworkRequest from "@/api/useNetworkRequest"
import { API_ENDPOINTS } from "@/api/apiEndpoints"
import { useApplicationConfigLoader } from "@/hooks/useApplicationConfigLoader"
import { validateForm } from "./validate"
import { RequestSubmittedModal } from "../service/createNewRequest/request-submitted-modal"
import { parseApiError } from "@/lib/utils"
import Loader from "../loader"

interface Step {
  title: string
  completed: boolean
  active: boolean
  stepNumber: string
}

interface AddNewApplicationProps {
  selectedApplication: string
  setSelectedApplication: (value: string) => void
  setCreateNewApplication: any
  setStep: any
}

const AddNewApplication = ({ selectedApplication, setSelectedApplication, setCreateNewApplication, setStep }: AddNewApplicationProps) => {

  const networkRequest = useNetworkRequest()
  const { loadApplicationConfig } = useApplicationConfigLoader();
  const { setCreateNewForm, setSelectedInvestment, selectedCompany, contactId, selectedInvestment } = useApp();
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})

  const [config, setConfig] = useState<any>(getApplicationFormConfig(selectedApplication))
  const [applicationSteps, setApplicationSteps] = useState<Step[]>([])
  const [formState, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
  const [referenceMessage, setReferenceMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaveApplication, setSaveApplication] = useState(false);

  useEffect(() => {
    const init = async () => {
      const cfg = await loadApplicationConfig(selectedApplication, setFormData);
      setConfig(cfg);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchISICCodes = async () => {
      const sectionId = formState?.ISICSection;

      // Only call when valid selection
      if (!sectionId) return;

      setConfig(() =>
        config.map((item: any) => ({
          ...item,
          sections: item.sections?.map((section: any) => ({
            ...section,
            fields: section.fields?.map((field: any) => {
              if (field.id === "ISICCode") {
                return { ...field, options: [{ id: "loading", name: "Fetching ISIC Codes...", disabled: true }] };
              }
              return field;
            }),
          })),
        }))
      );

      try {
        const response = await networkRequest(API_ENDPOINTS.getISICCodesBySectionId, {
          method: "GET",
          body: { sectionId: sectionId }
        })

        const isicCodes = response?.data || [];

        const isicCodeOptions = isicCodes.map((code: any) => ({
          id: code.id,
          name: code.descriptionEN,
        }));

        setConfig(() =>
          config.map((item: any) => ({
            ...item,
            sections: item.sections?.map((section: any) => ({
              ...section,
              fields: section.fields?.map((field: any) => {
                if (field.id === "ISICCode") {
                  return { ...field, options: isicCodeOptions };
                }
                return field;
              }),
            })),
          }))
        );


        // Optional: Reset ISICCode field value when section changes
        setFormData((prev: Record<string, any>) => ({
          ...prev,
          ISICCode: "",
        }));
      } catch (error) {
        console.error("Failed to fetch ISIC Codes:", error);
      }
    };

    fetchISICCodes();
  }, [formState?.ISICSection]);


  useEffect(() => {
    if (selectedApplication) {
      setApplicationSteps(
        newApplicationPlots[selectedApplication as keyof typeof newApplicationPlots] ?? []
      )
    }
  }, [selectedApplication])

  // handling this state to show whether it's for view or create new service 
  useEffect(() => {
    setCreateNewForm(true);
    return () => {
      setCreateNewForm(false);
      setSelectedInvestment(null)
    }
  }, [])

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [fieldId]: value };

      // Loop through all total calculation groups
      for (const [totalField, contributingFields] of Object.entries(TotalCalculationMap)) {
        // If the changed field belongs to one of these groups
        if (contributingFields.includes(fieldId)) {
          // Recalculate total dynamically
          const newTotal = contributingFields.reduce((sum, key) => {
            const num = Number(updated[key]) || 0;
            return sum + num;
          }, 0);

          updated[totalField] = newTotal;
        }
      }

      return updated;
    });

    // Clear error for the changed field
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };


  const goToNextStep = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    let newErrors: Record<string, string> = {};

    setApplicationSteps((prevSteps) => {
      const currentIndex = prevSteps.findIndex((s) => s.active);
      console.log('currentIndex: ', currentIndex);

      if (currentIndex === -1) return prevSteps;

      // ✅ Validate only if not on last step
      if (currentIndex < config?.length) {
        const stepConfig = config?.[currentIndex];

        newErrors = validateForm(stepConfig, formState)
        console.log('applicationSteps[currentIndex]: ', applicationSteps[currentIndex]);
        if(products.length <= 0 && applicationSteps[currentIndex].title === 'Company Details (1 of 2)') {
          console.log('here');
          newErrors.ProductsJson = "Field is required"
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return prevSteps; // ⛔ Stop step change
        }
      }

      // ✅ No errors — proceed to next step
      // Last step = Submit
      if (currentIndex === prevSteps.length - 1) {
        setIsFormSubmitted(true);
        return prevSteps;
      }

      return prevSteps.map((step, index) => {
        if (index === currentIndex) {
          return { ...step, active: false, completed: true };
        }
        if (index === currentIndex + 1) {
          return { ...step, active: true };
        }
        return step;
      });
    });
  };


  const goToPreviousStep = () => {
    if (applicationSteps[0].active) {
      setSelectedApplication("")
      setStep(0)
    } else {
      setApplicationSteps((prevSteps) => {
        const currentIndex = prevSteps.findIndex((s) => s.active)
        if (currentIndex <= 0) {
          setSelectedApplication("")
        }

        return prevSteps.map((step, index) => {
          if (index === currentIndex) {
            return { ...step, active: false }
          } else if (index === currentIndex - 1) {
            return { ...step, active: true, completed: false }
          }
          return step
        })
      })
    }
  }

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    const currentIndex = applicationSteps.findIndex((s: any) => s.active)
    console.log('currentIndex: ', currentIndex);
    const stepConfig = config?.[currentIndex];
    const newErrors = validateForm(stepConfig, formState, true);
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
    setSaveApplication(true);
    try {
      setIsLoading(true);
      const body = new FormData();
      body.append('Company', selectedCompany?.accountID ?? '');
      body.append('ContactPerson', contactId);
      body.append('ApplicationType', selectedInvestment?.applicationType ?? '');

      if (products.length > 0) body.append('ProductsJson',JSON.stringify(products));
      const excludedKeys = [
        "TotalCost",
        "TotalFunding",
        "TotalRequestedPlotSize",
      ];

      Object.entries(formState).forEach(([key, value]) => {
        if (!excludedKeys.includes(key)) {
          body.append(key, value instanceof File ? value : String(value ?? ""));
        }
      });
      let response;
      // ✅ If we already have an ID, update; otherwise create
      if (applicationId) {
        response = await networkRequest(`${API_ENDPOINTS.updateApplication}?id=${applicationId}`, {
          method: 'POST',
          body,
        });
      } else {
        response = await networkRequest(API_ENDPOINTS.createApplication, {
          method: 'POST',
          body,
        });
      }

      if (response?.success) {
        const newId = response?.data?.applicationId;
        if (newId && !applicationId) {
          setApplicationId(newId); // ✅ Save ID in state for future updates
        }
        console.log('Application saved successfully');
      } else {
        console.error(response?.message || 'Failed to save');
      }
      if (response.success) setReferenceMessage(response.message);
      setSubmittedModal(true);
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(parseApiError(error));
      setIsLoading(false);
      setSubmittedModal(true);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const currentIndex = applicationSteps.findIndex((s: any) => s.active)
    console.log('currentIndex: ', currentIndex);
    const stepConfig = config?.[currentIndex];
    let newErrors = validateForm(stepConfig, formState);
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
    setSaveApplication(false);
    try {
      setIsLoading(true);
      const body = new FormData();
      body.append('Company', selectedCompany?.accountID ?? '');
      body.append('ContactPerson', contactId);
      body.append('ApplicationType', selectedInvestment?.applicationType ?? '');
      const excludedKeys = [
        "TotalCost",
        "TotalFunding",
        "TotalRequestedPlotSize",
      ];

      Object.entries(formState).forEach(([key, value]) => {
        if (!excludedKeys.includes(key)) {
          body.append(key, value instanceof File ? value : String(value ?? ""));
        }
      });

      let appId = applicationId;
      let response;

      // ✅ First create or update (same logic as save)
      if (!appId) {
        response = await networkRequest(API_ENDPOINTS.createApplication, {
          method: 'POST',
          body,
        });
        if (response?.success) {
          appId = response?.data?.applicationId;
          setApplicationId(appId);
        } else {
          console.error('Failed to create the application');
          return;
        }
      } else {
        response = await networkRequest(`${API_ENDPOINTS.updateApplication}?id=${appId}`, {
          method: 'POST',
          body,
        });
        if (!response?.success) {
          console.error('Failed to update the application');
          return;
        }
      }

      // ✅ After create/update → Submit
      const submitResponse = await networkRequest(`${API_ENDPOINTS.submitApplication}?id=${appId}`, {
        method: 'POST',
      });
      if (submitResponse.success) setReferenceMessage(submitResponse.message);
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
    isSaveApplication ? handleSave() : handleSubmit();
  };


  const renderActiveStep = () => {
    const activeStep = applicationSteps.find((s) => s.active)
    if (!activeStep) return null

    const currentIndex = Number(activeStep.stepNumber) - 1
    const activeConfig = config?.[currentIndex]
    if (!activeConfig) return null

    if (activeConfig.key === "instruction") {
      return (
        <Instruction
          config={activeConfig}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          applicationSteps={applicationSteps}
        />
      )
    }

    return (
      <DynamicForm
        config={activeConfig}
        isCreateApplication
        goToNextStep={goToNextStep}
        handlePerviousButton={goToPreviousStep}
        formData={formState}
        errors={errors}
        setErrors={setErrors}
        handleInputChange={handleInputChange}
        fieldRefs={fieldRefs}
        handleSave={handleSave}
        products={products}
        setProducts={setProducts}
        isLastStepActive={isLastStepActive}
        handleSubmit={handleSubmit}
      />
    )
  }

  const isLastStepActive = applicationSteps[applicationSteps.length - 1]?.active === true;


  return (
    <div>{isFormSubmitted ?
      <FormSubmitted onGoToRequest={() => {
        setStep(0)
        setCreateNewApplication(false);
        setSelectedApplication("")
      }
      } /> :
      config?.length > 1 ? (
        <Card className="md:mt-[72px] mr-4 mb-4 w-full flex flex-col bg-[#fcfaf7] max-md:border-none max-md:shadow-none max-md:bg-[#F6F5EF] ">
          {config?.length > 1 && (
            <>
            <div className="max-md:hidden">
              <FormSteps steps={applicationSteps} />
              <div className="border-2 border-[#f6f5ef]" />
            </div>
            </>
          )}
          {renderActiveStep()}
        </Card>
      ) : (
        <DynamicForm
          config={config?.[0]}
          isCreateApplication
          goToNextStep={goToNextStep}
          handlePerviousButton={goToPreviousStep}
          formData={formState}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          fieldRefs={fieldRefs}
          isLastStepActive={isLastStepActive}
          handleSubmit={handleSubmit}
        />
      )}
      <RequestSubmittedModal
        open={isSubmittedModalOpen}
        onOpenChange={setSubmittedModal}
        onGoToRequest={() => {
          setStep(0)
          setSelectedInvestment(null)
          setCreateNewApplication(false)
        }
        }
        referenceMessage={referenceMessage}
        handleTryAgain={handleTryAgain}
        errorMessage={errorMessage}
        isSaveApplication={isSaveApplication}
      />
      {isLoading && <Loader />}
    </div>
  )
}

export default AddNewApplication
