import { Building2, CirclePlus, ListFilter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

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
    <div className="">

      {/* Mobile View */}
      <Card className="flex flex-col gap-4 md:hidden p-4">
        <h2 className="text-lg leading-7 font-medium text-card-foreground">Service Request</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
            <Input placeholder="Search..." className="pl-10 bg-background" />
          </div>
          <Button
            size="icon"
            className="bg-white hover:bg-zinc-50 text-black rounded-md border cursor-pointer"
            onClick={onNewRequest}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="bg-white text-black hover:bg-zinc-50 rounded-md border cursor-pointer"
          >
            <ListFilter  className="h-5 w-5" />
          </Button>
        </div>

        {/* Company Dropdown */}
        <Select defaultValue="Al Noor Real Estate">
          <SelectTrigger className="bg-background w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company, index) => (
              <SelectItem key={index} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Desktop View */}
      <div className="hidden md:flex flex-row items-center justify-between gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
          <Input placeholder="Search..." className="pl-10 bg-background" />
        </div>
        <div className="flex gap-2">
          <Button
            className="text-black bg-white hover:bg-gray-100 cursor-pointer"
            onClick={onNewRequest}
          >
            <CirclePlus className="h-4 w-4 mr-2" />
            New Service Request
          </Button>
          <Select defaultValue="Al Noor Real Estate">
            <SelectTrigger className="bg-background">
             <Building2 className="h-4 w-4 mr-2 text-foreground" />
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
            <SelectTrigger className="bg-background data-[placeholder]:text-foreground">
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
    </div>
  )
}
