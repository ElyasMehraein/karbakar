import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";
import { NextRequest } from 'next/server';

interface RequestBody {
    recepiantCode: number;
    business: {
        businessName: string;
    };
}

interface User {
    _id: string;
    code: number;
    businesses: string[];
    primeJob: string;
}

interface Business {
    _id: string;
    agentCode: number;
    businessName: string;
    workers: string[];
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json()
        const { recepiantCode, business } = body;
        await connectToDB()
        const response = await GET(req)
        const user: User = await response.json()
        const Business: Business = await BusinessModel.findOne({ businessName: business.businessName }).lean()
        if (Number(Business.agentCode) !== user.code) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 })
        }
        const recepiant: User = await UserModel.findOne({ code: recepiantCode }).lean()

        if (!recepiant) {
            return Response.json({ message: "404 user not found" }, { status: 404 })
        }

        if (recepiant.code === user.code) {
            // fix this later . actualy you can quit from your job here
            return Response.json({ message: "406 You cannot fire yourself!" }, { status: 406 })
        }

        const isEmployeeHere = Business.workers.some((worker) => worker === recepiant._id)

        if (!isEmployeeHere) {
            return Response.json({ message: "This user is not a member of this business" }, { status: 409 })
        }

        await ReportModel.create({
            recepiant: recepiant._id,
            title: "dismissal",
            business: Business._id,
            isSeen: false,
            isAnswerNeed: false,
        })
        await UserModel.updateOne(
            { _id: recepiant._id },
            { $pull: { businesses: Business._id } }
        );

        await BusinessModel.updateOne(
            { _id: Business._id },
            { $pull: { workers: recepiant._id } }
        );
        if (recepiant.primeJob !== Business._id) {
            return Response.json({ message: "Report created and user fired successfully" }, { status: 201 })
        }
        await UserModel.updateOne(
            { _id: recepiant._id },
            { $pull: { primeJob: Business._id } }
        );
        return Response.json({ message: "Report created and user fired successfully" }, { status: 201 })
    } catch (err: any) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
} 