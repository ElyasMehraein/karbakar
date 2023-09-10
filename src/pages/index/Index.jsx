import React from "react";
import PrimaryAppBar from "./PrimaryAppBar";
import Tabs from "./Tabs";
import IndexDrawer from "./IndexDrawer";
import { Box } from "@mui/material";

function Index() {
    return (
        <Box>
            <IndexDrawer/>
            <PrimaryAppBar />
            <Tabs />
        </Box>
    )
}

export default Index;