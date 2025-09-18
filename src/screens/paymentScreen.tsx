
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Building2, Search } from "lucide-react"
import { Link } from "react-router-dom";

type StatusType = "Collected" | "Pending" | "Cancelled";

interface AgreementCardProps {
    id: string;
    agreementNumber: string;
    amount: number;
    remainingAmount: number;
    dueDate: string;
    status: StatusType;
}

const companies = [
    'Al Noor Real Estate',
    'Qatar International Islamic Bank',
    'Mesaieed Petrochemical Holding Company',
    'Ezdan Holding Group',
];

const statuses = [
    'Pending',
    'Approved',
    'Rejected',
    'In Progress',
    'Completed'
];

const agreements: AgreementCardProps[] = [
    {
        id: "#AG-LP-203587-0000009924-1",
        agreementNumber: "AG-LP-203587-0000009924",
        amount: 20000,
        remainingAmount: 0,
        dueDate: "01/01/2017",
        status: "Collected",
    },
    {
        id: "AG-LP-203587-0000009924-6",
        agreementNumber: "AG-LP-203587-0000009924",
        amount: 0,
        remainingAmount: 0,
        dueDate: "01/01/2019",
        status: "Cancelled",
    },
    {
        id: "#AG-LP-104583-0000008715-2",
        agreementNumber: "AG-LP-104583-0000008715",
        amount: 4168,
        remainingAmount: 4168,
        dueDate: "01/01/2015",
        status: "Pending",
    },
    {
        id: "#AG-LP-203587-0000009924-1",
        agreementNumber: "AG-LP-203587-0000009924",
        amount: 20000,
        remainingAmount: 0,
        dueDate: "01/01/2017",
        status: "Collected",
    },
];

const statusStyles: Record<StatusType, string> = {
    Collected: "text-green-600 bg-green-100",
    Pending: "text-yellow-600 bg-yellow-100",
    Cancelled: "text-red-600 bg-red-100",
};

const AgreementCard: React.FC<AgreementCardProps> = ({
    id,
    agreementNumber,
    amount,
    remainingAmount,
    dueDate,
    status,
}) => {
    return (
        <Card className="rounded-2xl shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row justify-between items-center pb-2 border-b border-gray-300">
                <span className="font-semibold text-gray-800">{id}</span>
                <span
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                        statusStyles[status]
                    )}
                >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {status}
                </span>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-y-3 text-sm">
                <div>
                    <p className="text-gray-500">Agreement Number</p>
                    <p className="font-medium">{agreementNumber}</p>
                </div>
                <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium">{amount}</p>
                </div>
                <div>
                    <p className="text-gray-500">Remaining Amount</p>
                    <p className="font-medium">{remainingAmount}</p>
                </div>
                <div>
                    <p className="text-gray-500">Due Date</p>
                    <p className="font-medium">{dueDate}</p>
                </div>
            </CardContent>
        </Card>
    );
};

const PaymentScreen = () => {
    return (
        <div className="mx-[80px] mt-10">
            <div>
                <h1 className="text-2xl mb-1 font-semibold">Payments</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-maroon-100">All Payments</span>
                </p>
            </div>
            <div>
                <div className="flex flex-wrap gap-3 items-center mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                        <Input placeholder="Search..." className="pl-10 max-w-md bg-background" />
                    </div>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                        <Select defaultValue="Al Noor Real Estate">
                            <SelectTrigger className="bg-background pl-10">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map((company, index) => (
                                    <SelectItem key={index} value={company}>
                                        {company}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Select>
                        <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status, index) => (
                                <SelectItem key={index} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agreements.map((agreement, idx) => (
                    <AgreementCard key={idx} {...agreement} />
                ))}
            </div>
        </div>

    )
}

export default PaymentScreen;