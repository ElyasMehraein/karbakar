import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
// import { redirect } from 'next/navigation'
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";
import GuildModel from "@/models/Guild";
export async function POST(req) {

    try {
        const body = await req.json()
        const { selectedBusiness, customerCode, bills } = body;
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        const Business = JSON.parse(JSON.stringify(await BusinessModel.findOne({ businessName: selectedBusiness }).populate("guild")))
        console.log("aajjjj", Business.guild);

        const customer = JSON.parse(JSON.stringify(await UserModel.findOne({ code: customerCode })))
        if (!customer) {
            return Response.json({ message: "customer not found" }, { status: 404 })
        }
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        if (customer.code === user.code) {
            return Response.json({ message: "406 you can't sell things to yourself!" }, { status: 406 })
        }
        if (customer.businesses.length === 0) {
            return Response.json({ message: "customer have no business" }, { status: 407 })
        }
        console.log("888888888888", Business.guild);
        const createdBill = await BillModel.create({
            guild: Business.guild._id,
            from: Business._id,
            to: customer._id,
            products: bills,
            status: "pending"
        })

        await ReportModel.create({
            recepiant: customer._id,
            title: "bill",
            business: Business._id,
            bill: createdBill._id,
            isSeen: false,
            isAnswerNeed: false,
            answer: false,
        })

        return Response.json({ message: "Bill & report created successfully" }, { status: 201 })


    } catch (err) {
        return Response.json({ message: "server error" }, { status: 500 })
    }
}