import { getApplicationFormConfig, TotalCalculationMap } from "@/lib/form-data"
import { Card } from "../ui/card"
import FormSteps from "../addCompany/formSteps"
import Instruction from "./instruction"
import DynamicForm from "../dynamic-form"
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { newApplicationPlots } from "@/constants"
import FormSubmitted from "../formSubmitted"
import { useApp } from "@/context/AppContext"
import useNetworkRequest from "@/api/useNetworkRequest"
import { API_ENDPOINTS } from "@/api/apiEndpoints"
import { useApplicationConfigLoader } from "@/hooks/useApplicationConfigLoader"
import { validateForm } from "./validate"
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal"
import { calculateTotals, parseApiError, removeEmptyValues } from "@/lib/utils"
import Loader from "../loader"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import SubmittedFormSteps from "../submittedFormSteps"
import { useTranslation } from "react-i18next"
import { ConfirmationModal } from "../confirmationModal"

export interface Step {
  title: string
  completed: boolean
  active: boolean
  stepNumber: string
}

interface AddNewApplicationProps {
  selectedApplication: string
  setSelectedApplication: (value: string) => void
  setSelectedApplicationRef: Dispatch<SetStateAction<string>>
  setCreateNewApplication: any
  setStep: any
  breadCrumbNavigation: number
  setBreadCrumbNavigation: Dispatch<SetStateAction<number>>
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>
  showLeaveConfirm: boolean
  setShowLeaveConfirm: Dispatch<SetStateAction<boolean>>
}

const AddNewApplication = ({ selectedApplication,
  setSelectedApplication,
  setCreateNewApplication,
  setSelectedApplicationRef,
  setStep,
  breadCrumbNavigation,
  setBreadCrumbNavigation,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  showLeaveConfirm,
  setShowLeaveConfirm,
}: AddNewApplicationProps) => {

  const networkRequest = useNetworkRequest()
  const { loadApplicationConfig } = useApplicationConfigLoader();
  const { setCreateNewForm, setSelectedInvestment, selectedCompany, contact, selectedInvestment } = useApp();
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})
  const { id } = useParams();

  const [config, setConfig] = useState<any>(getApplicationFormConfig(selectedApplication))
  const [applicationSteps, setApplicationSteps] = useState<Step[]>([])
  const [formState, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
  const [referenceMessage, setReferenceMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaveApplication, setSaveApplication] = useState(false);
  const [isUpdatedApplication, setUpdatedApplication] = useState(false);
  const [isConfirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pendingNavigation, setPendingNavigation] = useState<any>(null);
  const [initialFormState, setInitialFormState] = useState<Record<string, any>>({});
  const [initialProducts, setInitialProducts] = useState([]);

  const isSubmittedApplication = Boolean(
    id && (selectedInvestment?.status && selectedInvestment?.status?.toLowerCase() !== "draft")
  )

  const blocker: any = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      hasUnsavedChanges &&
      currentLocation.pathname !== nextLocation.pathname
    ) {
      setPendingNavigation({ nextLocation });
      setShowLeaveConfirm(true)
      return true;
    }
    return false;
  });

  useEffect(() => {
    return () => {
      if (blocker && blocker.unblock) {
        blocker.unblock();
      }
    };
  }, [blocker]);

  useEffect(() => {
    if (products.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [products]);

  const handleNavigationConfirm = () => {
    if (pendingNavigation) {
      blocker.proceed?.();
      setPendingNavigation(null);
    }
    if (breadCrumbNavigation === 0) {
      setStep(0);
      setBreadCrumbNavigation(-1);
      setSelectedApplication("");
      setSelectedApplicationRef("");
      setCreateNewApplication(false);
    }
    if (breadCrumbNavigation === 1) {
      setStep(1);
      setBreadCrumbNavigation(-1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const formConfig = getApplicationFormConfig(selectedApplication)
      const lastIndex = formConfig.length - 1;
      try {
        setIsLoading(true);

        const response = await networkRequest(API_ENDPOINTS.getApplication, {
          method: "GET",
          body: { applicationId: id },
        });

        if (response.success) {
          const cleanedData = removeEmptyValues(response.data.applicationData);
          let updatedData = calculateTotals(cleanedData);
          const documentSection =
            formConfig[lastIndex]?.sections[0]?.fields ?? [];
          const apiDocuments = response?.data?.documentList?.documents || {};
          const mappedDocuments: Record<string, string> = {};

          documentSection.forEach((field) => {
            const fieldKey = field.id;
            const matchName = field.fileName;

            let matchedFile = null;

            Object.keys(apiDocuments).forEach((apiKey) => {
              const doc = apiDocuments[apiKey];

              if (doc.fileName?.startsWith(matchName)) {
                matchedFile = { ...doc };
              }
            });

            mappedDocuments[fieldKey] = matchedFile || ''
          });

          updatedData = {
            ...updatedData,
            ...mappedDocuments,
          };
          setFormData(updatedData);
          setInitialFormState(updatedData);

          if (response.data.applicationData.products) {
            setProducts(response.data.applicationData.products);
            setInitialProducts(response.data.applicationData.products);
          }

        } else {
          console.error("API Error:", response.message);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      setApplicationId(id)
      fetchData();
    }
  }, [id]);



  useEffect(() => {
    const init = async () => {
      const cfg = await loadApplicationConfig(selectedApplication, setFormData);
      setConfig(cfg);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchISICCodes = async () => {
      const sectionId = formState?.isicSection;

      setConfig(() =>
        config.map((item: any) => ({
          ...item,
          sections: item.sections?.map((section: any) => ({
            ...section,
            fields: section.fields?.map((field: any) => {
              if (field.id === "isicCode") {
                if (sectionId) {
                  return { ...field, options: [{ id: "loading", name: "Fetching ISIC Codes...", disabled: true }] };
                } else if (formState?.isicCodeName) {
                  return { ...field, options: [{ id: formState.isicCode, name: formState?.isicCodeName, disabled: true }] };
                } else {
                  return { ...field }
                }
              }
              return field;
            }),
          })),
        }))
      );

      if (sectionId) {
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
                  if (field.id === "isicCode") {
                    return { ...field, options: isicCodeOptions };
                  }
                  return field;
                }),
              })),
            }))
          );

          setFormData((prev: Record<string, any>) => ({
            ...prev,
            isicCode: "",
          }));
        } catch (error) {
          console.error("Failed to fetch ISIC Codes:", error);
        }
      }

    };

    fetchISICCodes();
  }, [formState?.isicSection, formState?.isicCodeName]);


  useEffect(() => {
    if (selectedApplication) {
      setApplicationSteps(
        newApplicationPlots[selectedApplication as keyof typeof newApplicationPlots] ?? []
      )
      if (id && (selectedInvestment?.status && selectedInvestment?.status?.toLowerCase() !== "draft")) {
        setApplicationSteps((prev) => {
          const data = prev
            .filter((d) => d.title !== "instruction")
            .map((cn, index) => index === 0 ? { ...cn, active: true } : { ...cn })
          return data
        })
      }
    }
  }, [selectedApplication, id, selectedInvestment?.status])

  // handling this state to show whether it's for view or create new service 
  useEffect(() => {
    setCreateNewForm(true);
    return () => {
      setCreateNewForm(false);
      setSelectedInvestment(null)
    }
  }, [])

  const checkForChanges = useCallback(() => {
    // Helper function to deep compare objects, ignoring null/undefined
    const hasObjectChanged = (obj1: any, obj2: any): boolean => {
      const keys1 = Object.keys(obj1 || {});
      const keys2 = Object.keys(obj2 || {});
    
      // Combine all unique keys from both objects
      const allKeys = new Set([...keys1, ...keys2]);
    
      // Check each key
      for (const key of allKeys) {
        const val1 = obj1?.[key];
        const val2 = obj2?.[key];
    
        // Handle empty string vs undefined/null - treat as same
        if (val1 === '' && (val2 === undefined || val2 === null || val2 === '')) {
          continue;
        }
        if (val2 === '' && (val1 === undefined || val1 === null || val1 === '')) {
          continue;
        }
    
        // Handle File objects specially
        if (val1 instanceof File || val2 instanceof File) {
          if (val1 !== val2) return true;
          continue;
        }
    
        // Handle arrays (for products)
        if (Array.isArray(val1) || Array.isArray(val2)) {
          if (!Array.isArray(val1) || !Array.isArray(val2)) return true;
          if (val1.length !== val2.length) return true;
    
          // Simple array comparison
          const str1 = JSON.stringify(val1);
          const str2 = JSON.stringify(val2);
          if (str1 !== str2) return true;
          continue;
        }
    
        // Handle objects recursively
        if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
          if (hasObjectChanged(val1, val2)) return true;
          continue;
        }
    
        // Regular value comparison
        if (val1 !== val2) return true;
      }
    
      return false;
    };

    const formChanged = hasObjectChanged(formState, initialFormState);
    
    const productsChanged = hasObjectChanged(
      products.map((p: any) => {
        const { hsCodeName, ...rest } = p;
        return rest;
      }),
      initialProducts.map((p: any) => {
        const { hsCodeName, ...rest } = p;
        return rest;
      })
    );

    console.log('productsChanged: ', productsChanged);
    return formChanged || productsChanged;
  }, [formState, initialFormState, products, initialProducts]);

  useEffect(() => {
    // Only check if we have data loaded
    if (Object.keys(formState).length > 0 || products.length > 0) {
      const changed = checkForChanges();
      setHasUnsavedChanges(changed);
    }
  }, [formState, products, checkForChanges]);

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

      if (fieldId === "equity" ||
        ["constructionCost", "costOfPlantMachinery", "costOfOtherFixedAssets", "workingCapital"].includes(fieldId)) {

        // Calculate TotalCost/TotalFunding first if not already calculated
        const totalFundingFields = ["constructionCost", "costOfPlantMachinery", "costOfOtherFixedAssets", "workingCapital"];
        const totalFunding = totalFundingFields.reduce((sum, key) => {
          const num = Number(updated[key]) || 0;
          return sum + num;
        }, 0);

        updated.TotalCost = totalFunding;
        updated.TotalFunding = totalFunding;

        // Calculate Debt = TotalFunding - equity
        const equity = Number(updated.equity) || 0;
        const debt = Math.max(0, totalFunding - equity);
        updated.debt = debt === 0 ? '0' : debt
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

      if (currentIndex === -1) return prevSteps;

      // ✅ Validate only if not on last step
      if (currentIndex < config?.length) {
        const stepConfig = config?.[currentIndex];

        newErrors = validateForm(stepConfig, formState, t)
        if (!(products.length > 0) && applicationSteps[currentIndex].title === 'company_details_1') {
          newErrors.ProductsJson = "Field is required"
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          const firstErrorFieldId = Object.keys(newErrors)[0];
          const el = fieldRefs.current[firstErrorFieldId];
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus({ preventScroll: true });
          }
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
      if (id) {
        navigate("/portal/application", { replace: true });
      } else {
        setSelectedApplication("")
        setStep(0)
      }
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
    const stepConfig = config?.[currentIndex];
    const newErrors = validateForm(stepConfig, formState, t, true);
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
    if (!!applicationId) {
      setUpdatedApplication(true)
    } else {
      setSaveApplication(true);
    }
    setReferenceMessage('');
    try {
      setIsLoading(true);
      const body = new FormData();
      body.append('Company', selectedCompany?.accountID ?? '');
      body.append('ContactPerson', contact?.id ?? '');
      body.append('ApplicationType', selectedInvestment?.applicationType ?? '');

      const transformedProducts = products?.map(({ id, hsCodeName, ...rest }: any) => rest);

      if (transformedProducts.length > 0) {
        body.append('ProductsJson', JSON.stringify(transformedProducts));
      }
      const excludedKeys = [
        "TotalCost",
        "TotalFunding",
      ];

      Object.entries(formState).forEach(([key, value]) => {
        if (!excludedKeys.includes(key)) {
          // Skip if value is a File
          if (!(value instanceof File)) {
            body.append(key, String(value ?? ""));
          }
        }
      });
      let response;
      // ✅ If we already have an ID, update; otherwise create
      if (applicationId || id) {
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
        setInitialFormState(formState);
        setInitialProducts(products);
        setHasUnsavedChanges(false);
        const newId = response?.data?.applicationId;
        if (newId && !applicationId) {
          setApplicationId(newId);
        }
        setReferenceMessage(response.message);
      } else {
        console.error(response?.message || 'Failed to save');
      }
      setSubmittedModal(true);
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(parseApiError(error));
      setIsLoading(false);
      setSubmittedModal(true);
    }
  };

  const handlePreSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const currentIndex = applicationSteps.findIndex((s: any) => s.active)
    const stepConfig = config?.[currentIndex];
    let newErrors = validateForm(stepConfig, formState, t);
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
    e?.stopPropagation();
    const currentIndex = applicationSteps.findIndex((s: any) => s.active)
    const stepConfig = config?.[currentIndex];
    let newErrors = validateForm(stepConfig, formState, t);
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
    setUpdatedApplication(false);
    setReferenceMessage('');
    try {
      setIsLoading(true);
      const body = new FormData();
      body.append('Company', selectedCompany?.accountID ?? '');
      body.append('ContactPerson', contact?.id ?? '');
      body.append('ApplicationType', selectedInvestment?.applicationType ?? '');

      const transformedProducts = products?.map(({ id, hsCodeName, ...rest }: any) => rest);

      if (transformedProducts.length > 0) {
        body.append('ProductsJson', JSON.stringify(transformedProducts));
      }
      const excludedKeys = [
        "TotalCost",
        "TotalFunding",
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
      if (submitResponse.success) {
        setInitialFormState(formState);
        setInitialProducts(products);
        setHasUnsavedChanges(false);
        setReferenceMessage(submitResponse.message);
      }
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

  const executeSubmit = async () => {
    setConfirmSubmitOpen(false);
    await handleSubmit();   // your original function runs untouched
  };

  const isLastStepActive = applicationSteps[applicationSteps.length - 1]?.active === true;

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
        handleSubmit={() => handlePreSubmit()}
        applicationSteps={applicationSteps}
        setApplicationSteps={setApplicationSteps}
        isSubmittedApplication={isSubmittedApplication}
      />
    )
  }


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
                {!isSubmittedApplication ? <FormSteps steps={applicationSteps} /> :
                  <SubmittedFormSteps setApplicationSteps={setApplicationSteps} applicationSteps={applicationSteps} />}
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
          handleSubmit={() => handlePreSubmit()}
          setApplicationSteps={setApplicationSteps}
          applicationSteps={applicationSteps}
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
        buttonText="view_my_application"
        title="application_submitted_successfully"
        heading="application_submitted"
        isUpdatedApplication={isUpdatedApplication}
      />
      <ConfirmationModal
        open={isConfirmSubmitOpen}
        onOpenChange={setConfirmSubmitOpen}
        onConfirm={executeSubmit}
        description="confirmation_application_desc"
      />
      <ConfirmationModal
        open={showLeaveConfirm}
        onOpenChange={setShowLeaveConfirm}
        title="unsaved_changes"
        subTitle="leave_without_saving"
        description="are_you_sure_want_to_leave"
        confirmText="exit"
        cancelText="cancel"
        onConfirm={() => {
          if (breadCrumbNavigation === 0 || breadCrumbNavigation === 1) {
            handleNavigationConfirm()
            setHasUnsavedChanges(false);
            setShowLeaveConfirm(false);
          }
          if (pendingNavigation) {
            setHasUnsavedChanges(false);
            setShowLeaveConfirm(false);
            handleNavigationConfirm()
          }
        }}
        onCancel={() => {
          blocker.reset?.();
          setPendingNavigation(null);
          setBreadCrumbNavigation(-1)
          setShowLeaveConfirm(false);
        }}
      />
      {isLoading && <Loader />}
    </div>
  )
}

export default AddNewApplication
