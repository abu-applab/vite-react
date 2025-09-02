import React, { createContext, useContext, useState, type ReactNode } from "react";

// Define type for context
interface AppContextType {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
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


  return (
    <AppContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
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
