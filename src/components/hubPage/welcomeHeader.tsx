import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from "../../assets/images/Avatar.svg"
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useApp } from '@/context/AppContext'

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
    const {setCompaniesFilter, companiesFilter} = useApp();

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:items-start">
                    <div className="flex items-center gap-4 max-md:flex-row max-md:items-start">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" />
                            <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Hello, Mushthtofa Ahmad Kamal</h1>
                            <p className="text-sm text-gray-600">Stay informed and manage your investments seamlessly</p>
                        </div>
                    </div>
                    <Button className="bg-maroon-100 hover:text-white max-md:w-full" onClick={() => setIsAddNewCompany(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Company
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
                    <Select 
                       value={companiesFilter?.status ?? ''}
                       onValueChange={(val) => {
                          setCompaniesFilter((prev) => ({
                            ...prev,
                            page: 1,
                            status: val
                          }))
                       }}
                       >
                        <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {filterKeys.status.map((sts) => <SelectItem value={sts.id}>
                                {sts.value}
                            </SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <p className="text-base text-neutral-500 mt-4">{`Showing ${currentCompanies} of ${totalCompanies} companies`}</p>
            </CardContent>
        </Card>
    )
}

export default WelcomeHeader