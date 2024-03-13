import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import CountactEdit from '../modules/ContactEdit'
import BioEdit from "../modules/BioEdit";
import ExplainEdit from "../modules/ExplainEdit";
import NameEdit from "../modules/NameEdit";

export default function EditProfile({ business, logedUserCode }) {
    return (
        <>
            {/* <h1>edit business</h1> */}
            <MyAppBar />
            <NameEdit business={business} label={"نام کسب و کار"}  />
            <BioEdit business={business}/>
            <ExplainEdit business={business} />
            <CountactEdit  business={business} />
        </>

    )

}