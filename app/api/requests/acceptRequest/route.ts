import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import RequestModel from '@/models/Request';
import { GET } from "@/app/api/auth/me/route"
import { NextRequest, NextResponse } from "next/server";

interface User {
    _id: string;
    code: number;
    primeJob: string;
    [key: string]: any;
}

interface Business {
    _id: string;
    agentCode: number;
    [key: string]: any;
}

interface Request {
    _id: string;
    acceptedBy: string[];
    save: () => Promise<void>;
    [key: string]: any;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const response = await GET(req);
    const user = await response.json() as User;
    const { requestID } = await req.json() as { requestID: string };

    const userPrimeJobBusiness = await BusinessModel.findOne({ _id: user.primeJob }) as Business;

    try {
        if (!user.primeJob) {
            return NextResponse.json(
                { message: "you dont have primeJob" },
                { status: 403 })
        }
        if (user.code !== Number(userPrimeJobBusiness.agentCode)) {
            return NextResponse.json(
                { message: "you are not business Agent" },
                { status: 406 })
        }
        const Request = await RequestModel.findOne({ _id: requestID }) as Request;
        Request.acceptedBy.addToSet(user.primeJob);
        await Request.save();
        
        return NextResponse.json(
            { message: "your answer added to the Request" },
            { status: 201 }
        );
    } catch (error) {
        console.error(`Error adding your answer to the Request:`, error);
        return NextResponse.json(
            { message: `server error `, error },
            { status: 500 })
    }
} 