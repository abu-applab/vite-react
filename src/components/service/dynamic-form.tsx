import type { FormConfig, FormField } from "@/lib/form-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import FileUpload from "../file-upload"
import { Trash2 } from "lucide-react"
import pdfLogo from "../../assets/images/pdf-logo.svg"
import successfull from "../../assets/images/successfull.svg"
import { serviceOptions } from "./new-service-request-modal"


interface DynamicFormProps {
    config: FormConfig
    handlePerviousButton: () => void
    setSelectedService: any
    selectedService: any
    setRequestedServices: any
    requestedServices: any
}

const DynamicForm = ({
    config,
    handlePerviousButton,
    setSelectedService,
    setRequestedServices,
    selectedService,
    requestedServices
}: DynamicFormProps) => {
    const [formData, setFormData] = useState<Record<string, any>>({})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldId]: value,
        }))

        setErrors((prev) => ({
            ...prev,
            [fieldId]: "",
        }))
    }

    const validateForm = () => {
        let newErrors: Record<string, string> = {}

        config.sections.forEach((section) => {
            section.fields.forEach((field) => {
                if (field.required && !formData[field.id]) {
                    newErrors[field.id] = `${field.label} is required`
                }
            })
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const getFileType = (fileName: string) => {
        console.log('fileName: ', fileName);
        const extension = fileName?.split(".").pop()?.toLowerCase()
        return extension === "pdf" ? "PDF" : "DOC"
    }

    const getFileName = (fileName: string) => {
        console.log('fileName: ', fileName);
        const name = fileName?.split(".")?.[0]
        return name
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const handleSubmit = (e: React.FormEvent) => {
        console.log("here");
        e.preventDefault()
        if (validateForm()) {
            console.log("Form submitted:", formData)
            const serviceTitle = serviceOptions.find((service) => service.key === selectedService)?.title;
            let newRequest = {
                id: "AP-IZ-LE-81686",
                plotNumber: "28368",
                serviceType: serviceTitle,
                submittedDate: "12-07-2025",
                status: "Approved",
            }
            setRequestedServices([...requestedServices, newRequest])
            setFormSubmitted(true)
            // 🔥 You can trigger API call here
        }
    }

    const renderField = (field: FormField) => {
        const commonProps = {
            id: field.id,
            required: field.required,
        }

        switch (field.type) {
            case "text":
            case "number":
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive">*</span>}
                        </Label>
                        <Input
                            {...commonProps}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className={`${errors[field.id] ? 'border-red-600' : ''}`}
                        />
                        {errors[field.id] && (
                            <span className="text-sm text-red-600">{errors[field.id]}</span>
                        )}
                    </div>
                )

            case "select":
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive">*</span>}
                        </Label>
                        <Select onValueChange={(value) => handleInputChange(field.id, value)}>
                            <SelectTrigger className={`w-full ${errors[field.id] ? 'border-red-600' : ''}`}>
                                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors[field.id] && (
                            <span className="text-sm text-red-600">{errors[field.id]}</span>
                        )}
                    </div>
                )

            case "textarea":
                return (
                    <div className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive">*</span>}
                        </Label>
                        <Textarea
                            {...commonProps}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            rows={4}
                            className={`${errors[field.id] ? 'border-red-600' : ''}`}
                        />
                        {errors[field.id] && (
                            <span className="text-sm text-red-600">{errors[field.id]}</span>
                        )}

                    </div>
                )

            case "file":
                return <div className="space-y-2">
                    <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    {!formData?.[field.id] ?
                        <>
                            <FileUpload onFileUpload={(value) => handleInputChange(field.id, value)} isServiceForm />
                            {errors[field.id] && (
                                <span className="text-sm text-red-600">{errors[field.id]}</span>
                            )}
                        </>
                        :
                        <Card className="p-4.5 flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3 items-center justify-start">
                                <div className="h-12 w-12 p-3">
                                    <img className="" src={pdfLogo} alt="pdf logo" />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-medium text-gray-900">{getFileName(formData?.[field.id]?.name)}</h4>
                                    <p className="text-sm text-gray-600">
                                        {getFileType(formData?.[field.id]?.name)} • {formatFileSize(formData?.[field.id]?.size)}
                                    </p>
                                </div>
                            </div>
                            <Button className="border-2 h-8 w-8 p-2" type="button" variant="ghost" onClick={() => handleInputChange(field.id, null)}>
                                <Trash2 className="h-4 w-4 text-[#82764f]" />
                            </Button>
                        </Card>}
                </div>

            default:
                return null
        }
    }

    return (
        <div className="">
            {!formSubmitted ?
                <Card className="p-10 bg-[#fcfaf7]">
                    <CardHeader>
                        <CardTitle className="text-xl">{config.title}</CardTitle>
                        <CardDescription>
                            {config.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {config.sections.map((section, sectionIndex) => (
                                <Card key={sectionIndex}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{section.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {section.fields.map((field) => (
                                                <div
                                                    key={field.id}
                                                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                                                >
                                                    {renderField(field)}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <div className="flex justify-between">
                                <Button type="button" variant="outline" onClick={handlePerviousButton}>
                                    Previous
                                </Button>
                                <Button type="submit" onClick={handleSubmit} className="bg-[#862634] hover:bg-[#7A1F2B]">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                : (
                    <div className="flex flex-col items-center justify-center min-h-[350px] gap-6">
                        <img src={successfull} className="w-[100px] h-[100px]" alt="successfull" />

                        {/* Success Message */}
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-black">Request Submitted Successfully</h1>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                We have received your request and it is being processed. Your reference number is{" "}
                                <span className="font-medium">SR-2025-000123</span>.
                            </p>
                        </div>

                        {/* Action Button */}
                        <Button
                            className="bg-[#862634] hover:bg-[#7A1F2B] text-white px-6 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                                // Handle navigation to request page
                                console.log("Navigate to My Request")
                                setSelectedService(null)
                            }}
                        >
                            Go to My Request
                        </Button>
                    </div>)
            }
        </div>
    )
}

export default DynamicForm