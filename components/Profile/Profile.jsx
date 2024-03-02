import React from "react";
import MyAppBar from "@/components/common/MyAppBar";
import Header from "@/components/common/Header"
import PageAvatar from "@/components/common/PageAvatar";
import ProfileCountact from './ProfileCountact'
import Bio from "../common/Bio";
import Explain from "../common/Explain";
import UserJobs from "./UserJobs";
import UserName from "./UserName";
function Profile({ user, logedUserCode }) {
    return (
        <>
            <MyAppBar user={user} logedUserCode={logedUserCode}  />
            <Header user={user} />
            <PageAvatar user={user} />
            {/* <UserName user={user} />
            <Bio user={user} />
            <ProfileCountact user={user} />
            <ProfileExplain user={user} />
            <UserJobs user={user} /> */}
        </>

    )

}


export default Profile;