import React from "react";
import MyAppBar from "@/components/common/MyAppBar";
import Header from "@/components/common/Header";
import PageAvatar from "@/components/common/PageAvatar";
import Bio from '@/components/common/Bio'
import CountactBusiness from './CountactBusiness'
import TableBusiness from './TableBusiness'
import EmploeeList from "../common/EmploeeList";
import WhatBusinessGet from "./WhatBusinessGet";

function Business({ business, logedUserCode }) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} business={business} />
            <Header business={business} />
            <PageAvatar business={business} />
            <Bio business={business} />
            <CountactBusiness business={business} />
            <TableBusiness business={business} />
            <EmploeeList business={business} />
            <WhatBusinessGet business={business} />
        </>
    )

}


export default Business;