import { useState, type Dispatch, type SetStateAction } from 'react'
import { Card, CardContent } from '../ui/card'
import { FormField } from './reviewComapanyDetails/formField'
import { Button } from '../ui/button'
import CollapsibleDetails from './collapsableDetails'
import pdfLogo from "../../assets/images/pdf-logo.svg"
import { Badge } from '../ui/badge'
import { Repeat, Trash2 } from 'lucide-react'
import { SelectCompanyDetailsformFields } from '@/constants'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface ReviewAndSubmitProps {
    goToNextStep: () => void
    goToPreviousStep: () => void
    isAddNewCompany?: boolean
    setIsAddNewCompany?: Dispatch<SetStateAction<boolean>>
}

interface Owner {
    id: string
    name: string
    qid?: string
    crNumber?: string
    type: "Individual" | "Company"
    sharePercentage: string
    email: string
    phone: string
    attachments: string[]
}

const ownersData: Owner[] = [
    {
        id: "1",
        name: "Adbul Rahman",
        qid: "284176738363",
        type: "Individual",
        sharePercentage: '80',
        email: "abdul.mhmoud@gmail.com",
        phone: "+974 12345678",
        attachments: ["Document 1.pdf", "Document 2.pdf"],
    },
    {
        id: "2",
        name: "Salman Hameed",
        qid: "284176738363",
        type: "Individual",
        sharePercentage: '10',
        email: "abdul.mhmoud@gmail.com",
        phone: "+974 12345678",
        attachments: ["Document 1.pdf", "Document 2.pdf"],
    },
    {
        id: "3",
        name: "Al Jazeera",
        // fix me 
        // crNumber or Qid only one needs to present
        crNumber: "123456",
        qid: "123456",
        type: "Company",
        sharePercentage: '10',
        email: "aljazeera.123@gmail.com",
        phone: "+974 12345678",
        attachments: ["Document 1.pdf"],
    },
]

const authorizedData: Owner[] = [
    {
        id: "1",
        name: "Mohamed Rafi",
        qid: "284176738363",
        type: "Individual",
        sharePercentage: '80',
        email: "rafi.mhmoud@gmail.com",
        phone: "+974 12345678",
        attachments: ["Document 1.pdf", "Document 2.pdf"],
    },
    {
        id: "2",
        name: "Faid Ibrahim",
        qid: "284176738363",
        type: "Individual",
        sharePercentage: '10',
        email: "iba.faid123@gmail.com",
        phone: "+974 12345678",
        attachments: ["Document 1.pdf", "Document 2.pdf"],
    },
]

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
    owners: [...ownersData],
    authorized: [...authorizedData],
    additionalDocuments: [],
    companyDetails: {
        companyCategory: "SME Small Enterprise (10-49 employees)",
        businessSector: "Accounting",
        operationType: "Production Facility",
    },
    businessActivities: ["Construction", "Healthcare", "Trading"],
}
const companyFields = [
    { key: "companyNameEN", label: "Company Name (EN)", type: "text", required: true, disabled: true },
    { key: "companyNameAR", label: "Company Name (AR)", type: "text", required: true, disabled: true },
    { key: "crNumber", label: "CR Number", type: "text", disabled: true },
    { key: "creationDate", label: "Creation Date", type: "text", required: true, disabled: true },
    { key: "expiryDate", label: "Expiry Date", type: "text", required: true, disabled: true },
    { key: "legalForm", label: "Legal Form", type: "text", required: true, disabled: true },
    { key: "tradeName", label: "Trade Name", type: "text", required: true },
    { key: "mainContactName", label: "Main Contact Name", type: "text", required: true },
    { key: "mainContactPhone", label: "Main Contact Phone", type: "text", required: true },
    { key: "mainContactEmail", label: "Main Contact Email", type: "email", required: true },
]

const ownerFields = [
    { key: "type", label: "Owner Type", type: "text", required: true, disabled: true },
    { key: "name", label: "Name/Company Name", type: "text", required: true, disabled: true },
    { key: "qid", label: "ID Type", type: "text", disabled: true },
    { key: "sharePercentage", label: "Share %", type: "text", required: true, disabled: true },
    { key: "phone", label: "Phone Number", type: "text", required: true, disabled: false },
    { key: "email", label: "Email", type: "text", required: true, disabled: false },
    { key: "attachments", label: "Attachments", type: "attachments", required: true, disabled: false },
]

const AdditionalDocumentsData = [
    {
        documentName: "Article of Association",
        storage: '4 MB'
    },
    {
        documentName: "Establishment Card",
        storage: '4 MB'
    },
]

const BusinessActivitiesData = ['Construction', 'Healthcare', 'Trading']

const ReviewAndSubmit = ({
    goToNextStep,
    goToPreviousStep,
    isAddNewCompany,
    setIsAddNewCompany }: ReviewAndSubmitProps) => {
    const [formData, setFormData] = useState(initialCompanyData);
    const [isEditing, setIsEditing] = useState({
        companyInfo: false,
        owners: false,
        signatories: false,
        documents: false,
        comapanyDetails: false,
    })
    const { t } = useTranslation();

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section as keyof typeof prev], [field]: value },
        }))
    }

    const handleEdit = (name: string) => {
        setIsEditing((prev) => ({
            ...prev,
            [name]: !prev?.[name as keyof typeof prev]
        }))
    }

    const handleSubmit = () => {
        if (isAddNewCompany && setIsAddNewCompany) {
            setIsAddNewCompany(false)
        } else {
            goToNextStep();
        }
    }

    return (
        <div className="space-y-6 mt-4 mx-10">
            {/* Header */}
            <div className="">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">{t('review_submit')}</h1>
                    <p className="text-muted-foreground text-sm">{t('review_submit_desc')}</p>
                </div>
            </div>

            {/* Company Information */}
            <div>
                <div className='flex items-center justify-between'>
                    <h3 className="mb-3">{t('company_information')}</h3>
                    <Button className='underline text-[#83764F] text-base font-medium' variant="ghost" onClick={() => handleEdit('companyInfo')}>{isEditing.companyInfo ? 'Save' : 'Edit'}</Button>
                </div>
                <Card>
                    <CardContent className="space-y-4">
                        <div className={`grid grid-cols-1 ${!isEditing.companyInfo ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                            {companyFields.map((field) => {
                                return (
                                    <FormField
                                        key={field.key}
                                        label={field.label}
                                        value={formData.companyInfo[field.key as keyof typeof formData.companyInfo]}
                                        isEditing={isEditing.companyInfo}
                                        onChange={(value) => handleInputChange("companyInfo", field.key, value)}
                                        type={field.type}
                                        required={field.required}
                                        disabled={field?.disabled}
                                    />
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Owners / Shareholders Details */}
            <div>
                <div className='flex items-center justify-between'>
                    <h3 className="mb-3">{t('owners_details')}</h3>
                    <Button className='underline text-[#83764F] text-base font-medium' variant="ghost" onClick={() => handleEdit('owners')}>{isEditing.owners ? 'Save' : 'Edit'}</Button>
                </div>
                <Card className="w-full">
                    {/* Header */}
                    <div className="space-y-1">
                        {ownersData.map((owner, index) => {
                            const isShowBorder = index + 1 !== ownersData.length
                            if (isEditing.owners) {
                                return (
                                    <div className={`grid grid-cols-2 gap-4 px-3 pb-3 border-b`}>
                                        {ownerFields.map((field) => {
                                            if (field.key === 'attachments') {
                                                return (
                                                    <div className='col-span-full gap-2'>
                                                        <h3 className=''>
                                                            Attachments (Optional)
                                                        </h3>
                                                        <div className='flex flex-row gap-4'>
                                                            {formData.owners?.[index].attachments.map((attachment, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between gap-2 px-3 py-2 bg-zinc-50 
                                                                text-foreground rounded-md text-sm shadow w-[300px]"
                                                                >
                                                                    <div className='flex flex-row gap-2'>
                                                                        <img src={pdfLogo} alt="pdf logo" className="w-5 h-5" />
                                                                        {attachment}
                                                                    </div>
                                                                    <div className='flex flex-row gap-2'>
                                                                        <Button variant="ghost" className='border'>
                                                                            <Repeat className='w-2.5 h-2.5 text-[#83764F]' />
                                                                        </Button>
                                                                        <Button variant="ghost" className='border'>
                                                                            <Trash2 className='w-2.5 h-2.5 text-[#83764F]' />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            };
                                            return (
                                                <FormField
                                                    key={field.key}
                                                    label={field.label}
                                                    value={
                                                        typeof formData.owners[index][field.key as keyof Owner] === 'string'
                                                            ? (formData.owners[index][field.key as keyof Owner] as string)
                                                            : ''
                                                    }
                                                    isEditing={isEditing.owners}
                                                    onChange={(value) => handleInputChange("owners", field.key, value)}
                                                    type={field.type}
                                                    required={field.required}
                                                    disabled={field?.disabled}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                            }
                            return (
                                <CollapsibleDetails ownerData={owner} isShowBorder={isShowBorder} />
                            )
                        })}
                    </div>
                </Card>
            </div>

            {/* Authorized Signators */}
            <div>
                <div className='flex items-center justify-between'>
                    <h3 className="mb-3">{t('authorized_signatories')}</h3>
                    <Button className='underline text-[#83764F] text-base font-medium' variant="ghost" onClick={() => handleEdit('signatories')}>{isEditing.signatories ? 'Save' : 'Edit'}</Button>
                </div>
                <Card className="w-full">
                    {/* Header */}
                    <div className="space-y-1">
                        {authorizedData.map((owner, index) => {
                            const isShowBorder = index + 1 !== ownersData.length
                            if (isEditing.signatories) {
                                return (
                                    <div className={`grid grid-cols-2 gap-4 px-3 pb-3 border-b`}>
                                        {ownerFields.map((field) => {
                                            if (field.key === 'attachments') {
                                                return (
                                                    <div className='col-span-full gap-2'>
                                                        <h3 className=''>
                                                            Attachments (Optional)
                                                        </h3>
                                                        <div className='flex flex-row gap-4'>
                                                            {formData.authorized?.[index].attachments.map((attachment, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between gap-2 px-3 py-2 bg-zinc-50 
                                                                text-foreground rounded-md text-sm shadow w-[300px]"
                                                                >
                                                                    <div className='flex flex-row gap-2'>
                                                                        <img src={pdfLogo} alt="pdf logo" className="w-5 h-5" />
                                                                        {attachment}
                                                                    </div>
                                                                    <div className='flex flex-row gap-2'>
                                                                        <Button variant="ghost" className='border'>
                                                                            <Repeat className='w-2.5 h-2.5 text-[#83764F]' />
                                                                        </Button>
                                                                        <Button variant="ghost" className='border'>
                                                                            <Trash2 className='w-2.5 h-2.5 text-[#83764F]' />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            };
                                            return (
                                                <FormField
                                                    key={field.key}
                                                    label={field.label}
                                                    value={
                                                        typeof formData.authorized[index][field.key as keyof Owner] === 'string'
                                                            ? (formData.authorized[index][field.key as keyof Owner] as string)
                                                            : ''
                                                    }
                                                    isEditing={isEditing.signatories}
                                                    onChange={(value) => handleInputChange("authorized", field.key, value)}
                                                    type={field.type}
                                                    required={field.required}
                                                    disabled={field?.disabled}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                            }
                            return (
                                <CollapsibleDetails ownerData={owner} isShowBorder={isShowBorder} />
                            )
                        })}
                    </div>
                </Card>
            </div>

            {/* Additional Documents */}
            <div className=' w-full'>
                <div className='flex items-center justify-between'>
                    <h3 className="mb-3">{t('additional_documents')}</h3>
                    <Button className='underline text-[#83764F] text-base font-medium' variant="ghost" onClick={() => handleEdit('documents')}>{isEditing.documents ? 'Save' : 'Edit'}</Button>
                </div>
                <div className='flex flex-row w-full gap-5'>
                    {
                        AdditionalDocumentsData.map((document) => {
                            return (
                                <Card className='flex flex-row items-center justify-between p-3 flex-1'>
                                    <div className='flex flex-row items-center justify-start gap-2'>
                                        <div className='w-12 h-12 bg-zinc-100 p-3'>
                                            <img src={pdfLogo} alt="pdf" className='w-full h-full' />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className='font-medium text-sm'>{document.documentName}</h3>
                                            <p className='text-zinc-500 text-xs font-normal'>{document.storage}</p>
                                        </div>
                                    </div>
                                    {isEditing.documents && <div className='flex flex-row gap-2'>
                                        <Button variant="ghost" className='border'>
                                            <Repeat className='w-2.5 h-2.5 text-[#83764F]' />
                                        </Button>
                                        <Button variant="ghost" className='border'>
                                            <Trash2 className='w-2.5 h-2.5 text-[#83764F]' />
                                        </Button>
                                    </div>}
                                </Card>
                            )
                        })
                    }
                </div>
            </div>

            {/* Company Details */}
            <div className=' w-full'>
                <div className='flex items-center justify-between'>
                    <h3 className="mb-3">{t('company_details')} </h3>
                    <Button className='underline text-[#83764F] text-base font-medium' variant="ghost" onClick={() => handleEdit('comapanyDetails')}>{isEditing.comapanyDetails ? 'Save' : 'Edit'}</Button>
                </div>
                <Card className={cn('flex flex-row w-full gap-5 p-6', { 'grid grid-cols-2': isEditing.comapanyDetails })}>

                    {
                        SelectCompanyDetailsformFields.map((detail) => {
                            if (detail.id === 'other' && (formData.companyDetails.companyCategory !== 'Others')) {
                                return null
                            }
                            if (isEditing.comapanyDetails) {
                                return (
                                    <FormField
                                        key={detail.id}
                                        id={detail.id}
                                        label={detail.label}
                                        required={detail.required}
                                        value={formData.companyDetails[detail.id as keyof typeof formData.companyDetails]}
                                        onChange={(value) => handleInputChange("companyDetails", detail.id, value)}
                                        options={detail.options}
                                        placeholder={detail.placeholder}
                                        type={detail.type}
                                    />
                                )
                            }
                            return (
                                <div className='flex-1'>
                                    <h3 className='text-sm font-medium text-zinc-950'>{detail.label}</h3>
                                    <p className='text-sm font-medium text-zinc-500'>{formData.companyDetails[detail.id as keyof typeof formData.companyDetails]}</p>
                                </div>
                            )
                        })
                    }
                </Card>
            </div>

            <div>
                <h3 className="mb-3">{t('business_activities')}</h3>
                <div>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {BusinessActivitiesData.map((activity) => (
                                <Badge key={activity} variant="secondary" className="bg-white px-4 py-2 text-xs rounded-full">
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
                <Button className="bg-maroon-100 hover:bg-[#60091A]" onClick={() => handleSubmit()}>{!isAddNewCompany ? t('next') : t('submit')}</Button>
            </div>
        </div>
    )
}
export default ReviewAndSubmit