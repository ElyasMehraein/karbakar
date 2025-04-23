"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useActiveTab } from "@/components/context/ActiveTabContext";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";

interface User {
  _id: string;
  businesses: Array<{
    _id: string;
    monthlyCommitment: {
      product: {
        _id: string;
        name: string;
      };
    };
  }>;
  primeJob?: string;
}

interface Business {
  _id: string;
  businessName: string;
  demandsForGuilds: Array<{
    guild: {
      _id: string;
      guildName: string;
    };
  }>;
  guild: {
    _id: string;
    guildName: string;
  };
}

interface Bill {
  _id: string;
  to: string;
  from: string;
  products: Array<{
    product: {
      _id: string;
      name: string;
    };
  }>;
  guild: string;
  isAccept: boolean;
}

interface BusinessRelation {
  _id: string;
  provider: {
    _id: string;
    monthlyCommitment: {
      product: {
        productName: string;
        unitOfMeasurement: string;
      };
    };
  };
  receiver: string;
  isAnswerNeed: boolean;
}

interface TabsProps {
  user: User | null;
  bills: Bill[];
  distinctGuilds: string[];
  primeBusiness: Business | null;
  relations: BusinessRelation[];
  guestRelations: BusinessRelation[];
}

export default function TabPanel({ user, bills, distinctGuilds, primeBusiness, relations, guestRelations }: TabsProps) {
  const { activeTab, setActiveTab } = useActiveTab();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="تب اول" />
          <Tab label="تب دوم" />
          <Tab label="تب سوم" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <FirstTab
          user={user}
          bills={bills}
          distinctGuilds={distinctGuilds}
          primeBusiness={primeBusiness}
        />
      )}
      {activeTab === 1 && (
        <SecondTab
          user={user}
          relations={relations}
          guestRelations={guestRelations}
        />
      )}
      {activeTab === 2 && <ThirdTab />}
    </Box>
  );
} 