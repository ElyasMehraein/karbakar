import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import BusinessRelationModel from "@/models/BusinessRelation";
import { GET } from "@/app/api/auth/me/route";
import ReportModel from "@/models/Report";

export async function PUT(req) {
    try {
        await connectToDB();
        const body = await req.json();
        const { provider, receiver } = body;

        const res = await GET(req);
        const user = await res.json();

        if (!user || !user.code) {
            return Response.json({ message: "Please log in first" }, { status: 401 });
        }

        const loggedUser = await UserModel.findOne({ code: user.code });
        if (!loggedUser) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const business = await BusinessModel.findById(provider).lean();
        if (!business) {
            return Response.json({ message: "Business not found" }, { status: 404 });
        }

        if (Number(business.agentCode) !== Number(user.code)) {
            return Response.json({ message: "Unauthorized access" }, { status: 403 });
        }

        const existingRelation = await BusinessRelationModel.findOne({ provider, receiver });
        if (existingRelation) {
            return Response.json({ message: "Relation already exists" }, { status: 409 });
        }

        const newRelation = new BusinessRelationModel({ provider, receiver, isAnswerNeed: true });
        await newRelation.save();

        return Response.json({ message: "relation created successfully", data: newRelation }, { status: 201 });

    } catch (error) {
        console.error("Error in PUT /business/relations:", error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
