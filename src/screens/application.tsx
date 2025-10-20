import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building2, Plus, Truck, Building, Factory, LandPlot } from "lucide-react"
import { Link } from "react-router-dom";
import { TabsContent } from "@/components/applicationPage/tab-content";
import AddNewApplication from "@/components/applicationPage/addNewApplication";
import { InvestmentSelector } from "@/components/applicationPage/investmentSelector";
import logistics from '../assets/images/logestics.svg'
import industrial from '../assets/images/industrial.svg'
import commercial from '../assets/images/commercial.svg'
import openYards from '../assets/images/open-yards.svg'

interface InvestmentOptions {
    id: string
    title: string
    description?: string
    image: string
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
            id: "alKhor",
            title: "Al Khor",
            image: logistics,
        },
        {
            id: "smallMediumIndustriesZone",
            title: "Small Medium industries Zone",
            image: industrial,
        },
        {
            id: "alKaraana",
            title: "Al Karaana",
            image: commercial,
        },
        {
            id: "mesaieed",
            title: "Messaieed",
            image: openYards,
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

const companies = [
    'Al Noor Real Estate',
    'Qatar International Islamic Bank',
    'Mesaieed Petrochemical Holding Company',
    'Ezdan Holding Group',
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

const ApplicationPage = () => {
    const [step, setStep] = useState(0);
    const [activeTab, setActiveTab] = useState('submitted');
    const [isCreateNewApplication, setCreateNewApplication] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState<string>("")
    const [selectedLocation, setSelectedLocation] = useState<string>("")


    const steps = [
        {
            id: 1,
            title: "Select Investment Type",
            component: (
                <InvestmentSelector
                    handleSelectedOption={(val: string) => {
                        setSelectedApplication(val);

                        // 🧠 Condition: if user selects "openYards", skip step 2
                        if (val === "openYards") {
                            setStep(2); // Go directly to AddNewApplication (step 3 → index 2)
                        } else {
                            setStep(1); // Otherwise, go to Select Location (step 2 → index 1)
                        }
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
                        setSelectedLocation(val);
                        setStep(2); // Go to AddNewApplication (step 3 → index 2)
                    }}
                    investmentContent={investmentLocations}
                />
            ),
        },
        {
            id: 3,
            title: "Add New Application",
            component: (
                <AddNewApplication
                    selectedApplication={selectedApplication}
                    setSelectedApplication={setSelectedLocation}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                />
            ),
        },
    ];


    return (
        <div className="mx-[80px] mt-10">
            {/* Header */}
            <div>
                <h1 className="text-2xl mb-1">Application</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Al Noor Real Estate W.L.L</Link>
                    <span className="mx-2">›</span>
                    <span className="text-maroon-100">Submitted Application</span>
                </p>
            </div>

            {(!isCreateNewApplication) ? (
                <div><div className="flex flex-wrap gap-3 items-center mb-6">
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
                        <Select defaultValue="Al Noor Real Estate">
                            <SelectTrigger className="bg-background pl-10">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company, index) => (
                                    <SelectItem key={index} value={company}>
                                        {company}
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
                        <div className="flex bg-white h-[56px] shadow-md gap-[8px]">
                            {tabs.map((tab) => (
                                <button key={tab.id} className={`py-[10px] mt-[16px]  ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="p-10 w-full min-h-[35vh] bg-[#fcfaf7] rounded-b-lg">
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