import { cookies } from 'next/headers';

import connectToDB from '@/configs/db';
import { verifyToken } from '@/controllers/auth';
import UserModel from '@/models/User';

interface TokenPayload {
  id: string;
}

export async function GET(): Promise<Response> {
  try {
    const token = (await cookies()).get('token')?.value;
    const tokenPayLoad = verifyToken(token) as TokenPayload | null;

    if (!tokenPayLoad) {
      return Response.json({ message: '403 دسترسی غیر مجاز' }, { status: 403 });
    }

    await connectToDB();
    const user = await UserModel.findOne({ _id: tokenPayLoad.id });

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
