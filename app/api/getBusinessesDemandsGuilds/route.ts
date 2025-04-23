import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import GuildModel from '@/models/Guild';

interface Guild {
  _id: string;
  guildName: string;
}

interface DemandForGuild {
  guild: string | Guild;
  requestText?: string;
}

interface Business {
  _id: string;
  demandsForGuilds: DemandForGuild[];
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const businessID = searchParams.get('businessID');

    if (!businessID) {
      return NextResponse.json(
        { message: 'Business ID is required' },
        { status: 400 }
      );
    }

    const business = (await BusinessModel.findById(businessID).populate(
      'demandsForGuilds.guild'
    )) as Business | null;

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
  } catch (error) {
    console.error('Error getting businesses:', error);
    return NextResponse.json(
      { message: 'Error getting businesses', error },
      { status: 500 }
    );
  }
}
