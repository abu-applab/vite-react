import { useEffect, useState } from "react";
import { Truck, Building, Factory, LandPlot, FileSpreadsheet, Eye } from "lucide-react"
import { TabsContent } from "@/components/applicationPage/tab-content";
import AddNewApplication from "@/components/applicationPage/addNewApplication";
import { InvestmentSelector } from "@/components/applicationPage/investmentSelector";
import logistics from '../assets/images/logestics.svg'
import industrial from '../assets/images/industrial.svg'
import commercial from '../assets/images/commercial.svg'
import openYards from '../assets/images/open-yards.svg'
import alKhor from '../assets/images/Al-khor.svg'
import smiZone from '../assets/images/SMI-zone.svg'
import alKaranaa from '../assets/images/Al-Karaana.svg'
import mesaieed from '../assets/images/Mesaieed.svg'
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/pageHeader";
import { CreateAndFilter } from "@/components/createAndFilter";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import ListOFCards from "@/components/listOfcards";
import CustomPagination from "@/components/customPagination";
import Loader from "@/components/loader";

interface InvestmentOptions {
    id: string
    title: string
    description?: string
    image: string
    disabled?: boolean
    investments?: string[]
    applicationType?: string
}

interface InvestmentType {
    title: string,
    description: string,
    options: InvestmentOptions[]
}

interface Params {
    Page: number
    PageSize: number
    AccountId: string
    Status?: string
}


const investmentTypes: InvestmentType =
{
    title: 'What kind of Investment are you looking for?',
    description: 'Select the investment type that best matches your requirements, Options are shown below.',
    options: [
        {
            id: "logisticsPark",
            title: "Logistics Park",
            description: "Zones for warehousing and distribution to strengthen trade.",
            image: logistics,
            disabled: true
        },
        {
            id: "industrial",
            title: "Industrial",
            description: "Heavy industrial hub for large-scale manufacturing.",
            image: industrial,
        },
        {
            id: "commercial",
            title: "Commercial",
            description: "Flexible spaces for storage and light industry.",
            image: commercial,
            disabled: true,
        },
        {
            id: "openYards",
            title: "Open Yards",
            description: "Plots and facilities for business growth environment.",
            image: openYards,
        },
    ]
}


const investmentLocations: InvestmentType =
{
    title: 'Which location would you like to choose?',
    description: 'choose from available locations for your selected investment type.',
    options: [
        {
            id: "7703413e-4094-ea11-8106-00155d0d0b8c",
            title: "Al Khor Industrial Zone",
            image: alKhor,
            investments: ['openYards', 'industrial']
        },
        {
            id: "b8797db0-4094-ea11-8106-00155d0d0b8c",
            title: "Al Karaana Industrial Zone",
            image: alKaranaa,
            investments: ['openYards', 'industrial'],
        },
        {
            id: "40bae3c1-b36b-ed11-811e-00155d0d0b8c",
            title: "Small Medium Ind",
            image: smiZone,
            investments: ['industrial'],
            applicationType: "SMI",
        },
        {
            id: "edb79af3-c0d5-e611-80d3-00155d0d0b8cc",
            title: "Mesaieed Industrial Zone",
            image: mesaieed,
            investments: ['industrial'],
            applicationType: "MIZ",
        },
    ]
}

const cardsConfig = {
    icon: FileSpreadsheet,
    id: "applicationId",
    subTitle: "locationNameEn",
    title: "referenceNumber",
    status: 'status',
    fields: [
        {
            label: "Location",
            key: "locationNameEn",
        },
        {
            label: "Submitted Date",
            key: "submissionDate",
        },
    ],
    menuOptions: [
        {
            label: "View Details",
            icon: Eye,
            onClick: () => {
                console.log("View clicked for:")
            },
        },
    ]
}

const draftedApplications = [
    {
        id: "INDUSTAPP00000056115",
        title: "Commercial",
        status: "Draft",
        location: "Al Wakrah",
        date: "10-08-2025",
        completion: 75,
    },
    {
        id: "#APP-2025-0099",
        title: "Commercial",
        status: "Draft",
        location: "Doha",
        date: "15-08-2025",
        completion: 80,
    },
];

const tabs = [
    { id: 'submitted', label: 'Submitted Applications' },
    { id: 'drafted', label: 'Drafted Applications' },
];

const header = {
    title: "Applications",
    homeLink: 'companyName',
    contentLinks: ['View Applications', 'Create New Applications'],
}

const filterKeys = {
    title: 'Applocations',
    createNewRequest: 'Create New Application',
    filterTypes: [
        { id: 'darft', value: 'Darft' },
        { id: 'submitted', value: 'Submitted' },
        { id: 'reviewInProgress', value: 'Review In Progress' },
        { id: 'approved', value: 'Approved' },
        { id: 'rejected', value: 'Rejected' },
        { id: 'pending', value: 'Pending Submit Transfer' },
        { id: 'onHold', value: 'On Hold' },
        { id: 'rejected', value: 'Rejected' },
        { id: 'Cancelled', value: 'Cancelled' },
        { id: 'Terminated', value: 'Terminated' },
    ],
    applicationFilter: [
        { id: 'Logistics Park', value: 'Logistics Park', icon: Truck },
        { id: 'Industrial', value: 'Industrial', icon: Factory },
        { id: 'Commercial', value: 'Commercial', icon: Building },
        { id: 'Open Yards', value: 'Open Yards', icon: LandPlot },
    ]
}
const PAGE_SIZE = 4

const ApplicationPage = () => {
    const [step, setStep] = useState(0);
    const [activeTab, setActiveTab] = useState('submitted');
    const [isCreateNewApplication, setCreateNewApplication] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<string>("");
    const { setSelectedInvestment, setApplicationFilter, applicationFilter, selectedCompany } = useApp();
    const [loading, setLoading] = useState(false);
    const networkRequest = useNetworkRequest();
    const [applicationData, setApplicationData] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    // const [darfTotalRecords, setDarftTotalRecords] = useState(0)

    useEffect(() => {
        const fetchRequests = async () => {
            console.log('selectedCompany?.accountID: ', selectedCompany?.accountID);
            setLoading(true)
            try {
                const params: Params = {
                    Page: applicationFilter?.page ?? 1,
                    PageSize: PAGE_SIZE,
                    AccountId: selectedCompany?.accountID ?? ''
                }
                if (applicationFilter?.status) params["Status"] = applicationFilter?.status

                const response = await networkRequest(API_ENDPOINTS.getApplicationsList, { method: "GET", body: params })

                if (response?.success) {
                    setApplicationData(response.data.data)
                    setTotalRecords(response.data.totalRecords)
                }
            } catch (error) {
                console.error("Error fetching service requests:", error)
            } finally {
                setLoading(false)
            }
        }
        if (selectedCompany?.accountID && !isCreateNewApplication) {
            fetchRequests()
        }
    }, [applicationFilter, selectedCompany?.accountID, isCreateNewApplication])

    const currentPage = applicationFilter?.page ?? 1
    const totalPages = Math.ceil(totalRecords / PAGE_SIZE)

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
          setApplicationFilter((prev: any) => ({
            ...prev,
            page: newPage,
          }))
        }
      }

    const filteredInvestmentLocations = {
        ...investmentLocations,
        options: investmentLocations.options.filter(option =>
            option?.investments?.includes(selectedApplication)
        )
            .map(option => {
                // Disable Al Khor & Al Karaana when selectedApplication is 'industrial'
                if (
                    selectedApplication === "industrial" &&
                    ["Al Khor Industrial Zone", "Al Karaana Industrial Zone"].includes(option.title)
                ) {
                    return { ...option, disabled: true };
                }
                return option;
            }),
    };


    const steps = [
        {
            id: 1,
            title: "Select Investment Type",
            component: (
                <InvestmentSelector
                    handleSelectedOption={(val: string) => {
                        setSelectedApplication(val);
                        setStep(1);
                    }}
                    investmentContent={investmentTypes}
                />
            ),
        },
        {
            id: 2,
            title: "Select Location",
            component: (
                <InvestmentSelector
                    handleSelectedOption={(val: string) => {
                        const locationName = investmentLocations.options.find((loc) => loc.id === val)
                        const application = selectedApplication === "openYards" ? 'Open Yards' : locationName?.title
                        setSelectedInvestment({
                            application: application ?? '',
                            applicationType: locationName?.applicationType ?? 'LogisticsParks',
                            location: locationName?.title ?? '',
                            locationId: locationName?.id ?? ''
                        })
                        setStep(2); // Go to AddNewApplication (step 3 → index 2)
                    }}
                    investmentContent={filteredInvestmentLocations}
                />
            ),
        },
        {
            id: 3,
            title: "Add New Application",
            component: (
                <AddNewApplication
                    selectedApplication={selectedApplication}
                    setSelectedApplication={setSelectedApplication}
                    setCreateNewApplication={setCreateNewApplication}
                    setStep={setStep}
                />
            ),
        },
    ];


    return (
        <div className="">
            {/* Header */}
            <PageHeader header={header} />

            {(!isCreateNewApplication) ? (
                <div>
                    <CreateAndFilter
                        onNewRequest={() => setCreateNewApplication(true)}
                        filterConfig={filterKeys}
                        setAppliedFilter={setApplicationFilter}
                        appliedFilter={applicationFilter}
                    />
                    <div className="w-full h-fit mt-6">
                        <div className="flex items-center bg-white h-[56px] rounded-lg shadow-md gap-[8px]">
                            {tabs.map((tab) => (
                                <button key={tab.id} className={`py-[10px] h-full ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 w-full min-h-[35vh] rounded-b-lg">
                            {activeTab === 'submitted' &&
                                <>
                                <ListOFCards cardsConfig={cardsConfig} cardsData={applicationData} />
                                <CustomPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
                                </>
                            }
                            {activeTab === 'drafted' && <TabsContent applications={draftedApplications} />}
                        </div>
                    </div>
                    {loading && <Loader />}
                </div>
            ) :
                <div>{steps[step].component}</div>
            }
        </div>
    )
}

export default ApplicationPage