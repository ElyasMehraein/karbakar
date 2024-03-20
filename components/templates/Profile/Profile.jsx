import React from "react";
import MyAppBar from "@/components/modules/MyAppBar";
import Header from "@/components/modules/Header"
import PageAvatar from "@/components/modules/PageAvatar";
import contact from '@/components/modules/Contact'
import Bio from "@/components/modules/Bio";
import Explain from "@/components/modules/Explain";
import UserJobs from "@/components/templates/Profile/UserJobs";
import Name from "@/components/modules/Name";
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