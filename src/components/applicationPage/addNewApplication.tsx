import { getApplicationFormConfig } from "@/lib/form-data"
import { Card } from "../ui/card"
import FormSteps from "../addCompany/formSteps"
import Instruction from "./instruction"
import DynamicForm from "../dynamic-form"
import { useEffect, useRef, useState } from "react"
import { newApplicationPlots } from "@/constants"
import FormSubmitted from "../formSubmitted"
import { useApp } from "@/context/AppContext"

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
  const configSteps = getApplicationFormConfig(selectedApplication)

  const [applicationSteps, setApplicationSteps] = useState<Step[]>([])
  const [formState, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const { setCreateNewForm, setSelectedLocation } = useApp();
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})

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
      console.log('hello');
      setCreateNewForm(false);
      setSelectedLocation('')
    }
  }, [])

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    setErrors((prev) => ({ ...prev, [fieldId]: "" }))
  }

  const goToNextStep = () => {
    const isEmpty = (val: any) => val === undefined || val === null || val === "";
    let newErrors: Record<string, string> = {};
  
    setApplicationSteps((prevSteps) => {
      const currentIndex = prevSteps.findIndex((s) => s.active);
      console.log("currentIndex:", currentIndex);
  
      if (currentIndex === -1) return prevSteps;
  
      // ✅ Validate only if not on last step
      if (currentIndex < configSteps.length) {
        const stepConfig = configSteps[currentIndex];
  
        stepConfig.sections.forEach((section) => {
          section.fields?.forEach((field) => {
            const value = formState[field.id]?.trim?.() || formState[field.id];
            if (field.required && isEmpty(value)) {
              newErrors[field.id] = `${field.label} is required`;
            }
          });
        });
  
        // If errors — stop navigation and show errors
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

  const renderActiveStep = () => {
    const activeStep = applicationSteps.find((s) => s.active)
    if (!activeStep) return null

    const currentIndex = Number(activeStep.stepNumber) - 1
    const activeConfig = configSteps[currentIndex]
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
        isNewApplication
        goToNextStep={goToNextStep}
        handlePerviousButton={goToPreviousStep}
        formData={formState}
        errors={errors}
        setErrors={setErrors}
        handleInputChange={handleInputChange}
        fieldRefs={fieldRefs}
      />
    )
  }

  return (
    <div>{isFormSubmitted ?
      <FormSubmitted onGoToRequest={() => {
        setCreateNewApplication(false);
        setSelectedApplication("")
      }
      } /> :
      configSteps.length > 1 ? (
        <Card className="mt-[72px] mr-4 mb-4 w-full flex flex-col bg-[#fcfaf7]">
          {configSteps.length > 1 && (
            <>
              <FormSteps steps={applicationSteps} />
              <div className="border-2 border-[#f6f5ef]" />
            </>
          )}
          {renderActiveStep()}
        </Card>
      ) : (
        <DynamicForm
          config={configSteps[0]}
          isNewApplication
          goToNextStep={goToNextStep}
          handlePerviousButton={goToPreviousStep}
          formData={formState}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          fieldRefs={fieldRefs}
        />
      )}
    </div>
  )
}

export default AddNewApplication
