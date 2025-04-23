import { NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
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
  isAnswerNeed: boolean;
}

interface Report {
  _id: string;
  recepiant: string;
  isAnswerNeed: boolean;
  answer: boolean;
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const body = await req.json();
    const { businessRelationID, parameter, reportID } = body;

    const response = await GET(req);
    const user = (await response.json()) as User;

    const report = (await ReportModel.findOne({
      _id: reportID,
    })) as Report | null;
    if (!report) {
      return NextResponse.json(
        { message: 'Report not found' },
        { status: 404 }
      );
    }

    if (report.recepiant.toString() !== user._id) {
      return NextResponse.json(
        { message: '403 Unauthorized access' },
        { status: 403 }
      );
    }

    report.isAnswerNeed = false;
    report.answer = parameter;
    await report.save();

    const businessRelation = (await BusinessRelationModel.findById(
      businessRelationID
    )) as BusinessRelation | null;
    if (parameter && businessRelation) {
      const receiverBusiness = (await BusinessModel.findOne({
        _id: businessRelation.receiver,
      })) as Business | null;
      if (!receiverBusiness) {
        return NextResponse.json(
          { message: 'Receiver business not found' },
          { status: 404 }
        );
      }

      if (Number(receiverBusiness.agentCode) !== user.code) {
        return NextResponse.json(
          { message: '403 Unauthorized access' },
          { status: 403 }
        );
      }

      businessRelation.isAnswerNeed = false;
      await businessRelation.save();

      const providerBusiness = (await BusinessModel.findOne({
        _id: businessRelation.provider,
      })) as Business | null;
      if (!providerBusiness) {
        return NextResponse.json(
          { message: 'Provider business not found' },
          { status: 404 }
        );
      }

      const providerBusinessAgent = (await UserModel.findOne({
        code: providerBusiness.agentCode,
      })) as User | null;
      if (!providerBusinessAgent) {
        return NextResponse.json(
          { message: 'Provider business agent not found' },
          { status: 404 }
        );
      }

      await ReportModel.create({
        recepiant: providerBusinessAgent._id,
        title: 'RelationAccepted',
        receiverBusiness,
      });
    }

    return NextResponse.json(
      { message: 'businessRelation report updated successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error updating business relation report:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
