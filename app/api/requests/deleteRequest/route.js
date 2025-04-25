import RequestModel from '@/models/Request'
import { GET } from '@/app/api/auth/me/route'
import { createHash } from 'crypto'

export async function DELETE(req, res) {
  const body = await req.json()
  let { jobRequestId } = body
  const response = await GET(req)
  const user = await response.json()

  const uniqCode = createHash('sha256')
    .update(user._id + process.env.PAPER)
    .digest('hex')
  const userJobRequest = await RequestModel.findById(jobRequestId)

  if (!userJobRequest) {
    return Response.json({ status: 404 }, { message: 'Document not found' })
  }

  if (!userJobRequest.uniqCode === uniqCode) {
    return Response.json(
      { message: `You are not authorized to delete this jobRequest ` },
      { status: 403 }
    )
  }

  try {
    await RequestModel.findOneAndDelete({ _id: jobRequestId })
    return Response.json({ message: 'Document deleted successfully' }, { status: 200 })
  } catch (error) {
    return Response.json({ message: 'Server error', error }, { status: 500 })
  }
}
