"use client"

import React, { useEffect, useState } from "react";
import SearchAppBar from "@/components/templates/index/SearchAppBar";
import RightDrawer from "@/components/templates/index/RightDrawer";
import Tabs from "@/components/templates/index/Tabs";


export default function Index({ user, bills, token }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const menuClickHandler = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (mounted &&
    <>
      <RightDrawer
        user={user}
        open={open}
        handleDrawerClose={handleDrawerClose} />
      <SearchAppBar
        user={user}
        menuClickHandler={menuClickHandler} />
      <Tabs
        reports={reports}
        user={user} bills={bills}
      />

    </>
  );
}