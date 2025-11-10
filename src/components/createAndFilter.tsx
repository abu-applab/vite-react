import { Building2, CirclePlus, ListFilter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useApp, type CompanyType } from "@/context/AppContext"

interface FilterKeys {
  title: string,
  createNewRequest: string,
  filterTypes: { id: string, value: string }[]
  applicationFilter?: { id: string, value: string, icon: any }[]
}

interface CreateAndFilterProps {
  onNewRequest: () => void
  filterConfig: FilterKeys
}

export const CreateAndFilter = ({ onNewRequest, filterConfig }: CreateAndFilterProps) => {
  const { companies, selectedCompany, setSelectedCompany } = useApp()
  return (
    <div className="">

      {/* Mobile View */}
      <Card className="flex flex-col gap-4 md:hidden p-4">
        <h2 className="text-lg leading-7 font-medium text-card-foreground">{filterConfig.title}</h2>
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
            <ListFilter className="h-5 w-5" />
          </Button>
        </div>

        {/* Company Dropdown */}
        <div className="flex flex-row gap-3">
        {filterConfig?.applicationFilter && filterConfig?.applicationFilter?.length > 0 && <Select>
            <SelectTrigger className="bg-background data-[placeholder]:text-foreground flex-1 min-w-[100px]">
              <SelectValue placeholder="Application type" />
            </SelectTrigger>
            <SelectContent>
              {filterConfig.applicationFilter.map((application: { id: string, value: string, icon: any }) => (
                <SelectItem value={application.id}>
                  <application.icon className="text-maroon-100" />
                  {application.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>}
        <Select defaultValue={selectedCompany?.accountID}>
          <SelectTrigger className="bg-background flex-1 min-w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.accountID} value={company.accountID}>
                {company.englishName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
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
            {filterConfig.createNewRequest}
          </Button>
          {filterConfig?.applicationFilter && filterConfig?.applicationFilter?.length > 0 && <Select defaultValue="">
            <SelectTrigger className="bg-background data-[placeholder]:text-foreground">
              <SelectValue placeholder="Application type" />
            </SelectTrigger>
            <SelectContent>
              {filterConfig.applicationFilter.map((application: { id: string, value: string, icon: any }) => (
                <SelectItem value={application.id}>
                  <application.icon className="text-maroon-100" />
                  {application.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>}
          <Select
            value={selectedCompany?.accountID || ''}
            onValueChange={(value) => {
              const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
              selectedValue && setSelectedCompany(selectedValue)
            }}
          >
            <SelectTrigger className="bg-background">
              <Building2 className="h-4 w-4 mr-2 text-foreground" />
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.accountID} value={company.accountID}>
                  {company.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="">
            <SelectTrigger className="bg-background data-[placeholder]:text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {filterConfig.filterTypes.map((filterType: { id: string, value: string }) => (
                <SelectItem value={filterType.id}>{filterType.value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
