import BillModel from '@/models/Bill'
import { GET } from '@/app/api/auth/me/route'

export async function DELETE(req, res) {
  const body = await req.json()
  let { billId } = body
  const response = await GET(req)
  const user = await response.json()
  const bill = await BillModel.findById(billId)

  if (bill.to.toString() !== user._id) {
    return Response.json(
      { message: `You are not authorized to delete this bill ` },
      { status: 403 }
    )
  }

  try {
    const deletedDocument = await BillModel.findOneAndDelete({ _id: billId })
    if (!deletedDocument) {
      return Response.json({ status: 404 }, { message: 'Document not found' })
    }
    return Response.json({ message: 'Document deleted successfully' }, { status: 200 })
  } catch (error) {
    return Response.json({ message: 'Server error', error }, { status: 500 })
  }
}
