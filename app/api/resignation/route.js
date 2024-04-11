import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";

export async function POST(req) {
    try {
        const body = await req.json()
        const { newAgentID, selectedBusinessId } = body;
        console.log("ta inja fine", body, newAgentID, selectedBusinessId);

        connectToDB()
        const response = await GET(req)
        const user = await response.json()

        if (!user) { return Response.json({ message: "you need to login" }, { status: 404 }) }

        const Business = await BusinessModel.findOne({ _id: selectedBusinessId })
        const newAgent = await UserModel.findOne({ code: newAgentID })

        if (newAgent.businesses.length >= 3) {
            return Response.json({ message: "any user can only be a member of a maximum of 3 businesses" }, { status: 405 })
        }

        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }

        function isEmployeeHere(userID) {
            JSON.parse(JSON.stringify(Business)).workers.some((worker) => {
                return worker === JSON.parse(JSON.stringify(userID))
            })
        }

        if (isEmployeeHere(user._id)) {
            return Response.json({ message: "you are not a member of this business" }, { status: 409 })
        }
        if (isEmployeeHere(newAgent.id)) {
            return Response.json({ message: "next agent is not a member of this business" }, { status: 409 })
        }
        const recepiantUser = await UserModel.findOne({ code: Business.agentCode })
        await ReportModel.create({
            recepiant: recepiantUser._id,
            title: "resignation",
            business: Business._id,
            isSeen: false,
            isAnswerNeed: false,
        })
        await ReportModel.create({
            recepiant: newAgent.id,
            title: "YouAreAgent",
            business: Business._id,
            isSeen: false,
            isAnswerNeed: false,
        })
        await UserModel.updateOne(
            { _id: user._id },
            { $pull: { businesses: Business._id } }
        );

        await UserModel.findByIdAndUpdate(newAgent._id, { primeJob: Business._id })

        await BusinessModel.updateOne(
            { _id: Business._id },
            { $pull: { workers: user._id } }
        );

        Business.agentCode = newAgent.code
        await Business.save()

        return Response.json({ message: "Report created and user resignation is successfully" }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}