// فایل: app/api/bug-report/[id]/route.js
import { NextResponse } from 'next/server'
import connectToDB from '@/configs/db'
import BugReportModel from '@/models/BugReport'

export async function DELETE(request, { params }) {
  try {
    await connectToDB()
    const { id } = await params
    await BugReportModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
