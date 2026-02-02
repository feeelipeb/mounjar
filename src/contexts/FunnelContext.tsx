import React, { createContext, useContext, useState, ReactNode } from "react";

interface FunnelData {
  age: string;
  weightGoal: string;
  bodyType: string;
  targetArea: string;
  name: string;
  weightImpact: string;
  appearance: string;
  obstacle: string;
  benefits: string;
  currentWeight: string;
}

interface FunnelContextType {
  data: FunnelData;
  updateData: (key: keyof FunnelData, value: string) => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export const FunnelProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FunnelData>({
    age: "",
    weightGoal: "",
    bodyType: "",
    targetArea: "",
    name: "",
    weightImpact: "",
    appearance: "",
    obstacle: "",
    benefits: "",
    currentWeight: "",
  });

  const updateData = (key: keyof FunnelData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FunnelContext.Provider value={{ data, updateData }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error("useFunnel must be used within a FunnelProvider");
  }
  return context;
};
