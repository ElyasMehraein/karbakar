import React from "react";
import MyAppBar from "@/components/common/MyAppBar";
import Header from "@/components/common/Header";
import PageAvatar from "@/components/common/PageAvatar";
import Bio from '@/components/common/Bio'
import Contact from '@/components/common/Contact'
import TableBusiness from './TableBusiness'
import EmploeeList from "../common/EmploeeList";
import WhatBusinessGet from "./WhatBusinessGet";
import Explain from "../common/Explain";
import Name from "../common/Name";

function Business({ business, logedUserCode }) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} business={business} />
            <Header business={business} />
            <PageAvatar user={null} business={business} />
            <Name business={business}/>
            <Bio business={business} />
            <Explain business={business} />
            <Contact business={business} />
            {/* <TableBusiness business={business} />
            <EmploeeList business={business} />
            <WhatBusinessGet business={business} /> */}
        </>
    )

}


export default Business;