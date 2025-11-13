import React, { createContext, useContext, useState, type ReactNode } from "react";

// Define type for context

export interface StepsType {
  title: string,
  completed: boolean,
  active: boolean, 
  stepNumber: string,
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
}
interface ApplicationFilter {
  page: number,
  status?: string,
  applicationType?: string
  totalPages?: number
}
interface AppContextType {
    contactId: string;
    setContactId: React.Dispatch<React.SetStateAction<string>>;
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
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props
interface AppProviderProps {
  children: ReactNode;
}

// Provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [contactId, setContactId] = useState('a2032062-a76e-f011-b4cc-6045bd9e8ac7')
    
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

    //Application
    const [isCreateNewForm, setCreateNewForm] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState<SelectedInvestment | null>(null)

    //services
    const [serviceFilter, setServiceFilter] = useState<ServiceFilter>({page: 1})

    //application
    const [applicationFilter, setApplicationFilter] = useState<ApplicationFilter>({page: 1})
    const [applicationDraftFilter, setApplicationDarftFilter] = useState<ApplicationFilter>({page: 1, status: '939330004'})


  return (
    <AppContext.Provider value={{ 
        contactId, 
        setContactId,
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
        setApplicationDarftFilter
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
