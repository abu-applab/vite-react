
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


interface Column {
    key: string
    label: string
    required?: boolean
}

interface DataTableProps {
    data: any[]
    columns: Column[]
}

export function DataTable({ data, columns }: DataTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg">
            <Table>
                <TableHeader className="bg-zinc-50">
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <TableHead key={column.key} className="text-muted-foreground">
                                    <span className="text-sm font-medium">{column.label}</span>
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.key} className="py-2 text-sm">
                                    {item[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
