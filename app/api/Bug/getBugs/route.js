import { NextResponse } from 'next/server'
import connectToDB from '@/configs/db'
import BugReportModel from '@/models/BugReport'

export async function GET() {
  try {
    await connectToDB()
    const bugReports = await BugReportModel.find({}).populate('sender', 'code')
    return NextResponse.json({ success: true, data: bugReports })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
