import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronsUpDown } from "lucide-react"

const activities = [
    { id: 1, code: "46900", name: "Non-specialized wholesale trade" },
    { id: 2, code: "47910", name: "Retail sale via mail order houses or via internet" },
]

export default function BusinessActivitiesTale() {
    return (
        <div className="rounded-2xl border bg-white shadow-sm p-6 mt-6">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-zinc-50">
                    <TableRow>
                        <TableHead >
                            <div className="flex items-center gap-1 text-muted-foreground">
                                Activity Code
                                <ChevronsUpDown className="h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead >
                            <div className="flex items-center gap-1 text-muted-foreground">
                                Activity Name
                                <ChevronsUpDown className="h-4 w-4" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow key={activity.id}>
                            <TableCell className="font-normal py-4">{activity.code}</TableCell>
                            <TableCell className="font-normal py-4">{activity.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
