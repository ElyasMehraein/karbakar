import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import Header from "@/components/modules/Header";
import PageAvatar from "@/components/modules/PageAvatar";
import Bio from '@/components/modules/Bio'
import Contact from '@/components/modules/Contact'
import TableBusiness from '@/components/templates/business/TableBusiness'
import EmployeeList from "@/components/modules/EmployeeList";
import WhatBusinessGet from "@/components/templates/business/WhatBusinessGet";
import Explain from "@/components/modules/Explain";
import Name from "@/components/modules/Name";
import dynamic from "next/dynamic";
import TableBusiness2 from "./TableBusiness2";
import AddToReceiversButton from "@/components/modules/AddToReceiversButton";
import ProvidersAndReceivers from "@/components/modules/ProvidersAndReceivers";

const Map = dynamic(() => import("@/components/templates/business/Map"), { ssr: false })
function Business({ relations, business, logedUser, bills }) {

    let providerRelations = relations?.filter((relation) => {
        if (!relation.isAnswerNeed) {
            return relation.receiver._id == business._id
        }
    })
    let receiverRelations = relations?.filter((relation) => {
        if (!relation.isAnswerNeed) {
            return relation.provider._id == business._id
        }
    })
    
    return (
        <>
            <MyAppBar logedUser={logedUser} business={business} />
            <Header business={business} />
            <PageAvatar business={business} />
            <Name business={business} />
            <Bio business={business} />
            <ProvidersAndReceivers filteredRelations={providerRelations} title={"تامین کنندگان"}  />
            <ProvidersAndReceivers filteredRelations={receiverRelations} title={"دریافت کنندگان"} />
            <AddToReceiversButton logedUser={logedUser} business={business} relations={relations} />
            <Contact business={business} />
            <Map business={business} />
            <Explain business={business} />
            <TableBusiness business={business} bills={bills} />
            <TableBusiness2 />
            <EmployeeList business={business} />
        </>
    )

}


export default Business;