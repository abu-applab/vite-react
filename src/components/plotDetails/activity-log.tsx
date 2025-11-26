
import { EyeIcon, UserIcon, Filter, Search, CheckCheck, File, MessageCircle, Wallet, Building, Calendar, Ellipsis, } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Card, CardHeader, CardTitle } from "../ui/card";

const colorVariants: Record<string, string> = {
    red: "bg-red-50 border border-red-200",
    blue: "bg-blue-50 border border-blue-200",
    green: "bg-green-50 border border-green-200",
    yellow: "bg-yellow-50 border border-yellow-200",
    purple: "bg-purple-50 border border-purple-200",
    pink: "bg-pink-50 border border-pink-200",
}

const records = [
    {
        id: 1,
        title: "Plot Status Updated",
        description: `Plot status changed to "Completed". Stakeholders notified.`,
        author: "System Admin",
        date: "29/07/2025 at 14:30",
        icon: <CheckCheck className="h-5 w-5 text-green-600" />,
        color: 'green'
    },
    {
        id: 2,
        title: "Completion Certificate Uploaded",
        description: "Development phase completion document uploaded for review.",
        author: "Salman Hameed",
        date: "28/07/2025 at 11:50",
        icon: <File className="h-5 w-5 text-blue-600" />,
        color: 'blue'
    },
    {
        id: 3,
        title: "Fire Exit Finding Response",
        description: "Site supervisor confirmed blockage cleared with photo evidence.",
        author: "Site Supervisor",
        date: "25/07/2025 at 09:45",
        icon: <MessageCircle className="h-5 w-5 text-purple-600" />,
        color: 'purple'

    },
    {
        id: 4,
        title: "Payment Processed - QAR 15,000",
        description: "Project owner payment received. ID: PAY-QHSE-1425",
        author: "Project Owner",
        date: "20/07/2025 at 16:20",
        icon: <Wallet className="h-5 w-5 text-yellow-600" />,
        color: 'yellow'
    },
    {
        id: 5,
        title: "Monthly Safety Inspection",
        description: "Safety inspection completed. 2 minor findings identified.",
        author: "Safety Inspector",
        date: "18/07/2025 at 10:00",
        icon: <Building className="h-5 w-5 text-red-600" />,
        color: 'red'
    },
    {
        id: 6,
        title: "Quarterly Project Review",
        description: "Stakeholder meeting held. Progress and milestones reviewed.",
        author: "Project Manager",
        date: "15/07/2025 at 13:30",
        icon: <Calendar className="h-5 w-5 text-pink-600" />,
        color: 'pink'
    },
];

export default function ActivityList() {
    return (
        <div className="mx-auto space-y-4">
            <div className="flex gap-2 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                    <Input placeholder="Search..." className="pl-10 max-w-md bg-background" />
                </div>
                <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {records.map((item) => (
                    <Card key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors p-2">
                        <CardHeader className="flex flex-row items-start justify-between p-4">
                            <div className="flex flex-row gap-4">
                                <div className={`h-10 w-10 p-2 rounded-lg ${colorVariants[item.color]}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <CardTitle className="text-base font-semibold text-gray-900">
                                        {item.title}
                                    </CardTitle>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <UserIcon className="h-4 w-4" />
                                            <span>{item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <time dateTime={item.date}>{item.date}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="p-1 hover:bg-gray-200 rounded-full">
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>View</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="p-1 hover:bg-gray-200 rounded-full">
                                                <Ellipsis className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>More</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
