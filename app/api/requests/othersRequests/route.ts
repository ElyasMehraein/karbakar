import connectToDB from '@/configs/db'
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import { notFound } from 'next/navigation'
import BusinessModel from '@/models/Business'
import { redirect } from 'next/navigation'
import UserModel from '@/models/User'
import RequestModel from '@/models/Request';
import { NextRequest, NextResponse } from "next/server";

interface TokenPayload {
    id: string;
    [key: string]: any;
}

interface User {
    businesses: Array<{
        _id: string;
        [key: string]: any;
    }>;
    [key: string]: any;
}

interface Request {
    title: string;
    message: string;
    guild: string;
    acceptedBy?: string;
    requesterBusiness?: {
        _id: string;
        [key: string]: any;
    };
    createdAt: Date;
    [key: string]: any;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    const token = (await cookies()).get("token")?.value;
    const tokenPayLoad = verifyToken(token) as TokenPayload;
    try {
        if (!tokenPayLoad) { console.log("no logged user") }

        connectToDB()
        const logedUser = tokenPayLoad && await UserModel.findOne(
            { _id: tokenPayLoad.id },
        ).populate("businesses") as User;

        let requests: Request[];
        
        if (logedUser) {
            const userBusinessesID = logedUser.businesses.map((business) => business._id)
            requests = await RequestModel.find({
                requesterBusiness: { $nin: userBusinessesID }
            }).populate("requesterBusiness").sort({ createdAt: -1 })
            return NextResponse.json({ message: 'get Requests as user info successfully', data: requests }, { status: 200 });
        } else {
            requests = await RequestModel.find({}, "title message guild acceptedBy").sort({ createdAt: -1 });
            return NextResponse.json({ message: 'get Requests for guests successfully', data: requests }, { status: 200 });
        }
    } catch (error) {
        console.error(`Error get reports`, error);
        return NextResponse.json(
            { message: `Error get reports`, error },
            { status: 500 })
    }
} 