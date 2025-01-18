import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context state
interface ParsedDataState {
  [key: string]: any; // Replace `any` with a specific type if you know the structure of your state
}

// Define the context value type
interface StateContextType {
  parsedData: ParsedDataState;
  setParsedData: React.Dispatch<React.SetStateAction<ParsedDataState>>;
}

// Create a context with an initial value of `null`
const StateContext = createContext<StateContextType | undefined>(undefined);

// Create a provider component
interface StateProviderProps {
  children: ReactNode;
}

export const StateProviderParsed: React.FC<StateProviderProps> = ({
  children,
}) => {
  const [parsedData, setParsedData] = useState<ParsedDataState>({});

  return (
    <StateContext.Provider value={{ parsedData, setParsedData }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateProviderParsed"
    );
  }
  return context;
};
