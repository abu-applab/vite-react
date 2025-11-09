import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building2, Plus, Truck, Building, Factory, LandPlot } from "lucide-react"
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
import { useApp, type CompanyType } from "@/context/AppContext";
import PageHeader from "@/components/pageHeader";

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

const submittedApplications = [
    {
        id: "INDUSTAPP00000056115",
        title: "Industrial",
        location: "Al Wakrah",
        date: "10-08-2025",
        status: "Approved",
    },
    {
        id: "INDUSTAPP00000056116",
        title: "Industrial",
        location: "Doha",
        date: "10-08-2025",
        status: "Pending",
    },
    {
        id: "LOGPRKAPP00000056115",
        title: "Logistics Parks",
        location: "Doha",
        date: "10-08-2025",
        status: "Pending",
    },
    {
        id: "INDUSTAPP",
        title: "Open Yards",
        location: "Al Wakrah",
        date: "10-08-2025",
        status: "Approved",
    },
];

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

const applicationTypes = [
    {
        title: 'Logistics',
        icon: Truck
    },
    {
        title: 'Industrial',
        icon: Factory
    },
    {
        title: 'Commercial',
        icon: Building
    },
    {
        title: 'Open Yards',
        icon: LandPlot
    },
];

const statuses = [
    'Draft',
    'Submitted',
    'Review in progress',
    'Pending',
    'Approved',
    'Rejected',
    'Pending submit transfer',
    'On Hold',
    'Cancelled',
    'Terminated'
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

const ApplicationPage = () => {
    const [step, setStep] = useState(0);
    const [activeTab, setActiveTab] = useState('submitted');
    const [isCreateNewApplication, setCreateNewApplication] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState<string>("")
    const { companies, selectedCompany, setSelectedCompany, setSelectedInvestment } = useApp()

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
                        setStep(1); // Otherwise, go to Select Location (step 2 → index 1)
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
            <PageHeader header={header}/>

            {(!isCreateNewApplication) ? (
                <div>
                    <div className="flex flex-wrap gap-3 items-center mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                        <Input placeholder="Search..." className="pl-10 max-w-md bg-background" />
                    </div>
                    <Button variant="outline" onClick={() => setCreateNewApplication(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Application
                    </Button>
                    <Select>
                        <SelectTrigger className="bg-background data-[placeholder]:text-foreground">
                            <SelectValue placeholder="Application Type" />
                        </SelectTrigger>
                        <SelectContent className="w-[233px]">
                            {applicationTypes.map((application, index) => (
                                <SelectItem key={index} value={application.title}>
                                    <application.icon className="text-maroon-100" />
                                    {application.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                        <Select
                            value={selectedCompany?.accountID || ''}
                            onValueChange={(value) => {
                                const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
                                selectedValue && setSelectedCompany(selectedValue)
                            }}
                        >
                            <SelectTrigger className="bg-background pl-10">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company) => (
                                    <SelectItem key={company.accountID} value={company.accountID}>
                                        {company.englishName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Select>
                        <SelectTrigger className="bg-background data-[placeholder]:text-foreground">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status, index) => (
                                <SelectItem key={index} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                    <div className="w-full h-fit">
                        <div className="flex items-center bg-white h-[56px] rounded-lg shadow-md gap-[8px]">
                            {tabs.map((tab) => (
                                <button key={tab.id} className={`py-[10px] h-full ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 w-full min-h-[35vh] rounded-b-lg">
                            {activeTab === 'submitted' && <TabsContent applications={submittedApplications} />}
                            {activeTab === 'drafted' && <TabsContent applications={draftedApplications} />}
                        </div>
                    </div>
                </div>
            ) :
                <div>{steps[step].component}</div>
            }
        </div>
    )
}

export default ApplicationPage