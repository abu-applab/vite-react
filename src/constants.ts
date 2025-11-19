



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
    key: "Industrial"
  },
  {
    title: "Commercial",
    key: "commercial"
  },
  {
    title: "Open Yards",
    key: "Logistics"
  },
]

export const newApplicationPlots = {
  logisticsPark: [],
  Industrial: [
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
  Logistics: [
    { title: "Instruction", completed: false, active: true, stepNumber: "1" },
    { title: "Intended Use & Business Plan", completed: false, active: false, stepNumber: "2" },
    { title: "Document Upload", completed: false, active: false, stepNumber: "3" },
  ],
  smi: [
    { title: "Instruction", completed: false, active: true, stepNumber: "1" },
    { title: "Company Details (1 of 2)", completed: false, active: false, stepNumber: "2" },
    { title: "Company Details (2 of 2", completed: false, active: false, stepNumber: "3" },
    { title: "Document Upload", completed: false, active: false, stepNumber: "4" },
  ],
}

export type ServiceKey = "" | "logisticsPark" | 'Industrial' | "commercial" | "Logistics" | "smi"

// components/AuthForm/constant.js

// constants/authFields.ts
export const loginFields = [
  { id: "email", label: "Email", type: "text", placeholder: "Enter your email", icon: "Mail" },
  { id: "password", label: "Password", type: "password", placeholder: "Enter your password", icon: "Lock" },
];

export const signUpFields = [
  { id: "firstName", label: "First Name", type: "text", placeholder: "Type your first name" },
  { id: "lastName", label: "Last Name", type: "text", placeholder: "Type your last name" },
  { id: "email", label: "Email", type: "text", placeholder: "Type your email" },
  { id: "landlineNumber", label: "Landline Number", type: "number", placeholder: "Type your landline number" },
  { id: "mobileNumber", label: "Mobile Number", type: "number", placeholder: "Type your mobile number" },
  { id: "password", label: "Password", type: "password", placeholder: "Type your password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password" },
];

export const forgotPasswordFields = [
  { id: "email", label: "Email", type: "email", placeholder: "Enter your registered email" },
];

export const resetPasswordFields = [
  { id: "password", label: "New Password", type: "password", placeholder: "Enter new password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm new password" },
];
