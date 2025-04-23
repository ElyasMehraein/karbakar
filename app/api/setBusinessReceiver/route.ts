import { NextRequest, NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import ReportModel from '@/models/Report';
import UserModel from '@/models/User';

interface User {
  code: number;
  [key: string]: any;
}

interface Business {
  agentCode: number;
  [key: string]: any;
}

interface BusinessRelation {
  provider: string;
  receiver: string;
  isAnswerNeed: boolean;
  [key: string]: any;
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();
    const body = await req.json();
    const { provider, receiver } = body as {
      provider: string;
      receiver: string;
    };

    const res = await GET(req);
    const user = (await res.json()) as User;

    if (!user || !user.code) {
      return NextResponse.json(
        { message: 'Please log in first' },
        { status: 401 }
      );
    }

    const loggedUser = await UserModel.findOne({ code: user.code });
    if (!loggedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const business = (await BusinessModel.findById(
      provider
    ).lean()) as Business;
    if (!business) {
      return NextResponse.json(
        { message: 'Business not found' },
        { status: 404 }
      );
    }

    if (Number(business.agentCode) !== Number(user.code)) {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 403 }
      );
    }

    const existingRelation = await BusinessRelationModel.findOne({
      provider,
      receiver,
    });
    if (existingRelation) {
      return NextResponse.json(
        { message: 'Relation already exists' },
        { status: 409 }
      );
    }

    const newRelation = new BusinessRelationModel({
      provider,
      receiver,
      isAnswerNeed: true,
    });
    await newRelation.save();

    return NextResponse.json(
      { message: 'relation created successfully', data: newRelation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in PUT /business/relations:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
