import React from "react";
import MyAppBar from "@/components/common/MyAppBar";
import CountactEdit from '../common/ContactEdit'
import BioEdit from "../common/BioEdit";
import ExplainEdit from "../common/ExplainEdit";
import NameEdit from "../common/NameEdit";

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