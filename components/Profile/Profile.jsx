import React from "react";
import MyAppBar from "./MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import ProfileCountact from './ProfileCountact'
import ProfileBio from "./ProfileBio";
import ProfileExplain from "./ProfileExplain";
import UserJobs from "./UserJobs";
import UserName from "./UserName";

function Profile({props}) {
    return (
        <>
            <MyAppBar data={props} />
            <ProfileImg/>
            <UserAvatar />
            <UserName/>
            <ProfileBio/>
            <ProfileCountact/>
            <ProfileExplain/>
            <UserJobs/>
        </>

    )

}


export default Profile;