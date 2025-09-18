import { Button } from "@/components/ui/button";
import { PencilLine, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card"
import CustomForm from "@/components/custom-form";
import OwnerCompanyCards from "@/components/companyProfile/owners-tab";
import Signatories from "@/components/companyProfile/signatories-tab";
import BranchTable from "@/components/companyProfile/branches-tab";
import BusinessActivitiesTale from "@/components/companyProfile/business-activities-tab";
import AccessRequetsTab from "@/components/companyProfile/access-request-tab";
import ConnectedUsers from "@/components/companyProfile/connected-users-tab";
import OwnerDocuments from "@/components/companyProfile/documents-tab";

const tabs = [
    { id: 'about', label: 'About Company' },
    { id: 'owners', label: 'Owners' },
    { id: 'signatories', label: 'Signatories' },
    { id: 'branches', label: 'Branches' },
    { id: 'businessActivities', label: 'Business Activities' },
    { id: 'accessRequests', label: 'Access Requests' },
    { id: 'connectedUsers', label: 'Connected Users' },
    { id: 'documents', label: 'Documents' },
];

const fieldLabels: Record<string, string> = {
    arabicName: "Company Name (AR)",
    englishName: "Company Name (EN)",
    address: "Address",
    box: "PO Box",
    telephone: "Telephone",
    crno: "CR Number",
    category: "Company Category",
}

function CompanyInfoCard() {
    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState<Record<string, any>>({
        "arabicName": "شركة مانك كوربوریشن",
        "englishName": "SME Medium Enterprises [50-249]",
        "address": "826 - St.12, Qatar",
        "box": "1623",
        "telephone": "30321867",
        "crno": "CR1200432",
        "category": "Others"
    })

    const handleChange = (id: string, value: any) => {
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form Data:", formData)
    }

    return (
        <div className="justify-center items-center w-full mt-6">
            <Card className="w-full shadow-md rounded-2xl bg-white">
                <CardContent >
                    {isEditing ? <CustomForm formType={"companyProfile"} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} /> : (
                        <div className="p-2 px-6 grid grid-cols-3 gap-y-6 gap-x-2 text-sm">
                            {Object.entries(fieldLabels).map(([key, label]) => (
                                <div key={key} className="space-y-2">
                                    <p className="text-muted-foreground">{label}</p>
                                    <p className="font-semibold">{formData[key]}</p>
                                </div>
                            ))}
                        </div>)}
                </CardContent>
            </Card>
            {isEditing ? <div className="flex justify-end mt-8">
                <Button onClick={(e) => { setIsEditing(false); handleSubmit(e as any) }} variant="outline" className="flex items-center px-4 bg-maroon-100">
                    <span className="text-white">Save</span>
                </Button>
            </div> :
                <div className="flex justify-end mt-8">
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2 bg-transparent">
                        <PencilLine className="h-4 w-4 text-[#8A7A52] ml-2" />
                        Edit
                    </Button>
                </div>}
        </div>
    )
}


const CompanyProfile = () => {
    const [activeTab, setActiveTab] = useState('documents')

    return (
        <div className="mx-[80px] mt-10">
            <div className="flex flex-row justify-between mb-8">
                <div>
                    <h1 className="text-2xl mb-1">Company Profile</h1>
                    <p className="text-base text-muted-foreground">
                        <Link to="/portal">Home</Link>
                        <span className="mx-2">›</span>
                        <span className="text-maroon-100">View Company Profile</span>
                    </p>
                </div>
                <div className="flex flex-row items-end">
                    <Button variant="outline" className="bg-maroon-100 text-white" onClick={() => { }}>
                        <Plus className="h-4 w-4" />
                        Add New Company
                    </Button>
                </div>
            </div>
            <div className="w-full">
                <div className="flex bg-white rounded-xl h-[56px] shadow-md px-6 gap-14">
                    {tabs.map((tab) => (
                        <button key={tab.id} className={`py-[10px] mt-[8px] text-md font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                        </button>
                    ))}
                </div>
                <div className="w-full min-h-screen">
                    {activeTab === 'about' && <CompanyInfoCard />}
                    {activeTab === 'owners' && <OwnerCompanyCards />}
                    {activeTab === 'signatories' && <Signatories />}
                    {activeTab === 'branches' && <BranchTable />}
                    {activeTab === 'businessActivities' && <BusinessActivitiesTale />}
                    {activeTab === 'accessRequests' && <AccessRequetsTab />}
                    {activeTab === 'connectedUsers' && <ConnectedUsers />}
                    {activeTab === 'documents' && <OwnerDocuments />}
                </div>
            </div>
        </div>
    )
}
export default CompanyProfile;