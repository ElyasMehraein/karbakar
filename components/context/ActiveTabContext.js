import React, { createContext, useContext, useState } from 'react';

const ActiveTabContext = createContext();

export function ActiveTabProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

export function useActiveTab() {
  return useContext(ActiveTabContext);
}
