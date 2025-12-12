import { Building2, Eye, Pencil } from "lucide-react"
import { useApp } from "@/context/AppContext"
import ListOfCards from "@/components/listOfcards"
import WelcomeHeader from "@/components/hubPage/welcomeHeader"
import CustomPagination from "@/components/customPagination"
import { PAGE_SIZE } from "@/constants"
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request"
import { cn } from "@/lib/utils"

const cardsConfig = {
  icon: Building2,
  id: "accountID",
  subTitle: "crNumber",
  title: "englishName",
  status: 'status',
  fields: [
    {
      label: "total_plots",
      key: "plotCount",
    },
    {
      label: "main_contact",
      key: "mainConatact",
    },
    {
      label: "phone_number",
      key: "phone",
    },
    {
      label: "mail",
      key: "email",
    },
  ],
  menuOptions: [
    {
      label: "view_details",
      icon: Eye,
      onClick: () => {
        console.log("View clicked for:")
      },
    },
    {
      label: "edit",
      icon: Pencil,
      onClick: () => {
        console.log("Edit clicked for:")
      },
    },
  ]
}


const HubPage = () => {
  const { companies, setCompaniesFilter, companiesFilter } = useApp();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (companiesFilter?.totalPages ?? 0)) {
      setCompaniesFilter((prev: any) => ({
        ...prev,
        page: newPage,
      }))
    }
  }

  const filteredCompanies = companies.filter((company: any) => {

    const searchText = companiesFilter.searchTerm?.toLowerCase() ?? "";

    // ----- Status Filter (using split and matching multiple values) -----
    let statusMatch = true;

    if (companiesFilter?.status) {
      const statusList = companiesFilter.status
        .split(",")
        .map(val => val.trim().toLowerCase());

      statusMatch = statusList.some(
        status => company.status?.toLowerCase() === status
      );
    }

    // Search filter
    const searchMatch =
      company.englishName?.toLowerCase().includes(searchText) ||
      company.arabicName?.toLowerCase().includes(searchText) ||
      company.crNumber?.toLowerCase().includes(searchText) ||
      company.email?.toLowerCase().includes(searchText) ||
      company.phone?.toLowerCase().includes(searchText) ||
      company.status?.toLowerCase().includes(searchText);

    return statusMatch && searchMatch;
  });

  // 2️⃣ Pagination applied on filtered list
  const start = (companiesFilter.page - 1) * PAGE_SIZE;
  const cardData = filteredCompanies.slice(start, start + PAGE_SIZE);

  const totalPages = Math.ceil(filteredCompanies.length / PAGE_SIZE);

  return (
    <div className={cn("h-full")}>
      {companies.length > 0 ? (
        <>
          <WelcomeHeader totalCompanies={companies.length ?? 0} currentCompanies={cardData.length ?? 0} />
          {filteredCompanies?.length > 0 ?
            <>
              <ListOfCards cardsConfig={cardsConfig} cardsData={cardData} />
              {filteredCompanies?.length > 4 && <CustomPagination handlePageChange={handlePageChange} currentPage={companiesFilter?.page} totalPages={totalPages} />}
            </>
            :
            <EmptyRequest hideButton={true} title={'No Companies Found'} />}
        </>
      )
        :
        <EmptyRequest title='No Companies Found' description="Please click the below button to add your company details" buttonText="Add New Company" />
      }
    </div>
  )
}

export default HubPage



/* ===== Don't remove ======= */

// const goToNextStep = () => {
//   setAddCompanySteps((prevSteps) => {
//     const currentIndex = prevSteps.findIndex((s) => s.active)
//     if (currentIndex === -1 || currentIndex === prevSteps.length - 1) return prevSteps

//     return prevSteps.map((step, index) => {
//       if (index === currentIndex) {
//         return { ...step, active: false, completed: true }
//       } else if (index === currentIndex + 1) {
//         return { ...step, active: true }
//       }
//       return step
//     })
//   })
// }

// const goToPreviousStep = () => {
//   setAddCompanySteps((prevSteps) => {
//     const currentIndex = prevSteps.findIndex((s) => s.active)
//     if (currentIndex <= 0) return prevSteps // already at first step

//     return prevSteps.map((step, index) => {
//       if (index === currentIndex) {
//         return { ...step, active: false }
//       } else if (index === currentIndex - 1) {
//         return { ...step, active: true, completed: false }
//       }
//       return step
//     })
//   })
// }

// const renderActiveStep = () => {
//   const activeStep = addCompanySteps.find((s) => s.active)
//   switch (activeStep?.stepNumber) {
//     case "1":
//       return <UploadCrDocument goToNextStep={goToNextStep} isAddNewCompany />
//     case "2":
//       return <CompanyDetailsForm goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} isAddNewCompany />
//     case "3":
//       return <UploadOwnerDocument goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
//     case "4":
//       return <SelectCompanyDetails goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
//     case "5":
//       return <ReviewAndSubmit goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} isAddNewCompany setIsAddNewCompany={setIsAddNewCompany}/>
//     case "6":
//       return <NewCompanyFormSubmission />
//     default:
//       return null
//   }
// }

//  <>
//   <div>
//     <h1 className="text-2xl mb-1">Service Request</h1>
//     <div className="mb-6 text-base text-muted-foreground">
//       <Link to="/portal">Home</Link>
//       <span className="mx-2">›</span>
//       <span className="text-maroon-100">Add New Company</span>
//     </div>
//   </div>
//   <Card>
//     <FormSteps steps={addCompanySteps} />
//     <div className="border-2 border-[#f6f5ef]" />
//     {renderActiveStep()}
//   </Card>
// </>

/* ===== Don't remove ======= */