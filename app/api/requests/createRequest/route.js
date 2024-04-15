import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import RequestModel from '@/models/Request';
import { GET } from "@/app/api/auth/me/route"
import { createHash } from "crypto";

export async function POST(req) {
    const body = await req.json()
    const response = await GET(req)
    const user = await response.json()
    const { Requester, title, message, guild } = body


    const uniqCode = createHash("sha256").update(user._id + process.env.PAPER).digest("hex");


    try {
        user.primeJob === Requester._id
        await RequestModel.create({
            uniqCode,
            requesterBusiness: Requester,
            acceptedBy: [],
            needMoreInfo: [],
            title,
            message,
            guild,
        })
        return Response.json(
            { message: `the Request created successfully.` },
            { status: 201 }
        );
    } catch (error) {
        console.error(`Error creating the Request:`, error);
        Response.json(
            { message: `Error creating the Request `, error },
            { status: 500 })
    }
}
