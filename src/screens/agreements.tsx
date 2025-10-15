import SigningAgreementModal from "@/components/agreement/agreement-signing-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Eye, PencilLine, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface AgreementCardProps {
    id: string
    type: string
    plotNumber: string
    location: string
    createdOn: string
    endDate?: string
    status: "Draft" | "Approved"
    signed: boolean
}

const companies = [
    'Al Noor Real Estate',
    'Qatar International Islamic Bank',
    'Mesaieed Petrochemical Holding Company',
    'Ezdan Holding Group',
];

const signatureStatus = [
    'Signed',
    'Not Signed',
];

const statuses = [
    "Draft",
    "Submitted",
    "Review In Progress",
    "Approved",
    "Rejected",
    "Pending Submit Transfer",
    "On Hold",
    "Cancelled",
    "Terminated"
];

const agreements: AgreementCardProps[] = [
    {
        id: "AG-LP-203587-000009921-1",
        type: "Reservation",
        plotNumber: "AP-IZ-LE-81688A",
        location: "Al Wakrah Industrial Area",
        createdOn: "15/12/2024",
        endDate: "01/01/2025",
        status: "Draft",
        signed: false,
    },
    {
        id: "AG-LP-203587-000009921-1",
        type: "Lease",
        plotNumber: "AP-IZ-LE-81688A",
        location: "Al Wakrah Industrial Area",
        createdOn: "15/12/2024",
        endDate: "01/01/2025",
        status: "Draft",
        signed: false,
    },
    {
        id: "AG-LP-203587-000009921-1",
        type: "Land Allocation",
        plotNumber: "AP-IZ-LE-81688A",
        location: "Al Wakrah Industrial Area",
        createdOn: "15/12/2024",
        endDate: "01/01/2025",
        status: "Draft",
        signed: false,
    },
    {
        id: "AG-LP-203587-000009921-1",
        type: "Land Allocation Extension",
        plotNumber: "AP-IZ-LE-81688A",
        location: "Al Wakrah Industrial Area",
        createdOn: "15/12/2024",
        endDate: "01/01/2025",
        status: "Approved",
        signed: true,
    },
];

const AgreementCard = ({
    id,
    type,
    plotNumber,
    location,
    createdOn,
    endDate,
    status,
    signed,
    openModal
}: AgreementCardProps & {openModal : ()=> void}) => {
    return (
        <Card className="w-full rounded-2xl shadow-md">
            <CardHeader className="flex flex-row justify-between items-center border-b border-gray-300">
                <div>
                    <CardTitle className="text-sm font-medium">{id}</CardTitle>
                    <p className="text-xs text-muted-foreground">{type}</p>
                </div>
                <Badge
                    variant="default"
                    className={`px-2 py-1 rounded-full font-normal text-xs ${signed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600" }`}
                >
                    <div className={`w-2 h-2 rounded-full ${signed ? "bg-green-600 " : "bg-red-600 " }`} />
                    {signed ? "Signed" : "Not Signed"}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-x-12 mb-6">
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-gray-500">Plot Number</div>
                            <div className="font-medium">{plotNumber}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">Created on</div>
                            <div className="font-medium">{createdOn}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">Status</div>
                            <div className="font-medium">{status}</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-gray-500">Location</div>
                            <div className="font-medium">{location}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">End Date</div>
                            <div className="font-medium">{endDate}</div>
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    {status === "Draft" ? (
                        <Button onClick={openModal} variant={'outline'} size="sm" className="flex items-center gap-2">
                            <PencilLine className="w-4 h-4" />
                            Sign Agreement
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Signed Agreement
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

const Agreements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<string>("")
    console.log('setSelectedService: ', setSelectedService);

    return (
        <div className="mx-[80px] mt-10">
            <div>
                <h1 className="text-2xl mb-1">Agreements</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-maroon-100">All Agreements</span>
                </p>
            </div>

            {(!selectedService || isModalOpen) ? (<div><div className="flex flex-wrap gap-3 items-center mb-6">
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
                <Select defaultValue="Agreement Type">
                    <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Agreement Type" />
                    </SelectTrigger>
                    <SelectContent defaultValue={'Agreement Type'}>
                        <SelectItem value={'Agreement Type'}>
                            Agreement Type
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Signature Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {signatureStatus.map((application, index) => (
                            <SelectItem key={index} value={application}>
                                {application}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agreements.map((item, idx) => (
                        <AgreementCard key={idx} {...item} openModal={()=> setIsModalOpen(true)} />
                    ))}
                </div>
            </div>) : <></>}
            <SigningAgreementModal open={isModalOpen} setOpen={setIsModalOpen} />
        </div>
    )
}

export default Agreements;