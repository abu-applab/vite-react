import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CirclePlus, Building2 } from "lucide-react"
import { SelectInvestmentTypeModal } from "@/components/applicationPage/select-investment-type-modal";
import { Link } from "react-router-dom";
import { TabsContent } from "@/components/applicationPage/tab-content";

const submittedApplications = [
    {
        id: "#APP-2025-0098",
        title: "Industrial Application",
        location: "Al Wakrah",
        date: "10-08-2025",
        status: "Approved",
    },
    {
        id: "#APP-2025-0098",
        title: "Industrial Application",
        location: "Doha",
        date: "10-08-2025",
        status: "Pending",
    },
    {
        id: "#APP-2025-0098",
        title: "Industrial Application",
        location: "Doha",
        date: "10-08-2025",
        status: "Pending",
    },
    {
        id: "#APP-2025-0098",
        title: "Industrial Application",
        location: "Al Wakrah",
        date: "10-08-2025",
        status: "Approved",
    },
];


const draftedApplications = [
    {
        id: "APP-2025-0098",
        title: "Commercial Application",
        status: "Draft",
        location: "Al Wakrah",
        date: "10-08-2025",
        completion: 75,
    },
    {
        id: "APP-2025-0099",
        title: "Commercial Application",
        status: "Pending",
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
    'Industrial',
    'Logistics',
    'Open Yards',
    'Commercial'
];

const tabs = [
    { id: 'submitted', label: 'Submitted Applications' },
    { id: 'drafted', label: 'Drafted Applications' },
];

const ApplicationPage = () => {

    const [activeTab, setActiveTab] = useState('submitted');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<string>("")

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

            {(!selectedService || isModalOpen) ? (<div><div className="flex flex-wrap gap-3 items-center mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                    <Input placeholder="Search..." className="pl-10 max-w-md bg-background" />
                </div>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Create New Application
                </Button>
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
                    <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    {/* <SelectContent>
                        <SelectItem value={'Status'}>
                            Status
                        </SelectItem>
                    </SelectContent> */}
                </Select>
                <Select>
                    <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Application Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {applicationTypes.map((application, index) => (
                            <SelectItem key={index} value={application}>
                                {application}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
                <div className="w-full">
                    <div className="flex bg-white  h-[56px] shadow-md gap-[8px]">
                        {tabs.map((tab) => (
                            <button key={tab.id} className={`py-[10px] mt-[16px]  ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="p-10 w-full min-h-screen bg-[#fcfaf7] rounded-b-lg">
                        {activeTab === 'submitted' && <TabsContent applications={submittedApplications} />}
                        {activeTab === 'drafted' && <TabsContent applications={draftedApplications} />}
                    </div>
                </div>
            </div>
            ) : <div></div>
            }
            <SelectInvestmentTypeModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
            />
        </div>
    )
}

export default ApplicationPage