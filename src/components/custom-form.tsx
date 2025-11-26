import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { getCommonFormConfig, type FormConfig, type FormField } from "@/lib/form-data";

type CustomFormProps = {
    formType: string
    formData: Record<string, any>
    handleChange: (id: string, value: any) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function CustomForm({ formType, handleChange, handleSubmit, formData }: CustomFormProps) {
    const config: FormConfig = getCommonFormConfig(formType)

    const renderField = (field: FormField) => {
        switch (field.type) {
            case "text":
            case "number":
                return (
                    <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={field.disabled}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                )
            case "textarea":
                return (
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={field.disabled}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                )
            case "select":
                return (
                    <Select
                        value={formData[field.id] || ""}
                        onValueChange={(val) => handleChange(field.id, val)}
                    >
                        <SelectTrigger id={field.id} className="w-2xl">
                            <SelectValue placeholder={`Select ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => {
                                const key = typeof option === "string" ? option : option.id;
                                const value = typeof option === "string" ? option : option.name;
                                return (
                                    <SelectItem key={key} value={key}>
                                        {value}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                )
            case "file":
                return (
                    <Input
                        id={field.id}
                        type="file"
                        required={field.required}
                        disabled={field.disabled}
                        onChange={(e) => handleChange(field.id, e.target.files?.[0])}
                    />
                )
            default:
                return null
        }
    }

    return (
        <form
            id={formType}
            onSubmit={handleSubmit}
            className="w-full  mx-auto space-y-6 p-6"
        >
            {config.title && <h2 className="text-xl font-semibold">{config.title}</h2>}
            {config.description && (
                <p className="text-gray-600">{config.description}</p>
            )}

            {config.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                    {section.title && (
                        <h3 className="text-lg font-medium">{section.title}</h3>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section?.fields?.map((field) => (
                            <div key={field.id} className="flex flex-col space-y-2">
                                <Label htmlFor={field.id}>
                                    {field.label}
                                    {field.required && (
                                        <span className="text-red-500">*</span>
                                    )}
                                </Label>
                                {renderField(field)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </form>
    )
}
