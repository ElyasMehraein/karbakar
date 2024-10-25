import connectToDB from "@/configs/db";
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import { GET } from "@/app/api/auth/me/route";

export async function PATCH(req) {
    try {
        const body = await req.json();
        const { provider, receiver, isAnswerNeed, answer } = body;

        connectToDB();

        const response = await GET(req);
        const user = await response.json();
        const loggedUser = JSON.parse(JSON.stringify(await UserModel.findOne({ code: user.code })));

        if (!loggedUser) {
            return Response.json({ message: "log in first" }, { status: 404 });
        }

        const providerBusiness = JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: provider })));
        const receiverBusiness = JSON.parse(JSON.stringify(await BusinessModel.findOne({ _id: receiver })));

        if (Number(providerBusiness.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 });
        }

        const existingRelation = await BusinessRelationModel.findOne({
            provider: providerBusiness,
            receiver: receiverBusiness,
        });

        if (!existingRelation) {
            return Response.json({ message: "Relation does not exist" }, { status: 404 });
        }

        existingRelation.isAnswerNeed = isAnswerNeed;
        existingRelation.answer = answer;

        await existingRelation.save();

        return Response.json({ message: "Relation updated successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}