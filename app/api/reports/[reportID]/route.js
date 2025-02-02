import connectToDB from '@/configs/db';
import { cookies } from "next/headers";
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import ReportModel from '@/models/Report';

export async function GET(req, { params }) {

    try {
        // اتصال به پایگاه داده
        await connectToDB();

        // دریافت و بررسی توکن
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return new Response(
                JSON.stringify({ message: "Authentication required" }),
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

        // پیدا کردن کاربر واردشده
        const logedUser = await UserModel.findById(tokenPayLoad.id);
        if (!logedUser) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }
        // بررسی پارامتر reportId
        const { reportID } = params;
        if (!reportID) {
            return new Response(
                JSON.stringify({ message: "Report ID is required" }),
                { status: 400 }
            );
        }

        // پیدا کردن گزارش با بررسی اینکه کاربر گیرنده است
        const report = await ReportModel.findOne({
            _id: reportID,
            recepiant: logedUser._id,
        }).populate("business bill recepiant providerBusiness receiverBusiness products.product");

        if (!report) {
            return new Response(
                JSON.stringify({ message: "Report not found" }),
                { status: 404 }
            );
        }
        // بازگرداندن گزارش
        return new Response(
            JSON.stringify({ message: "Report fetched successfully", data: report }),
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error fetching report`, error);
        return new Response(
            JSON.stringify({ message: `Error fetching report`, error: error.message }),
            { status: 500 }
        );
    }
}
