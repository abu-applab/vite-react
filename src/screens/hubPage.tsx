import { Card, CardContent } from "@/components/ui/card"
import avatar from ".././assets/images/Avatar.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Building2, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UploadCrDocument from "@/components/addCompany/uploadCrDocument"
import { Link } from "react-router-dom"
import { useApp } from "@/context/AppContext"
import FormSteps from "@/components/addCompany/formSteps"
import CompanyDetailsForm from "@/components/addCompany/reviewComapanyDetails/companyDetailsForm"
import UploadOwnerDocument from "@/components/addCompany/uploadOwnerDocument"
import SelectCompanyDetails from "@/components/addCompany/selectCompanyDetails"
import ReviewAndSubmit from "@/components/addCompany/reviewAndSubmit"
import NewCompanyFormSubmission from "@/components/addCompany/newCompanyFormSubmission"
import { useState } from "react"
import ListOfCards from "@/components/listOfcards"

const cardsConfig = {
    icon: Building2,
    id: "accountID",
    subTitle: "crNumber",
    title: "englishName",
    status: 'status',
    fields: [
        {
            label: "Total Plots",
            key: "plotNumber",
        },
        {
            label: "Main Contact",
            key: "mainConatact",
        },
        {
            label: "Phone Number",
            key: "phone",
        },
        {
            label: "Mail",
            key: "email",
        },
    ]
}


const HubPage = () => {
  const { addCompanySteps, setAddCompanySteps, companies } = useApp();
  const [isAddNewCompany, setIsAddNewCompany] = useState(false)

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
          return { ...step, active: false }
        } else if (index === currentIndex - 1) {
          return { ...step, active: true, completed: false }
        }
        return step
      })
    })
  }

  const renderActiveStep = () => {
    const activeStep = addCompanySteps.find((s) => s.active)
    switch (activeStep?.stepNumber) {
      case "1":
        return <UploadCrDocument goToNextStep={goToNextStep} isAddNewCompany />
      case "2":
        return <CompanyDetailsForm goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} isAddNewCompany />
      case "3":
        return <UploadOwnerDocument goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      case "4":
        return <SelectCompanyDetails goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
      case "5":
        return <ReviewAndSubmit goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} isAddNewCompany setIsAddNewCompany={setIsAddNewCompany}/>
      case "6":
        return <NewCompanyFormSubmission />
      default:
        return null
    }
  }

  return (
    <div className="">
      {isAddNewCompany ?
        <>
          <div>
            <h1 className="text-2xl mb-1">Service Request</h1>
            <div className="mb-6 text-base text-muted-foreground">
              <Link to="/portal">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-maroon-100">Add New Company</span>
            </div>
          </div>
          <Card>
            <FormSteps steps={addCompanySteps} />
            <div className="border-2 border-[#f6f5ef]" />
            {renderActiveStep()}
          </Card>
        </>
        :
        <>
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">Hello, Mushthtofa Ahmad Kamal</h1>
                    <p className="text-sm text-gray-600">Stay informed and manage your investments seamlessly</p>
                  </div>
                </div>
                <Button className="bg-[#83764F] hover: text-white" onClick={() => setIsAddNewCompany(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Company
                </Button>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                  <Input placeholder="Search..." className="pl-10 bg-background" />
                </div>
                <Select defaultValue="allStatus">
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allStatus">All Status</SelectItem>
                    <SelectItem value="underReview">Under Review</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pendingsPayments">Pendings Payments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-base text-neutral-500 mt-4">Showing 4 of 4 companies</p>
            </CardContent>
          </Card>
          <ListOfCards cardsConfig={cardsConfig} cardsData={companies} showAlerts/>
        </>
      }
    </div>
  )
}

export default HubPage