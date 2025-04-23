import { NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import UserModel from '@/models/User';

interface User {
  _id: string;
  primeJob?: string;
}

interface Business {
  _id: string;
  workers: string[];
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    await connectToDB();

    const response = await GET(req);
    const user = (await response.json()) as User;

    const business = (await BusinessModel.findOne({
      _id: body,
    })) as Business | null;
    if (!business) {
      return NextResponse.json(
        { message: 'Business does not exist' },
        { status: 404 }
      );
    }

    if (user.primeJob === business._id.toString()) {
      return NextResponse.json(
        { message: 'Selected business is your current primeJob' },
        { status: 406 }
      );
    }

    const areYouWorkHere = business.workers.some(
      (worker) => worker.toString() === user._id
    );
    if (!areYouWorkHere) {
      return NextResponse.json(
        { message: 'You are not an employee of this business' },
        { status: 403 }
      );
    }

    await UserModel.findByIdAndUpdate(
      user._id,
      { primeJob: business._id },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Changing primeJob is done successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error changing prime job:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
