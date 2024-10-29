import connectToDB from "@/configs/db";
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import { GET } from "@/app/api/auth/me/route";
import ReportModel from "@/models/Report";

export async function PUT(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { businessRelationID, answer , reportID} = body;
        const response = await GET(req);
        const user = await response.json();

        const report = await ReportModel.findOne({ _id: reportID })
        const businessRelation = await BusinessRelationModel.findById(businessRelationID);
        if (!businessRelation) {
            return Response.json({ message: "Relation does not exist" }, { status: 404 });
        }

        const receiverBusiness = JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: businessRelation.receiver })));

        if (Number(receiverBusiness.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 });
        }

        businessRelation.isAnswerNeed = false;
        await businessRelation.save();
        report.isAnswerNeed = false
        report.answer = answer
        await report.save();



        return Response.json({ message: "businessRelation updated successfully" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}