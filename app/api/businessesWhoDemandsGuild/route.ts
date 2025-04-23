import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';

interface Guild {
  _id: string;
  guildName: string;
}

interface Business {
  _id: string;
  businessName: string;
  demandsForGuilds: Array<{
    guild: string | Guild;
  }>;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const guildID = searchParams.get('guildID');

    if (!guildID) {
      return NextResponse.json(
        { message: 'Guild ID is required' },
        { status: 400 }
      );
    }

    const businesses = (await BusinessModel.find({
      demandsForGuilds: { $elemMatch: { guild: guildID } },
    }).populate('demandsForGuilds.guild')) as Business[];

    return NextResponse.json(
      { message: 'Get businesses successfully', data: businesses },
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
