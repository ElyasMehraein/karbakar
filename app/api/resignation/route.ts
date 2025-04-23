import { NextRequest, NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BillModel from '@/models/Bill';
import BusinessModel from '@/models/Business';
import ReportModel from '@/models/Report';
import UserModel from '@/models/User';

interface User {
  _id: string;
  code: number;
  businesses: string[];
  primeJob: string;
  [key: string]: any;
}

interface Business {
  _id: string;
  agentCode: number;
  workers: string[];
  save: () => Promise<void>;
  [key: string]: any;
}

interface Report {
  recepiant: string;
  title: string;
  business: string;
  isSeen: boolean;
  isAnswerNeed: boolean;
  [key: string]: any;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { newAgentID, selectedBusinessId } = body as {
      newAgentID?: number;
      selectedBusinessId: string;
    };

    connectToDB();
    const response = await GET(req);
    const user = (await response.json()) as User;

    if (!user) {
      return NextResponse.json(
        { message: 'you need to login' },
        { status: 404 }
      );
    }

    const Business = (await BusinessModel.findOne({
      _id: selectedBusinessId,
    })) as Business;
    const recepiantUser = (await UserModel.findOne({
      code: Business.agentCode,
    })) as User;

    function isEmployeeHere(userID: string): boolean {
      return JSON.parse(JSON.stringify(Business)).workers.some(
        (worker: string) => {
          return worker === JSON.parse(JSON.stringify(userID));
        }
      );
    }

    if (isEmployeeHere(user._id)) {
      return NextResponse.json(
        { message: 'you are not a member of this business' },
        { status: 403 }
      );
    }

    if (!newAgentID && Business.agentCode !== user.code) {
      await ReportModel.create({
        recepiant: recepiantUser._id,
        title: 'resignation',
        business: Business._id,
        isSeen: false,
        isAnswerNeed: false,
      });
      await UserModel.updateOne(
        { _id: user._id },
        { $pull: { businesses: Business._id } }
      );
      if (user.primeJob === Business._id) {
        await UserModel.updateOne(
          { _id: user._id },
          { primeJob: '66164cc526e2d5fe01b561dc' }
        );
      }

      await BusinessModel.updateOne(
        { _id: Business._id },
        { $pull: { workers: user._id } }
      );

      return NextResponse.json(
        { message: 'you resign from your job successfully' },
        { status: 201 }
      );
    }

    const newAgent = (await UserModel.findOne({ code: newAgentID })) as User;

    if (newAgent.businesses.length >= 3) {
      return NextResponse.json(
        {
          message: 'any user can only be a member of a maximum of 3 businesses',
        },
        { status: 406 }
      );
    }

    if (isEmployeeHere(newAgent._id)) {
      return NextResponse.json(
        { message: 'next agent is not a member of this business' },
        { status: 409 }
      );
    }

    await ReportModel.create({
      recepiant: recepiantUser._id,
      title: 'resignation',
      business: Business._id,
      isSeen: false,
      isAnswerNeed: false,
    });

    await ReportModel.create({
      recepiant: newAgent._id,
      title: 'YouAreAgent',
      business: Business._id,
      isSeen: false,
      isAnswerNeed: false,
    });

    await UserModel.updateOne(
      { _id: user._id },
      { $pull: { businesses: Business._id } }
    );

    await UserModel.findByIdAndUpdate(newAgent._id, { primeJob: Business._id });

    await BusinessModel.updateOne(
      { _id: Business._id },
      { $pull: { workers: user._id } }
    );

    Business.agentCode = newAgent.code;
    await Business.save();

    return NextResponse.json(
      { message: 'Report created and user resignation is successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
