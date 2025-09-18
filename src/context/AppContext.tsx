import { initialIndustrialPlotsSteps } from "@/constants";
import React, { createContext, useContext, useState, type ReactNode } from "react";

// Define type for context

export interface StepsType {
  title: string,
  completed: boolean,
  active: boolean, 
  stepNumber: string,
}
interface AppContextType {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addCompanySteps: StepsType[];
    setAddCompanySteps: React.Dispatch<React.SetStateAction<StepsType[]>>;
    industrialPlotsSteps: StepsType[];
    setIndustrialPlotsSteps: React.Dispatch<React.SetStateAction<StepsType[]>>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props
interface AppProviderProps {
  children: ReactNode;
}

// Provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const [addCompanySteps, setAddCompanySteps] = useState([
      { title: "Upload CR Document", completed: false, active: true, stepNumber: "1" },
      { title: "Review Company Details", completed: false, active: false, stepNumber: "2" },
      { title: "Upload Documents", completed: false, active: false, stepNumber: "3" },
      { title: "Select Company Details", completed: false, active: false, stepNumber: "4" },
      { title: "Review & Submit", completed: false, active: false, stepNumber: "5" },
      { title: "FormSubmission", completed: false, active: false, stepNumber: "6" },
    ])
    
    const [industrialPlotsSteps, setIndustrialPlotsSteps] = useState(initialIndustrialPlotsSteps)

  return (
    <AppContext.Provider value={{ 
        isMenuOpen, 
        setIsMenuOpen, 
        addCompanySteps, 
        setAddCompanySteps,
        industrialPlotsSteps,
        setIndustrialPlotsSteps
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
