import CreateBusiness from "@/components/templates/createBusiness/CreateBusiness";
import { verifyToken } from "@/controllers/auth";
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";



export default async function page() {

    const token = cookies().get("token")?.value;
    const tokenPayLoad = verifyToken(token);
    if (!tokenPayLoad) {
        redirect('/')
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
    return (
        <CreateBusiness />
    )

}
