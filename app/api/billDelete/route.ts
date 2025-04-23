import { GET } from '@/app/api/auth/me/route';
import BillModel from '@/models/Bill';

interface DeleteBillRequestBody {
  billId: string;
}

interface User {
  _id: string;
}

export async function DELETE(req: Request): Promise<Response> {
  try {
    const body: DeleteBillRequestBody = await req.json();
    const { billId } = body;

    const response = await GET(req);
    const user: User = await response.json();

    const bill = await BillModel.findById(billId);
    if (!bill) {
      return Response.json({ message: 'Bill not found' }, { status: 404 });
    }

    if (bill.to.toString() !== user._id) {
      return Response.json(
        { message: 'You are not authorized to delete this bill' },
        { status: 403 }
      );
    }

    const deletedDocument = await BillModel.findOneAndDelete({ _id: billId });
    if (!deletedDocument) {
      return Response.json({ message: 'Document not found' }, { status: 404 });
    }

    return Response.json(
      { message: 'Document deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: 'Server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
