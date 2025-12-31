import { Building2, ChevronsUpDown, CirclePlus, Funnel, ListFilter, Plus, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useApp, type CompanyType } from "@/context/AppContext"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface FilterKeys {
  title: string,
  createNewRequest?: string,
  filterTypes: { id: string, value: string }[]
  applicationFilter?: { id: string, value: string, icon: any }[]
  sortBy?: { id: string, value: string }[]
}

interface CreateAndFilterProps {
  onNewRequest?: () => void
  filterConfig: FilterKeys
  appliedFilter: {
    page: number,
    status?: string,
    typeOfApplication?: string
    searchTerm?: string
    /*******  ====================  Fix this =============================== *******/
    sortBy?: string
  }
  setAppliedFilter: any
  disableStatus?: boolean
  hideFilters?: boolean
  hideStatus?: boolean

}

export const CreateAndFilter = ({
  onNewRequest,
  filterConfig,
  appliedFilter,
  setAppliedFilter,
  disableStatus = false,
  hideFilters = false,
  hideStatus = false,
}: CreateAndFilterProps) => {
  const { companies, selectedCompany, setSelectedCompany } = useApp()
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  if (!(companies.length > 0)) {
    return null;
  }

  if (hideFilters) {
    return (
      <>
        <Card className="flex flex-col gap-4 lg:hidden p-4">
          <h2 className="text-lg leading-7 font-medium text-card-foreground">{filterConfig.title}</h2>
          <div className="flex flex-row gap-3">
            <Select
              value={selectedCompany?.accountID || ''}
              onValueChange={(value) => {
                const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
                selectedValue && setSelectedCompany(selectedValue)
                setAppliedFilter({ ...appliedFilter, page: 1 })
              }}
            >
              <SelectTrigger className="bg-background flex-1 min-w-[100px] cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => {
                  return (
                    <SelectItem
                      key={company.accountID}
                      value={company.accountID}
                      className={
                        company.accountID === selectedCompany?.accountID
                          ? "text-maroon-100!"
                          : ""
                      }
                    >
                      {company.englishName}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </Card>
        <div className="hidden lg:flex flex-row items-center justify-between gap-2">
          <div></div>
          <div>
            <Select
              value={selectedCompany?.accountID || ''}
              onValueChange={(value) => {
                const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
                selectedValue && setSelectedCompany(selectedValue)
                setAppliedFilter({ ...appliedFilter, page: 1 })
              }}
            >
              <SelectTrigger className="bg-background cursor-pointer">
                <Building2 className="h-4 w-4 mr-2 text-foreground" />
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent align="end">
                {companies.map((company) => {
                  return (
                    <SelectItem
                      key={company.accountID}
                      value={company.accountID}
                      className={
                        company.accountID === selectedCompany?.accountID
                          ? "text-maroon-100!"
                          : ""
                      }
                    >
                      {company.englishName}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="">

      {/* Mobile View */}
      <Card className="flex flex-col gap-4 lg:hidden p-4">
        <h2 className="text-lg leading-7 font-medium text-card-foreground">{filterConfig.title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
            <Input
              placeholder={t('search')}
              className="pl-10 bg-background cursor-pointer"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setAppliedFilter((prev: any) => ({
                    ...prev,
                    page: 1,
                    searchTerm: searchText
                  }))
                }
              }}
            />
            {searchText && (
              <Button
                type="button"
                onClick={() => {
                  setSearchText("")
                  setAppliedFilter((prev: any) => ({
                    ...prev,
                    page: 1,
                    searchTerm: searchText
                  }))
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon-100 cursor-pointer"
              >
                <X className="h-4 w-4 text-maroon-100" />
              </Button>
            )}

          </div>
          {filterConfig?.createNewRequest && <Button
            size="icon"
            className="bg-white hover:bg-zinc-50 text-black rounded-md border cursor-pointer"
            onClick={onNewRequest}
          >
            <Plus className="h-5 w-5" />
          </Button>}
          {!hideStatus && <Popover>
            <PopoverTrigger asChild className="cursor-pointer">
              <Button
                size="icon"
                className="bg-white text-black hover:bg-zinc-50 rounded-md border cursor-pointer"
                disabled={disableStatus}
              >
                <ListFilter className="h-5 w-5" />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-fit p-1">
              <Command>
                <CommandList className="max-h-48 overflow-y-auto">
                  <CommandGroup>
                    {filterConfig.filterTypes.map((option: any) => {
                      const selectedIds = appliedFilter.status
                        ? appliedFilter.status.split(",")
                        : [];

                      const isChecked = selectedIds.includes(option.id);

                      return (
                        <CommandItem
                          key={option.id}
                          onSelect={() => {
                            let updated;
                            if (isChecked) {
                              updated = selectedIds.filter((v: any) => v !== option.id);
                            } else {
                              updated = [...selectedIds, option.id];
                            }

                            const updatedValue = updated.join(",");

                            setAppliedFilter((prev: any) => ({
                              ...prev,
                              page: 1,
                              status: updatedValue,
                            }));
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={isChecked}
                              className="data-[state=checked]:bg-maroon-100 data-[state=checked]:border-gray-800"
                            />
                            <span>{t(option.value)}</span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>}

        </div>

        {/* Company Dropdown */}
        <div className="flex flex-row gap-3">
          {filterConfig?.applicationFilter && filterConfig?.applicationFilter?.length > 0 &&
            <Select
              value={appliedFilter?.typeOfApplication || ''}
              onValueChange={(value) => {
                setAppliedFilter({ ...appliedFilter, page: 1, typeOfApplication: value })
              }}
            >
              <SelectTrigger className="bg-background data-[placeholder]:text-foreground flex-1 min-w-[100px] cursor-pointer">
                <SelectValue placeholder={t("application_type")} />
              </SelectTrigger>
              <SelectContent>
                {filterConfig.applicationFilter.map((application: { id: string, value: string, icon: any }) => (
                  <SelectItem value={application.id}>
                    <application.icon className="text-maroon-100" />
                    {application.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
          <Select
            value={selectedCompany?.accountID || ''}
            onValueChange={(value) => {
              const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
              selectedValue && setSelectedCompany(selectedValue)
              setAppliedFilter({ ...appliedFilter, page: 1 })
            }}
          >
            <SelectTrigger className="bg-background flex-1 min-w-[100px] cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => {
                return (
                  <SelectItem
                    key={company.accountID}
                    value={company.accountID}
                    className={
                      company.accountID === selectedCompany?.accountID
                        ? "text-maroon-100!"
                        : ""
                    }
                  >
                    {company.englishName}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {(appliedFilter?.status || appliedFilter?.searchTerm || appliedFilter?.typeOfApplication) && (
            <Button
              variant="ghost"
              className="text-sm text-zinc-600 hover:text-zinc-70 px-3 cursor-pointer"
              onClick={() => {
                setSearchText("")
                setAppliedFilter({ page: 1 })
              }}
            >
              {t('clear_filter')}
            </Button>
          )}
        </div>
      </Card>

      {/* Desktop View */}
      <div className="hidden lg:flex flex-row items-center justify-between gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
          <Input
            placeholder={t('search')}
            className="pl-10 pr-10 bg-background cursor-pointer"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setAppliedFilter((prev: any) => ({
                  ...prev,
                  page: 1,
                  searchTerm: searchText
                }))
              }
            }}
          />

          {searchText && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSearchText("")
                setAppliedFilter((prev: any) => ({
                  ...prev,
                  page: 1,
                  searchTerm: ""
                }))
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon-100 cursor-pointer"
            >
              <X className="h-4 w-4 text-maroon-100" />
            </Button>
          )}

        </div>
        <div className="flex gap-2">
          {filterConfig?.createNewRequest &&
            <Button
              className="text-zinc-900 bg-white hover:bg-gray-100 cursor-pointer font-medium"
              onClick={onNewRequest}
            >
              <CirclePlus className="h-4 w-4 mr-2" />
              {t(filterConfig.createNewRequest)}
            </Button>}
          {filterConfig?.applicationFilter && filterConfig?.applicationFilter?.length > 0 &&
            <Select
              value={appliedFilter?.typeOfApplication || ''}
              onValueChange={(value) => {
                setAppliedFilter({ ...appliedFilter, page: 1, typeOfApplication: value })
              }}
            >
              <SelectTrigger className="bg-background data-[placeholder]:text-zinc-900 font-medium text-zinc-900 cursor-pointer ">
                <SelectValue placeholder={t("application_type")} />
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
              setAppliedFilter({ ...appliedFilter, page: 1 })
            }}
          >
            <SelectTrigger className="bg-background font-medium text-zinc-900 cursor-pointer">
              <Building2 className="h-4 w-4 mr-2 text-foreground" />
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent align="end">
              {companies.map((company) => {
                return (
                  <SelectItem
                    key={company.accountID}
                    value={company.accountID}
                    className={
                      company.accountID === selectedCompany?.accountID
                        ? "text-maroon-100!"
                        : ""
                    }
                  >
                    {company.englishName}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {!hideStatus && <Popover>
            <PopoverTrigger asChild className="text-zinc-900 cursor-pointer">
              <Button
                variant="outline"
                role="combobox"
                className={`justify-between w-fit`}
                disabled={disableStatus}
              >
                {appliedFilter?.status
                  ? `${t('status')} ${filterConfig.filterTypes!
                    .filter((opt: any) =>
                      appliedFilter?.status?.split(",").includes(opt.id)
                    )
                    .map((opt: any) => opt.value).length}`
                  : t("status")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-fit p-1"
            >
              <Command>
                <CommandList className="max-h-48 overflow-y-auto">
                  <CommandGroup>
                    {filterConfig.filterTypes.map((option: any) => {
                      const selectedIds = appliedFilter.status
                        ? appliedFilter.status.split(",")
                        : []
                      const isChecked = selectedIds.includes(option.id)

                      return (
                        <CommandItem
                          key={option.id}
                          onSelect={() => {
                            let updated
                            if (isChecked) {
                              updated = selectedIds.filter((v: any) => v !== option.id)
                            } else {
                              updated = [...selectedIds, option.id]
                            }

                            // Convert to comma-separated string
                            const updatedValue = updated.join(",")

                            setAppliedFilter((prev: any) => (
                              {
                                ...prev,
                                page: 1,
                                status: updatedValue
                              }))
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={isChecked}
                              className={`data-[state=checked]:bg-maroon-100 data-[state=checked]:border-gray-800`}
                            />
                            <span>{t(option.value)}</span>
                          </div>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>}
          {filterConfig?.sortBy && filterConfig.sortBy.length > 0 && (
            <Select
              value={appliedFilter?.sortBy || ""}
              onValueChange={(value) => {
                setAppliedFilter({
                  ...appliedFilter,
                  page: 1,
                  sortBy: value,
                })
              }}
            >
              <SelectTrigger className="bg-background data-[placeholder]:text-foreground font-medium text-zinc-900 cursor-pointer">
                <SelectValue placeholder={
                  <>
                    <Funnel className="text-zinc-900" />
                    {t("sort_by")}
                  </>
                } />
              </SelectTrigger>
              <SelectContent>
                {filterConfig?.sortBy?.map((sort: any) => (
                  <SelectItem key={sort.id} value={sort.id}>
                    {t(sort.value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {(appliedFilter?.status || appliedFilter?.searchTerm || appliedFilter?.typeOfApplication || appliedFilter?.sortBy) && (
            <Button
              variant="ghost"
              className="text-sm text-zinc-600 hover:text-zinc-70 px-3 cursor-pointer"
              onClick={() => {
                setSearchText("")
                setAppliedFilter({ page: 1 })
              }}
            >
              {t('clear_filter')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
