import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";
import BusinessRelationModel from "@/models/BusinessRelation";

export async function POST(req) {
    try {
        connectToDB()
        const body = await req.json()
        const { businessRelation } = body;
        if (await BusinessRelationModel.findById(businessRelation)) {
            return Response.json({ message: "409 report already exist" }, { status: 409 })
        }
        const BusinessRelation = await BusinessRelationModel.findOne({ _id: businessRelation })
        const Business = await BusinessModel.findOne({ _id: BusinessRelation.provider })
        const recepiant = await UserModel.findOne({ code: Business.agentCode })
        if (!recepiant) {
            return Response.json({ message: "404 user not found" }, { status: 404 })
        }
        console.log("ta inja okeye");
        
        await ReportModel.create({
            recepiant: recepiant._id,
            title: "businessRelation",
            businessRelation,
            isSeen: false,
            isAnswerNeed: true,
            answer: false,
        })

        return Response.json({ message: "Report created successfully" }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}