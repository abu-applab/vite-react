
interface FieldConfig {
    id: string;
    label: string;
    type: string;
    required?: boolean;
    max?: number;
    min?: number;
  }
  
  interface SectionConfig {
    sectionName?: string;
    fields: FieldConfig[];
  }
  
  interface FormConfig {
    sections: SectionConfig[];
  }
  
  const isEmpty = (val: any) => val === undefined || val === null || val === ""
  const isDigitsOnly = (val: string) => /^\d+$/.test(val)
  const hasEmojiOrUnicodeSymbols = (val: string) =>
    /[^\u0000-\u007F\u0600-\u06FF\s]/.test(val); 

  const allowedCommentChars = (val: string) =>
    /^[A-Za-z0-9\u0600-\u06FF\s.,!?-]+$/.test(val);

  //   const hasSpecialChars = (val: string) => /[^A-Za-z0-9\u0600-\u06FF\s]/.test(val)
  //   const isArabic = (val: string) => /[\u0600-\u06FF]/.test(val)
  //   const isEnglish = (val: string) => /[A-Za-z]/.test(val)

export const validateForm = (config : FormConfig, formState: Record<string, any>, isSave = false) => {

  let newErrors: Record<string, string> = {}
  
  const validateTextLength = (field: any, value: string) => {
    if (field.max && value.length > field.max)
      return `Maximum ${field.max} characters allowed`
    if (field.min && value.length < field.min)
      return `Minimum ${field.min} characters required`
  }

  config.sections.forEach((section: any) => {
    section.fields?.forEach((field: any) => {
      const value = formState[field.id]?.trim?.() || formState[field.id]
      if (field.required && isEmpty(value) && !isSave) {
        newErrors[field.id] = `${field.label} is required`
        return
      }

      if ((field.id.toLocaleLowerCase() === "proposedbusinessactivity") && value) {
        if (isDigitsOnly(value)) newErrors[field.id] = "This field cannot contain digits only."
        if (hasEmojiOrUnicodeSymbols(value)) newErrors[field.id] = "Emojis or special Unicode symbols are not allowed."
        if (!allowedCommentChars(value)) newErrors[field.id] = "Only letters, numbers, spaces, and . , ! ? - allowed."
      }

      if (["text", "textarea"].includes(field.type) && value) {
        const err = validateTextLength(field, value)
        if (err) newErrors[field.id] = err
      }
      if (field.label === "Total Requested Plot Size (m2)" && value &&  /^\d{16,}$/.test(value))
        newErrors[field.id] = "Maximum 15 digits allowed"
    })
  })

  return newErrors
};
