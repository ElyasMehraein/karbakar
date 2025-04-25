import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import BillModel from '@/models/Bill'
// import { redirect } from 'next/navigation'
import { GET } from '@/app/api/auth/me/route'
import ReportModel from '@/models/Report'

export async function PUT(req) {
  try {
    const body = await req.json()
    const { parameter } = body
    connectToDB()
    const response = await GET(req)
    const user = await response.json()

    if (parameter) {
      await ReportModel.updateMany(
        { recepiant: user._id, isSeen: false },
        { $set: { isSeen: true } }
      )
    }
    return Response.json({ message: 'notification has seen' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'server error' }, { status: 500 })
  }
}
