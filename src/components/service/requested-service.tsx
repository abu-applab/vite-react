import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"


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

export function RequestedService({ request }: RequestedServiceProps) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <h3 className="font-semibold text-gray-900">#{request.id}</h3>
        <Button variant="outline" size="sm" className="text-sm bg-transparent">
          View Details
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Plot Number</p>
            <p className="font-medium text-gray-900">{request.plotNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Service Type</p>
            <p className="font-medium text-gray-900">{request.serviceType}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Submitted Date</p>
            <p className="font-medium text-gray-900">{request.submittedDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-gray-900">{request.status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
