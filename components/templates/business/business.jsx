import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import Header from "@/components/modules/Header";
import PageAvatar from "@/components/modules/PageAvatar";
import Bio from '@/components/modules/Bio'
import Contact from '@/components/modules/Contact'
import TableBusiness from '@/components/templates/business/TableBusiness'
import EmploeeList from "@/components/modules/EmploeeList";
import WhatBusinessGet from "@/components/templates/business/WhatBusinessGet";
import Explain from "@/components/modules/Explain";
import Name from "@/components/modules/Name";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/templates/business/Map"), { ssr: false })
function Business({ business, logedUserCode }) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} business={business} />
            <Header business={business} />
            <PageAvatar user={null} business={business} />
            <Name business={business} />
            <Bio business={business} />
            <Contact business={business} />
            <Map business={business} />
            <Explain business={business} />
            <TableBusiness business={business} />
            <EmploeeList business={business} />
            <WhatBusinessGet business={business} />
        </>
    )

}


export default Business;