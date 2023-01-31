import React from "react";
import MyAppBar from "./MyAppBar";
import BusinessHeader from "./BusinessHeader"
import BusinessAvatar from "./BusinessAvatar";
import BusinessBio from './businessBio'
import CountactBusiness from './CountactBusiness'
import TableBoxing from './TableBoxing'

import { Box } from "@mui/material";

function Business() {
    return (
        <Box >
            <MyAppBar />
            <BusinessHeader/>            
            <BusinessAvatar />
            <BusinessBio/>
            <CountactBusiness/>
            <TableBoxing/>
        </Box>

    )

}


export default Business;