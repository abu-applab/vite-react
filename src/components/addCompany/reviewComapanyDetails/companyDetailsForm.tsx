import { useState } from "react"
import { Edit, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FormField } from "./formField"
import { Button } from "@/components/ui/button"
import { DataTable } from "./dataTable"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

type Owner = {
    ownerType: string;
    nameCompanyName: string;
    idType: string;
    ownershipPercentage: string;
};

type Signatories = {
    signatoryName: string;
    qid: string;
    nationality: string;
};

interface CompanyDetailsFormProps {
    goToNextStep: () => void
    goToPreviousStep: () => void
    isAddNewCompany?: boolean
}


const initialCompanyData = {
    companyInfo: {
        companyNameEN: "Gulf Horizon Trading W.L.L",
        companyNameAR: "شركة خليج كوروبريشن",
        crNumber: "CR284692",
        creationDate: "12-04-2018",
        expiryDate: "12-04-2026",
        legalForm: "W.L.L",
        tradeName: "Gulf Horizon",
        mainContactName: "Ahmed Al Saadi",
        mainContactPhone: "(+974) 4455 8888",
        mainContactEmail: "ahmed.alsaadi@gulfhorizon.qa",
    },
    owners: [
        { ownerType: "Individual", nameCompanyName: "Abdul Rahman", idType: "284176XXXXX", ownershipPercentage: "80%" },
        { ownerType: "Individual", nameCompanyName: "Salman Hameed", idType: "284176XXXXX", ownershipPercentage: "10" },
        { ownerType: "Company", nameCompanyName: "Al Jazeera", idType: "123456", ownershipPercentage: "10%" },
    ],
    signatories: [
        { signatoryName: "Mohamed Rafi", qid: "284176XXXXX", nationality: "Qatari" },
        { signatoryName: "Faid Ibrahim", qid: "284176XXXXX", nationality: "Bahraini" },
    ],
    businessActivities: ["Construction", "Healthcare", "Trading"],
}

export default function CompanyDetailsForm({goToNextStep, goToPreviousStep, isAddNewCompany}: CompanyDetailsFormProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(initialCompanyData)
    const {t} = useTranslation();

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section as keyof typeof prev], [field]: value },
        }))
    }


    const handleSave = () => {
        setIsEditing(false)
        console.log("Saved data:", formData)
    }

    const companyFields = [
        { key: "companyNameEN", label: "Company Name (EN)", type:"text", required: true, disabled: true },
        { key: "companyNameAR", label: "Company Name (AR)", type:"text", required: true, disabled: true },
        { key: "crNumber", label: "CR Number", type:"text", disabled: true },
        { key: "creationDate", label: "Creation Date", type:"text", required: true, disabled: true },
        { key: "expiryDate", label: "Expiry Date", type:"text", required: true, disabled: true },
        { key: "legalForm", label: "Legal Form", type:"text", required: true, disabled: true },
        { key: "tradeName", label: "Trade Name", type:"text", required: true },
        { key: "mainContactName", label: "Main Contact Name", type:"text", required: true },
        { key: "mainContactPhone", label: "Main Contact Phone", type: "text", required: true },
        { key: "mainContactEmail", label: "Main Contact Email", type: "email", required: true },
    ]

    const ownerColumns = [
        { key: "ownerType", label: "Owner Type", type:"text", required: true, disabled: true },
        { key: "nameCompanyName", label: "Name/Company Name", type:"text", required: true, disabled: true },
        { key: "idType", label: "ID Type", required: true, type:"text", disabled: true },
        { key: "ownershipPercentage", label: "Ownership (%)", type:"text", required: true, disabled: true },
    ]

    const signatoryColumns = [
        { key: "signatoryName", label: "Signatory Name", required: true, type:"text", disabled: true },
        { key: "qid", label: "QID", required: true, type:"text", disabled: true },
        { key: "nationality", label: "Nationality", required: true, type:"text", disabled: true },
    ]


    return (
        <div className="space-y-6 mt-4 mx-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">{t('review_company_details')}</h1>
                    <p className="text-muted-foreground text-sm">{isAddNewCompany ? t('review_company_details_existing_user_desc') : t('review_company_details_desc')}</p>
                </div>
                <Button onClick={isEditing ? handleSave : () => setIsEditing(true)} className={`flex items-center gap-2 ${!isEditing ? 'text-black hover:bg-zinc-50' : 'bg-maroon-100 hover:bg-maroon-100'}`}>
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "Save" : "Edit"}
                </Button>
            </div>

            {/* Company Information */}
            <div>
                <h3 className="mb-3">{t("company_information")}</h3>
                <Card>
                    <CardContent className="space-y-4">
                        <div className={`grid grid-cols-1 ${!isEditing ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                            {companyFields.map((field) => (
                                <FormField
                                    key={field.key}
                                    label={field.label}
                                    value={formData.companyInfo[field.key as keyof typeof formData.companyInfo]}
                                    isEditing={isEditing}
                                    onChange={(value) => handleInputChange("companyInfo", field.key, value)}
                                    type={field.type}
                                    required={field.required}
                                    disabled={field?.disabled}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Owners / Shareholders Details */}
            <div>
                <h3 className="mb-3">{t('owners_details')}</h3>
                <Card>
                    <CardContent>
                        {
                            isEditing ?
                                <div className='space-y-5'>
                                    {
                                        formData.owners.map((_, index) => {
                                            return (
                                                <div className={`${index !== 2 && 'border-b-2 pb-8 border-gray-100'} grid grid-cols-1 md:grid-cols-2 gap-4`}>
                                                    {
                                                        ownerColumns.map((field) => {
                                                            return (
                                                                <FormField
                                                                    key={field.key}
                                                                    label={field.label}
                                                                    value={formData.owners?.[index]?.[field.key as keyof Owner]}
                                                                    isEditing={isEditing}
                                                                    onChange={(value) => handleInputChange("companyInfo", field.key, value)}
                                                                    type={field.type}
                                                                    required={field.required}
                                                                    disabled={field?.disabled}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div> :
                                <DataTable
                                    data={formData.owners}
                                    columns={ownerColumns}
                                />
                        }
                    </CardContent>
                </Card>
            </div>

            <div>
                <h3 className="mb-3">{t("authorized_signatories")}</h3>
                <Card>
                    <CardContent>
                        {
                            isEditing ?
                                <div className='space-y-5'>
                                    {
                                        formData.signatories.map((_, index) => {
                                            return (
                                                <div className={`${index !== 1 && 'border-b-2 pb-8 border-gray-100'} grid grid-cols-1 md:grid-cols-2 gap-4`}>
                                                    {
                                                        signatoryColumns.map((field) => {
                                                            return (
                                                                <FormField
                                                                    key={field.key}
                                                                    label={field.label}
                                                                    value={formData.signatories?.[index]?.[field.key as keyof Signatories]}
                                                                    isEditing={isEditing}
                                                                    onChange={(value) => handleInputChange("companyInfo", field.key, value)}
                                                                    type={field.type}
                                                                    required={field.required}
                                                                    disabled={field?.disabled}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div> :
                                <DataTable
                                    data={formData.signatories}
                                    columns={signatoryColumns}
                                />
                        }
                    </CardContent>
                </Card>
            </div>

            {/* Business Activities */}
            <div>
                <h3 className="mb-3">{t('business_activities')}</h3>
                <div>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {formData.businessActivities.map((activity) => (
                                <Badge key={activity} variant="secondary" className="bg-white px-4 py-2 rounded-full">
                                    {activity}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
                <Button variant="outline" className="bg-transparent" onClick={() => goToPreviousStep()}>{t('previous')}</Button>
                <Button className="bg-maroon-100 hover:bg-[#60091A]" onClick={() => goToNextStep()}>{t('next')}</Button>
            </div>
        </div>
    )
}
