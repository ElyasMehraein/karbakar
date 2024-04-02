////         // Business.workers.addToSet(recepiant._id);
// await Business.save();


import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
// import { redirect } from 'next/navigation'
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";

export async function PUT(req) {
    try {
        const body = await req.json()
        const { reportID, parameter } = body;
        connectToDB()
        const response = await GET(req)
        const user = await response.json()
        const report = await ReportModel.findOne({ _id: reportID })
        if (JSON.parse(JSON.stringify(report.recepiant)) !== user._id) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        if (report.isjobOffersAnswerd) {
            return Response.json({ message: "This jobOffer already answered" }, { status: 409 })
        }
        const Business = await BusinessModel.findOne({ _id: report.business._id })
        const isEmployeeHere = JSON.parse(JSON.stringify(Business)).workers.some((worker) => {
            return worker === JSON.parse(JSON.stringify(user._id))
        })

        if (isEmployeeHere) {
            return Response.json({ message: "you are currently a member of this business" }, { status: 409 })
        }
        if (parameter) {
            Business.workers.addToSet(user._id);
            await Business.save();
            report.isSeen = false
            console.log("are injam");
        }
        report.isSeen = false
        console.log("are ijjnjam");
        report.jobOfferAnswer = parameter
        report.isjobOffersAnswerd = true
        await report.save();

        return Response.json({ message: "user hired created successfully" }, { status: 201 })


    } catch (err) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}