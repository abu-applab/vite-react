
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

  const isValidEmployeeCount = (value: string) => /^[0-9]{1,6}$/.test(value);

  const containsArabicNumerals = (value: string) => {
    const arabicNumeralsRegex = /[\u0660-\u0669]/; // Arabic numerals ٠-٩
    return arabicNumeralsRegex.test(value);
  };

  const hasSpecialCharacters = (value: string) => {
    const validCharsRegex = /^[\p{L}\s]*$/u;
    return !validCharsRegex.test(value);
  };


  //   const hasSpecialChars = (val: string) => /[^A-Za-z0-9\u0600-\u06FF\s]/.test(val)
  //   const isArabic = (val: string) => /[\u0600-\u06FF]/.test(val)
  //   const isEnglish = (val: string) => /[A-Za-z]/.test(val)

  export const validateForm = (config: FormConfig, formState: Record<string, any>, t: any, isSave = false) => {
    let newErrors: Record<string, string> = {};
    const excludedKeys = [
      "TotalCost",
      "TotalFunding",
      "TotalRequestedPlotSize",
    ];
  
    const validateTextLength = (field: any, value: string) => {
      if (field.max && value.length > field.max)
        return `Maximum ${field.max} characters allowed`;
      if (field.min && value.length < field.min)
        return `Minimum ${field.min} characters required`;
    };
  
    config.sections.forEach((section: any) => {
      section.fields?.forEach((field: any) => {
        const value = formState[field.id]?.toString().trim?.() || formState[field.id];
  
        if (field.required && isEmpty(value) && !isSave && (!excludedKeys.includes(field.id))) {
          if(field.id === 'isicSection' && formState.isicCode) {
            return;
          } else {
            newErrors[field.id] = `${t(field.label)} is required`;
          }
          return;
        }

        if(field.id === 'location' && !value && isSave) {
          newErrors[field.id] = `${t(field.label)} is required`;
        }

        if((field.id === 'technologyCountryOfOrigin' || field.id === 'equipmentCountryOfOrigin') && value && hasSpecialCharacters(value)) {
          newErrors[field.id] = "This field can only contain letters and spaces."
        }
  
        // 🔹 Handle numeric fields with 10-digit limit and > 0 validation
        const numericFields = [
          "openArea",
          "administration",
          "laboratory",
          "rawMaterialStorage",
          "productionArea",
          "finishedProductStorage",
          "maintenanceWorkshops",
          "potableWater",
          "sewer",
          "naturalGas",
          "seaCoolingWater",
          "electricity",
          "fuelProducts",
          "stackHeight",
          "temperature",
          "rateOfEmission",
          "wasteQuantity",
          "levelOfNoiseAtPlotBoundary",
        ];
  
        if (numericFields.includes(field.id) && value) {

          if (parseInt(value, 10) === 0) {
            newErrors[field.id] = `${t(field.label)} cannot be 0`;
            return;
          }
  
          if (value.length > 10) {
            newErrors[field.id] = `${t(field.label)} cannot exceed 10 digits`;
            return;
          }
        }
  
        // Existing validation for business activity
        if (field.id.toLowerCase() === "proposedbusinessactivity" && value) {
          if (isDigitsOnly(value)) newErrors[field.id] = "This field cannot contain digits only.";
          if (hasEmojiOrUnicodeSymbols(value)) newErrors[field.id] = "Emojis or special Unicode symbols are not allowed.";
          if (!allowedCommentChars(value)) newErrors[field.id] = "Only letters, numbers, spaces, and . , ! ? - allowed.";
        }
  
        if (["text", "textarea"].includes(field.type) && value) {
          const err = validateTextLength(field, value);
          if (err) newErrors[field.id] = err;
          if (isDigitsOnly(value)) newErrors[field.id] = "This field cannot contain digits only.";
        }

        if (field.type === "text" && value) {
          const err = containsArabicNumerals(value);
          if (err) newErrors[field.id] = "This field cannot contain Arabic numerals";
        }

        const maximum15digits = [
          "totalRequestedPlotSize",
          "constructionCost", 
          "costOfPlantMachinery", 
          "costOfOtherFixedAssets", 
          "equity", 
          "debt",
          "workingCapital",
        ]
        if (maximum15digits.includes(field.id) && value &&  /^\d{16,}$/.test(value))
            newErrors[field.id] = "Maximum 15 digits allowed"

        if (!isValidEmployeeCount(value) && value && (field.id === 'currentNumberOfEmployees' || field.id === 'additionalEmploymentProjected')) {
          newErrors[field.id] = "Please enter a valid number (1–6 digits)";
        }

        if (parseInt(value, 10) === 0 && field?.id === 'totalRequestedPlotSize') {
          newErrors[field.id] = `${t(field.label)} cannot be 0`;
          return;
        }
      });
    });
  
    return newErrors;
  };
  
