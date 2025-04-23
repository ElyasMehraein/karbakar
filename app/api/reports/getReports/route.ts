import { cookies } from 'next/headers';

import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import ReportModel from '@/models/Report';
import UserModel from '@/models/User';

interface TokenPayload {
  id: string;
}

interface User {
  _id: string;
}

interface Report {
  business: any;
  bill: any;
  recepiant: string;
  providerBusiness: any;
  receiverBusiness: any;
  products: {
    product: any;
  }[];
}

export async function GET(req: Request): Promise<Response> {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ message: 'only users can get reports' }),
        { status: 403 }
      );
    }

    let tokenPayLoad: TokenPayload;
    try {
      tokenPayLoad = verifyToken(token) as TokenPayload;
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: 'Invalid token',
          error: error instanceof Error ? error.message : 'Unknown error',
        }),
        { status: 401 }
      );
    }

    const logedUser = (await UserModel.findById(
      tokenPayLoad.id
    )) as User | null;
    if (!logedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    const reports = (await ReportModel.find({ recepiant: logedUser._id })
      .populate(
        'business bill recepiant providerBusiness receiverBusiness products.product'
      )
      .lean()) as Report[];

    return new Response(
      JSON.stringify({
        message: 'get reports successfully',
        data: reports.reverse(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error getting reports`, error);
    return new Response(
      JSON.stringify({
        message: `Error getting reports`,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 }
    );
  }
}
