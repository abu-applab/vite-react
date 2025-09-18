import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InfoItem {
    label: string
    value: string
}

interface PersonCardProps {
    name: string
    idNo: string
    info: InfoItem[]
}

const data: PersonCardProps[] = [
    {
        name: "Adel Hasan",
        idNo: "238297390",
        info: [
            { label: "ID Type", value: "Qatari ID" },
            { label: "Nationality", value: "Qatar" },
            { label: "Name AR", value: "حمد جابر احمد الجهام" },
            { label: "Mail", value: "adel.k@alnoor.qa" },
        ],
    },
    {
        name: "Adel Hasan",
        idNo: "238297390",
        info: [
            { label: "ID Type", value: "Qatari ID" },
            { label: "Nationality", value: "Qatar" },
            { label: "Name AR", value: "حمد جابر احمد الجهام" },
            { label: "Mail", value: "adel.k@alnoor.qa" },
        ],
    },
]

function PersonCard({ name, idNo, info }: PersonCardProps) {
    return (
        <Card className="rounded-2xl shadow-sm bg-white">
            <CardHeader className="border-b">
                <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                <p className="text-md text-muted-foreground">ID No: {idNo}</p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-y-6 gap-x-10 text-sm">
                {info.map((item, i) => (
                    <div key={i} className="space-y-1">
                        <p className="text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default function Signatories() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {data.map((person, i) => (
                <PersonCard key={i} {...person} />
            ))}
        </div>
    )
}
