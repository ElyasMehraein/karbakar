import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import GuildModel from "@/models/Guild";
import { NextRequest, NextResponse } from "next/server";

interface Business {
    businessName: string;
    bio: string;
    businessBrand: string;
    avatarUrl: string;
    longitude: number;
    latitude: number;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        await connectToDB();
        const businesses: Business[] = JSON.parse(JSON.stringify(await BusinessModel.find({},
            "businessName bio businessBrand avatarUrl longitude latitude"
        )));

        return NextResponse.json(
            { message: 'get businesses successfully', data: businesses },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error get businesses`, error);
        return NextResponse.json(
            { message: `Error get businesses`, error },
            { status: 500 })
    }
} 