"use client"
import React from "react";
import { Box } from "@mui/material";
import SearchAppBar from "@/components/index/SearchAppBar";
import RightDrawer from "@/components/index/RightDrawer";
import Tabs from "@/components/index/Tabs";


function Index() {
  return (
    <>
      
      <RightDrawer/>
      <SearchAppBar />
      {/* <Tabs/> */}
      
    </>
  );
}

export default Index;