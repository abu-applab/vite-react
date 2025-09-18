import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Building2, Search } from "lucide-react"
import { Link } from "react-router-dom";


const companies = [
    'Al Noor Real Estate',
    'Qatar International Islamic Bank',
    'Mesaieed Petrochemical Holding Company',
    'Ezdan Holding Group',
];

const statuses = [
    'Pending',
    'Approved',
    'Rejected',
    'In Progress',
    'Completed'
];

const issues = [
    {
        id: "#QH20257A - 25/07/2025",
        tag: "QHSE",
        plotNumber: "ME-IZ-LE-17356",
        finding: "Fire exit blocked with furniture",
        notifiedDate: "26/07/2025",
        dueDate: "10/08/2025",
        status: "Open",
        daysRemaining: "2-6 days remaining",
    },
    {
        id: "#QH20257A - 25/07/2025",
        tag: "Operations",
        plotNumber: "ME-IZ-LE-17356",
        finding: "Fire exit blocked with furniture",
        notifiedDate: "26/07/2025",
        dueDate: "10/08/2025",
        status: "Open",
        daysRemaining: "2-6 days remaining",
    },
    {
        id: "#QH20257A - 25/07/2025",
        tag: "Operations",
        plotNumber: "ME-IZ-LE-17356",
        finding: "Fire exit blocked with furniture",
        notifiedDate: "26/07/2025",
        dueDate: "10/08/2025",
        status: "Open",
        daysRemaining: "2-6 days remaining",
    },
    {
        id: "#QH20257A - 25/07/2025",
        tag: "QHSE",
        plotNumber: "ME-IZ-LE-17356",
        finding: "Fire exit blocked with furniture",
        notifiedDate: "26/07/2025",
        dueDate: "10/08/2025",
        status: "Open",
        daysRemaining: "2-6 days remaining",
    },
];

const ViolationPage = () => {

    return (
        <div className="mx-[80px] mt-10">
            <div>
                <h1 className="text-2xl mb-1 font-semibold">Violations Reports</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-maroon-100">All Violations Reports</span>
                </p>
            </div>
            <div>
                <div className="flex flex-wrap gap-3 items-center mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                        <Input placeholder="Search..." className="pl-10 max-w-md bg-background" />
                    </div>
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
                        <SelectContent>
                            {statuses.map((status, index) => (
                                <SelectItem key={index} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-8xl w-full">
                    {issues.map((issue, idx) => (
                        <Card key={idx} className="rounded-xl  border border-gray-200 shadow-sm">
                            <div className="px-6 border-b border-gray-300" >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-4">
                                    <h4 className="font-medium text-lg">{issue.id}</h4>
                                    <Badge variant="outline" className="text-xs rounded-full text-gray-500">
                                        {issue.tag}
                                    </Badge>
                                </div>
                                <Badge
                                    className="bg-red-100 text-red-500 text-xs font-normal rounded-full flex items-center gap-1"
                                    style={{ minWidth: 56 }}
                                >
                                    <span className="h-2 w-2 rounded-full bg-red-500" />
                                    {issue.status}
                                </Badge>
                            </div>
                            </div>
                            <div className="px-6 grid grid-cols-2 gap-x-12 text-sm">
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-gray-500">Plot Number</p>
                                        <p className="font-medium">{issue.plotNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Notified Date</p>
                                        <p className="font-medium">{issue.notifiedDate}</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-gray-500">Finding</p>
                                        <p className="font-medium">{issue.finding}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Due Date</p>
                                        <p className="font-medium">{issue.dueDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-50 rounded-sm mx-6 p-2 flex justify-center items-center text-red-600 text-xs gap-2">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                <span>{issue.daysRemaining}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViolationPage;