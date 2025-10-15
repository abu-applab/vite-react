import { CirclePlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceHeaderProps {
  onNewRequest: () => void
}

export const ServiceHeader = ({ onNewRequest }: ServiceHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
        <Input placeholder="Search..." className="pl-10 bg-background" />
      </div>
      <div className="flex gap-2">
        <Button
          className="text-black bg-white hover:bg-gray-100"
          onClick={onNewRequest}
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          New Service Request
        </Button>
        <Select defaultValue="">
          <SelectTrigger className="w-48 bg-background">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="al-noor">Al Noor Real Estate W.L.L</SelectItem>
            <SelectItem value="qatar-bank">Qatar International Islamic Bank</SelectItem>
            <SelectItem value="mesaieed">Mesaieed Petrochemical Holding Company</SelectItem>
            <SelectItem value="ezdan">Ezdan Holding Group</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-32 bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
