import { getApplicationFormConfig } from "@/lib/form-data"
import { Card } from "../ui/card"
import FormSteps from "../addCompany/formSteps"
import Instruction from "./instruction"
import DynamicForm from "../dynamic-form"
import { useEffect, useState } from "react"
import { newApplicationPlots, type ServiceKey } from "@/constants"
import FormSubmitted from "../formSubmitted"

interface Step {
  title: string
  completed: boolean
  active: boolean
  stepNumber: string
}

interface AddNewApplicationProps {
  selectedApplication: ServiceKey
  setSelectedApplication: (value: ServiceKey) => void
}

const AddNewApplication = ({ selectedApplication, setSelectedApplication }: AddNewApplicationProps) => {
  const configSteps = getApplicationFormConfig(selectedApplication)

  const [applicationSteps, setApplicationSteps] = useState<Step[]>([])
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    if (selectedApplication) {
      setApplicationSteps(
        newApplicationPlots[selectedApplication] ?? []
      )
    }
  }, [selectedApplication])

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    setErrors((prev) => ({ ...prev, [fieldId]: "" }))
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setSelectedApplication("")
  //   setIsFormSubmitted(true)
  // }

  const goToNextStep = () => {
    setApplicationSteps((prevSteps) => {
      const currentIndex = prevSteps.findIndex((s) => s.active)
      if (currentIndex === -1 || currentIndex === prevSteps.length - 1) {
        // setSelectedApplication("")
        setIsFormSubmitted(true)
      }

      return prevSteps.map((step, index) => {
        if (index === currentIndex) {
          return { ...step, active: false, completed: true }
        } else if (index === currentIndex + 1) {
          return { ...step, active: true }
        }
        return step
      })
    })
  }

  const goToPreviousStep = () => {
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
        formData={formData}
        errors={errors}
        setErrors={setErrors}
        handleInputChange={handleInputChange}
      />
    )
  }

  return (
    <div>{isFormSubmitted ?
      <FormSubmitted onGoToRequest={() => setSelectedApplication("")} /> :
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
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  )
}

export default AddNewApplication
