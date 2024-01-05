"use client"
import React from "react";
import Tabs from "@/components/index/Tabs";
import DrawerAndAppBar from "@/components/index/DrawerAndAppBar";
import { Box } from "@mui/material";

function Index() {
  return (
    <Box>
      <DrawerAndAppBar />
      <Tabs />
    </Box>
  );
}

export default Index;