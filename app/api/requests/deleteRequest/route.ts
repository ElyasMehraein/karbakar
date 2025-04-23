import RequestModel from '@/models/Request';
import { GET } from "@/app/api/auth/me/route"
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

interface User {
    _id: string;
    [key: string]: any;
}

interface Request {
    _id: string;
    uniqCode: string;
    [key: string]: any;
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    const body = await req.json()
    const { jobRequestId } = body as { jobRequestId: string }
    const response = await GET(req)
    const user = await response.json() as User

    const uniqCode = createHash("sha256").update(user._id + process.env.PAPER).digest("hex");
    const userJobRequest = await RequestModel.findById(jobRequestId) as Request

    if (!userJobRequest) {
        return NextResponse.json({ status: 404 }, { message: 'Document not found' })
    }

    if (!userJobRequest.uniqCode === uniqCode) {
        return NextResponse.json(
            { message: `You are not authorized to delete this jobRequest ` },
            { status: 403 }
        )
    }

    try {
        await RequestModel.findOneAndDelete({ _id: jobRequestId });
        return NextResponse.json({ message: 'Document deleted successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 })
    }
} 