import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';

interface Guild {
  _id: mongoose.Types.ObjectId;
  guildName: string;
}

interface DemandForGuild {
  guild: mongoose.Types.ObjectId | Guild;
  requestText?: string;
}

interface Business {
  _id: mongoose.Types.ObjectId;
  demandsForGuilds: DemandForGuild[];
}

export async function GET(_req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const { searchParams } = new URL(_req.url);
    const businessID = searchParams.get('businessID');

    if (!businessID) {
      return NextResponse.json(
        { message: 'Business ID is required' },
        { status: 400 }
      );
    }

    const business = await BusinessModel.findById(businessID).populate(
      'demandsForGuilds.guild'
    );

    if (!business) {
      return NextResponse.json(
        { message: 'Business not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Get businesses successfully',
        data: business.demandsForGuilds,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error getting businesses:', error);
    return NextResponse.json(
      { message: 'Error getting businesses', error },
      { status: 500 }
    );
  }
}
