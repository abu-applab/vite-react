import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InfoItem {
    label: string
    value: string
}

interface EntityCardProps {
    title: string
    subtitle: string
    status: "Active" | "Inactive"
    info: InfoItem[]
}

const data: EntityCardProps[] = [
    {
        title: "Adel Hasan",
        subtitle: "QID: 284176XXXXXXX",
        status: "Active",
        info: [
            { label: "Phone Number", value: "30321849" },
            { label: "Nationality", value: "Qatar" },
            { label: "Share Percentage", value: "100.00%" },
            { label: "Partner Since", value: "25-08-2025" },
            { label: "Email Address", value: "alnoor28@applab.qa" },
            { label: "Owner Type", value: "Individual" },
        ],
    },
    {
        title: "ACME Technologies WLL",
        subtitle: "CR Number: 2628CR",
        status: "Active",
        info: [
            { label: "Phone Number", value: "3032198" },
            { label: "Email Address", value: "alnoor28@applab.qa" },
            { label: "Owner Type", value: "Company" },
            { label: "Share Percentage", value: "100.00" },
            { label: "Partner Since", value: "25-07-2012" },
        ],
    },
]

function EntityCard({ title, subtitle, status, info }: EntityCardProps) {
    return (
        <Card className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-start justify-between border-b">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <Badge
                    variant="outline"
                    className={`flex items-center border-none rounded-full gap-1 ${status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                >
                    <span
                        className={`h-2 w-2 rounded-full ${status === "Active" ? "bg-green-500" : "bg-red-500"
                            }`}
                    />
                    {status}
                </Badge>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-y-6 gap-x-10 text-sm">
                {info.map((item, i) => (
                    <div key={i} className="space-y-1">
                        <p className="text-muted-foreground">{item.label}</p>
                        <p className="font-semibold">{item.value}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default function OwnerCompanyCards() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
            {data.map((item, i) => (
                <EntityCard key={i} {...item} />
            ))}
        </div>
    )
}
