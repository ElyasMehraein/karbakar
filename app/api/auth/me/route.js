import connectToDB from "@/configs/db";
import { verifyToken } from "@/controllers/auth";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET(req, res) {
    try {
        const token = cookies().get("token")?.value;
        const tokenPayLoad = verifyToken(token);

        if (!tokenPayLoad) {
            return <h1 className='inMiddle'> 403 دسترسی غیر مجاز</h1>
        }
        connectToDB()
        const user = await UserModel.findOne(
            { _id: tokenPayLoad.id },
        )
        return Response.json(user, { status: 200 })
    } catch (err) {
        return Response.json({ message: err }, { status: 500 })
    }
}
