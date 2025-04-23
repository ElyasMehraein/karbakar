import { createHash } from 'crypto';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import BusinessModel from '@/models/Business';
import RequestModel from '@/models/Request';
import UserModel from '@/models/User';

interface TokenPayload {
  id: string;
  [key: string]: any;
}

interface User {
  _id: string;
  businesses: Array<{
    _id: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

interface Request {
  uniqCode: string;
  acceptedBy?: {
    _id: string;
    [key: string]: any;
  };
  createdAt: Date;
  [key: string]: any;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = (await cookies()).get('token')?.value;
  const tokenPayLoad = verifyToken(token) as TokenPayload;

  if (!tokenPayLoad) {
    return NextResponse.json({ message: 'no logged user' }, { status: 403 });
  }
  try {
    connectToDB();
    const logedUser =
      tokenPayLoad &&
      ((await UserModel.findOne({ _id: tokenPayLoad.id }).populate(
        'businesses'
      )) as User);
    if (!logedUser) {
      return NextResponse.json({ message: 'no logged user' }, { status: 403 });
    }
    const uniqCode = createHash('sha256')
      .update(logedUser._id + process.env.PAPER)
      .digest('hex');
    const requests = (await RequestModel.find({ uniqCode })
      .populate('acceptedBy')
      .sort({ createdAt: -1 })) as Request[];

    return NextResponse.json(
      { message: 'get Requests as user info successfully', data: requests },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error get reports`, error);
    return NextResponse.json(
      { message: `Error get reports`, error },
      { status: 500 }
    );
  }
}
