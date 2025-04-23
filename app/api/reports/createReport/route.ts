import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";
import BusinessRelationModel from "@/models/BusinessRelation";
import { NextRequest, NextResponse } from "next/server";

interface User {
    _id: string;
    code: number;
    businesses: string[];
    [key: string]: any;
}

interface Business {
    _id: string;
    businessName: string;
    agentCode: number;
    workers: string[];
    [key: string]: any;
}

interface Report {
    recepiant: string;
    title: string;
    business: string;
    bill?: string;
    businessRelation?: string;
    isSeen: boolean;
    isAnswerNeed: boolean;
    answer: boolean;
    [key: string]: any;
}

interface RequestBody {
    recepiantCode: number;
    business: {
        businessName: string;
        [key: string]: any;
    };
    title: string;
    bill?: string;
    businessRelation?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    let isAnswerNeed = false;
    try {
        const body = await req.json() as RequestBody;
        const { recepiantCode, business, title, bill, businessRelation } = body;
        connectToDB();
        const response = await GET(req);
        const user = await response.json() as User;
        const Business = await BusinessModel.findOne({ businessName: business.businessName }) as Business;

        if (Number(Business.agentCode) !== user.code) {
            return NextResponse.json({ message: "403 Unauthorized access" }, { status: 403 });
        }

        const recepiant = await UserModel.findOne({ code: recepiantCode }) as User;

        if (!recepiant) {
            return NextResponse.json({ message: "404 user not found" }, { status: 404 });
        }

        if (title === "jobOffer") {
            if (recepiant.businesses.length >= 3) {
                return NextResponse.json({ message: "users can only be a member of a maximum of 3 businesses" }, { status: 405 });
            }
            if (recepiant.code === user.code) {
                return NextResponse.json({ message: "406 you can't hire yourself!" }, { status: 406 });
            }
            const isEmployeeHere = JSON.parse(JSON.stringify(Business)).workers.some((worker: string) => {
                return worker === JSON.parse(JSON.stringify(recepiant._id));
            });

            if (isEmployeeHere) {
                return NextResponse.json({ message: "This user is currently a member of this business" }, { status: 409 });
            }

            const isJobOfferExist = await ReportModel.findOne({ recepiant, business: Business, isAnswerNeed: true });
            if (isJobOfferExist) {
                return NextResponse.json({ message: "This jobOffer already exist" }, { status: 410 });
            }
            isAnswerNeed = true;
        }

        if (title === "businessRelation") {
            await BusinessRelationModel.findById(businessRelation);
        }

        await ReportModel.create({
            recepiant: recepiant._id,
            title,
            business: Business._id,
            bill,
            businessRelation,
            isSeen: false,
            isAnswerNeed,
            answer: false,
        });

        return NextResponse.json({ message: "Report created successfully" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "server error" }, { status: 500 });
    }
} 