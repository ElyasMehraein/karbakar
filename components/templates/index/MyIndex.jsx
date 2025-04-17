"use client";

import React, { useEffect, useState } from "react";
import SearchAppBar from "@/components/templates/index/SearchAppBar";
import RightDrawer from "@/components/templates/index/RightDrawer";
import Tabs from "@/components/templates/index/Tabs";
import BugReport from "@/components/modules/BugReport";
import { ActiveTabProvider } from '@/components/context/ActiveTabContext';

export default function MyIndex({
  user,
  bills,
  distinctGuilds,
  primeBusiness,
  relations,
  guestRelations
}) {

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
