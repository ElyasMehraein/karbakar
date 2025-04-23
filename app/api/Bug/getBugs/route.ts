import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import BugReportModel, { IBugReport } from '@/models/BugReport';

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDB();
    const bugReports: IBugReport[] = await BugReportModel.find({}).populate(
      'sender',
      'code'
    );
    return NextResponse.json({ success: true, data: bugReports });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
