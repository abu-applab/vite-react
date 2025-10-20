



// Select company details

export const companyCategories = [
  "SME Start-up & Micro Enterprise (0-9 employees)",
  "SME Small Enterprise (10-49 employees)",
  "SME Medium Enterprise (50-249 employees)",
  "Others",
]

export const businessSectors = [
  "Accounting",
  "Agriculture and Non-petrol Natural Resources",
  "Broadcasting Printing and Publishing",
  "Brokers",
  "Building Supply Retail",
  "Business Services",
  "Consulting",
]

export const operationTypes = [
  "Production Facility",
  "Assembly Facility",
  "Maintenance & Repair Facility",
  "Call Centre",
  "Training Facility",
  "Marketing/Sales Office",
  "Corporate/Regional HQ",
]

// 🔹 Define form fields dynamically
export const SelectCompanyDetailsformFields = [
  {
    id: "companyCategory",
    label: "Company Category",
    options: companyCategories,
    required: true,
    placeholder: 'Select',
    type: 'select',
  },
  {
    id: "businessSector",
    label: "Business Sector",
    options: businessSectors,
    required: true,
    placeholder: 'Select',
    type: 'select',
  },
  {
    id: "operationType",
    label: "Type of Operation",
    options: operationTypes,
    required: true,
    placeholder: 'Select',
    type: 'select',
  },
  {
    id: "other",
    label: "Others",
    required: true,
    type: 'text'
  },
]

export const initialIndustrialSteps = [
  { title: "Instruction", completed: false, active: true, stepNumber: "1" },
  { title: "Company Details (1 of 2)", completed: false, active: false, stepNumber: "2" },
  { title: "Company Details (2 of 2", completed: false, active: false, stepNumber: "3" },
  { title: "Document Upload", completed: false, active: false, stepNumber: "4" },
]

export const serviceOptions = [
  {
      title: "Logistics Park",
      key: "logisticsPark"
  },
  {
      title: "Industrial",
      key: "industrial"
  },
  {
      title: "Commercial",
      key: "commercial"
  },
  {
      title: "Open Yards",
      key: "openYards"
  },
]

export const newApplicationPlots = {
  logisticsPark: [],
  industrial: [
    { title: "Instruction", completed: false, active: true, stepNumber: "1" },
    { title: "Company Details (1 of 2)", completed: false, active: false, stepNumber: "2" },
    { title: "Company Details (2 of 2", completed: false, active: false, stepNumber: "3" },
    { title: "Document Upload", completed: false, active: false, stepNumber: "4" },
  ],
  commercial: [
    { title: "Instruction", completed: false, active: true, stepNumber: "1" },
    { title: "Company Details (1 of 2)", completed: false, active: false, stepNumber: "2" },
    { title: "Company Details (2 of 2", completed: false, active: false, stepNumber: "3" },
    { title: "Document Upload", completed: false, active: false, stepNumber: "4" },
  ],
  openYards: [
    { title: "Instruction", completed: false, active: true, stepNumber: "1" },
    { title: "Company Details (1 of 2)", completed: false, active: false, stepNumber: "2" },
    { title: "Company Details (2 of 2", completed: false, active: false, stepNumber: "3" },
    { title: "Document Upload", completed: false, active: false, stepNumber: "4" },
  ],
  smi: [
    { title: "Instruction", completed: false, active: true, stepNumber: "1" },
    { title: "Company Details (1 of 2)", completed: false, active: false, stepNumber: "2" },
    { title: "Company Details (2 of 2", completed: false, active: false, stepNumber: "3" },
    { title: "Document Upload", completed: false, active: false, stepNumber: "4" },
  ],
}

export type ServiceKey = "" | "logisticsPark" | 'industrial' | "commercial" | "openYards" | "smi"