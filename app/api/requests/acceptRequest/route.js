import UserModel from '@/models/User'
import BusinessModel from '@/models/Business'
import BillModel from '@/models/Bill'
import RequestModel from '@/models/Request'
import { GET } from '@/app/api/auth/me/route'

export async function POST(req) {
  const response = await GET(req)
  const user = await response.json()
  const { requestID } = await req.json()

  const userPrimeJobBusiness = await BusinessModel.findOne({ _id: user.primeJob })

  try {
    if (!user.primeJob) {
      return Response.json({ message: 'you dont have primeJob' }, { status: 403 })
    }
    if (user.code !== Number(userPrimeJobBusiness.agentCode)) {
      return Response.json({ message: 'you are not business Agent' }, { status: 406 })
    }
    const Request = await RequestModel.findOne({ _id: requestID })
    Request.acceptedBy.addToSet(user.primeJob)
    await Request.save()

    return Response.json({ message: 'your answer added to the Request' }, { status: 201 })
  } catch (error) {
    console.error(`Error adding your answer to the Request:`, error)
    Response.json({ message: `server error `, error }, { status: 500 })
  }
}
