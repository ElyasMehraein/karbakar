import React from "react";
import MyAppBar from "./MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import ProfileCountact from './ProfileCountact'
import ProfileBio from "./ProfileBio";
import ProfileExplain from "./ProfileExplain";
import UserJobs from "./UserJobs";
import UserName from "./UserName";
function Profile({user ,logedUserCode, whichUserProfile}) {
    return (
        <>
            <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
            <ProfileImg  user={user}/>
            <UserAvatar user={user} />
            <UserName user={user}/>
            <ProfileBio user={user}/>
            <ProfileCountact user={user}/>
            <ProfileExplain user={user}/>
            <UserJobs user={user}/>
        </>

    )

}


export default Profile;