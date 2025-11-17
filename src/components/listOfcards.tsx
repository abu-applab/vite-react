import { MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { ElementType } from "react"

interface CardConfig {
    icon: ElementType,
    id: string,
    subTitle?: string,
    title: string,
    status?: string,
    fields: {
        label: string
        key: string
    }[],
    menuOptions?: {
        label: string
        icon?: ElementType
        onClick?: (data: any) => void
    }[]
}

interface ListOfCardsProps {
    cardsConfig: CardConfig
    cardsData: any[]
    showAlerts?: boolean
    isProducts?: boolean
}

function getStatusColor(status: string) {
    switch (status.toLowerCase().trim()) {
        case '939330004': //Draft
        case 'draft':
            return "bg-zinc-200 text-zinc-600 hover:bg-zinc-200"
        case '939330001': //Review In progress
        case 'review in progress': //Review In progress
        case '939330005': //Pending submit transfer
        case '939330006': //On hold
        case 'submitted': //submitted
            return "bg-orange-100 text-orange-600 hover:bg-orange-200"
        case "939330002": // approved
        case "active":
        case "approved":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "in progress":
        case "pending":
        case "In Progress - قيد الإجراء":
        case "Pending Work -في إنتظار السحب":
            return "bg-orange-100 text-orange-600 hover:bg-orange-100"
        case "939330003": // rejected
        case "939330007": // cancelled
        case "939330008": // Terminated
        case "inactive":
            return "bg-red-100 text-red-600 hover:bg-red-100"
        default:
            return "bg-orange-100 text-orange-600 hover:bg-orange-100"
    }
}

function getPointerColor(status: string) {
    switch (status.toLowerCase()) {
        case '939330004': //Draft
        case 'draft': //Draft
            return "bg-zinc-600"
        case '939330001': //Review In progress
        case 'review in progress': //Review In progress
        case '939330005': //Pending submit transfer
        case '939330006': //On hold
        case 'submitted': //submitted
            return "bg-orange-600"
        case "939330002":  //approved
        case "active":
        case "approved":
            return "bg-green-600"
        case "in progress":
        case "pending":
        case "In Progress - قيد الإجراء":
            return "bg-orange-600"
        case "939330003": // rejected
        case "939330007": // cancelled
        case "939330008": // Terminated
        case "inactive":
            return "bg-red-600"
        default:
            return "bg-orange-600"
    }
}


const ListOFCards = ({ cardsConfig, cardsData, isProducts = false }: ListOfCardsProps) => {
    return (

        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 mt-8", { 'md:grid-cols-1': isProducts })}>
            {cardsData.map((data) => (
                <Card key={data[cardsConfig.id as keyof typeof data]} className="relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 border border-[#E4E4E7] rounded-[8px] bg-white flex items-center justify-center">
                                <cardsConfig.icon className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center justify-start gap-2">
                                    <span className="text-lg leading-7 font-medium text-gray-800">{data[cardsConfig.title as keyof typeof data]}</span>
                                    {cardsConfig.status && <Badge className={`${getStatusColor(data[cardsConfig.status as keyof typeof data] ?? '')} md:hidden border-0 text-xs flex items-center justify-center rounded-2xl px-2 py-1`}>
                                        <span className={`size-1.5 ${getPointerColor(data[cardsConfig.status as keyof typeof data] ?? '')} rounded-full mr-1`}></span>
                                        <span className="text-xs leading-4 font-medium">{data[cardsConfig.status as keyof typeof data]}</span>
                                    </Badge>}
                                </div>
                                {cardsConfig.subTitle && <h3 className="font-medium text-base text-gray-500">{data[cardsConfig.subTitle as keyof typeof data]}</h3>}
                            </div>
                        </div>
                        <div className="flex items-center">
                            {cardsConfig.status && <Badge className={`${getStatusColor(data[cardsConfig.status as keyof typeof data] ?? '')} border-0 text-xs md:flex items-center justify-center rounded-2xl px-2 py-1 hidden`}>
                                <span className={`size-1.5 ${getPointerColor(data[cardsConfig.status as keyof typeof data] ?? '')} rounded-full mr-1`}></span>
                                <span className="text-xs leading-4 font-medium">{data[cardsConfig.status as keyof typeof data]}</span>
                            </Badge>}
                            {cardsConfig?.menuOptions && cardsConfig?.menuOptions?.length > 0 && <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {cardsConfig.menuOptions?.map((option, idx) => {
                                        const Icon = option.icon
                                        return (
                                            <DropdownMenuItem
                                                key={idx}
                                                className="flex items-center gap-2"
                                                onClick={() => option.onClick?.(data)}
                                            >
                                                {Icon && <Icon className="h-4 w-4 text-maroon-100" />}
                                                {option.label}
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="-mx-6 border-t border-gray-200"></div>
                        <div className={cn("pt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm", { "md:grid-cols-3": isProducts })}>
                            {
                                cardsConfig.fields.map((field) => {
                                    let value = field.key === 'mainConatact' ? data?.mainConatact?.name : data[field?.key]
                                    value = (field.key === 'totalPlots' && !value) ? 0 : value
                                    if (field.key === 'submissionDate' || field.key === 'submittedDate') {
                                        value = new Date(value).toLocaleDateString("en-US");
                                    }
                                    return (
                                        <div className={cn("flex flex-row items-center justify-between md:block md:mb-3")}>
                                            <p className="text-gray-500 mb-1">{field.label}</p>
                                            <p className="font-medium text-gray-900">{value ?? 'N/A'}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* {(alerts.length > 0 && showAlerts)&& (
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
                        )} */}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default ListOFCards;

