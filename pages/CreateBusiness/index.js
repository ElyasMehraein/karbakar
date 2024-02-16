import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
// import BusinessModel from '@/models/Business'
import { verifyToken } from '@/controllers/auth'
import MyAppBar from '@/components/editBusiness/MyAppBar'
import BusinessHeader from '@/components/editBusiness/BusinessHeader'
import BusinessAvatar from '@/components/editBusiness/BusinessAvatar'
import BusinessBio from '@/components/editBusiness/businessBio'
import CountactBusiness from '@/components/editBusiness/CountactBusiness'
import TableBusiness from '@/components/editBusiness/TableBusiness'
import EmploeeList from '@/components/editBusiness/EmploeeList'
import WhatBusinessGet from '@/components/editBusiness/WhatBusinessGet'

export default function createBusiness({ user }) {





    return (
        < >
            <MyAppBar />
            <BusinessHeader />
            <BusinessAvatar />
            <BusinessBio />
            <CountactBusiness />
            <TableBusiness />
            <EmploeeList />
            <WhatBusinessGet />
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
