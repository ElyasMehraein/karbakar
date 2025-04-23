import { createHash } from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

import { GET } from '@/app/api/auth/me/route';
import RequestModel from '@/models/Request';

interface User {
  _id: string;
  primeJob: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface RequestBody {
  Requester: {
    _id: string;
    [key: string]: string | number | boolean | null | undefined;
  };
  title: string;
  message: string;
  guild: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as RequestBody;
  const response = await GET(req);
  const user = (await response.json()) as User;
  const { Requester, title, message, guild } = body;

  const uniqCode = createHash('sha256')
    .update(user._id + process.env.PAPER)
    .digest('hex');

  try {
    if (user.primeJob !== Requester._id) {
      return NextResponse.json(
        { message: 'User is not authorized to make this request' },
        { status: 403 }
      );
    }
    await RequestModel.create({
      uniqCode,
      requesterBusiness: Requester,
      acceptedBy: [],
      needMoreInfo: [],
      title,
      message,
      guild,
    });
    return NextResponse.json(
      { message: `the Request created successfully.` },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(`Error creating the Request:`, error);
    return NextResponse.json(
      { message: `Error creating the Request `, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
