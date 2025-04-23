import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import BusinessModel from '@/models/Business';
import GuildModel from '@/models/Guild';
import UserModel from '@/models/User';

interface SignupBusinessRequestBody {
  businessName: string;
  guildName: string;
  jobCategory: string;
}

interface TokenPayload {
  id: string;
}

interface User {
  _id: string;
  code: number;
  primeJob?: string;
  businesses: string[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: SignupBusinessRequestBody = await req.json();
    const { businessName, guildName, jobCategory } = body;

    if (!businessName?.trim() || !guildName?.trim() || !jobCategory?.trim()) {
      return Response.json(
        { message: 'Entrance data is empty!' },
        { status: 400 }
      );
    }

    const englishLetters = /^[A-Za-z\-_.]+$/;
    if (!englishLetters.test(businessName)) {
      return Response.json(
        { message: 'Business name must only contain English letters!' },
        { status: 406 }
      );
    }

    if (businessName.length <= 3) {
      return Response.json(
        { message: 'Business name must be more than 3 letters!' },
        { status: 405 }
      );
    }

    await connectToDB();
    let business = await BusinessModel.findOne({ businessName });

    if (!business) {
      const token = (await cookies()).get('token')?.value;
      const tokenPayLoad = verifyToken(token) as TokenPayload | null;

      if (!tokenPayLoad) {
        return redirect('/w');
      }

      const user = JSON.parse(
        JSON.stringify(
          await UserModel.findOne(
            { _id: tokenPayLoad.id },
            'primeJob code businesses'
          )
        )
      ) as User;

      if (!user) {
        return Response.json({ message: 'User not found' }, { status: 404 });
      }

      if (user.businesses.length >= 3) {
        return Response.json(
          { message: 'You can be a member of a maximum of 3 businesses' },
          { status: 409 }
        );
      }

      let GuildInDB = await GuildModel.findOne({ guildName });

      if (!GuildInDB) {
        GuildInDB = await GuildModel.create({
          guildName,
          products: [],
          jobCategory,
        });
      }

      business = await BusinessModel.create({
        businessName,
        businessBrand: 'کسب و کار جدید',
        bio: '',
        explain: '',
        phone: '',
        email: '',
        personalPage: '',
        instagram: '',
        mapDetail: '',
        agentCode: user.code,
        workers: [user._id],
        guild: GuildInDB._id,
        deliveredProducts: [],
        monthlyCommitment: [],
      });

      await UserModel.findByIdAndUpdate(user._id, {
        $push: { businesses: business._id },
      });

      if (user.primeJob) {
        return Response.json(
          { message: 'Business created successfully' },
          { status: 201 }
        );
      }

      await UserModel.findByIdAndUpdate(user._id, { primeJob: business._id });

      return Response.json(
        { message: 'Business created successfully' },
        { status: 201 }
      );
    } else {
      return Response.json(
        { message: 'Business already exists' },
        { status: 409 }
      );
    }
  } catch (error) {
    console.error('Error', error);
    return Response.json(
      {
        message: 'Server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
