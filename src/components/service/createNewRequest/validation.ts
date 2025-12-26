import { getServiceFormConfig } from "@/lib/form-data"
import { allowedCommentChars, hasArabicLetters, hasEmojiOrUnicodeSymbols, hasSpecialChars, isArabic, isDigitsOnly, isEmpty, isEnglish, isValidBuildingPermitNumber, isValidEmail, isValidPhone, isValidPOBox } from "@/lib/utils"

const error = (
  t: any,
  key: string,
  field: any,
  params: Record<string, any> = {}
) => t(key, { field: t(field.label), ...params })

export const validateForm = (selectedService: string, formState: Record<string, any>, t: any) => {
  const config = getServiceFormConfig(selectedService)
  let newErrors: Record<string, string> = {}


  const validateTextLength = (field: any, value: string) => {
    if (field.max && value.length > field.max)
      return error(t, "maxLength", field, { max: field.max })
    if (field.min && value.length < field.min)
      return error(t, "minLength", field, { min: field.min })
  }

  config.sections.forEach((section) => {
    section.fields?.forEach((field) => {
      const rawValue = formState[field.id]
      const value = typeof rawValue === "string" ? rawValue.trim() : rawValue
      const selectedList = formState.requiredUpdateSet ?? formState.requiredUpdate ?? [];
      if (field.required && isEmpty(value) && (!field.showIfSelected || (field.showIfSelected && selectedList?.includes(field.showIfSelected)))) {
        newErrors[field.id] = error(t, "required", field)
        return
      }

      if ((field.id.toLocaleLowerCase() === "comments" || field.id.toLocaleLowerCase() === "description" || field.id.toLocaleLowerCase() === 'subject') && value) {
        if (isDigitsOnly(value)) newErrors[field.id] = error(t, "digitsOnly", field)
        else if (hasEmojiOrUnicodeSymbols(value)) newErrors[field.id] = error(t, "emojiNotAllowed", field)
        else if (!allowedCommentChars(value)) newErrors[field.id] = error(t, "allowedChars", field)
      }

      if (["text", "textarea"].includes(field.type) && value) {
        const err = validateTextLength(field, value)
        if (err) newErrors[field.id] = err
        if (isDigitsOnly(value)) newErrors[field.id] = error(t, "digitsOnly", field)
      }

      if (field.label.includes("new_company_name") && value) {
        if (hasSpecialChars(value)) newErrors[field.id] = error(t, "noSpecialChars", field)
        if (field.label.includes("en") && isArabic(value)) newErrors[field.id] = error(t, "mustBeEnglish", field)
        if (field.label.includes("ar") && isEnglish(value)) newErrors[field.id] = error(t, "mustBeArabic", field)
      }
      if (field.label === "new_email" && value) {
        if(!isValidEmail(value)) newErrors[field.id] = error(t, "invalidEmail", field)
        if (hasArabicLetters(value)) newErrors[field.id] = error(t, "englishAlphaNumeric", field)
      }
      if (field.label === "new_phone" && value && !isValidPhone(value))
        newErrors[field.id] = error(t, "phoneExactDigits", field, { count: 8 })
      if (field.label === "new_po_box" && value && !isValidPOBox(value))
        newErrors[field.id] = error(t, "digitsRange", field, { min: 5, max: 8 })
      if (field.label === "building_permit_application_number" && value && !isValidBuildingPermitNumber(value))
        newErrors[field.id] = error(t, "digitsRange", field, { min: 1, max: 10 })

      if (field.type === "number" && value !== undefined && value !== null && value !== "") {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
          newErrors[field.id] = error(t, "invalidNumber", field)
        }
        else if (numericValue <= 0) {
          newErrors[field.id] = error(t, "greaterThanZero", field)
        }
        else if (/^0\d+/.test(value)) {
          newErrors[field.id] = error(t, "noLeadingZero", field)
        }
      }
    })
  })

  return newErrors
}
