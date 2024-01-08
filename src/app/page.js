"use client"
import React from "react";
import Tabs from "@/components/index/Tabs";
import DrawerAndAppBar from "@/components/index/DrawerAndAppBar";
import { Box } from "@mui/material";
import PrimarySearchAppBar from "@/components/index/PrimarySearchAppBar";
import PersistentDrawerRight from "@/components/index/PersistentDrawerRight";


function Index() {
  return (
    <Box>
      <PrimarySearchAppBar/>
      <PersistentDrawerRight/>
      
    </Box>
  );
}

export default Index;