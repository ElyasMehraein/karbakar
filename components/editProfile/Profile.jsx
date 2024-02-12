import React from "react";
import MyAppBar from "./MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import ProfileCountact from './ProfileCountact'
import ProfileBio from "./ProfileBio";
import ProfileExplain from "./ProfileExplain";
import UserName from "./UserName";

function Profile({ logedUserCode, whichUserProfile }) {
    console.log("inja chie", whichUserProfile);
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
            <ProfileImg />
            <UserAvatar />
            <UserName />
            <ProfileBio />
            <ProfileExplain />
            <ProfileCountact />
        </>

    )

}


export default Profile;