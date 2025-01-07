import connectToDB from '@/configs/db';
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import ReportModel from '@/models/Report';

export async function GET(req) {
    try {
        await connectToDB();

        // استفاده صحیح از cookies در Next.js 15
        const cookieStore = await cookies(); // بدون await در این ورژن
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return new Response(
                JSON.stringify({ message: "only users can get reports" }), 
                { status: 403 }
            );
        }

        let tokenPayLoad;
        try {
            tokenPayLoad = verifyToken(token);
        } catch (error) {
            return new Response(
                JSON.stringify({ message: "Invalid token", error: error.message }), 
                { status: 401 }
            );
        }

        const logedUser = await UserModel.findById(tokenPayLoad.id);
        if (!logedUser) {
            return new Response(
                JSON.stringify({ message: "User not found" }), 
                { status: 404 }
            );
        }

        const reports = await ReportModel.find({ recepiant: logedUser._id })
            .populate("business bill recepiant providerBusiness receiverBusiness products.product")
            .sort({ createdAt: -1 });

        return new Response(
            JSON.stringify({ message: 'get reports successfully', data: reports }), 
            { status: 200 }
        );

    } catch (error) {
        console.error(`Error getting reports`, error);
        return new Response(
            JSON.stringify({ message: `Error getting reports`, error: error.message }), 
            { status: 500 }
        );
    }
}
