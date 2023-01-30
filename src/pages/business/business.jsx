import React from "react";
import MyAppBar from "./MyAppBar";
import BusinessHeader from "./BusinessHeader"
import BusinessAvatar from "./BusinessAvatar";
import TableSegment from './TableSegment'
import BusinessTexts from './BusinessTexts'
import BusinessTable from './BusinessTable'
import { Box } from "@mui/material";

function Business() {
    return (
        <Box >
            <MyAppBar />
            <BusinessHeader/>            
            <BusinessAvatar />
            <BusinessTexts/>
            <TableSegment/>
            <BusinessTable/>
        </Box>

    )

}


export default Business;