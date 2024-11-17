import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";
import ReportModel from "@/models/Report";
import UnionModel from "@/models/Union";

export async function POST(req) {
    try {
        await connectToDB();
        const body = await req.json();
        const { unionName, slogan, validityPeriod, businessID } = body;

        const res = await GET(req);
        const user = await res.json();

        if (!user || !user.code) {
            return Response.json({ message: "Please log in first" }, { status: 401 });
        }

        const loggedUser = await UserModel.findOne({ code: user.code });
        if (!loggedUser) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const business = await BusinessModel.findById(businessID).lean();
        if (!business) {
            return Response.json({ message: "Business not found" }, { status: 404 });
        }

        if (Number(business.agentCode) !== Number(user.code)) {
            return Response.json({ message: "Unauthorized access" }, { status: 403 });
        }
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const unionsCount = await UnionModel.countDocuments({
            createdBy: businessID,
            createdAt: { $gte: oneMonthAgo },
        });

        if (unionsCount >= 5) {
            return Response.json({ message: "Each business can only create 5 unions in a month" }, { status: 409 });
        }

        const newUnion = new UnionModel({
            unionName,
            slogan,
            validityPeriod,
            createdBy: businessID,
            members: [businessID],
        });
        await newUnion.save();

        return Response.json({ message: "Union created successfully", data: newUnion }, { status: 201 });

    } catch (error) {
        console.error("Server error:", error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
