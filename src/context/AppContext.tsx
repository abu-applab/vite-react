import { initialIndustrialSteps } from "@/constants";
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
interface AppContextType {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addCompanySteps: StepsType[];
    setAddCompanySteps: React.Dispatch<React.SetStateAction<StepsType[]>>;
    industrialSteps: StepsType[];
    setIndustrialSteps: React.Dispatch<React.SetStateAction<StepsType[]>>;
    contactName: string;
    setContactName: React.Dispatch<React.SetStateAction<string>>;
    companies: CompanyType[];
    setCompanies: React.Dispatch<React.SetStateAction<CompanyType[]>>;
    selectedCompany: CompanyType | null;
    setSelectedCompany: React.Dispatch<React.SetStateAction<CompanyType | null>>;
    isCreateNewForm: boolean;
    setCreateNewForm: React.Dispatch<React.SetStateAction<boolean>>;
    selectedLocation: string;
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;

}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props
interface AppProviderProps {
  children: ReactNode;
}

// Provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [addCompanySteps, setAddCompanySteps] = useState([
      { title: "Upload CR Document", completed: false, active: true, stepNumber: "1" },
      { title: "Review Company Details", completed: false, active: false, stepNumber: "2" },
      { title: "Upload Documents", completed: false, active: false, stepNumber: "3" },
      { title: "Select Company Details", completed: false, active: false, stepNumber: "4" },
      { title: "Review & Submit", completed: false, active: false, stepNumber: "5" },
      { title: "FormSubmission", completed: false, active: false, stepNumber: "6" },
    ])
    
    const [industrialSteps, setIndustrialSteps] = useState(initialIndustrialSteps)

    // comapnies
    const [contactName, setContactName] = useState('')
    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

    const [isCreateNewForm, setCreateNewForm] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');


  return (
    <AppContext.Provider value={{ 
        isMenuOpen, 
        setIsMenuOpen, 
        addCompanySteps, 
        setAddCompanySteps,
        industrialSteps,
        setIndustrialSteps,
        companies,
        setCompanies,
        selectedCompany,
        setSelectedCompany,
        contactName,
        setContactName,
        isCreateNewForm,
        setCreateNewForm,
        selectedLocation,
        setSelectedLocation,
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
