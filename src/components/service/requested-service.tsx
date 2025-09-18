import { Eye, MessageSquareDot, MoreVertical } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Badge } from "../ui/badge"


interface RequestedService {
  id: string
  plotNumber: string
  serviceType: string
  submittedDate: string
  status: string
}

interface RequestedServiceProps {
  request: RequestedService
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "in progress":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "rejected":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return ""
  }
}

export function RequestedService({ request }: RequestedServiceProps) {
  return (
    <Card key={`${request.id}`} className="relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <MessageSquareDot className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">1902</span>
            <h3 className="font-medium text-base text-gray-900">{request.serviceType}</h3>
          </div>
        </div>
        <div className="flex items-center">
          <Badge className={`${getStatusColor(request.status)} border-0 text-xs flex flex-row items-center justify-center rounded-2xl px-2`}>
            <span className="text-xl">•</span>
            <span>{request.status}</span>
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
        <div className="pt-4 flex justify-between text-sm">
          <div className="flex flex-col">
            <div>
              <p className="text-gray-500 mb-1">Plot Number</p>
              <p className="font-medium text-gray-900">{request.plotNumber}</p>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 mb-1">Service Type</p>
              <p className="font-medium text-gray-900">{request.serviceType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 mb-1">Submitted Date</p>
            <p className="font-medium text-gray-900">{request.submittedDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
