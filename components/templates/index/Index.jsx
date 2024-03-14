"use client"

import React, { useState } from "react";
import SearchAppBar from "@/components/templates/index/SearchAppBar";
import RightDrawer from "@/components/templates/index/RightDrawer";
import Tabs from "@/components/templates/index/Tabs";


export default function Index({user,bills, token}) {
  const [open, setOpen] = useState(false);

  const menuClickHandler = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* {user ?
        <h3 dir="ltr">you are logging with following personal code {user.code} you are logging with following token {token}</h3> : <h3 dir="ltr">you are not loged in</h3>
      } */}
      <RightDrawer
        user={user}
        open={open}
        handleDrawerClose={handleDrawerClose} />
      <SearchAppBar
        user={user}
        menuClickHandler={menuClickHandler} />
      <Tabs
       user={user} bills={bills}
      />

    </>
  );
}