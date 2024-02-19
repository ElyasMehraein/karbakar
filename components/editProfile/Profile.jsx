import React from "react";
import MyAppBar from "./MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import CountactEdit from '../common/CountactEdit'
import BioEdit from "../common/BioEdit";
import ExplainEdit from "../common/ExplainEdit";
import NameEdit from "../common/NameEdit";

function Profile({ logedUserCode, whichUserProfile }) {
    console.log("inja chie", whichUserProfile);
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


export default Profile;