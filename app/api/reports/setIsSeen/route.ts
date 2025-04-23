import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import ReportModel from '@/models/Report';
import UserModel from '@/models/User';

interface SetIsSeenRequestBody {
  parameter: boolean;
}

interface User {
  _id: string;
}

export async function PUT(req: Request): Promise<Response> {
  try {
    const { parameter }: SetIsSeenRequestBody = await req.json();
    await connectToDB();

    const response = await GET(req);
    const user: User = await response.json();

    if (parameter) {
      await ReportModel.updateMany(
        { recepiant: user._id, isSeen: false },
        { $set: { isSeen: true } }
      );
    }

    return Response.json({ message: 'notification has seen' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: 'server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
