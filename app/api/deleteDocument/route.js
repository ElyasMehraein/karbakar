import BillModel from '@/models/Bill';

export async function DELETE(req, res) {
    try {
        const body = await req.json()
        const { id } = body
        const deletedDocument = await BillModel.findOneAndDelete({ _id: id });
        if (!deletedDocument) {
            return Response.json({ status: 404 }, { message: 'Document not found' })
        }
        return Response.json({ message: 'Document deleted successfully' }, { status: 200 })
    } catch (error) {
        return Response.json({ message: 'Server error', error }, { status: 500 })
    }
}
