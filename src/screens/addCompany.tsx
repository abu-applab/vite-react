import { Card } from "@/components/ui/card"
import { User, FileText, Lock } from "lucide-react"
import SideBar from "@/components/addCompany/sideBar"
import UploadCrDocument from "@/components/addCompany/uploadCrDocument"
import CompanyDetailsForm from "@/components/addCompany/reviewComapanyDetails/companyDetailsForm"
import UploadOwnerDocument from "@/components/addCompany/uploadOwnerDocument"
import SelectCompanyDetails from "@/components/addCompany/selectCompanyDetails"
import ReviewAndSubmit from "@/components/addCompany/reviewAndSubmit"
import NewCompanyFormSubmission from "@/components/addCompany/newCompanyFormSubmission"
import { useApp } from "@/context/AppContext"
import FormSteps from "@/components/addCompany/formSteps"


const sidebarSteps = [
  {
    icon: User,
    title: "Login to your account",
    description: "Login was successfully completed.\nYou're good to go!",
    completed: true,
  },
  {
    icon: FileText,
    title: "Add your company",
    description: "Add a company to submit applications,\nservice requests and track them",
    completed: false,
  },
  {
    icon: Lock,
    title: "Main Hub Access",
    description: "Access Main Hub to View & Add Your\nCompanies",
    completed: false,
  },
]

const AddCompany = () => {
  const { addCompanySteps, setAddCompanySteps } = useApp()

  // const gridColsClass = `grid-cols-${addingCompanyDetailSteps.length}`;

  const goToNextStep = () => {
    setAddCompanySteps((prevSteps) => {
      const currentIndex = prevSteps.findIndex((s) => s.active)
      if (currentIndex === -1 || currentIndex === prevSteps.length - 1) return prevSteps

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
    setAddCompanySteps((prevSteps) => {
      const currentIndex = prevSteps.findIndex((s) => s.active)
      if (currentIndex <= 0) return prevSteps // already at first step

      return prevSteps.map((step, index) => {
        if (index === currentIndex) {
          // deactivate current step
          return { ...step, active: false }
        } else if (index === currentIndex - 1) {
          // make previous step active again (keep completed true or false as you want)
          return { ...step, active: true, completed: false }
        }
        return step
      })
    })
  }


  // 👉 Render active component
  const renderActiveStep = () => {
    const activeStep = addCompanySteps.find((s) => s.active)
    switch (activeStep?.stepNumber) {
      case "1":
        return <UploadCrDocument goToNextStep={goToNextStep} />
      case "2":
        return <CompanyDetailsForm goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      case "3":
        return <UploadOwnerDocument goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      case "4":
        return <SelectCompanyDetails goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      case "5":
        return <ReviewAndSubmit goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      case "6":
        return <NewCompanyFormSubmission />
      default:
        return null
    }
  }

  return (
    <div className="w-screen m-h-screen flex flex-row">
      <SideBar sidebarSteps={sidebarSteps} />
      <Card className="mt-[72px] mr-4 mb-4 w-full flex flex-col bg-[#fcfaf7]">
        { !addCompanySteps[4].completed &&
          <>
          <FormSteps steps={addCompanySteps} isAddCompany={true}/>
          <div className="border-2 border-[#f6f5ef]" />
        </>
        }
        {renderActiveStep()}
      </Card>
    </div>
  )
}

export default AddCompany