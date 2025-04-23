import { NextResponse } from 'next/server';

import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import GuildModel from '@/models/Guild';

interface Guild {
  guildName: string;
  jobCategory: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const guilds: Guild[] = JSON.parse(
      JSON.stringify(await GuildModel.find({}, 'guildName jobCategory'))
    );
    if (!guilds.length) {
      return NextResponse.json(
        { message: 'No guilds found', data: [] },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'get guilds successfully', data: guilds },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error get guilds`, error);
    return NextResponse.json(
      { message: `Error get guilds`, error },
      { status: 500 }
    );
  }
}
