import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import { GET } from "@/app/api/auth/me/route"

export async function PUT(req) {

    try {
        const body = await req.json()
        const { businessID, receivers } = body;
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        const loggedUser = JSON.parse(JSON.stringify(await UserModel.findOne({ code: user.code })))
        if (!loggedUser) {
            return Response.json({ message: "log in first" }, { status: 404 })
        }
        const Business = JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: businessID })))
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        await BusinessModel.findOneAndUpdate(
            { _id: businessID },
            {
                $set: {
                    receivers
                }
            }
        );

        return Response.json({ message: "receivers updated successfully" }, { status: 201 })


    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}