import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
// import BusinessModel from '@/models/Business'
import { verifyToken } from '@/controllers/auth'
import MyAppBar from '@/components/editBusiness/MyAppBar'
import BusinessHeader from '@/components/editBusiness/BusinessHeader'
import BusinessAvatar from '@/components/editBusiness/BusinessAvatar'
import BioEdit from '@/components/common/BioEdit'
import Guild from '@/components/common/Guild'
import ExplainEdit from '@/components/common/ExplainEdit'
import CountactEdit from '@/components/common/CountactEdit'
import MakePrimary from '@/components/editBusiness/MakePrimary'
import EmploeeList from '@/components/editBusiness/EmploeeList'
import WhatBusinessGet from '@/components/editBusiness/WhatBusinessGet'
import NameEdit from '@/components/common/NameEdit'

export default function createBusiness({ user }) {





    return (
        < >
            <MyAppBar />
            <BusinessHeader />
            <BusinessAvatar />
            <NameEdit/>
            <Guild/>
            <BioEdit/>
            <ExplainEdit/>
            <MakePrimary/>
            <CountactEdit />
        </>
    )

}

export async function getServerSideProps(context) {

    const { token } = context.req.cookies;
    const tokenPayLoad = verifyToken(token);
    if (!tokenPayLoad) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    connectToDB()
    const user = await UserModel.findOne(
        { _id: tokenPayLoad.id },
        "code"
    )
    if (!user) {
        return {
            redirect: {
                destination: "/",
            }
        }
    }
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    }
}
