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

function Business({ business, logedUserCode, whichUserProfile }) {
    return (
        <Box >
            <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
            <BusinessHeader business={business} />
            <BusinessAvatar business={business} />
            <BusinessBio business={business} />
            <CountactBusiness business={business} />
            <TableBusiness business={business} />
            <EmploeeList business={business} />
            <WhatBusinessGet business={business} />
        </Box>

    )

}


export default Business;