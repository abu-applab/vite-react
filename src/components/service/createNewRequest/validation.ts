import { getServiceFormConfig } from "@/lib/form-data"
import { allowedCommentChars, hasArabicLetters, hasEmojiOrUnicodeSymbols, hasSpecialChars, isArabic, isDigitsOnly, isEmpty, isEnglish, isValidBuildingPermitNumber, isValidEmail, isValidPhone, isValidPOBox } from "@/lib/utils"

export const validateForm = (selectedService: string, formState: Record<string, any>, t: any) => {
  const config = getServiceFormConfig(selectedService)
  let newErrors: Record<string, string> = {}


  const validateTextLength = (field: any, value: string) => {
    if (field.max && value.length > field.max)
      return `Maximum ${field.max} characters allowed`
    if (field.min && value.length < field.min)
      return `Minimum ${field.min} characters required`
  }

  config.sections.forEach((section) => {
    section.fields?.forEach((field) => {
      const rawValue = formState[field.id]
      const value = typeof rawValue === "string" ? rawValue.trim() : rawValue
      const selectedList = formState.RequiredUpdateSet ?? formState.RequiredUpdate ?? [];
      if (field.required && isEmpty(value) && (!field.showIfSelected || (field.showIfSelected && selectedList?.includes(field.showIfSelected)))) {
        newErrors[field.id] = `${t(field.label)} is required`
        return
      }

      if ((field.id.toLocaleLowerCase() === "comments" || field.id.toLocaleLowerCase() === "description" || field.id.toLocaleLowerCase() === 'subject') && value) {
        if (isDigitsOnly(value)) newErrors[field.id] = "This field cannot contain digits only."
        if (hasEmojiOrUnicodeSymbols(value)) newErrors[field.id] = "Emojis or special Unicode symbols are not allowed."
        if (!allowedCommentChars(value)) newErrors[field.id] = "Only letters, numbers, spaces, and . , ! ? - allowed."
      }

      if (["text", "textarea"].includes(field.type) && value) {
        const err = validateTextLength(field, value)
        if (err) newErrors[field.id] = err
        if (isDigitsOnly(value)) newErrors[field.id] = "This field cannot contain digits only."
      }

      if (field.label.includes("new_company_name") && value) {
        if (hasSpecialChars(value)) newErrors[field.id] = "Special characters not allowed."
        if (field.label.includes("en") && isArabic(value)) newErrors[field.id] = "Must be English."
        if (field.label.includes("ar") && isEnglish(value)) newErrors[field.id] = "Must be Arabic."
      }

      if (field.label === "new_email" && value) {
        if(!isValidEmail(value)) newErrors[field.id] = "Please enter a valid email address."
        if (hasArabicLetters(value)) newErrors[field.id] = "Only English alphanumeric characters are allowed."
      }
      if (field.label === "new_phone" && value && !isValidPhone(value))
        newErrors[field.id] = "Must contain exactly 8 digits."
      if (field.label === "new_po_box" && value && !isValidPOBox(value))
        newErrors[field.id] = "Must contain 5 to 8 character."
      if (field.label === "building_permit_application_number" && value && !isValidBuildingPermitNumber(value))
        newErrors[field.id] = "Must contain 1 to 10 character."

      if (field.type === "number" && value !== undefined && value !== null && value !== "") {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
          newErrors[field.id] = `${t(field.label)} must be a valid number`;
        }
        else if (numericValue <= 0) {
          newErrors[field.id] = `${t(field.label)} must be greater than 0`;
        }
        else if (/^0\d+/.test(value)) {
          newErrors[field.id] = `${t(field.label)} cannot start with 0`;
        }
      }
    })
  })

  return newErrors
}
