import type { FormConfig, FormField } from "@/lib/form-data"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import FileUpload from "./file-upload"
import { CalendarIcon, ChevronsUpDown, Download, Trash2 } from "lucide-react"
import pdfLogo from "../assets/images/pdf-logo.svg"
import { cn, formatFileSize, getFileName, getFileType } from "@/lib/utils"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"
import { Checkbox } from "./ui/checkbox"
import { useApp } from "@/context/AppContext"
import ProductInformation from "./productInformation"
import FormSteps from "./addCompany/formSteps"
import { useTranslation } from "react-i18next"
import SubmittedFormSteps from "./submittedFormSteps"
import { MultipleAttachments } from "./violationScreen/multipleAttachments"

interface DynamicFormProps {
  config: FormConfig
  formData: Record<string, any>
  errors: Record<string, string>
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
  handleInputChange: (fieldId: string, value: any) => void
  handleSubmit?: (e: React.FormEvent) => void
  handlePerviousButton?: () => void
  isCreateApplication?: boolean
  goToNextStep?: () => void
  handleSave?: () => void
  fieldRefs: React.MutableRefObject<Record<string, HTMLElement | null>>
  isNext?: boolean
  setProducts?: any
  products?: any
  isLastStepActive?: boolean
  applicationSteps?: any
  setApplicationSteps?: any
  isSubmittedApplication?: boolean
}

const DynamicForm = ({
  config,
  formData,
  errors,
  setErrors,
  handleInputChange,
  handleSubmit,
  handlePerviousButton,
  isCreateApplication = false,
  goToNextStep,
  handleSave,
  fieldRefs,
  isNext = false,
  setProducts,
  products,
  isLastStepActive = true,
  applicationSteps,
  setApplicationSteps,
  isSubmittedApplication = false,
}: DynamicFormProps) => {
  const { setCreateNewForm, setSelectedInvestment } = useApp();
  const { t } = useTranslation()



  // handling this state to show whether it's for view or create new service 
  useEffect(() => {
    setCreateNewForm(true);
    return () => {
      setCreateNewForm(false);
      setSelectedInvestment(null)
    }
  }, [])

  const renderField = (field: FormField) => {
    const commonProps = { id: field.id, required: field.required }

    switch (field.type) {
      case "text":
      case "number":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="gap-0">
              {t(field.label)}
              {field.required && <div className="text-destructive">*</div>}
            </Label>
            <Input
              {...commonProps}
              ref={(el) => {
                fieldRefs.current[field.id] = el
              }}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`${errors[field.id] ? "border-red-600" : ""} placeholder:text-sm`}
              {...(field.type === "number" ? { onWheel: (e) => e.currentTarget.blur() } : {})}
              disabled={field.disabled || isSubmittedApplication}
              onKeyDown={(e) => {
                if (field.type === 'number' && ['e', 'E', '+', '-', '.'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
          </div>
        )

      case "select":
        const isDisabled = field.disabled;
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {t(field.label)}
              {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Select
              value={formData[field.id] || ""}
              onValueChange={(value) => {
                // Fix me
                if (isSubmittedApplication) return;
                if (field.dependsOn) {
                  const selectedOption = field.options?.find(
                    (val): val is { id: string; name: string; plotId: string, agreementId: string } =>
                      typeof val !== "string" && val.id === value
                  );
                  if (!selectedOption) return;

                  handleInputChange(field.id, value);
                  handleInputChange(field.dependsOn, selectedOption?.agreementId);
                } else {
                  handleInputChange(field.id, value);
                }
              }}
              disabled={!!isDisabled || isSubmittedApplication}
            >
              <SelectTrigger
                className={`w-full ${errors[field.id] ? "border-red-600" : ""}`}
                ref={(el) => {
                  fieldRefs.current[field.id] = el
                }}
              >
                <SelectValue placeholder={`Select ${t(field.label).toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => {
                  const key = typeof option === "string" ? option : option.id;
                  const value = typeof option === "string" ? option : option.name;
                  const isOptionDisabled =
                    typeof option !== "string" && option.disabled;
                  return (
                    <SelectItem key={key} value={key} disabled={!!isOptionDisabled}>
                      {value}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
          </div>
        )

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {t(field.label)}
              {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              {...commonProps}
              ref={(el) => {
                fieldRefs.current[field.id] = el
              }}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              rows={4}
              className={`${errors[field.id] ? "border-red-600" : ""} placeholder:text-sm`}
              disabled={field.disabled || isSubmittedApplication}
            />
            {errors[field.id] && <span className="text-sm text-red-600">{errors[field.id]}</span>}
          </div>
        )

      case "multiselect":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>
              {t(field.label)}
              {field.required && <span className="text-destructive">*</span>}
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={`w-full justify-between ${errors[field.id] ? "border-red-600" : ""
                    }`}
                >
                  {formData[field.id]?.length
                    ? field.options!
                      .filter((opt: any) =>
                        formData[field.id].split(",").includes(opt.id)
                      )
                      .map((opt: any) => opt.name)
                      .join(", ")
                    : "Select options"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                sideOffset={4}
                className="w-[var(--radix-popover-trigger-width)] p-1"
              >
                <Command>
                  <CommandList className="max-h-48 overflow-y-auto">
                    <CommandGroup>
                      {field.options!.map((option: any) => {
                        const selectedIds = formData[field.id]
                          ? formData[field.id].split(",")
                          : []
                        const isChecked = selectedIds.includes(option.id)

                        return (
                          <CommandItem
                            key={option.id}
                            onSelect={() => {
                              let updated
                              if (isChecked) {
                                updated = selectedIds.filter((v: any) => v !== option.id)
                              } else {
                                updated = [...selectedIds, option.id]
                              }

                              // Convert to comma-separated string
                              const updatedValue = updated.join(",")

                              handleInputChange(field.id, updatedValue)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={isChecked}
                                className={`data-[state=checked]:bg-maroon-100 data-[state=checked]:border-gray-800`}
                              />
                              <span>{option.name}</span>
                            </div>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {errors[field.id] && (
              <span className="text-sm text-red-600">{errors[field.id]}</span>
            )}
          </div>
        )

      case "file":
        const value = formData?.[field.id];
        const isFile = value instanceof File;
        const isUrl = typeof value?.fileUrl === "string" && value?.fileUrl.startsWith("http");

        return (
          <div className={cn("space-y-2")}>
            {/* UPLOAD STATE */}
            {(!value) && (
              <>
                <FileUpload
                  onFileUpload={(file) => handleInputChange(field.id, file)}
                  handleFileUploadError={(uploadError: string) =>
                    setErrors((prev) => ({ ...prev, [field.id]: uploadError }))
                  }
                  isServiceForm
                  fileLabel={t(field.label)}
                  buttonText="upload_file"
                />
                {errors[field.id] && (
                  <span className="text-sm text-red-600">{errors[field.id]}</span>
                )}
              </>
            )}

            {/* FILE OBJECT STATE (before submit) */}
            {(isFile) && (
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

                {!isSubmittedApplication && (
                  <Button
                    className="border-2 h-8 w-8 p-2"
                    type="button"
                    variant="ghost"
                    onClick={() => handleInputChange(field.id, null)}
                  >
                    <Trash2 className="h-4 w-4 text-[#82764f]" />
                  </Button>
                )}
              </Card>
            )}

            {/* URL STATE (after backend returns a link) */}
            {isUrl && (
              <Card className="p-4.5 flex flex-row items-center justify-between">
                <div className="flex flex-row gap-3 items-center">
                  <div className="h-12 w-12 p-3">
                    <img src={pdfLogo} alt="pdf logo" />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      {value?.fileName}
                    </h4>
                    <p className="text-sm text-gray-600">Uploaded Document</p>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <Button asChild className="border-2 h-8 w-8 p-2 hover:bg-transparent cursor-pointer">
                    <a href={value?.fileUrl}>
                      <Download className="h-4 w-4 text-[#82764f]" />
                    </a>
                  </Button>

                </div>
              </Card>
            )}
          </div>
        );


      case "datepicker": {
        const minYear = field.minYear ?? 1900;
        const maxYear = field.maxYear ?? new Date().getFullYear();

        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {t(field.label)}
              {field.required && <span className="text-destructive">*</span>}
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!formData[field.id] && "text-muted-foreground"
                    } ${errors[field.id] ? "border-red-600" : ""}`}
                >
                  {formData[field.id] ? (
                    formData[field.id]
                  ) : (
                    <span>Select Year</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-56 p-2" align="start">
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                  {Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map(
                    (year) => (
                      <Button
                        key={year}
                        variant={formData[field.id] === String(year) ? "default" : "outline"}
                        className="w-full"
                        onClick={() => handleInputChange(field.id, String(year))}
                      >
                        {year}
                      </Button>
                    )
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {errors[field.id] && (
              <span className="text-sm text-red-600">{errors[field.id]}</span>
            )}
          </div>
        );
      }


      default:
        return null
    }
  }

  return (
    <Card className={cn("lg:p-10 md:py-6 bg-[#F6F5EF]] max-md:border-none max-md:shadow-none max-md:bg-[#F6F5EF] p-0 md:bg-white/50",
      { "border-none shadow-none": isCreateApplication }
    )}>
      <div className="max-md:shadow max-md:border max-md:bg-white max-md:p-4 max-md:rounded-lg md:px-6">
        <CardTitle className="text-xl">{t(config?.title)}</CardTitle>
        <CardDescription>{t(config?.description)}</CardDescription>
        {isCreateApplication && (
          <div className="md:hidden">
            {!isSubmittedApplication ?
              <FormSteps steps={applicationSteps} /> :
              <SubmittedFormSteps setApplicationSteps={setApplicationSteps} applicationSteps={applicationSteps} />}
          </div>
        )}
      </div>
      <CardContent className="max-md:p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {config?.sections.map((section, sectionIndex) => {
            console.log('section: ', section);
            if (section.key === "ProductsJson") {
              return <ProductInformation
                setProducts={setProducts}
                products={products}
                isError={!!errors.ProductsJson}
                isSubmittedApplication={isSubmittedApplication}
              />
            }
            if (section.key === "attachments") {
              return (<div>
                <h4 className=" max-md:text-maroon-100 max-md:ml-4 mb-3">{t(section.title)}</h4>
                <div className="flex flex-col gap-3">
                  {section.fields?.map((field) => (
                    <div
                      key={field.id}
                    >
                      <MultipleAttachments
                        field={field}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        setErrors={setErrors}
                        formData={formData}
                      />
                    </div>
                  ))}
                </div>
              </div>)
            }
            return (
              <>
                <h4 className=" max-md:text-maroon-100 max-md:ml-4 mb-3">{t(section.title)}</h4>
                <Card key={sectionIndex}>
                  <CardContent className={cn("space-y-4")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields
                        ?.filter((field) => {
                          // If field has showIfSelected, show it only if that value is selected in multiselect
                          // This for filtering and showing the check box field
                          if (field.showIfSelected) {
                            const selectedList =
                              formData.requiredUpdateSet ??
                              formData.requiredUpdate ??
                              [];
                            return selectedList.includes(field.showIfSelected);
                          }
                          if (!formData[field?.id] && isSubmittedApplication && field.type === 'file') {
                            return false
                          }
                          return true;
                        })
                        ?.map((field) => (
                          <>
                            {field.subTitle && <h4 className=" text-maroon-100 max-md:ml-4 mb-3 col-span-full">{t(section.title)}</h4>}
                            <div
                              key={field.id}
                              className={["textarea", "file"].includes(field.type) ? "md:col-span-2" : ""}
                            >
                              {renderField(field)}
                            </div>
                          </>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          })}

          {!isSubmittedApplication && (<div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={handlePerviousButton}>
              {t('previous')}
            </Button>
            <div className="flex flex-row items-center gap-3">
              {isCreateApplication &&
                <Button type="submit" variant="outline" onClick={handleSave}>
                  {t("save")}
                </Button>
              }
              <Button type="button" className="bg-maroon-100 hover:bg-[#7A1F2B]" onClick={(!isLastStepActive || isNext) ? goToNextStep : handleSubmit}>
                {(!isLastStepActive || isNext) ? t("next") : t("submit")}
              </Button>
            </div>
          </div>)}
        </form>
      </CardContent>
    </Card>
  )
}

export default DynamicForm
