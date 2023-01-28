import React from "react";
import MyAppBar from "./MyAppBar";
import ProfileImg from "./ProfileImg"
import UserAvatar from "./UserAvatar";
import TableSegment from './TableSegment'
import ProfileTexts from './ProfileTexts'
import ProfileTable from './ProfileTable'

function Profile() {
    return (
        <>
            <MyAppBar />
            <ProfileImg>
            </ProfileImg>
            <UserAvatar />
            <ProfileTexts/>
            <TableSegment/>
            <ProfileTable/>
        </>

    )

}


export default Profile;