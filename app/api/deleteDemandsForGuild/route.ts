import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";
import { NextRequest } from 'next/server';

interface RequestBody {
    businessID: string;
    demandID: string;
}

interface User {
    _id: string;
    code: number;
}

interface Business {
    _id: string;
    workers: string[];
    demandsForGuilds: {
        guild: string;
    }[];
}

export async function DELETE(req: NextRequest) {
    try {
        const body: RequestBody = await req.json()
        const { businessID, demandID } = body;

        await connectToDB()
        const response = await GET(req)

        const user: User = await response.json()
        if (!user) { return Response.json({ message: "you need to login" }, { status: 404 }) }

        const Business: Business = await BusinessModel.findOne({ _id: businessID }).lean()
        if (!Business) { return Response.json({ message: "Business not found" }, { status: 404 }) }

        function isEmployeeHere(userID: string): boolean {
            return Business.workers.some((worker) => worker === userID)
        }

        if (isEmployeeHere(user._id)) {
            return Response.json({ message: "you are not a member of this business" }, { status: 403 })
        }

        await BusinessModel.updateOne(
            { _id: Business._id },
            { $pull: { demandsForGuilds: { guild: demandID } } }
        );

        return Response.json({ message: "Demand deleted successfully" }, { status: 200 })
    } catch (err: any) {
        console.error(err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
} 