import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import CountactEdit from '@/components/modules/ContactEdit'
import BioEdit from "@/components/modules/BioEdit";
import ExplainEdit from "@/components/modules/ExplainEdit";
import NameEdit from "@/components/modules/NameEdit";

export default function EditProfile({user, logedUserCode, whichUserProfile }) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
            <ProfileImg user={user}/>
            <UserAvatar user={user} />
            <NameEdit defaultValue={"پروفایل"} label={"نام و نشان"} />
            <BioEdit user={user} />
            <ExplainEdit user={user} />
            <CountactEdit user={user}/>
        </>

    )

}