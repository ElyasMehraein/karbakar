import { NextRequest, NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import GuildModel from '@/models/Guild';
import ProductModel from '@/models/Product';
import UserModel from '@/models/User';

interface User {
  code: number;
  [key: string]: any;
}

interface Business {
  demandsForGuilds: Array<{
    guild: string;
    requestText?: string;
  }>;
  [key: string]: any;
}

interface Guild {
  _id: string;
  guildName: string;
  jobCategory: string;
  [key: string]: any;
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { businessID, selectedGuild, requestText, jobCategory } = body as {
      businessID: string;
      selectedGuild: string;
      requestText?: string;
      jobCategory: string;
    };
    await connectToDB();

    // Get logged-in user information
    const response = await GET(req);
    const user = (await response.json()) as User;
    const loggedUser = await UserModel.findOne({ code: user.code });

    if (!loggedUser) {
      return NextResponse.json(
        { message: 'Please log in first' },
        { status: 404 }
      );
    }
    if (!jobCategory) {
      return NextResponse.json(
        { message: 'jobCategory is required.' },
        { status: 407 }
      );
    }

    // Verify user permissions to modify the business
    const business = (await BusinessModel.findById(businessID)) as Business;

    if (!selectedGuild) {
      return NextResponse.json(
        { message: 'no guild selected' },
        { status: 400 }
      );
    }

    let guild: Guild;
    const isGuildExist = await GuildModel.findOne({
      guildName: selectedGuild,
      jobCategory,
    });
    if (isGuildExist) {
      guild = isGuildExist;
    } else {
      guild = await GuildModel.create({
        guildName: selectedGuild,
        jobCategory,
      });
    }

    const isItMoreThan30 = Boolean(business.demandsForGuilds.length > 30);
    if (isItMoreThan30) {
      return NextResponse.json(
        { message: 'you can not have more than 30 demands for guilds' },
        { status: 422 }
      );
    }

    const existingDemand = business.demandsForGuilds.some((demand) => {
      return demand.guild.toString() === guild._id.toString();
    });

    if (!existingDemand) {
      await BusinessModel.findByIdAndUpdate(
        businessID,
        {
          $addToSet: {
            demandsForGuilds: {
              guild: guild._id,
              requestText:
                requestText && requestText.length > 0 ? requestText : undefined,
            },
          },
        },
        { new: true }
      );
    } else {
      return NextResponse.json(
        { message: 'demand already exist' },
        { status: 406 }
      );
    }

    return NextResponse.json(
      { message: 'Business successfully updated', data: guild._id },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
