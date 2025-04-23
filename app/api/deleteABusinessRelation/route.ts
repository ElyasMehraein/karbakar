import connectToDB from "@/configs/db";
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import { GET } from "@/app/api/auth/me/route";
import { NextRequest } from 'next/server';

interface RequestBody {
    provider: string;
    receiver: string;
}

interface User {
    code: number;
    _id: string;
}

interface Business {
    _id: string;
    agentCode: number;
}

interface BusinessRelation {
    _id: string;
    provider: string;
    receiver: string;
}

export async function DELETE(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();
        const { provider, receiver } = body;

        await connectToDB();

        const response = await GET(req);
        const user: User = await response.json();
        const loggedUser = await UserModel.findOne({ code: user.code });

        if (!loggedUser) {
            return Response.json({ message: "log in first" }, { status: 404 });
        }

        const providerBusiness: Business = await BusinessModel.findOne({ _id: provider }).lean();
        const receiverBusiness: Business = await BusinessModel.findOne({ _id: receiver }).lean();
    
        if (!((Number(providerBusiness.agentCode) === user.code) || Number(receiverBusiness.agentCode) === user.code)) {
            return Response.json({ message: "403 Unauthorized access" }, { status: 403 });
        }

        const existingRelation = await BusinessRelationModel.findOne({
            provider: provider,
            receiver: receiver,
        });

        if (!existingRelation) {
            return Response.json({ message: "Relation does not exist" }, { status: 404 });
        }

        await existingRelation.deleteOne();

        return Response.json({ message: "Receiver removed successfully" }, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
} 