import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import RequestModel from '@/models/Request';
import { GET } from "@/app/api/auth/me/route"
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

interface User {
    _id: string;
    primeJob: string;
    [key: string]: any;
}

interface RequestBody {
    Requester: {
        _id: string;
        [key: string]: any;
    };
    title: string;
    message: string;
    guild: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json() as RequestBody;
    const response = await GET(req);
    const user = await response.json() as User;
    const { Requester, title, message, guild } = body;

    const uniqCode = createHash("sha256").update(user._id + process.env.PAPER).digest("hex");

    try {
        user.primeJob === Requester._id;
        await RequestModel.create({
            uniqCode,
            requesterBusiness: Requester,
            acceptedBy: [],
            needMoreInfo: [],
            title,
            message,
            guild,
        });
        return NextResponse.json(
            { message: `the Request created successfully.` },
            { status: 201 }
        );
    } catch (error) {
        console.error(`Error creating the Request:`, error);
        return NextResponse.json(
            { message: `Error creating the Request `, error },
            { status: 500 })
    }
} 