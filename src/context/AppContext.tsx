import { getLocalStorageItem } from "@/lib/utils";
import React, { createContext, useContext, useState, type ReactNode } from "react";

// Define type for context

export interface StepsType {
  title: string,
  completed: boolean,
  active: boolean,
  stepNumber: string,
}
export interface Contact {
  id: string,
  firstName: string,
  lastName: string,
}
export interface CompanyType {
  accountID: string;
  englishName: string;
  arabicName: string;
  crNumber: string;
  email: string | null;
  phone: string;
  status: string;
  createdOn: string;
}

interface SelectedInvestment {
  application: string,
  applicationType: string,
  location?: string,
  locationId?: string,
  status?: string,
}

interface ServiceFilter {
  page: number,
  status?: string,
  totalPages?: number
  searchTerm?: string
  typeOfApplication?: string
}
interface ViolationFilter {
  page: number,
  status?: string,
  totalPages?: number
  searchTerm?: string
}
interface ApplicationFilter {
  page: number,
  status?: string,
  totalPages?: number
  typeOfApplication?: string
  searchTerm?: string
}
interface CompanyFilter {
  page: number,
  status?: string,
  totalPages?: number
  searchTerm?: string
}

interface Locations {
  id: string,
  name: string,
  nameAr: string,
}

interface AppContextType {
  contact: Contact | null;
  setContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addCompanySteps: StepsType[];
  setAddCompanySteps: React.Dispatch<React.SetStateAction<StepsType[]>>;
  contactName: string;
  setContactName: React.Dispatch<React.SetStateAction<string>>;
  companies: CompanyType[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyType[]>>;
  selectedCompany: CompanyType | null;
  setSelectedCompany: React.Dispatch<React.SetStateAction<CompanyType | null>>;
  isCreateNewForm: boolean;
  setCreateNewForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInvestment: SelectedInvestment | null;
  setSelectedInvestment: React.Dispatch<React.SetStateAction<SelectedInvestment | null>>;
  serviceFilter: ServiceFilter;
  setServiceFilter: React.Dispatch<React.SetStateAction<ServiceFilter>>;
  applicationFilter: ApplicationFilter;
  setApplicationFilter: React.Dispatch<React.SetStateAction<ApplicationFilter>>;
  applicationDraftFilter: ApplicationFilter;
  setApplicationDarftFilter: React.Dispatch<React.SetStateAction<ApplicationFilter>>;
  companiesFilter: CompanyFilter;
  setCompaniesFilter: React.Dispatch<React.SetStateAction<CompanyFilter>>;
  violationFilter: ViolationFilter;
  setViolationFilter: React.Dispatch<React.SetStateAction<ViolationFilter>>;
  locations: Locations[];
  setLocations: React.Dispatch<React.SetStateAction<Locations[]>>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props
interface AppProviderProps {
  children: ReactNode;
}

// Provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const storedContact = getLocalStorageItem("contact");
  const initialContact: Contact | null = storedContact ? JSON.parse(storedContact) : null;
  const [contact, setContact] = useState<Contact | null>(initialContact);


  const [locations, setLocations] = useState<Locations[]>([]);


  //navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  //create new company
  const [addCompanySteps, setAddCompanySteps] = useState([
    { title: "Upload CR Document", completed: false, active: true, stepNumber: "1" },
    { title: "Review Company Details", completed: false, active: false, stepNumber: "2" },
    { title: "Upload Documents", completed: false, active: false, stepNumber: "3" },
    { title: "Select Company Details", completed: false, active: false, stepNumber: "4" },
    { title: "Review & Submit", completed: false, active: false, stepNumber: "5" },
    { title: "FormSubmission", completed: false, active: false, stepNumber: "6" },
  ])
  // comapnies
  const [contactName, setContactName] = useState('')
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
  const [companiesFilter, setCompaniesFilter] = useState<CompanyFilter>({ page: 1 })


  //Application
  const [isCreateNewForm, setCreateNewForm] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<SelectedInvestment | null>(null)

  //services
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>({ page: 1 })

  //services
  const [violationFilter, setViolationFilter] = useState<ViolationFilter>({ page: 1 })

  //application
  const [applicationFilter, setApplicationFilter] = useState<ApplicationFilter>({ page: 1 })
  const [applicationDraftFilter, setApplicationDarftFilter] = useState<ApplicationFilter>({ page: 1, status: '939330004' })


  return (
    <AppContext.Provider value={{
      contact,
      setContact,
      isMenuOpen,
      setIsMenuOpen,
      addCompanySteps,
      setAddCompanySteps,
      companies,
      setCompanies,
      selectedCompany,
      setSelectedCompany,
      contactName,
      setContactName,
      isCreateNewForm,
      setCreateNewForm,
      selectedInvestment,
      setSelectedInvestment,
      serviceFilter,
      setServiceFilter,
      applicationFilter,
      setApplicationFilter,
      applicationDraftFilter,
      setApplicationDarftFilter,
      companiesFilter,
      setCompaniesFilter,
      violationFilter,
      setViolationFilter,
      locations,
      setLocations,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};
