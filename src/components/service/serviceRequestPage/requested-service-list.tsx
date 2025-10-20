import { Eye, MessageSquareDot, MoreVertical } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader } from "../../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Badge } from "../../ui/badge"

interface RequestedServiceListProps {
    services: any[]
}

function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
        case "approved":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "in progress":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "rejected":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        default:
            return ""
    }
}

export const RequestedServiceList = ({ services }: RequestedServiceListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {services.map((request) => (
                <Card key={`${request.id}`} className="relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 border border-[#E4E4E7] rounded-[8px] bg-white flex items-center justify-center">
                                <MessageSquareDot className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center justify-start gap-2">
                                    <span className="text-lg leading-7 font-medium text-gray-800">1902</span>
                                    <Badge className={`${getStatusColor(request.status)} md:hidden border-0 text-xs flex items-center justify-center rounded-2xl px-2 py-1`}>
                                        <span className="size-1.5 bg-green-600 rounded-full mr-1"></span>
                                        <span className="text-xs leading-4 font-medium">{request.status}</span>
                                    </Badge>
                                </div>
                                <h3 className="font-medium text-base text-gray-500">{request.serviceType}</h3>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Badge className={`${getStatusColor(request.status)} border-0 text-xs md:flex items-center justify-center rounded-2xl px-2 py-1 hidden`}>
                                <span className="size-1.5 bg-green-600 rounded-full mr-1"></span>
                                <span className="text-xs leading-4 font-medium">{request.status}</span>
                            </Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        View Details
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="-mx-6 border-t border-gray-200"></div>
                        <div className="pt-4 flex flex-col md:flex-row justify-between text-sm">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-between md:block">
                                    <p className="text-gray-500 mb-1">Plot Number</p>
                                    <p className="font-medium text-gray-900">{request.plotNumber}</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-row items-center justify-between md:block">
                                <p className="text-gray-500 mb-1">Submitted Date</p>
                                <p className="font-medium text-gray-900">{request.submittedDate}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
