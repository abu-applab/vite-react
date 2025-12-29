import { Card } from '@/components/ui/card';
import { Building2, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react';
import Breadcrumb from '@/components/appBreadcrumb';
import { useApp } from '@/context/AppContext';
import ListOFCards from '@/components/listOfcards';

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

const cardsConfig = {
    icon: Building2,
    id: "accountID",
    subTitle: "arabicName",
    title: "englishName",
    status: 'status',
    fields: [
        {
            label: "cr_number",
            key: "crNumber",
        },
        {
            label: "role",
            key: "role",
        },
        {
            label: "created_on",
            key: "createdOn",
        },
    ],
}

const profileFields = [
  { label: "First Name", key: "firstName", value: "Mohammed" },
  { label: "Last Name", key: "lastName", value: "Rafi" },
  { label: "Password", key: "password", value: "**********" },
  { label: "Landline", key: "landline", value: "92736372" },
  { label: "Mobile Phone", key: "mobilePhone", value: "+974 30321879" },
  { label: "Email", key: "email", value: "exampleuser01@applab.qa", isEmail: true }
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

const MyProfile = () => {
    const navigate = useNavigate();
    const { companies } = useApp();
    console.log('companies: ', companies);

    const breadcrumbs = useMemo(() => {
        const items: { label: string; path?: string; onClick?: () => void }[] = [
            { label: "Home", path: "/portal" },
            {
                label: "my_profile",
                onClick: () => {
                    navigate("/portal");
                }
            },
        ];

        return items;
    }, []);


    return (
        <div className="">
            <Breadcrumb items={breadcrumbs} heading={"my_profile"} />
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
                            {profileFields.map((field) => (
                                <div key={field.key} className='space-y-1'>
                                    <div className="font-normal text-gray-500">{field.label}</div>
                                    {field.isEmail ? (
                                        <a href={`mailto:${field.value}`} className="text-gray-900">
                                            {field.value}
                                        </a>
                                    ) : (
                                        <div className="font-normal text-gray-900">{field.value}</div>
                                    )}
                                </div>
                            ))}
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
                    <ListOFCards cardsConfig={cardsConfig} isFullSpan cardsData={companies} />
                </div>
            </div>
        </div>
    )
}

export default MyProfile