import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EllipsisVertical, CircleAlert } from "lucide-react"
import { Badge } from "../ui/badge"


export interface CompanyDetailAlert {
    id: string
    title: string
    type: string
}

export interface CompanyCardProps {
    logo: string
    companyName: string
    crNumber: string
    isActive: boolean
    totalSlots: string
    mainContact: string
    phoneNumber: string
    email: string
    alerts?: CompanyDetailAlert[]
}

export function CompanyDetail({
    logo,
    companyName,
    crNumber,
    isActive,
    totalSlots,
    mainContact,
    phoneNumber,
    email,
    alerts = [],
}: CompanyCardProps) {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-[64px] w-[64px] px-2 py-[7px] border rounded-lg overflow-hidden bg-white">
                            <img src={logo} alt={`${companyName} logo`} className="object-contain" />
                        </div>
                        <div>
                            <h3 className="font-medium text-xl leading-tight text-[#09090B]">{companyName}</h3>
                            <p className="text-base text-zinc-500 font-medium">CR No: {crNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={isActive ? "default" : "destructive"}
                            className={`text-xs ${isActive ? "bg-green-100 text-green-600 hover:bg-green-100" : "bg-red-100 text-red-600 hover:bg-red-100"}`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-[50%] ${isActive ? "bg-green-600" : "bg-red-600"} `} />
                            {isActive ? "Active" : "Expired"}
                        </Badge>
                        <EllipsisVertical className="w-4 h-4" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-[#231F2099] mb-1">Total Plots</p>
                        <p className="font-medium">{totalSlots}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#231F2099]  mb-1">Main Contact</p>
                        <p className="font-mediumd">{mainContact}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-[#231F2099]  mb-1">Phone Number</p>
                        <p className="font-medium">{phoneNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#231F2099]  mb-1">Mail</p>
                        <p className="font-medium">{email}</p>
                    </div>
                </div>

                {alerts.length > 0 && (
                    <div className={`grid ${alerts.length === 1 ? 'grid-cols-1': 'grid-cols-2'} mt-1 gap-2.5`}>
                        {
                            alerts.map(({title, id, type}) => {
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
            </CardContent>
        </Card>
    )
}
