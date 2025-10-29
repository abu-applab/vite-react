import { getServiceFormConfig } from "@/lib/form-data"

export const validateForm = (selectedService: string, formState: Record<string, any>) => {
  const config = getServiceFormConfig(selectedService)
  let newErrors: Record<string, string> = {}

  const isEmpty = (val: any) => val === undefined || val === null || val === ""
  const isDigitsOnly = (val: string) => /^\d+$/.test(val)
  const hasSpecialChars = (val: string) => /[^A-Za-z0-9\u0600-\u06FF\s]/.test(val)
  const isArabic = (val: string) => /[\u0600-\u06FF]/.test(val)
  const isEnglish = (val: string) => /[A-Za-z]/.test(val)
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  const isValidPhone = (val: string) => /^\d{8}$/.test(val)
  const isValidPOBox = (val: string) => /^\d{5,8}$/.test(val);


  const validateTextLength = (field: any, value: string) => {
    if (field.max && value.length > field.max)
      return `Maximum ${field.max} characters allowed`
    if (field.min && value.length < field.min)
      return `Minimum ${field.min} characters required`
  }

  config.sections.forEach((section) => {
    section.fields?.forEach((field) => {
      const value = formState[field.id]?.trim?.() || formState[field.id]
      const selectedList = formState.RequiredUpdateSet ?? formState.RequiredUpdate ?? []; 
      if (field.required && isEmpty(value) && (!field.showIfSelected || (field.showIfSelected && selectedList?.includes(field.showIfSelected)))) {
        newErrors[field.id] = `${field.label} is required`
        return
      }

      if ((field.id.toLocaleLowerCase() === "comments" || field.id.toLocaleLowerCase() === "description" || field.label === "New PO Box" ) 
        && isDigitsOnly(value))
        newErrors[field.id] = "This field cannot contain digits only."

      if (["text", "textarea"].includes(field.type) && value) {
        const err = validateTextLength(field, value)
        if (err) newErrors[field.id] = err
      }

      if (field.label.includes("New Company Name") && value) {
        if (hasSpecialChars(value)) newErrors[field.id] = "Special characters not allowed."
        if (field.label.includes("(EN)") && isArabic(value)) newErrors[field.id] = "Must be English."
        if (field.label.includes("(AR)") && isEnglish(value)) newErrors[field.id] = "Must be Arabic."
      }

      if (field.label === "New Email" && value && !isValidEmail(value))
        newErrors[field.id] = "Please enter a valid email address."
      if (field.label === "New Phone" && value && !isValidPhone(value))
        newErrors[field.id] = "Must contain exactly 8 digits."
      if (field.label === "New PO Box" && value && !isValidPOBox(value))
        newErrors[field.id] = "Must contain 5 to 8 character."
    })
  })

  return newErrors
}
