"use client";

import React, { useEffect, useState } from "react";
import SearchAppBar from "@/components/templates/index/SearchAppBar";
import RightDrawer from "@/components/templates/index/RightDrawer";
import Tabs from "@/components/templates/index/Tabs";
import BugReport from "@/components/modules/BugReport";
import { ActiveTabProvider } from '@/components/context/ActiveTabContext';

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
    demandsForGuilds: {
      guild: {
        _id: string;
        guildName: string;
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

interface MyIndexProps {
  user: User | null;
  bills: Bill[];
  token: string | undefined;
  distinctGuilds: string[];
  primeBusiness: Business | null;
  relations: BusinessRelation[];
  guestRelations: BusinessRelation[];
  isGuest: boolean;
}

export default function MyIndex({
  user,
  bills,
  distinctGuilds,
  primeBusiness,
  relations,
  guestRelations
}: MyIndexProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuClickHandler = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    mounted && (
      <>
        {user && <BugReport user={user} />}
        <RightDrawer
          user={user}
          open={open}
          handleDrawerClose={handleDrawerClose}
          primeBusiness={primeBusiness}
        />
        <ActiveTabProvider>
          <SearchAppBar user={user} menuClickHandler={menuClickHandler} />
          <Tabs {...{ distinctGuilds, user, bills, primeBusiness, relations, guestRelations }} />
        </ActiveTabProvider>
      </>
    )
  );
} 