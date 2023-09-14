import React from "react";
import MyAppBar from "./MyAppBar";
import BusinessHeader from "./BusinessHeader"
import BusinessAvatar from "./BusinessAvatar";
import BusinessBio from './businessBio'
import CountactBusiness from './CountactBusiness'
import TableBusiness from './TableBusiness'

import { Box } from "@mui/material";
import EmploeeList from "./EmploeeList";
import WhatBusinessGet from "./WhatBusinessGet";

function Business() {
    return (
        <Box >
            <MyAppBar />
            <BusinessHeader/>            
            <BusinessAvatar />
            <BusinessBio/>
            <CountactBusiness/>
            <TableBusiness/>
            <EmploeeList/>
            <WhatBusinessGet/>
        </Box>

    )

}


export default Business;