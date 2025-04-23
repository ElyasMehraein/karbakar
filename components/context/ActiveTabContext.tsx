'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ActiveTabContextType {
  activeTab: number;
  setActiveTab: (value: number) => void;
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined
);

interface ActiveTabProviderProps {
  children: ReactNode;
}

export function ActiveTabProvider({ children }: ActiveTabProviderProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

export function useActiveTab() {
  const context = useContext(ActiveTabContext);
  if (context === undefined) {
    throw new Error('useActiveTab must be used within an ActiveTabProvider');
  }
  return context;
}
