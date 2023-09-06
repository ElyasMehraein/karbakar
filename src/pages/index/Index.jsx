import React from "react";
import IndexAppBar from "./IndexAppBar";
import Whatsup from "./Whatsup";
import { Box } from "@mui/material";
import YourReq from "./temporaryComponents/YourReq"

function Index() {
    return (
        <Box>
            <IndexAppBar />
            <Whatsup />
        </Box>
    )
}

export default Index;