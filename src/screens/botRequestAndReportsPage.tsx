import BotReportForm from "@/components/botRequests/bot-report-form";
import RequestForm from "@/components/botRequests/bot-request-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { CirclePlus, Funnel, Search } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

const requests = [
    {
        company: "Gulf Ventures LLC",
        id: "#BOT-REQ-2025-00123",
        category: "Legal Support",
        created: "10-08-2025",
        submitted: "11-08-2025",
        modified: "11-08-2025",
        status: "On Hold",
    },
    {
        company: "Al Noor Trading Co.",
        id: "#BOT-REQ-2025-00167",
        category: "Technical Support",
        created: "10-08-2025",
        submitted: "11-08-2025",
        modified: "11-08-2025",
        status: "Completed",
    },
    {
        company: "Qatar Investment Holdings",
        id: "#BOT-REQ-2025-00145",
        category: "Commercial Relations",
        created: "10-08-2025",
        submitted: "11-08-2025",
        modified: "11-08-2025",
        status: "In Progress",
    },
    {
        company: "Gulf Ventures LLC",
        id: "#BOT-REQ-2025-00123",
        category: "Legal Support",
        created: "10-08-2025",
        submitted: "11-08-2025",
        modified: "11-08-2025",
        status: "On Hold",
    },
];

const reports = [
    {
        title: "Annual Compliance Report",
        id: "#BOT-REP-2025-00087",
        createdOn: "10-08-2025",
        modifiedOn: "11-08-2025",
        month: "August",
        year: "2025",
        submissionDate: "11-08-2025",
        priority: "High",
        status: "On Hold"
    },
    {
        title: "Q2 Performance Review",
        id: "#BOT-REP-2025-00167",
        createdOn: "10-08-2025",
        modifiedOn: "11-08-2025",
        month: "August",
        year: "2025",
        submissionDate: "11-08-2025",
        priority: "Low",
        status: "Completed"
    },
    {
        title: "Financial Audit Summary",
        id: "#BOT-REP-2025-00145",
        createdOn: "10-08-2025",
        modifiedOn: "11-08-2025",
        month: "August",
        year: "2025",
        submissionDate: "11-08-2025",
        priority: "Medium",
        status: "In Progress"
    },
    {
        title: "Annual Compliance Report",
        id: "#BOT-REP-2025-00087",
        createdOn: "10-08-2025",
        modifiedOn: "11-08-2025",
        month: "August",
        year: "2025",
        submissionDate: "11-08-2025",
        priority: "High",
        status: "On Hold"
    }
];


const statusColor = {
    "On Hold": "bg-orange-100 text-orange-600",
    "Completed": "bg-green-100 text-green-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
};

const tabs = [
    { id: 'request', label: 'Bot Request' },
    { id: 'reports', label: 'Bot Reports' },
];

export function ReportsDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {reports.map((req, idx) => (
                <Card key={idx} className="shadow-md p-0">
                    <CardHeader className="flex flex-row justify-between items-center px-6 pt-6 border-b border-gray-300">
                        <div className="flex flex-col">
                            <span className="font-semibold">{req.title}</span>
                            <span className="font-normal text-gray-600">{req.id}</span>
                        </div>
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                                statusColor[req.status  as keyof typeof statusColor]
                            )}
                        >
                            <span className="w-2 h-2 rounded-full bg-current"></span>
                            {req.status}
                        </span>
                    </CardHeader>
                    <div className="px-6 grid grid-cols-2 gap-x-12 mb-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500">Created On</div>
                                <div className="font-medium">{req.createdOn}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Month</div>
                                <div className="font-medium">{req.month}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Submission Date</div>
                                <div className="font-medium">{req.submissionDate}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500">Modified On</div>
                                <div className="font-medium">{req.modifiedOn}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Year</div>
                                <div className="font-medium">{req.year}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Priority</div>
                                <div className="font-medium">{req.priority}</div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export function RequestsDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {requests.map((req, idx) => (
                <Card key={idx} className="shadow-md p-0">
                    <CardHeader className="flex flex-row justify-between items-center px-6 pt-6 border-b border-gray-300">
                        <div className="flex flex-col">
                            <span className="font-semibold">{req.company}</span>
                            <span className="font-normal text-gray-600">{req.id}</span>
                        </div>
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                                statusColor[req.status as keyof typeof statusColor]
                            )}
                        >
                            <span className="w-2 h-2 rounded-full bg-current"></span>
                            {req.status}
                        </span>
                    </CardHeader>
                    <div className="px-6 grid grid-cols-2 gap-x-12 mb-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500">Category</div>
                                <div className="font-medium">{req.category}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Submission Date</div>
                                <div className="font-medium">{req.submitted}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500">Created On</div>
                                <div className="font-medium">{req.created}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Modified On</div>
                                <div className="font-medium">{req.modified}</div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

const BotRequestAndReportsPage = ({selectedBotType = 'request'}) => {
    const { form: activeForm } = useParams()
    const [activeTab, setActiveTab] = useState(selectedBotType);
    const navigate = useNavigate();

    useEffect(() => {
        setActiveTab(selectedBotType);
    }, [selectedBotType]);

    return (
        <div className="">
            <div>
                <h1 className="text-2xl mb-1 font-semibold">Bot Request & Reports</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2">›</span>
                    {activeForm ? <>
                        <Link to="/portal/bot-reports">Bot Request</Link>
                        <span className="mx-2">›</span>
                        <span className="text-maroon-100">{`Add New Bot ${activeForm}`}</span></> :
                        <span className="text-maroon-100">Bot Request</span>}
                </p>
            </div>
            {activeForm ? <>
                {activeForm === 'request' && <RequestForm />}
                {activeForm === 'reports' && <BotReportForm />}
            </> :
                <>
                    <div>
                        <div className="flex flex-wrap gap-3 items-center mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                                <Input placeholder="Search..." className="pl-10 max-w-md bg-background" />
                            </div>
                            <Button variant="outline" onClick={() => navigate(`/portal/bot-reports/${activeTab}`)}>
                                <CirclePlus className="h-4 w-4 mr-2" />
                                {activeTab === 'request' ? 'Add New Bot Request' : 'Add New Bot Response'}
                            </Button>
                            <Button variant="outline" onClick={() => { }}>
                                <Funnel className="w-4 h-4" />
                                <span className="font-medium text-sm">Sort by</span>
                            </Button>
                        </div>
                    </div>
                    <div className="w-full ">
                        <div className="flex bg-white  h-[56px] shadow-md gap-[8px]">
                            {tabs.map((tab) => (
                                <button key={tab.id} className={`py-[10px] mt-[16px]  ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="p-4 w-full bg-[#fcfaf7] rounded-b-lg">
                            <>
                                {activeTab === 'request' && <RequestsDashboard />}
                                {activeTab === 'reports' && <ReportsDashboard />}
                            </>
                        </div>
                    </div></>}
        </div>

    )
}

export default BotRequestAndReportsPage;