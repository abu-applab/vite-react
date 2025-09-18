import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "../ui/button";

const requestData = [
    {
        id: 1,
        requester: "Abdul Rahman",
        email: "mk@company.com",
        accessType: "Company Access",
        requestDate: "12-05-2025",
        status: "Pending"
    },
    {
        id: 2,
        requester: "Salman Hameed",
        email: "A123@applab.qa",
        accessType: "Company Access",
        requestDate: "12-05-2025",
        status: "Pending"
    },
    {
        id: 3,
        requester: "Al Jazeera",
        email: "mk@company.com",
        accessType: "Company Access",
        requestDate: "12-05-2025",
        status: "Pending"
    }
];


const tableHeaders = ["Requester", "Email", "Access Type", "Request Date", "Status", "Actions"]

const actionButtons = [
    { type: " approve", title: "Approve", icon: Check },
    { type: " decline", title: "Decline", icon: X }
]

export default function AccessRequetsTab() {
    return (
        <div className="rounded-2xl border bg-white shadow-sm p-6 mt-6">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-zinc-50">
                    <TableRow>
                        {tableHeaders.map(header => <TableHead >
                            <div key={header} className="flex items-center gap-1 text-muted-foreground">
                                {header}
                                <ChevronsUpDown className="h-3.5 w-3.5" />
                            </div>
                        </TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requestData.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell className="font-normal py-4">{request.requester}</TableCell>
                            <TableCell className="font-normal py-4">{request.email}</TableCell>
                            <TableCell className="font-normal py-4">{request.accessType}</TableCell>
                            <TableCell className="font-normal py-4">{request.requestDate}</TableCell>
                            <TableCell className="font-normal py-4">{request.status}</TableCell>
                            <TableCell className="font-normal py-4">
                                <div className="space-x-2"> 
                                    {actionButtons.map(({ title, type, icon: Icon }) => <Button onClick={() => type === "accept" ? {} : {}} variant={"outline"} className="bg-transparent">
                                        <Icon className="w-4 h-4" />
                                        {title}
                                    </Button>)}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
