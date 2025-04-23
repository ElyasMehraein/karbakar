import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import ProductModel from "@/models/Product";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";
import { NextResponse } from "next/server";

interface Product {
    _id?: string;
    productName: string;
    unitOfMeasurement: string;
    isRetail: boolean;
}

interface BasketItem {
    product: Product;
    amount: number;
}

interface User {
    code: number;
}

interface Business {
    _id: string;
    agentCode: number;
    guild: {
        _id: string;
    } | string;
    union?: string;
}

interface Union {
    _id: string;
    members: string[];
    maxMembers: number;
    votes: Array<{
        voter: string;
        voteFor: string;
    }>;
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        await connectToDB();
        const body = await req.json();
        const { unionId, businessId } = body;

        if (!unionId || !businessId) {
            return NextResponse.json(
                { message: "Union ID and Business ID are required" },
                { status: 400 }
            );
        }

        const union = await UnionModel.findById(unionId) as Union | null;
        if (!union) {
            return NextResponse.json(
                { message: "Union not found" },
                { status: 404 }
            );
        }

        if (union.members.length >= union.maxMembers) {
            return NextResponse.json(
                { message: "Union is full" },
                { status: 400 }
            );
        }

        const business = await BusinessModel.findById(businessId) as Business | null;
        if (!business) {
            return NextResponse.json(
                { message: "Business not found" },
                { status: 404 }
            );
        }

        if (business.union) {
            return NextResponse.json(
                { message: "Business is already in a union" },
                { status: 400 }
            );
        }

        await UnionModel.findByIdAndUpdate(unionId, {
            $push: { members: businessId }
        });

        await BusinessModel.findByIdAndUpdate(businessId, {
            union: unionId
        });

        return NextResponse.json(
            { message: "Business joined union successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error joining union:", error);
        return NextResponse.json(
            { message: "Error joining union" },
            { status: 500 }
        );
    }
} 