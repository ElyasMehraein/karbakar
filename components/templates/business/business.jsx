"use client";
import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import Header from "@/components/modules/Header";
import PageAvatar from "@/components/modules/PageAvatar";
import Bio from '@/components/modules/Bio';
import Contact from '@/components/modules/Contact';
import EmployeeList from "@/components/modules/EmployeeList";
import WhatBusinessGet from "@/components/templates/business/WhatBusinessGet";
import Explain from "@/components/modules/Explain";
import Name from "@/components/modules/Name";
import dynamic from "next/dynamic";
import MonthlyCommitment from "./MonthlyCommitment";
import AddToReceiversButton from "@/components/modules/AddToReceiversButton";
import ProvidersAndReceivers from "@/components/modules/ProvidersAndReceivers";

const Map = dynamic(() => import("@/components/templates/business/Map"), { ssr: false });

function Business({ relations, business, logedUser, bills }) {

    const providerRelations = relations?.filter((relation) => 
        !relation?.isAnswerNeed && relation?.receiver?._id === business?._id
    );

    const receiverRelations = relations?.filter((relation) => 
        !relation?.isAnswerNeed && relation?.provider?._id === business?._id
    );
    
    return (
        <>
            <MyAppBar logedUser={logedUser} business={business} />
            <Header business={business} />
            <PageAvatar business={business} />
            <Name business={business} />
            <Bio business={business} />
            <ProvidersAndReceivers key={"providers" + business._id} filteredRelations={providerRelations} title={"تامین کنندگان"}  />
            <ProvidersAndReceivers key={"receivers" + business._id} filteredRelations={receiverRelations} title={"دریافت کنندگان"} />
            <AddToReceiversButton logedUser={logedUser} business={business} relations={relations} />
            <Contact business={business} />
            <Map business={business} />
            <Explain business={business} />
            <MonthlyCommitment business={business} />
            {/* <TableBusiness business={business} bills={bills} /> */}
            <EmployeeList business={business} />
        </>
    )
}

export default Business;
