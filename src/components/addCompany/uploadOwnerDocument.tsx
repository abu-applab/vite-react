import { Card } from "../ui/card"
import alNoor from "../../assets/images/all-noor-logo.svg"
import { Check, CircleCheck, User, type LucideProps } from "lucide-react"
import { useState, type ForwardRefExoticComponent, type RefAttributes } from "react"
import FileUpload from "../file-upload"
import { FormField } from "./reviewComapanyDetails/formField"
import { PhoneInput } from "../phoneInput"
import { Button } from "../ui/button"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface Person {
    name: string
    id: string
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    image?: string
    email: string,
    phoneNumber: string,
    documents: [],
    selected: boolean
}

interface UploadOwnerDocumentProps {
    goToNextStep: () => void
    goToPreviousStep: () => void
}

const owners: Person[] = [
    { name: "Adbul Rahman", id: "QID: 28417XXXXX", icon: User, email: '', phoneNumber: '', documents: [], selected: false },
    { name: "Salman Hameed", id: "QID: 28417XXXXX", icon: User, email: '', phoneNumber: '', documents: [], selected: false },
    { name: "Al Jazeera", id: "CR No: 123456", image: alNoor, email: '', phoneNumber: '', documents: [], selected: false },
]

const signatories: Person[] = [
    { name: "Adbul Rahman", id: "QID: 28417XXXXX", icon: User, email: '', phoneNumber: '', documents: [], selected: false },
    { name: "Faid Ibrahim", id: "QID: 28417XXXXX", icon: User, email: '', phoneNumber: '', documents: [], selected: false },
]

const initialState = {
    owners: owners,
    signatories: signatories,
    additionalDocuments: []
}

const UploadOwnerDocument = ({ goToNextStep, goToPreviousStep }: UploadOwnerDocumentProps) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    console.log('uploadedFile: ', uploadedFile);
    const [formData, setFormData] = useState(initialState)
    const {t}  = useTranslation();

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleFileUpload = (file: File) => {
        setUploadedFile(file)
    }

    const handleFormSelect = (name: 'owners' | 'signatories', index: number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: prev[name].map((item, i) => ({
                ...item,
                selected: (i === index ? !item.selected : false),
            })),
        }));
    }

    const selectedOwner = formData.owners.find((owner) => owner.selected);
    const selectedSignatories = formData.signatories.find((signatorie) => signatorie.selected);

    return (
        <div className="flex-1 relative">
            <div className="mt-10 ml-10 mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('upload_owner_document')}</h2>
                <p className="text-gray-600">{t('upload_owner_document_desc')}</p>
            </div>
            <div className="mx-10">
                <h3 className="mb-3">{t('owners')}</h3>
                <Card className={`p-6 gap-20 ${selectedOwner && 'flex flex-row'}`}>
                    <div className={cn("flex flex-col gap-6", {'w-[300px]': selectedOwner})}>
                        {
                            formData.owners.map((owner, index) => {
                                const completed = owner.email && owner.phoneNumber && owner.documents.length > 1
                                return (
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row gap-3">
                                            {owner?.icon ?
                                                <>
                                                    <div className="p-3 border-2 rounded-xl border-gray-100">
                                                        <owner.icon className="w-6 h-6"></owner.icon>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-medium">{owner.name}</h3>
                                                        <p className="text-sm font-normal text-zinc-500">{owner.id}</p>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="p-1 border-2 rounded-xl border-gray-100">
                                                        <img className="w-10 h-10" src={owner?.image} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-medium">{owner.name}</h3>
                                                        <p className="text-sm font-norma">{owner.id}</p>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {
                                            completed ?
                                                <div className=" bg-green-600 w-6 h-6 rounded-2xl flex items-center justify-center">
                                                    <Check className="text-white" size={12} strokeWidth={2} />
                                                </div>
                                                :
                                                <CircleCheck className="text-gray-400 w-6 h-6 cursor-pointer" onClick={() => handleFormSelect('owners', index)} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {selectedOwner && 
                    <div className="flex-1">
                        <h3 className="text-sm font-medium">{t('qid_passport')}</h3>
                        <p className="text-sm font-medium text-zinc-400">{t('qid_passport_desc')}</p>
                        <div className="mt-3">
                            <FileUpload
                                onFileUpload={handleFileUpload}
                                accepetedFile="or just click to browse and upload files (PDF, JPG, PNG). Maximum size: 5MB per file"
                            />
                        </div>
                        <div className="mt-6">
                            <FormField
                                key="email"
                                label="Email"
                                value={selectedOwner.email}
                                onChange={(value) => handleInputChange("email", value)}
                                type="email"
                                required={true}
                                placeholder="Please type the email"
                            />
                        </div>
                        <div className="mt-6">
                            <PhoneInput
                                required
                                placeholder=""
                                onChange={(value) => console.log("Phone number:", value)}
                                value={selectedOwner.phoneNumber}
                            />
                        </div>
                    </div>}
                </Card>
            </div>
            <div className="mx-10 mt-8">
                <h3 className="mb-3">{t('authorized_signatories')}</h3>
                <Card className={`p-6 gap-20 ${selectedSignatories && 'flex flex-row'}`}>
                    <div className={cn("flex flex-col gap-6", {'w-[300px]': selectedSignatories})}>
                        {
                            formData.signatories.map((owner, index) => {
                                const completed = owner.email && owner.phoneNumber && owner.documents.length > 1
                                return (
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row gap-3">
                                            {owner?.icon ?
                                                <>
                                                    <div className="p-3 border-2 rounded-xl border-gray-100">
                                                        <owner.icon className="w-6 h-6"></owner.icon>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-medium">{owner.name}</h3>
                                                        <p className="text-sm font-normal text-zinc-500">{owner.id}</p>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="p-1 border-2 rounded-xl border-gray-100">
                                                        <img className="w-10 h-10" src={owner?.image} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-medium">{owner.name}</h3>
                                                        <p className="text-sm font-norma">{owner.id}</p>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {
                                            completed ?
                                                <div className=" bg-green-600 w-6 h-6 rounded-2xl flex items-center justify-center">
                                                    <Check className="text-white" size={12} strokeWidth={2} />
                                                </div>
                                                :
                                                <CircleCheck className="text-gray-400 w-6 h-6 cursor-pointer" onClick={() => handleFormSelect('signatories', index)} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {selectedSignatories && 
                    <div className="flex-1">
                        <h3 className="text-sm font-medium">{t('qid_passport')}</h3>
                        <p className="text-sm font-medium text-zinc-400">{t('qid_passport_desc')}</p>
                        <div className="mt-3">
                            <FileUpload onFileUpload={handleFileUpload} accepetedFile="or just click to browse and upload files (PDF, JPG, PNG). Maximum size: 5MB per file" />
                        </div>
                        <div className="mt-6">
                            <FormField
                                key="email"
                                label="Email"
                                value={selectedSignatories.email}
                                onChange={(value) => handleInputChange("email", value)}
                                type="email"
                                required={true}
                                placeholder="Please type the email"
                            />
                        </div>
                        <div className="mt-6">
                            <PhoneInput
                                required
                                placeholder=""
                                onChange={(value) => console.log("Phone number:", value)}
                                value={selectedSignatories.phoneNumber}
                            />
                        </div>
                    </div>}
                </Card>
            </div>
            <div className="mx-10 mt-8">
                <h3 className="mb-3">{t('additional_documents')}</h3>
                <Card className='flex flex-row p-6'>
                    <div className="">
                        <div className="flex flex-row justify-start">
                            <h3 className="text-sm font-medium">Article of Association</h3>
                            <span className="text-gray-400">&nbsp;(Optional)</span>
                        </div>
                        <FileUpload
                            onFileUpload={handleFileUpload}
                            accepetedFile="or just click to browse and upload files (PDF, JPG, PNG). Maximum size: 5MB per file"
                        />
                    </div>
                    <div className="">
                        <div className="flex flex-row justify-start">
                            <h3 className="text-sm font-medium">Article of Association</h3>
                            <span className="text-gray-400">&nbsp;(Optional)</span>
                        </div>
                        <FileUpload
                            onFileUpload={handleFileUpload}
                            accepetedFile="or just click to browse and upload files (PDF, JPG, PNG). Maximum size: 5MB per file"
                        />
                    </div>
                </Card>
            </div>
            <div className="flex justify-between pt-6 mx-10">
                <Button type="button" variant="outline" className="bg-transparent" onClick={() => goToPreviousStep()}>
                   {t('previous')}
                </Button>
                <Button type="submit" className="px-8 bg-maroon-100 hover:bg-[#60091A]" onClick={() => goToNextStep()}>
                    {t('next')}
                </Button>
            </div>
        </div>
    )
}

export default UploadOwnerDocument