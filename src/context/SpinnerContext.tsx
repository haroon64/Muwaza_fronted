"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface SpinnerContextType {
  showSpinner: () => void;
  hideSpinner: () => void;
  isLoading: boolean;
}

// Create context
const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

// Provider component
export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => setIsLoading(true);
  const hideSpinner = () => setIsLoading(false);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner, isLoading }}>
      {children}
    </SpinnerContext.Provider>
  );
};

// Custom hook to use spinner
export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
};
