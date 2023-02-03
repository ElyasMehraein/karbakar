import React from "react";
import IndexAppBar from "./IndexAppBar";
import Whatsup from "./Whatsup";
import { Box } from "@mui/material";

function Index() {
    return (
        <Box>

            <IndexAppBar />
            <Whatsup />
        </Box>
    )
}

export default Index;