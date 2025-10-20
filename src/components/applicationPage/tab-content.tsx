import { CircleArrowRight, Eye, FileSpreadsheet, MoreVertical, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface Application {
    id: string;
    title: string;
    location: string;
    date: string;
    status: string;
    completion?: number;
}

interface TabsContentProps {
    applications: Application[]
}

function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
        case "approved":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "pending":
            return "bg-orange-100 text-orange-600 hover:bg-orange-100"
        case "rejected":
            return "bg-red-100 text-red-600 hover:bg-red-100"
        case "draft":
            return "bg-zinc-100 text-zinc-600 hover:bg-zinc-100"
        default:
            return ""
    }
}

function getPointerColor(status: string) {
    switch (status.toLowerCase()) {
        case "approved":
            return "bg-green-600"
        case "pending":
            return "bg-orange-600"
        case "rejected":
            return "bg-red-600"
        case "draft":
            return "bg-zinc-600"
        default:
            return ""
    }
}


export function TabsContent({ applications }: TabsContentProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {applications.map((app) => (
                <Card key={`${app.id}`} className="relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 border border-[#E4E4E7] rounded-[8px] bg-white flex items-center justify-center">
                                <FileSpreadsheet className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg leading-7 font-medium text-gray-800">{app.id}</span>
                                <h3 className="font-medium text-base text-gray-500">{app.title}</h3>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Badge className={`${getStatusColor(app.status)} border-0 text-xs flex items-center justify-center rounded-2xl px-2 py-1`}>
                                <span className={`${getPointerColor(app.status)} size-1.5 rounded-full mr-1`}></span>
                                <span className="text-xs leading-4 font-medium">{app.status}</span>
                            </Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[190px]">
                                    {app.status !== 'Draft' &&
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <Eye className="h-4 w-4 text-maroon-100" />
                                            View Details
                                        </DropdownMenuItem>}
                                    {app.status === 'Draft' &&
                                        <>
                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <CircleArrowRight className="h-4 w-4 text-maroon-100" />
                                                Continue
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <Trash2 className="h-4 w-4 text-maroon-100" />
                                                Delete
                                            </DropdownMenuItem>
                                        </>
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="-mx-6 border-t border-gray-200"></div>
                        <div className="pt-4 flex justify-start text-sm">
                            <div className="flex flex-col flex-1/2">
                                <div>
                                    <p className="text-gray-500 mb-1">Location</p>
                                    <p className="font-medium text-gray-900">{app.location}</p>
                                </div>
                            </div>
                            <div className="text-left flex-1/2">
                                <p className="text-gray-500 mb-1">Submitted Date</p>
                                <p className="font-medium text-gray-900">{app.date}</p>
                            </div>
                        </div>
                        {app.completion !== undefined && (<div className="flex items-center mt-6 gap-1">
                            <Progress value={app.completion} className="flex h-3 rounded bg-gray-100" />
                            <span className="text-xs text-gray-700 ml-2 whitespace-nowrap">{app.completion}% Completed</span>
                        </div>)}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}