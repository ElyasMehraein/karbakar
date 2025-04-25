import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import BillModel from '@/models/Bill'
import { GET } from '@/app/api/auth/me/route'
import ReportModel from '@/models/Report'

export async function DELETE(req) {
  try {
    const body = await req.json()
    const { businessID, demandID } = body

    connectToDB()
    const response = await GET(req)

    const user = await response.json()
    if (!user) {
      return Response.json({ message: 'you need to login' }, { status: 404 })
    }

    const Business = await BusinessModel.findOne({ _id: businessID })
    if (!Business) {
      return Response.json({ message: 'Business not found' }, { status: 404 })
    }

    function isEmployeeHere(userID) {
      JSON.parse(JSON.stringify(Business)).workers.some(worker => {
        return worker === JSON.parse(JSON.stringify(userID))
      })
    }
    if (isEmployeeHere(user._id)) {
      return Response.json({ message: 'you are not a member of this business' }, { status: 403 })
    }

    await BusinessModel.updateOne(
      { _id: Business._id },
      { $pull: { demandsForGuilds: { guild: demandID } } }
    )

    return Response.json({ message: 'Demand deleted successfully' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'server error' }, { status: 500 })
  }
}
