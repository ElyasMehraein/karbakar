import React from "react";
import TabPanel from "./TabPanel";
import IndexBar from "./indexBar";
import IndexTab from "./indexTab";
import { Box } from "@mui/material";

function Index() {
    return (
        <Box>
            <IndexBar />
            <IndexTab />
        </Box>
    )
}

export default Index;