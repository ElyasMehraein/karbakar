import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
// import { redirect } from 'next/navigation'
import { GET } from "@/app/api/auth/me/route"

export async function POST(req) {

    try {
        const body = await req.json()
        const { selectedBusiness, customerCode, bills } = body;
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        const Business = JSON.parse(JSON.stringify(await BusinessModel.findOne({ businessName: selectedBusiness })))
        const customer = JSON.parse(JSON.stringify(await UserModel.findOne({ code: customerCode })))
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        await BillModel.create({
            guild:Business.guildname,
            from: Business._id,
            to: customer._id,
            products: bills,
            isAccept: false
        })

        return Response.json({ message: "business created successfully" }, { status: 201 })


    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}