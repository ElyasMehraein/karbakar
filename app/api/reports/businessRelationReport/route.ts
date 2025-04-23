import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import BusinessRelationModel from '@/models/BusinessRelation';
import ReportModel from '@/models/Report';
import UserModel from '@/models/User';

interface User {
  _id: string;
  code: number;
}

interface Business {
  _id: string;
  agentCode: number;
}

interface BusinessRelation {
  _id: string;
  receiver: string;
  provider: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const body = await req.json();
    const { businessRelation } = body;
    if (await ReportModel.findOne({ businessRelation })) {
      return NextResponse.json(
        { message: 'Report already exists' },
        { status: 409 }
      );
    }

    const businessRelationDoc = (await BusinessRelationModel.findById(
      businessRelation
    )) as BusinessRelation | null;
    if (!businessRelationDoc) {
      return NextResponse.json(
        { message: 'Business relation not found' },
        { status: 404 }
      );
    }

    const receiverBusiness = (await BusinessModel.findById(
      businessRelationDoc.receiver
    )) as Business | null;
    if (!receiverBusiness) {
      return NextResponse.json(
        { message: 'Receiver business not found' },
        { status: 404 }
      );
    }

    const recepiant = (await UserModel.findOne({
      code: receiverBusiness.agentCode,
    })) as User | null;
    if (!recepiant) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const providerBusiness = (await BusinessModel.findById(
      businessRelationDoc.provider
    )) as Business | null;
    if (!providerBusiness) {
      return NextResponse.json(
        { message: 'Provider business not found' },
        { status: 404 }
      );
    }

    await ReportModel.create({
      recepiant: recepiant._id,
      title: 'businessRelation',
      businessRelation,
      providerBusiness,
      receiverBusiness,
      isSeen: false,
      isAnswerNeed: true,
      answer: false,
    });

    return NextResponse.json(
      { message: 'Report created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { message: 'Error creating report' },
      { status: 500 }
    );
  }
}
