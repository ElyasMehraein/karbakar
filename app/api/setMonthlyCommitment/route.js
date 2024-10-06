import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
// import { redirect } from 'next/navigation'
import { GET } from "@/app/api/auth/me/route"

export async function POST(req) {

    try {
        const body = await req.json()
        const { businessID, productName, unitOfMeasurement, amount, isRetail } = body;
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        const Business = JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: businessID })))
        const loggedUser = JSON.parse(JSON.stringify(await UserModel.findOne({ code: user.code })))
        if (!loggedUser) {
            return Response.json({ message: "log in first" }, { status: 404 })
        }
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        // await BusinessModel.findByIdAndUpdate(Business._id, {
        //     monthlyCommitment :
        //     productName,
        //     unitOfMeasurement,
        //     amount,
        //     isRetail,

        // })

        console.log("hala be inja beres ta bad");
        

        return Response.json({ message: "business created successfully" }, { status: 201 })


    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}