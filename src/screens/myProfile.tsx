import { Card } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';
import Breadcrumb from '@/components/appBreadcrumb';
import ListOFCards from '@/components/listOfcards';
import useNetworkRequest from '@/api/useNetworkRequest';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { useApp } from '@/context/AppContext';
import Loader from '@/components/loader';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback } from '@/components/ui/avatar';

interface ProfileData {
    contactId: string;
    firstName: string;
    lastName: string;
    landLine: string;
    mobile: string;
    email: string;
    userWebRoles: any[];
    accessRequests: any[];
    connectedCompanies: {
        companyId: string;
        companyNameEN: string;
        companyNameAR: string;
        crNumber: string;
        createdOn: string;
        status: string;
    }[];
}

const cardsConfig = {
    icon: Building2,
    id: "companyId",
    subTitle: "companyNameAR",
    title: "companyNameEN",
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
    const networkRequest = useNetworkRequest();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(false);
    const { contact } = useApp();

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.append("contactId", contact?.id ?? ''); // You'll need to get this from context/auth

                const response = await networkRequest(API_ENDPOINTS.getContactDetail, {
                    method: "GET",
                    body: params
                });

                if (response?.success) {
                    setProfileData(response.data);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const profileFields = useMemo(() => [
        { label: "First Name", key: "firstName", value: profileData?.firstName || "-" },
        { label: "Last Name", key: "lastName", value: profileData?.lastName || "-" },
        { label: "Password", key: "password", value: "**********" },
        { label: "Landline", key: "landline", value: profileData?.landLine || "-" },
        { label: "Mobile Phone", key: "mobilePhone", value: profileData?.mobile || "-" },
        { label: "Email", key: "email", value: profileData?.email || "-", isEmail: true }
    ], [profileData]);

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

    if (loading) {
        return (
            <Loader />
        )
    }
    
    const initials = `${profileData?.firstName.charAt(0)}${profileData?.lastName.charAt(0)}`.toUpperCase();

    return (
        <div className="">
            <Breadcrumb items={breadcrumbs} heading={"my_profile"} />
            <div className="max-w-8xl space-y-8">
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                    <Avatar className="h-12 w-12 text-maroon-100">
                            {/* <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" /> */}
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                            {profileData ? `${profileData?.firstName} ${profileData?.lastName}` : ""}
                        </h2>
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
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="text-gray-500">Loading access requests...</div>
                            </div>
                        ) : profileData?.accessRequests && profileData.accessRequests.length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {profileData.accessRequests.map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="py-3 flex justify-between items-top text-sm text-gray-600"
                                    >
                                        <div>
                                            <div className="font-medium text-gray-900">{req?.company}</div>
                                            <div className="text-xs mt-1">{`Request Type: ${req?.role}`}</div>
                                            <div className="text-xs mt-2 text-gray-400">{`Date: ${req?.requestDate}`}</div>
                                        </div>
                                        <StatusBadge status={req?.accessStatus} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No access requests found
                            </div>
                        )}
                    </Card>
                </>
                <h3 className="font-medium text-black mb-4">Connected Companies</h3>
                <div className="space-y-3">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-500">Loading companies...</div>
                        </div>
                    ) : profileData?.connectedCompanies && profileData.connectedCompanies.length > 0 ? (
                        <ListOFCards
                            cardsConfig={cardsConfig}
                            isFullSpan
                            cardsData={profileData.connectedCompanies}
                        />
                    ) : (
                        <Card className="p-6 space-y-4">
                            <div className="text-center py-8 text-gray-500">
                                No Connected Companies found
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyProfile