import React from "react";
import MyAppBar from "./MyAppBar";
import BusinessHeader from "./BusinessHeader"
import BusinessAvatar from "./BusinessAvatar";
import TableSegment from './TableSegment'
import BusinessTexts from './BusinessTexts'
import BusinessTable from './BusinessTable'

function Business() {
    return (
        <>
            <MyAppBar />
            <BusinessHeader/>            
            <BusinessAvatar />
            <BusinessTexts/>
            <TableSegment/>
            <BusinessTable/>
        </>

    )

}


export default Business;