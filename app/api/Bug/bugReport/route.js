import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import { GET } from "@/app/api/auth/me/route"
import { NextResponse } from "next/server";
import BugReportModel from "@/models/BugReport";

export async function POST(request) {
    try {
        await connectToDB();

        const { description } = await request.json();
        const response = await GET(request);
        const user = await response.json();
        console.log("user", user.code);

        const newBugReport = new BugReportModel({
            description,
            sender:user.code
        });

        // ذخیره در دیتابیس
        await newBugReport.save();

        // پاسخ موفقیت به فرانت‌اند
        return NextResponse.json({ success: true, data: newBugReport });
    } catch (error) {
        console.error("Error saving bug report:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}