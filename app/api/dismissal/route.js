import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";

export async function POST(req) {
    try {
        const body = await req.json()
        const { recepiantCode, business } = body;
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        const Business = await BusinessModel.findOne({ businessName: business.businessName })
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        const recepiant = await UserModel.findOne({ code: recepiantCode })

        if (!recepiant) {
            return Response.json({ message: "404 user not found" }, { status: 404 })
        }

        if (recepiant.code === user.code) {
            // fix this later . actualy you can quit from your job here
            return Response.json({ message: "406 You cannot fire yourself!" }, { status: 406 })
        }
        const isEmployeeHere = JSON.parse(JSON.stringify(Business)).workers.some((worker) => {
            return worker === JSON.parse(JSON.stringify(recepiant._id))
        })

        if (!isEmployeeHere) {
            return Response.json({ message: "This user is not a member of this business" }, { status: 409 })
        }

        await ReportModel.create({
            recepiant: recepiant._id,
            business: Business._id,
            jobOfferAnswer: true,
            isjobOffersAnswerd:true
        })
        await UserModel.updateOne(
            { _id: recepiant._id },
            { $pull: { businesses: Business._id } }
        );
        await BusinessModel.updateOne(
            { _id: Business._id },
            { $pull: { workers: recepiant._id } }
        );
        const report = await ReportModel.findOne({ recepiant })
        report.isjobOffersAnswerd = true
        report.isSeen = true

        await report.save();

        return Response.json({ message: "Report created and user fired successfully" }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}