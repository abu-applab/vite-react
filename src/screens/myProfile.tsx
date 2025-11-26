import { Card } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom'
import AlNoor from "../assets/images/all-noor-logo.svg"
import QLink from "../assets/images/qatar-bank-logo.svg"

const accessRequests = [
    {
        company: "Gulf Horizon Trading W.L.L",
        requestType: "Company Admin Access",
        date: "29/07/2025",
        status: "Approved",
    },
    {
        company: "Qatar Steel Industry",
        requestType: "Company Admin Access",
        date: "29/07/2025",
        status: "Pending",
    },
    {
        company: "Gulf Horizon Trading W.L.L",
        requestType: "Company Admin Access",
        date: "29/07/2025",
        status: "Rejected",
    },
];

const connectedCompanies = [
    {
        nameEn: "Al Noor Real Estate W.L.L",
        nameAr: "يرادات الغاربية للمواد الغذائية",
        crNumber: "150903",
        role: "Admin",
        createdOn: "25-07-2025",
        status: "Active",
        logo: AlNoor,
    },
    {
        nameEn: "Qatar International Islamic Bank",
        nameAr: "يرادات الغاربية للمواد الغذائية",
        crNumber: "150903",
        role: "Bot",
        createdOn: "25-07-2025",
        status: "Active",
        logo: QLink,
    },
];

const statusMap = {
    Approved: { color: "bg-green-100 text-green-600", icon: "bg-green-600" },
    Pending: { color: "bg-yellow-100 text-yellow-600", icon: "bg-yellow-600" },
    Rejected: { color: "bg-red-100 text-red-600", icon: "bg-red-600" },
    Active: { color: "bg-green-100 text-green-600", icon: "bg-green-600" },
};

type StatusType = keyof typeof statusMap;

interface StatusBadgeProps {
    status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
    const { color, icon } = statusMap[status as StatusType] || {
        color: "bg-gray-100 text-gray-600",
        icon: "bg-gray-600",
    };

    return (
        <div
            className={`inline-flex h-6 items-center gap-1 px-3 py-0.5 rounded-full font-semibold text-xs select-none ${color}`}
        >
            <div className={`rounded-full w-1.5 h-1.5 ${icon}`} />
            <span>{status}</span>
        </div>
    );
}

const myProfile = () => {
    return (
        <div className="">
            <div>
                <h1 className="text-2xl mb-1">My Profile</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-maroon-100">My Profile</span>
                </p>
                <div className="max-w-8xl space-y-8">
                    <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                        <UserCircle className="w-12 h-12 text-gray-400" />
                        <div>
                            <h2 className="font-semibold text-lg text-gray-900">Mohammed Rafi</h2>
                            <p className="text-sm text-gray-500">Admin</p>
                        </div>
                    </div>
                    <>
                        <h3 className="font-medium text-black mb-4">Personal Information</h3>
                        <Card className="p-6 space-y-4">
                            <div className="grid grid-cols-4 gap-x-6 space-y-4 text-sm text-gray-700">
                                <div className='space-y-1'>
                                    <div className="font-normal text-gray-500">First Name</div>
                                    <div className="font-normal text-gray-900" >Mohammed</div>
                                </div>
                                <div className='space-y-1'>
                                    <div className="font-normal text-gray-500">Last Name</div>
                                    <div className="font-normal text-gray-900" >Rafi</div>
                                </div>
                                <div className='space-y-1'>
                                    <div className="font-normal text-gray-500">Password</div>
                                    <div className="font-normal text-gray-900" >**********</div>
                                </div>
                                <div className='space-y-1'>
                                    <div className="font-normal text-gray-500">Landline</div>
                                    <div className="font-normal text-gray-900">92736372</div>
                                </div>
                                <div className='space-y-1'>
                                    <div className="font-normal text-gray-500">Mobile Phone</div>
                                    <div className="font-normal text-gray-900">+974 30321879</div>
                                </div>
                                <div className='space-y-1'>
                                    <div className="font-normal text-gray-500">Email</div>
                                    <a href="mailto:exampleuser01@applab.qa" className="text-gray-900">
                                        exampleuser01@applab.qa
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </>
                    <>
                        <h3 className="font-medium text-black mb-4">Access Requests</h3>
                        <Card className="p-6 space-y-4">
                            <div className="divide-y divide-gray-200">
                                {accessRequests.map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="py-3 flex justify-between items-top text-sm text-gray-600"
                                    >
                                        <div>
                                            <div className="font-medium text-gray-900">{req.company}</div>
                                            <div className="text-xs mt-1">{`Request Type: ${req.requestType}`}</div>
                                            <div className="text-xs mt-2 text-gray-400">{`Date: ${req.date}`}</div>
                                        </div>
                                        <StatusBadge status={req.status} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </>
                    <h3 className="font-medium text-black mb-4">Connected Companies</h3>
                    <div className="space-y-3">
                        {connectedCompanies.map((company, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col bg-white rounded-lg shadow-sm divide divide-y"
                            >
                                <div className='flex flex-row items-center justify-between p-4 '>
                                    <div className='flex flex-row justify-between  items-center gap-4'>
                                        <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-background border">
                                            {company.logo ? (
                                                <img
                                                    src={company.logo}
                                                    alt={company.nameEn}
                                                    className="max-h-12 max-w-full"
                                                />
                                            ) : (
                                                <UserCircle className="w-10 h-10 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="text-md text-gray-700 space-y-2">
                                            <div className="font-semibold text-gray-900">{company.nameEn}</div>
                                            <div className="text-semibold">{company.nameAr}</div>
                                        </div>
                                    </div>
                                    <StatusBadge status={company.status} />
                                </div>
                                <div className="flex-1 grid grid-cols-4 text-sm text-gray-700 gap-4 p-4 ">
                                    <div>
                                        <div className="font-normal text-gray-400">CR Number</div>
                                        <div className="font-semibold text-gray-900">{company.crNumber}</div>
                                    </div>
                                    <div>
                                        <div className="font-normal text-gray-400">Role</div>
                                        <div className="font-semibold text-gray-900">{company.role}</div>
                                    </div>
                                    <div>
                                        <div className="font-normal text-gray-400">Created On</div>
                                        <div className="font-semibold text-gray-900">{company.createdOn}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default myProfile