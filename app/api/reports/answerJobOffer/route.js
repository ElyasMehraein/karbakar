import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";

export async function PUT(req) {
    try {
        const { reportID, parameter } = await req.json()
        const response = await GET(req)
        const user = await response.json()
        connectToDB()
        const report = await ReportModel.findOne({ _id: reportID })

        if (JSON.parse(JSON.stringify(report.recepiant)) !== user._id) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        if (!report.isAnswerNeed) {
            return Response.json({ message: "This jobOffer already answered" }, { status: 410 })
        }
        const Business = await BusinessModel.findOne({ _id: report.business._id })

        const isEmployeeHere = JSON.parse(JSON.stringify(Business)).workers.some((worker) => {
            return worker === JSON.parse(JSON.stringify(user._id))
        })

        if (isEmployeeHere) {
            return Response.json({ message: "you are currently a member of this business" }, { status: 409 })
        }
        report.isSeen = true
        report.isAnswerNeed = false
        report.answer = parameter
        await report.save();
        if (parameter) {
            Business.workers.addToSet(user._id)
            await Business.save();
            const candidate = await UserModel.findOne({ _id: user._id })
            candidate.businesses.addToSet(Business._id)
            await candidate.save()
            if (candidate.primeJob) {
                return Response.json({ message: "job offer accepted successfully " }, { status: 201 })
            }
            await UserModel.updateOne({ _id: candidate._id }, { primeJob: Business._id });
        }
        return Response.json({ message: "job offer answered successfully" }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}