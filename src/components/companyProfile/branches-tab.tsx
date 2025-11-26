import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronsUpDown } from "lucide-react"

const branches = [
    { id: 1, name: "Manama Head Office", status: "Active" },
    { id: 2, name: "Muharraq Branch", status: "Inactive" },
]

export default function BranchTable() {
    return (
        <div className="rounded-2xl border bg-white shadow-sm p-6 mt-6">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-zinc-50">
                    <TableRow>
                        <TableHead >
                            <div className="flex items-center gap-1 text-muted-foreground">
                                Branch Name
                                <ChevronsUpDown className="h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead >
                            <div className="flex items-center gap-1 text-muted-foreground">
                                Status
                                <ChevronsUpDown className="h-4 w-4" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {branches.map((branch) => (
                        <TableRow key={branch.id}>
                            <TableCell className="font-normal py-4">{branch.name}</TableCell>
                            <TableCell>
                                {branch.status === "Active" ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                        Inactive
                                    </span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
