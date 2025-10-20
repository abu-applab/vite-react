import { CirclePlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceHeaderProps {
  onNewRequest: () => void
}

const companies = [
  'Al Noor Real Estate',
  'Qatar International Islamic Bank',
  'Mesaieed Petrochemical Holding Company',
  'Ezdan Holding Group',
];

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
        <Select defaultValue="">
          <SelectTrigger className="w-32 bg-background data-[placeholder]:text-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending Request Fees</SelectItem>
            <SelectItem value="completed">Cancelled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="pending">Pending Work</SelectItem>
            <SelectItem value="pending">Pending Investor Update</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
