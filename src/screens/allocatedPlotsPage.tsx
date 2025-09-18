import { Input } from "@/components/ui/input";
import { AlertCircle, ArrowUpRight, Building2, Eye, FileInput, MapPin, Search, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapImage from "../assets/images/map.png";
import { Stepper } from "@/components/allocatedPlotsPage/stepper";

const companies = [
    'Al Noor Real Estate',
    'Qatar International Islamic Bank',
    'Mesaieed Petrochemical Holding Company',
    'Ezdan Holding Group',
];

const applicationTypes = [
    'Industrial',
    'Logistics',
    'Open Yards',
    'Commercial'
];

const statuses = [
    'Pending',
    'Approved',
    'Rejected',
    'In Progress',
    'Completed'
];

const leases = [
    {
        id: "AP-IZ-LE-81686",
        location: "Al Wakrah Industrial Area",
        mapImg:
            "https://via.placeholder.com/400x150.png?text=Map+Preview",
        leaseExpiry: "11-05-2025",
        nextPayment: "12-06-2025",
        amount: "QAR 1,000.00",
        status: "In Progress",
        overdue: true,
        stage: "Pre-Development",
    },
    {
        id: "AP-IZ-LE-81692",
        location: "Al Wakrah Industrial Area",
        mapImg:
            "https://via.placeholder.com/400x150.png?text=Map+Preview",
        leaseExpiry: "12-05-2025",
        nextPayment: "01-06-2026",
        amount: "QAR 1,500.00",
        status: "In Progress",
        overdue: true,
        stage: "Development",
    },
];

const AllocatedPlotsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-[80px] mt-10">
            <div>
                <h1 className="text-2xl mb-1">Allocated Plots</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2">›</span>
                    <Link to="/portal">Al Noor Real Estate W.L.L</Link>
                    <span className="mx-2">›</span>
                    <span className="text-maroon-100">Allocated Plots</span>
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
                    <Select>
                        <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Plot type" />
                        </SelectTrigger>
                        <SelectContent>
                            {applicationTypes.map((application, index) => (
                                <SelectItem key={index} value={application}>
                                    {application}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {leases.map((lease, index) => (
                    <Card key={index} className="rounded-2xl shadow-md border">
                        <CardContent className="space-y-2 px-0">
                            <div className="flex justify-between items-center px-6">
                                <h2 className="font-medium text-xl">{lease.id}</h2>
                                <span className="inline-flex items-center text-xs bg-background text-gray-500 px-3 py-1 rounded-full border border-gray-300">
                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                                    Industrial
                                </span>
                            </div>
                            <div className="px-6">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {lease.location}
                                </div>
                                <div className="mt-6 relative w-full rounded-xl overflow-hidden shadow-md group">
                                    <img src={MapImage} alt="map" className="w-full h-full object-cover transition-transform duration-300 ease-in-out" />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <Button className="pointer-events-auto bg-maroon-100 hover:bg-maroon-100 rounded-md px-5 py-2 text-white flex items-center gap-2 opacity-100" size="sm" type="button" >
                                            Show On Map <ArrowUpRight size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 px-6 my-6">
                                <Button variant="outline" size="sm" onClick={() => navigate(`/portal/allocated-plots/1`)}>
                                    <div className="relative flex-1">
                                        <Eye className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-black" />
                                        <span className="ml-8 text-sm font-normal">
                                            View Details
                                        </span>
                                    </div>
                                </Button>
                                <Button variant="outline" size="sm">
                                    <div className="relative flex-1">
                                        <FileInput className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-black" />
                                        <span className="ml-8 text-sm font-normal">
                                            Submit Request
                                        </span>
                                    </div>
                                </Button>
                                <Button variant="outline" size="sm">
                                    <div className="relative flex-1">
                                        <Wallet className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-black" />
                                        <span className="ml-8 text-sm font-normal">
                                            Pay
                                        </span>
                                    </div>
                                </Button>
                            </div>

                            <div className="grid gap-4 border-t pt-6 px-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Lease Expiry Date</p>
                                        <p className="font-medium">{lease.leaseExpiry}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Next Payment Due</p>
                                        <p className="font-medium">{lease.nextPayment}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Amount:</p>
                                        <p className="font-medium">{lease.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Current Status</p>
                                        <p className="font-medium">{lease.status}</p>
                                    </div>
                                </div>
                            </div>
                            {lease.overdue && (
                                <div className="m-6 flex items-center justify-center bg-red-50 text-red-600 px-4 py-1.5 rounded-lg">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    <span className="font-normal text-sm">Payments Overdue</span>
                                </div>
                            )}
                            <Stepper progress={lease.stage} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AllocatedPlotsPage;