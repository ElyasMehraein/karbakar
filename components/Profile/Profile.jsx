import React from "react";
import MyAppBar from "@/components/common/MyAppBar";
import Header from "@/components/common/Header"
import PageAvatar from "@/components/common/PageAvatar";
import contact from '@/components/common/Contact'
import Bio from "../common/Bio";
import Explain from "../common/Explain";
import UserJobs from "./UserJobs";
import Name from "../common/Name";
function Profile({ user, logedUserCode }) {
    return (
        <>
            <MyAppBar user={user} logedUserCode={logedUserCode}  />
            <Header user={user} />
            <PageAvatar user={user} />
            <Name user={user} />
            {/*
            <Bio user={user} />
            <contact user={user} />
            <ProfileExplain user={user} />
            <UserJobs user={user} /> */}
        </>

    )

}


export default Profile;