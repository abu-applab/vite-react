import type { FormConfig, FormField } from "@/lib/form-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import FileUpload from "./file-upload"
import { Trash2 } from "lucide-react"
import pdfLogo from "../assets/images/pdf-logo.svg"
import { cn } from "@/lib/utils"

interface DynamicFormProps {
  config: FormConfig
  formData: Record<string, any>
  errors: Record<string, string>
  handleInputChange: (fieldId: string, value: any) => void
  handleSubmit?: (e: React.FormEvent) => void
  handlePerviousButton?: () => void
  isNewApplication?: boolean
  goToNextStep?: () => void
}

const DynamicForm = ({
  config,
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  handlePerviousButton,
  isNewApplication = false,
  goToNextStep,
}: DynamicFormProps) => {
  const getFileType = (fileName: string) => {
    const extension = fileName?.split(".").pop()?.toLowerCase()
    return extension === "pdf" ? "PDF" : "DOC"
  }

  const getFileName = (fileName: string) => fileName?.split(".")?.[0]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const renderField = (field: FormField) => {
    const commonProps = { id: field.id, required: field.required }

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
              className={`${errors[field.id] ? "border-red-600" : ""}`}
            />
            {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
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
              <SelectTrigger className={`w-full ${errors[field.id] ? "border-red-600" : ""}`}>
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
            {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
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
              className={`${errors[field.id] ? "border-red-600" : ""}`}
            />
            {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
          </div>
        )

      case "file":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive">*</span>}
            </Label>
            {!formData?.[field.id] ? (
              <>
                <FileUpload
                  onFileUpload={(value) => handleInputChange(field.id, value)}
                  isServiceForm
                  accepetedFile="PDF or Word up to 10 MB"
                />
                {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
              </>
            ) : (
              <Card className="p-4.5 flex flex-row items-center justify-between">
                <div className="flex flex-row gap-3 items-center justify-start">
                  <div className="h-12 w-12 p-3">
                    <img src={pdfLogo} alt="pdf logo" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-medium text-gray-900">{getFileName(formData?.[field.id]?.name)}</h4>
                    <p className="text-sm text-gray-600">
                      {getFileType(formData?.[field.id]?.name)} • {formatFileSize(formData?.[field.id]?.size)}
                    </p>
                  </div>
                </div>
                <Button
                  className="border-2 h-8 w-8 p-2"
                  type="button"
                  variant="ghost"
                  onClick={() => handleInputChange(field.id, null)}
                >
                  <Trash2 className="h-4 w-4 text-[#82764f]" />
                </Button>
              </Card>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className={cn("p-10 bg-[#fcfaf7]", { "border-none shadow-none": isNewApplication })}>
      <CardHeader>
        <CardTitle className="text-xl">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
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
                  {section.fields?.map((field) => (
                    <div key={field.id} className={field.type === "textarea" || field.type === "file" ? "md:col-span-2" : ""}>
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
            <Button type={isNewApplication ? "button" : "submit" } className="bg-maroon-100 hover:bg-[#7A1F2B]" onClick={isNewApplication ? goToNextStep : handleSubmit}>
              {isNewApplication ? "Next" : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default DynamicForm
