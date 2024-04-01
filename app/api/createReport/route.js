import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";

export async function POST(req) {
    try {
        const body = await req.json()
        const { recepiantCode, business, jobOffers, bill } = body;
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
            return Response.json({ message: "406 you can't hire yourself!" }, { status: 406 })
        }
        const isEmployeeHere = JSON.parse(JSON.stringify(Business)).workers.some((worker) => {
            return worker === JSON.parse(JSON.stringify(recepiant._id))
        })

        if (isEmployeeHere) {
            return Response.json({ message: "This user is currently a member of this business" }, { status: 409 })
        }

        const isJobOfferExist = await ReportModel.findOne({ recepiant, business: Business, isjobOffersAnswerd: false })
        if (isJobOfferExist) {
            return Response.json({ message: "This jobOffer already exist" }, { status: 409.1 })
        }
        await ReportModel.create({
            recepiant: recepiant._id,
            business: Business._id,
            jobOffers,
            isSeen: false,
            isjobOffersAnswerd: false,
            isjobOffersAnswerd: false,
            jobOfferAnswer: false,
            bill,
        })

        return Response.json({ message: "Report created successfully" }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}