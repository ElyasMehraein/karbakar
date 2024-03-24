import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import CountactEdit from '@/components/modules/ContactEdit'
import BioEdit from "@/components/modules/BioEdit";
import ExplainEdit from "@/components/modules/ExplainEdit";
import NameEdit from "@/components/modules/NameEdit";
import EditAvatar from "@/components/modules/EditAvatar";
import EditHeader from "@/components/modules/EditHeader";

export default function EditProfile({user, logedUserCode, whichUserProfile }) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
            <EditHeader user={user}/>
            <EditAvatar user={user} />
            <NameEdit user={user}  defaultValue={"پروفایل"} label={"نام و نشان"} />
            <BioEdit user={user} />
            <ExplainEdit user={user} />
            <CountactEdit user={user}/>
        </>

    )

}