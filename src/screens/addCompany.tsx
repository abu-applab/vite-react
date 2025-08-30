import { Card } from "@/components/ui/card"
import manateqLogo2 from "../assets/images/manateq-hub-logo.svg"
import pdfLogo from "../assets/images/pdf-logo.svg"
import { User, FileText, Lock, Trash2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import FileUpload from "@/components/file-upload"
import { useState } from "react"
import { Button } from "@/components/ui/button"


const AddCompany = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    const sidebarSteps = [
        {
            icon: User,
            title: "Login to your account",
            description: "Login was successfully completed.\nYou're good to go!",
            completed: true,
        },
        {
            icon: FileText,
            title: "Add your company",
            description: "Add a company to submit applications,\nservice requests and track them",
            completed: false,
        },
        {
            icon: Lock,
            title: "Main Hub Access",
            description: "Access Main Hub to View & Add Your\nCompanies",
            completed: false,
        },
    ]

    const addingCompanyDetailSteps = [
        {
            title: 'Upload CR Document',
            completed: false,
            active: true,
            stepNumber: '1'
        },
        {
            title: 'Review Company Details',
            completed: false,
            active: false,
            stepNumber: '2'
        },
        {
            title: 'Upload Documents',
            completed: false,
            active: false,
            stepNumber: '3',
        },
        {
            title: 'Select Company Details',
            completed: false,
            active: false,
            stepNumber: '4'
        },
        {
            title: 'Review & Submit',
            completed: false,
            active: false,
            stepNumber: '5'
        },
    ]

    const handleFileUpload = (file: File) => {
        setUploadedFile(file)
    }

    const gridColsClass = `grid-cols-${addingCompanyDetailSteps.length}`;

    const getFileType = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase()
        return extension === "pdf" ? "PDF" : "DOC"
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
        <div className="w-screen h-screen flex flex-row">
            <Card className="w-[400px] m-4 p-0 gap-12 bg-[#fcfaf7]">
                <div>
                    <img src={manateqLogo2} alt="logo" className="w-[158px] h-10 mt-10 ml-10" />
                    <h1 className="text-2xl text-red-900 leading-tight mt-12 mx-10 w-[320px]">
                        A few steps away from setting up your Investor Portal.
                    </h1>
                </div>
                <div className="mx-10">
                    {
                        sidebarSteps.map((step, index) => {
                            return (
                                <div className="flex flex-row gap-3 mb-[60px]">
                                    <div className={`flex items-center justify-center w-12 h-12 shadow-xs ${step.completed ? 'bg-green-600 text-white' : 'bg-white text-gray-400'} rounded-lg p-3 relative ${sidebarSteps?.[index - 1]?.completed && 'text-green-600'}`}>
                                        <step.icon className="" />
                                        {index < sidebarSteps.length - 1 && <div className={`absolute w-0.5 h-14 top-16 border-l-2 ${step.completed ? "border-green-600" : "border-gray-900 border-dashed"}`} />}
                                    </div>
                                    <div>
                                        <h3 className={`font-medium text-lg ${(index === 0 || sidebarSteps?.[index - 1]?.completed) ? "text-green-600" : "text-gray-900"}`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{step.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="text-gray-600 mt-auto mb-10 w-full flex flex-col items-center justify-center">
                    <p>Copyrights © 2023 Manateq</p>
                    <p>All Rights Reserved</p>
                </div>
            </Card>
            <Card className="mt-[72px] mr-4 mb-4 w-full flex flex-col bg-[#fcfaf7]">
                <div className={`w-full h-fit px-10 grid grid-cols-5 items-center justify-center ${gridColsClass}`}>
                    {addingCompanyDetailSteps.map((step) => {
                        const sliderValue = step.completed ? 100 : (step.active ? 50 : 0)
                        console.log('sliderValue: ', sliderValue);
                        return (
                            <div className="text-center flex flex-col w-full h-full">
                                <p className="p-0.5 mb-3">{`Step ${step.stepNumber}`}</p>
                                <Slider
                                    value={[sliderValue]}
                                    max={100}
                                    step={1}
                                    disabled
                                    className={`w-full mb-3 ${sliderValue === 0 ? "[&_[role=slider]]:opacity-0" : "[&_[role=slider]]:h-4 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-600"} `}
                                />
                                <p>{step.title}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="border-2 border-[#f6f5ef]"/>
                <div className="flex-1 relative">
                    <div className="mt-10 ml-10 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload CR Document</h2>
                        <p className="text-gray-600">Upload your CR document to continue</p>
                    </div>
                    <div>
                        {
                            !uploadedFile ?
                                <FileUpload onFileUpload={handleFileUpload} />
                                :
                                <Card className="p-3 flex flex-row items-center justify-between mx-10">
                                    <div className="flex flex-row gap-3 items-center justify-start">
                                        <div className="h-12 w-12 p-3">
                                            <img className="" src={pdfLogo} alt="pdf logo" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-medium text-gray-900">CR Document</h4>
                                            <p className="text-sm text-gray-600">
                                                {getFileType(uploadedFile.name)} • {formatFileSize(uploadedFile.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button className="border-2 h-8 w-8 p-2" type="button" variant="ghost" onClick={() => setUploadedFile(null)}>
                                        <Trash2 className="h-4 w-4 text-[#82764f]" />
                                    </Button>
                                </Card>
                            }
                    </div>
                       {uploadedFile &&  <Button type="button" className="bg-[#862634] absolute bottom-12 right-10">Next</Button> }
                </div>
            </Card>
        </div>
    )
}

export default AddCompany