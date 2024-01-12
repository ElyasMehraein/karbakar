"use client"
import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchAppBar from "@/components/index/SearchAppBar";
import RightDrawer from "@/components/index/RightDrawer";
import Tabs from "@/components/index/Tabs";
import CssBaseline from "@mui/material";

function Index() {
  const [open, setOpen] = React.useState(false);

  const menuClickHandler = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
{/* 
      <RightDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <SearchAppBar menuClickHandler={menuClickHandler} /> */}
      <Tabs />

    </>
  );
}

export default Index;