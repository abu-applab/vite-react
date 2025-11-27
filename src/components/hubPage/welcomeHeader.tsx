import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { ChevronsUpDown, Plus, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useApp } from '@/context/AppContext'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command } from 'cmdk'
import { CommandGroup, CommandItem, CommandList } from '../ui/command'
import { Checkbox } from '../ui/checkbox'

interface WelcomeHeaderProps {
    setIsAddNewCompany: Dispatch<SetStateAction<boolean>>
    totalCompanies: number
    currentCompanies: number
}

const filterKeys = {
    status: [
        { id: 'active', value: 'Active' },
        { id: 'inactive', value: 'Inactive' },
    ]
}

const WelcomeHeader = ({ setIsAddNewCompany, totalCompanies, currentCompanies }: WelcomeHeaderProps) => {
    const [searchText, setSearchText] = useState("");
    const { setCompaniesFilter, companiesFilter, contact } = useApp();
    const { t } = useTranslation();

    const fullName = `${contact?.firstName} ${contact?.lastName}`
    const initials = `${contact?.firstName.charAt(0)}${contact?.lastName.charAt(0)}`.toUpperCase();


    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:items-start max-md:gap-3">
                    <div className="flex items-center gap-4 max-md:flex-row max-md:items-start">
                        <Avatar className="h-12 w-12 text-maroon-100">
                            {/* <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" /> */}
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">{`Hello, ${fullName}`}</h1>
                            <p className="text-sm text-gray-600">{t('Stay_informed_desc')}</p>
                        </div>
                    </div>
                    <Button className="bg-maroon-100 hover:bg-maroon-100 hover:text-white max-md:w-full" onClick={() => setIsAddNewCompany(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        {t('add_new_company')}
                    </Button>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                        <Input
                            placeholder="Search..."
                            className="pl-10 bg-background"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setCompaniesFilter((prev: any) => ({
                                        ...prev,
                                        page: 1,
                                        searchTerm: searchText
                                    }))
                                }
                            }}
                        />
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={`justify-between w-fit`}
                            >
                                {companiesFilter?.status
                                    ? `${t('status')} ${filterKeys.status!
                                        .filter((opt: any) =>
                                            companiesFilter?.status?.split(",").includes(opt.id)
                                        )
                                        .map((opt: any) => opt.value).length}`
                                    : t("status")}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent align="start" className="w-fit p-1">
                            <Command>
                                <CommandList className="max-h-48 overflow-y-auto">
                                    <CommandGroup>
                                        {filterKeys.status.map((option: any) => {
                                            const selectedIds = companiesFilter.status
                                                ? companiesFilter?.status?.split(",")
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

                                                        setCompaniesFilter((prev: any) => ({
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
                    </Popover>
                    {(companiesFilter?.status || companiesFilter?.searchTerm) && (
                        <Button
                            variant="ghost"
                            className="text-sm text-zinc-600 hover:text-zinc-70 p-0"
                            onClick={() => {
                                setSearchText("")
                                setCompaniesFilter({ page: 1 })
                            }}
                        >
                            {t('clear_filter')}
                        </Button>
                    )}
                </div>
                <p className="text-base text-neutral-500 mt-4">{`Showing ${currentCompanies} of ${totalCompanies} companies`}</p>
            </CardContent>
        </Card>
    )
}

export default WelcomeHeader