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
  _id: string;
  business: any;
  bill: any;
  recepiant: string;
  providerBusiness: any;
  receiverBusiness: any;
  products: {
    product: any;
  }[];
}

interface RouteParams {
  params: {
    reportID: string;
  };
}

export async function GET(
  req: Request,
  { params }: RouteParams
): Promise<Response> {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Authentication required' }),
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

    const { reportID } = params;
    if (!reportID) {
      return new Response(
        JSON.stringify({ message: 'Report ID is required' }),
        { status: 400 }
      );
    }

    const report = (await ReportModel.findOne({
      _id: reportID,
      recepiant: logedUser._id,
    })
      .populate(
        'business bill recepiant providerBusiness receiverBusiness products.product'
      )
      .lean()) as Report | null;

    if (!report) {
      return new Response(JSON.stringify({ message: 'Report not found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: 'Report fetched successfully',
        data: report,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error fetching report`, error);
    return new Response(
      JSON.stringify({
        message: `Error fetching report`,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 }
    );
  }
}
