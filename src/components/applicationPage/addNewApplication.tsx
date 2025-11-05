import { getApplicationFormConfig } from "@/lib/form-data"
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

  const [config, setConfig] = useState<any>(getApplicationFormConfig(selectedApplication))
  const [applicationSteps, setApplicationSteps] = useState<Step[]>([])
  const [formState, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const networkRequest = useNetworkRequest()
  const { loadApplicationConfig } = useApplicationConfigLoader();
  const { setCreateNewForm, setSelectedLocation, selectedCompany, contactId } = useApp();
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const cfg = await loadApplicationConfig(selectedApplication);
      setConfig(cfg);
    };
    init();
  }, []);

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
      setSelectedLocation('')
    }
  }, [])

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    setErrors((prev) => ({ ...prev, [fieldId]: "" }))
  }

  const goToNextStep = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    let newErrors: Record<string, string> = {};

    setApplicationSteps((prevSteps) => {
      const currentIndex = prevSteps.findIndex((s) => s.active);
      console.log("currentIndex:", currentIndex);

      if (currentIndex === -1) return prevSteps;

      // ✅ Validate only if not on last step
      if (currentIndex < config?.length) {
        const stepConfig = config?.[currentIndex];

        newErrors = validateForm(stepConfig, formState)

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
    try {
      const body = new FormData();
      body.append('Company', selectedCompany?.accountID ?? '')
      body.append('ContactPerson', contactId)
      body.append('ApplicationType', 'LogisticsParks')
      Object.entries(formState).forEach(([key, value]) => {
        body.append(key, value instanceof File ? value : String(value ?? ""));
      });

      // ✅ Call API
      const response = await networkRequest(API_ENDPOINTS.createApplication, {
        method: 'POST',
        body,
      });

      if (response?.success) {
        console.log("Application saved as draft ✅");
      } else {
        console.log(response?.message || "Failed to save draft ❌");
      }
    } catch (err) {
      console.error("Draft Save Error:", err);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    try {
      const body = new FormData();
      body.append('Company', selectedCompany?.accountID ?? '')
      body.append('ContactPerson', contactId)
      body.append('ApplicationType', 'LogisticsParks')
      Object.entries(formState).forEach(([key, value]) => {
        body.append(key, value instanceof File ? value : String(value ?? ""));
      });

      // ✅ Call API
      const response = await networkRequest(API_ENDPOINTS.createApplication, {
        method: 'POST',
        body,
      });

      if (response?.success) {
        console.log("Application saved as draft ✅");
      } else {
        console.log(response?.message || "Failed to save draft ❌");
      }
    } catch (err) {
      console.error("Draft Save Error:", err);
    }
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
        setCreateNewApplication(false);
        setSelectedApplication("")
      }
      } /> :
      config?.length > 1 ? (
        <Card className="mt-[72px] mr-4 mb-4 w-full flex flex-col bg-[#fcfaf7]">
          {config?.length > 1 && (
            <>
              <FormSteps steps={applicationSteps} />
              <div className="border-2 border-[#f6f5ef]" />
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
    </div>
  )
}

export default AddNewApplication
