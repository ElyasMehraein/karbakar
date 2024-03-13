import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import CountactEdit from '../modules/ContactEdit'
import BioEdit from "../modules/BioEdit";
import ExplainEdit from "../modules/ExplainEdit";
import NameEdit from "../modules/NameEdit";

export default function EditProfile({ logedUserCode, whichUserProfile }) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
            <ProfileImg />
            <UserAvatar />
            <NameEdit defaultValue={"پروفایل"} label={"label"} />
            <BioEdit />
            <ExplainEdit />
            <CountactEdit />
        </>

    )

}