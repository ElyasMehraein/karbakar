import { NextRequest, NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BugReportModel, { IBugReport } from '@/models/BugReport';
import { IUser } from '@/models/User';

interface BugReportRequestBody {
  description: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();

    const { description }: BugReportRequestBody = await request.json();
    const response = await GET(request);
    const user: IUser = await response.json();

    const newBugReport: IBugReport = new BugReportModel({
      description,
      sender: user.code,
    });

    // ذخیره در دیتابیس
    await newBugReport.save();

    // پاسخ موفقیت به فرانت‌اند
    return NextResponse.json({ success: true, data: newBugReport });
  } catch (error) {
    console.error('Error saving bug report:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
