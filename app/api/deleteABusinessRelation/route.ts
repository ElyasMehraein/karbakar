import { NextRequest } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import UserModel from '@/models/User';

interface DeleteBusinessRelationRequestBody {
  provider: string;
  receiver: string;
}

interface User {
  code: number;
  _id: string;
}

interface Business {
  _id: string;
  agentCode: number;
}

interface BusinessRelation {
  _id: string;
  provider: string;
  receiver: string;
}

export async function DELETE(req: NextRequest) {
  try {
    const body: DeleteBusinessRelationRequestBody = await req.json();
    const { provider, receiver } = body;

    await connectToDB();

    const response = await GET();
    const user: User = await response.json();
    const loggedUser = await UserModel.findOne({ code: user.code });

    if (!loggedUser) {
      return Response.json({ message: 'log in first' }, { status: 404 });
    }

    const providerBusiness = (await BusinessModel.findOne({
      _id: provider,
    }).lean()) as Business | null;
    
    if (!providerBusiness) {
      return Response.json({ message: 'Provider business not found' }, { status: 404 });
    }

    const receiverBusiness = (await BusinessModel.findOne({
      _id: receiver,
    }).lean()) as Business | null;

    if (!receiverBusiness) {
      return Response.json({ message: 'Receiver business not found' }, { status: 404 });
    }

    if (
      !(
        Number(providerBusiness.agentCode) === user.code ||
        Number(receiverBusiness.agentCode) === user.code
      )
    ) {
      return Response.json(
        { message: '403 Unauthorized access' },
        { status: 403 }
      );
    }

    const existingRelation = await BusinessRelationModel.findOne({
      provider: provider,
      receiver: receiver,
    });

    if (!existingRelation) {
      return Response.json(
        { message: 'Relation does not exist' },
        { status: 404 }
      );
    }

    await existingRelation.deleteOne();

    return Response.json(
      { message: 'Receiver removed successfully' },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
