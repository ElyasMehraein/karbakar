import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import BugReportModel from "@/models/BugReport";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function DELETE(
    request: Request,
    { params }: RouteParams
): Promise<NextResponse> {
    try {
        await connectToDB();
        const { id } = params;
        await BugReportModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 