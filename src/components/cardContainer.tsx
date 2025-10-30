import { Building2, CircleAlert, Eye, MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useApp } from "@/context/AppContext"
import { cn } from "@/lib/utils"

function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
        case "approved":
        case "active":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "in progress":
        case "pending":
            return "bg-orange-100 text-orange-600 hover:bg-orange-100"
        case "rejected":
            return "bg-red-100 text-red-600 hover:bg-red-100"
        default:
            return ""
    }
}

function getPointerColor(status: string) {
    switch (status.toLowerCase()) {
        case "approved":
        case "active":
            return "bg-green-600"
        case "in progress":
        case "pending":
            return "bg-orange-600"
        case "rejected":
            return "bg-red-600"
        default:
            return ""
    }
}

export const cardContainerConfig = {
    icon: Building2,
    id: "accountID",
    title: "englishName",
    status: 'status',
    fields: [
        {
            label: "Total Plots",
            key: "plotNumber",
        },
        {
            label: "Main Contact",
            key: "contactName",
        },
        {
            label: "Phone Number",
            key: "phone",
        },
        {
            label: "Mail",
            key: "email",
        },
    ]
}

const alerts= [
    {
      id: '1',
      title: "Some Documents Missing",
      type: "warning"
    },
    {
        id: '2',
        title: "Payment Overdue",
        type: "warning"
      }
  ]


export const CardContainer = () => {
    const { contactName, companies } = useApp();
    console.log('companies: ', companies);
    console.log('contactName: ', contactName);
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {companies.map((company) => (
                <Card key={company[cardContainerConfig.id as keyof typeof company]} className="relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 border border-[#E4E4E7] rounded-[8px] bg-white flex items-center justify-center">
                                <cardContainerConfig.icon className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center justify-start gap-2">
                                    <span className="text-lg leading-7 font-medium text-gray-800">{company[cardContainerConfig.title as keyof typeof company]}</span>
                                    <Badge className={`${getStatusColor(company[cardContainerConfig.status as keyof typeof company] ?? '')} md:hidden border-0 text-xs flex items-center justify-center rounded-2xl px-2 py-1`}>
                                        <span className={`size-1.5 ${getPointerColor(company[cardContainerConfig.status as keyof typeof company] ?? '')} rounded-full mr-1`}></span>
                                        <span className="text-xs leading-4 font-medium">{company[cardContainerConfig.status as keyof typeof company]}</span>
                                    </Badge>
                                </div>
                                <h3 className="font-medium text-base text-gray-500">{company[cardContainerConfig.id as keyof typeof company]}</h3>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Badge className={`${getStatusColor(company[cardContainerConfig.status as keyof typeof company] ?? '')} border-0 text-xs md:flex items-center justify-center rounded-2xl px-2 py-1 hidden`}>
                                <span className={`size-1.5 ${getPointerColor(company[cardContainerConfig.status as keyof typeof company] ?? '')} rounded-full mr-1`}></span>
                                <span className="text-xs leading-4 font-medium">{company[cardContainerConfig.status as keyof typeof company]}</span>
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
                        <div className="pt-4 flex flex-col md:flex-wrap md:flex-row justify-between text-sm">
                            {
                                cardContainerConfig.fields.map((field, index) => {
                                    const isOdd = index % 2 === 0;
                                    return (
                                        <div className={cn("flex flex-row items-center justify-between md:block md:w-1/2 md:mb-3", { "text-right": !isOdd })}>
                                            <p className="text-gray-500 mb-1">{field.label}</p>
                                            <p className="font-medium text-gray-900">{company[field.key as keyof typeof company]}</p>
                                        </div>
                                    )
                                })
                            }
                            {alerts.length > 0 && (
                                <div className={`grid w-full ${alerts.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} mt-1 gap-2.5`}>
                                    {
                                        alerts.map(({ title, id, type }) => {
                                            return (
                                                <div key={id} className={`flex flex-row items-center justify-center gap-2 ${type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'} px-4 py-1.5 rounded-lg`}>
                                                    <CircleAlert />
                                                    <p>{title}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
